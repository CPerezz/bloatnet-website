// Initialize all interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initScrollEffects();
    initCardHoverEffects();
    initParticleAnimation();
    initScrollArrow();

    // Backup scroll arrow functionality - wait for DOM to be fully ready
    setTimeout(() => {
        const scrollArrow = document.querySelector('.scroll-arrow');
        const arrowContainer = document.querySelector('.arrow-container');
        const arrowText = document.querySelector('.arrow-text');
        const arrowIcon = document.querySelector('.arrow-icon');

        // Add backup listeners to multiple elements
        [scrollArrow, arrowContainer, arrowText, arrowIcon].forEach(element => {
            if (element) {
                element.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Find and scroll to progress section
                    const progressSection = document.querySelector('.progress-section');
                    if (progressSection) {
                        progressSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        window.scrollTo({
                            top: window.innerHeight - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }, 500);
});

// Progress Bar Animation
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const milestone = document.querySelector('.milestone');

    if (progressFill && milestone) {
        // Set progress percentage from data attribute
        const targetProgress = parseInt(progressFill.getAttribute('data-progress')) || 20;
        const milestonePosition = parseInt(milestone.getAttribute('data-position')) || 20;

        // Position milestone
        milestone.style.left = milestonePosition + '%';

        // Animate progress bar on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressFill.style.width = targetProgress + '%';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressFill.closest('.progress-section'));
    }
}

// Scroll Effects
function initScrollEffects() {
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Update navbar opacity
        if (scrolled > 50) {
            navbar.style.background = 'rgba(13, 183, 175, 0.98)';
        } else {
            navbar.style.background = 'rgba(13, 183, 175, 0.95)';
        }
    });

    // Parallax effect for hero elements
    const heroImage = document.querySelector('.hero-main-image');
    const floatingParticles = document.querySelector('.floating-particles');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const particleRate = scrolled * 0.1;

        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }

        if (floatingParticles) {
            floatingParticles.style.transform = `translateY(${particleRate}px)`;
        }
    });

    // Fade in animation for sections
    const sections = document.querySelectorAll('section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(section);
    });
}

// Enhanced Card Hover Effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.objective-card');

    cards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(159, 255, 224, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';

            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Enhanced hover animations
        card.addEventListener('mouseenter', function () {
            const cardNumber = card.querySelector('.card-number');
            if (cardNumber) {
                cardNumber.style.transform = 'scale(1.1) rotate(5deg)';
                cardNumber.style.background = 'rgba(159, 255, 224, 0.2)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const cardNumber = card.querySelector('.card-number');
            if (cardNumber) {
                cardNumber.style.transform = 'scale(1) rotate(0deg)';
                cardNumber.style.background = 'rgba(159, 255, 224, 0.1)';
            }
        });
    });
}

// Dynamic Particle Animation
function initParticleAnimation() {
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        // Create additional floating elements
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'dynamic-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(159, 255, 224, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatUpDown ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroBackground.appendChild(particle);
        }
    }
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes floatUpDown {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-5px);
        }
        75% {
            transform: translateY(-20px) translateX(-10px);
        }
    }
    
    .dynamic-particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update progress bar function (can be called externally)
function updateProgress(percentage, milestoneText = null, milestonePosition = null) {
    const progressFill = document.querySelector('.progress-fill');
    const milestone = document.querySelector('.milestone');
    const milestoneContent = document.querySelector('.milestone-content p');

    if (progressFill) {
        progressFill.style.width = percentage + '%';
        progressFill.setAttribute('data-progress', percentage);
    }

    if (milestone && milestonePosition !== null) {
        milestone.style.left = milestonePosition + '%';
        milestone.setAttribute('data-position', milestonePosition);
    }

    if (milestoneContent && milestoneText) {
        milestoneContent.textContent = milestoneText;
    }
}

// Make update function globally available
window.updateBloatnetProgress = updateProgress;

// Scroll Arrow Functionality
function initScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (scrollArrow) {
        scrollArrow.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Try multiple ways to find the progress section
            let progressSection = document.querySelector('.progress-section');

            if (!progressSection) {
                // Try finding by the h2 text
                const h2Elements = document.querySelectorAll('h2');
                for (let h2 of h2Elements) {
                    if (h2.textContent.includes('Initiative Progress')) {
                        progressSection = h2.closest('section');
                        break;
                    }
                }
            }

            if (progressSection) {
                // Add click effect
                const arrowContainer = scrollArrow.querySelector('.arrow-container');
                if (arrowContainer) {
                    arrowContainer.style.transform = 'scale(0.95)';
                    arrowContainer.style.transition = 'transform 0.1s ease';
                }

                setTimeout(() => {
                    if (arrowContainer) {
                        arrowContainer.style.transform = 'scale(1)';
                    }

                    // Try multiple scroll methods
                    try {
                        // Method 1: scrollIntoView
                        progressSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } catch (error) {
                        // Method 2: window.scrollTo
                        const targetPosition = progressSection.offsetTop - 80;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }

                }, 100);
            } else {
                // Fallback: scroll down by a fixed amount
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });

        // Make sure the arrow is clickable
        scrollArrow.style.cursor = 'pointer';
        scrollArrow.style.pointerEvents = 'auto';
        scrollArrow.style.zIndex = '1000';

        // Optional: Auto-fade scroll arrow when user scrolls to progress section
        window.addEventListener('scroll', () => {
            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                const progressSectionTop = progressSection.offsetTop - 200;
                const scrolled = window.pageYOffset;

                if (scrolled > progressSectionTop) {
                    scrollArrow.style.opacity = '0.3';
                } else {
                    scrollArrow.style.opacity = '1';
                }
            }
        });
    }
} 