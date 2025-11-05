// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');
const section = document.querySelector('.section');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const typedTextElement = document.querySelector('.typed-text');
const skillBars = document.querySelectorAll('.skill-bar span');
const contactForm = document.querySelector('.contact-form');
const portfolioPopups = document.querySelectorAll('.portfolio-popup');
const portfolioPopupOverlay = document.querySelector('.portfolio-popup-overlay');
const popupCloseButtons = document.querySelectorAll('.popup-close');
const galleryThumbs = document.querySelectorAll('.popup-gallery-thumbs img');
const body = document.body;

// Carousel Elements
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const carouselDots = document.querySelector('.carousel-dots');

// Typing effect words
const words = ["Game Developer", "Technical Artist", "Programmer", "Project Manager", "Scrum Master", "Web Designer", "Graphic Designer", "Team Organizer", "Game Designer", "Animator"];

// Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('menu-open'); // Prevent body scrolling when menu is open
});

// Close menu when a link is clicked
navLinksLi.forEach(li => {
    li.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open'); // Allow body scrolling when menu is closed
    });
});

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Smooth scrolling and section activation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href');
        
        // Hide all sections and deactivate all nav links
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        
        // Activate the target section and nav link
        document.querySelector(targetId).classList.add('active');
        this.classList.add('active');
        
        // Scroll to the section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Portfolio filtering (only on portfolio page)
if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Portfolio Popup Functions
function openPopup(popupId) {
    // Hide body scrollbar and prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Show overlay
    if (portfolioPopupOverlay) {
        portfolioPopupOverlay.style.display = 'block';
    }
    
    // Show specific popup
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
    }
}

function closeAllPopups() {
    // Restore body scrolling
    document.body.style.overflow = 'auto';
    
    // Hide overlay
    if (portfolioPopupOverlay) {
        portfolioPopupOverlay.style.display = 'none';
    }
    
    // Hide all popups
    portfolioPopups.forEach(popup => {
        popup.classList.remove('active');
        
        // Stop and reset any videos in the popup
        const videos = popup.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// Close popup when clicking the close button
if (popupCloseButtons.length > 0) {
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllPopups);
    });
}

// Close popup when clicking outside of it
if (portfolioPopupOverlay) {
    portfolioPopupOverlay.addEventListener('click', function(e) {
        // Only close if the click is directly on the overlay
        if (e.target === portfolioPopupOverlay) {
            closeAllPopups();
        }
    });
}

// Add click event to each popup to close when clicking outside the content
document.querySelectorAll('.portfolio-popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        // Close only if clicking directly on the popup container, not its content
        if (e.target === popup) {
            closeAllPopups();
        }
    });
});

// Prevent clicks inside popup content from closing the popup
document.querySelectorAll('.popup-content').forEach(content => {
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Open popup when clicking a portfolio item
if (portfolioItems.length > 0) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-id');
            if (projectId) {
                openPopup('popup-' + projectId);
            }
        });
    });
}

// Handle gallery thumbnail clicks
if (galleryThumbs.length > 0) {
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Find the parent popup element
            const popup = this.closest('.portfolio-popup');
            if (!popup) return;
            
            // Remove active class from all thumbnails in this popup
            const thumbsInPopup = popup.querySelectorAll('.popup-gallery-thumbs img');
            thumbsInPopup.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const mainImage = popup.querySelector('.popup-gallery-main img');
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
        });
    });
}

// Handle keyboard navigation for popups
document.addEventListener('keydown', function(e) {
    // ESC key to close popup
    if (e.key === 'Escape') {
        closeAllPopups();
        
        // Also close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
});

// Typing effect (only on home page)
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    if (!typedTextElement) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove a character
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40; // Faster when deleting
    } else {
        // Add a character
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120; // Slower when typing
    }
    
    // If word is complete, start deleting after a pause
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500; // Longer pause at the end of a word
    } 
    // If word is deleted, move to the next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before starting the next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Animate skill bars (only on about page)
function animateSkillBars() {
    if (!skillBars.length) return;
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Image Carousel functions
function initCarousel() {
    if (!carouselTrack) return;
    
    let currentSlide = 0;
    const slidesCount = carouselSlides.length;
    
    // Create dots
    if (carouselDots) {
        for (let i = 0; i < slidesCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            carouselDots.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }
    }
    
    // Set initial position
    updateCarousel();
    
    // Next and previous buttons
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slidesCount;
            updateCarousel();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
            updateCarousel();
        });
    }
    
    // Auto advance slides
    let intervalId = setInterval(() => {
        currentSlide = (currentSlide + 1) % slidesCount;
        updateCarousel();
    }, 5000);
    
    // Pause auto advance on hover
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
            currentSlide = (currentSlide + 1) % slidesCount;
            updateCarousel();
        }, 5000);
    });
    
    // Update carousel position and active dot
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Touch and swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Left swipe
        if (touchEndX < touchStartX - 50) {
            currentSlide = (currentSlide + 1) % slidesCount;
            updateCarousel();
        }
        // Right swipe
        if (touchEndX > touchStartX + 50) {
            currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
            updateCarousel();
        }
    }
}

// Form submission (only on contact page)
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message (for demo)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset the form
        this.reset();
    });
}

// Handle viewport changes
function handleViewportChanges() {
    // Get viewport width and height
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Adjust home section height for small devices in landscape mode
    const homeSection = document.getElementById('home');
    if (homeSection) {
        if (vw > vh && vh < 500) { // Landscape on small devices
            homeSection.style.height = 'auto';
            homeSection.style.minHeight = 'calc(100vh - 70px)';
            homeSection.style.padding = '50px 0';
        } else {
            homeSection.style.height = 'calc(100vh - 70px)';
            homeSection.style.padding = '0';
        }
    }
}

// Page-specific initialization
window.addEventListener('load', () => {
    // Make sure the section is displayed
    if (section) {
        section.classList.add('active');
    }
    
    // Start typing effect on home page
    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }
    
    // Animate skill bars on about page
    if (document.getElementById('about')) {
        setTimeout(animateSkillBars, 300);
        
        // Initialize carousel if it exists
        initCarousel();
    }
    
    // Handle initial viewport settings
    handleViewportChanges();
});

// Listen for resize events to handle viewport changes
window.addEventListener('resize', handleViewportChanges);

// Handle orientation changes for mobile devices
window.addEventListener('orientationchange', handleViewportChanges);
