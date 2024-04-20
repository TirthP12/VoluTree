window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var infoSections = document.querySelectorAll('.info');
    var headerHeight = document.querySelector('header').offsetHeight;
    var scrollPosition = document.documentElement.scrollTop;

    infoSections.forEach(function(section, index) {
        var sectionTop = section.offsetTop;
        if (scrollPosition > (sectionTop - headerHeight)) {
            section.style.opacity = 1;
        } else {
            section.style.opacity = 0;
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Animation for "Hello" text
    const helloText = document.getElementById("hello-text");
    helloText.classList.add("animate-slide-in");

    // Animation for "How are you?" text
    const howAreYouText = document.getElementById("how-are-you-text");
    setTimeout(function() {
        howAreYouText.classList.add("animate-slide-in");
    }, 1000);

    // Animation for left name, image, and right name
    const leftName = document.querySelector('.left-name');
    const imageContainer = document.querySelector('.image-container');
    const rightName = document.querySelector('.right-name');

    setTimeout(function() {
        leftName.classList.add("animate-slide-in");
        imageContainer.classList.add("animate-slide-in");
        rightName.classList.add("animate-slide-in");
    }, 100); // Adjust the delay as needed
});

// make the box have mission statements make it hwoever you like thats related ot the topic. and make the image below th emission statement make it look aesthetic. 