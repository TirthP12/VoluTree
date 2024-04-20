const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Radar.io API endpoint
const radarApiKey = 'prj_live_pk_11c454389d21ddcd3429ba9a3b6559c4c42c0394';
const radarApiEndpoint = 'https://api.radar.io/v1/geocode/forward';

const volunteerOpportunities = [
    {
        title: "Volunteers for Mount Prospect Police Dept",
        location: "911 Kensington Rd, Mount Prospect, Illinois",
        description: "Volunteers needed for Mount Prospect Police Department 5k Run",
        contact: "Tirth Patel - TirthP0112@gmail.com"
    },
    {
        title: "Prospect HS Tutors",
        location: "811 Kensington Road, Mount Prospect, Illinois",
        description: "Volunteers needed to provide bathing assistance for home-bound elderly individuals.",
        contact: "Bob Brown - brownbob@214.org"
    }
];

app.get('/volunteer-opportunities', async (req, res) => {
    const address = req.query.address;
    try {
        // Fetch geocode data from Radar.io API
        const response = await fetch(`${radarApiEndpoint}?query=${encodeURIComponent(address)}&layers=address`, {
            headers: {
                'Authorization': `Bearer ${radarApiKey}`
            }
        });
        const data = await response.json();

    
        const zipcode = data.addresses[0].postalCode;

        
        const filteredOpportunities = volunteerOpportunities.filter(opportunity =>
            opportunity.location.includes(zipcode)
        );
        res.json(filteredOpportunities);
    } catch (error) {
        console.error('Error fetching geocode data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
document.getElementById('zipcodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    fetchVolunteerOpportunities(zipcode);
});

function fetchVolunteerOpportunities(zipcode) {
    fetch(`/volunteer-opportunities?zipcode=${zipcode}`)
        .then(response => response.json())
        .then(data => displayOpportunities(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayOpportunities(opportunities) {
    const opportunitiesContainer = document.getElementById('opportunities');
    opportunitiesContainer.innerHTML = '';

    if (opportunities.length === 0) {
        opportunitiesContainer.innerHTML = '<p>No volunteer opportunities found for this zip code.</p>';
        return;
    }

    opportunities.forEach(opportunity => {
        const opportunityElement = document.createElement('div');
        opportunityElement.classList.add('opportunity');
        opportunityElement.innerHTML = `
            <h2>${opportunity.title}</h2>
            <p><strong>Location:</strong> ${opportunity.location}</p>
            <p><strong>Description:</strong> ${opportunity.description}</p>
            <p><strong>Contact:</strong> ${opportunity.contact}</p>
        `;
        opportunitiesContainer.appendChild(opportunityElement);
    });

    opportunitiesContainer.style.display = 'block';
}
// Open modal with volunteer opportunities
function openOpportunities() {
    var modal = document.getElementById("volunteerModal");
    modal.style.display = "block";
    // Fetch and display volunteer opportunities from the database
    // This part would require server-side scripting to fetch data from a database
}

// Close modal when clicking on the close button
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function() {
    var modal = document.getElementById("volunteerModal");
    modal.style.display = "none";
}

// Close modal when clicking outside the modal
window.onclick = function(event) {
    var modal = document.getElementById("volunteerModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form submission for creating an event (this would require backend implementation)
document.getElementById("createEventForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent form submission for now
    // Extract event details from the form and send to server to save to database
    // Reload the page or update the UI with the new event
}
