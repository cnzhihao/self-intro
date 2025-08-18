// Device Detection Function
function isMobileDevice() {
    // Check for mobile user agents
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
    
    // Check for touch capability and screen size
    const hasTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isSmallScreen = window.innerWidth <= 768;
    
    // Consider it mobile if it matches user agent OR has touch + small screen
    return isMobileUserAgent || (hasTouchScreen && isSmallScreen);
}

// Mobile Print Warning Modal Functions
function showMobilePrintWarning() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('mobilePrintWarning');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'mobilePrintWarning';
        modal.className = 'mobile-print-modal';
        modal.innerHTML = `
            <div class="mobile-print-modal-content">
                <div class="mobile-print-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                </div>
                <h3>打印提示</h3>
                <p>为获得最佳打印效果，建议您在电脑端打开此页面进行打印。</p>
                <div class="mobile-print-modal-buttons">
                    <button class="mobile-print-btn-close" onclick="closeMobilePrintWarning()">知道了</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeMobilePrintWarning();
    }, 3000);
}

function closeMobilePrintWarning() {
    const modal = document.getElementById('mobilePrintWarning');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Print Resume Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const printResumeBtn = document.getElementById('print-resume-btn');
    
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if it's a mobile device
            if (isMobileDevice()) {
                // Add active animation class for mobile
                this.style.transform = 'translateY(0) scale(0.95)';
                this.style.opacity = '0.8';
                
                // Reset animation and show mobile warning
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                    showMobilePrintWarning();
                }, 150);
            } else {
                // Normal desktop print behavior
                this.style.transform = 'translateY(0) scale(0.95)';
                this.style.opacity = '0.8';
                
                // Reset animation after short delay
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 150);
                
                // Trigger print functionality after animation
                setTimeout(() => {
                    printResumePage();
                }, 200);
            }
        });
        
        // Add keyboard support for accessibility
        printResumeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});

// Print Resume Page Function
function printResumePage() {
    // Create a hidden iframe to load the print page
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.left = '-9999px';
    printFrame.style.top = '-9999px';
    printFrame.style.width = '1px';
    printFrame.style.height = '1px';
    printFrame.style.visibility = 'hidden';
    
    // Add the iframe to the document
    document.body.appendChild(printFrame);
    
    // Load the print page
    printFrame.src = 'print.html';
    
    // Wait for the iframe to load, then trigger print
    printFrame.onload = function() {
        try {
            // Focus the iframe
            printFrame.contentWindow.focus();
            
            // Trigger print dialog
            printFrame.contentWindow.print();
            
            // Clean up - remove iframe after print dialog
            setTimeout(() => {
                if (document.body.contains(printFrame)) {
                    document.body.removeChild(printFrame);
                }
            }, 1000);
            
        } catch (error) {
            console.error('Print error:', error);
            // Fallback: open in new window if iframe method fails
            window.open('print.html', '_blank');
            
            // Clean up iframe
            if (document.body.contains(printFrame)) {
                document.body.removeChild(printFrame);
            }
        }
    };
    
    // Handle load error
    printFrame.onerror = function() {
        console.error('Failed to load print page');
        // Fallback: open in new window
        window.open('print.html', '_blank');
        
        // Clean up iframe
        if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
        }
    };
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.section, .project, .activity, .skill-category, .certification-item, .education-item');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// External Links Security
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure security attributes are set
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Add hover effect to project and activity cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project, .activity, .skill-category, .certification-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
}, 16); // ~60fps

// Replace the existing scroll event listener with the throttled version
window.addEventListener('scroll', throttledScrollHandler);

// Image Modal Functions - Use function declarations for hoisting
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        
        // Try to get alt text from the source image
        const sourceImg = document.querySelector(`img[src="${imageSrc}"]`);
        if (sourceImg) {
            modalImg.alt = sourceImg.alt;
        }
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeImageModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeImageModal();
            }
        });
    }
    
    // Add click event listeners to image items as backup
    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                openImageModal(img.src);
            }
        });
    });
});