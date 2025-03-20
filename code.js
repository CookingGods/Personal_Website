// All previous JavaScript code remains the same

// Variables to hold tab navigation links and tab content elements
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

// Function to switch between tabs when clicked
function opentab(tabname) {
    // Get all tab links and tab content sections
    // Remove the "active-link" class from all tab links
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    // Remove the "active-tab" class from all tab contents
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    // Add "active-link" class to the clicked tab link
        event.currentTarget.classList.add("active-link");
    // Add "active-tab" class to the corresponding tab content
    document.getElementById(tabname).classList.add("active-tab");
}


// Variable to hold the side menu element for small screens
var sidemenu = document.getElementById("sidemenu");

// Function to open the side menu (slide-in effect)
function openmenu() {
    sidemenu.style.right = "0"; // Moves the side menu into view
}

// Function to close the side menu (slide-out effect)
function closemenu() {
    sidemenu.style.right = "-200px"; // Moves the side menu out of view
}

// URL of the Google Apps Script that handles form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbyDY1I0FLbOtKlIgyYlkLDAZTngCzD_dVw1jsQUtDrKNHRi4DuJOTRQ4O4WIwQGaSZ8/exec';

// Form element for submitting data
const form = document.forms['submit-to-google-sheet']; // Selects the form by its name attribute
// Element to display a success or error message
const msg = document.getElementById("msg");

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Sends the form data to the Google Apps Script via a POST request
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            // Displays a success message when the form is successfully submitted
            msg.innerHTML = "Message sent successfully";
            // Clears the message after 5 seconds
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000);
            // Resets the form fields
            form.reset();
        })
        .catch(error => console.error('Error!', error.message)); // Logs any errors in the console
});

// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(function(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        const indicators = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        const slideWidth = 100; // Percentage width of each slide
        
        // Create indicators
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            
            indicators.appendChild(indicator);
        });
        
        const indicatorDots = Array.from(indicators.querySelectorAll('.indicator'));
        
        // Set up the carousel
        function setSlidePosition() {
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            
            // Update indicators
            indicatorDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            setSlidePosition();
        }
        
        // Event listeners for buttons
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            setSlidePosition();
        });
        
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            setSlidePosition();
        });
        
        function setSlidePosition() {
            track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
            // Update indicators
            indicatorDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        
            // Pause all videos (REMOVE THIS LINE)
            // document.querySelectorAll('.carousel-slide video').forEach(video => video.pause());
        
            // Play the video in the active slide (if it exists)
            let activeVideo = slides[currentIndex].querySelector('video');
            if (activeVideo) {
                activeVideo.play();
            }
        }        
     
    });
});
