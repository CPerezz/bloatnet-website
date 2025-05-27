// Initialize all interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initScrollEffects();
    initCardHoverEffects();
    initEmojiCycling();
    initParticleAnimation();
    initScrollArrow();
    initFindings();
    initHamburgerMenu();

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

// Progress Bar Animation - State Size Milestones
function initProgressBar() {
    const currentProgress = document.querySelector('.current-progress');
    const findingPoints = document.querySelectorAll('.finding-point');

    if (currentProgress) {
        // Animate the current progress bar on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        // Animate to the current state (10% as example - 650GB)
                        currentProgress.style.width = '10%';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(currentProgress.closest('.progress-section'));
    }

    // Handle finding point interactions
    findingPoints.forEach(findingPoint => {
        // Add click functionality to toggle active state
        findingPoint.addEventListener('click', function (e) {
            e.stopPropagation();

            // Close other active findings
            findingPoints.forEach(point => {
                if (point !== this) {
                    point.classList.remove('active');
                }
            });

            // Toggle this finding
            this.classList.toggle('active');
        });

        // Add hover sound effect (optional enhancement)
        findingPoint.addEventListener('mouseenter', function () {
            const marker = this.querySelector('.finding-marker');
            if (marker) {
                marker.style.transform = 'scale(1.1)';
            }
        });

        findingPoint.addEventListener('mouseleave', function () {
            const marker = this.querySelector('.finding-marker');
            if (marker) {
                marker.style.transform = 'scale(1)';
            }
        });
    });

    // Close finding details when clicking elsewhere
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.finding-point')) {
            findingPoints.forEach(point => {
                point.classList.remove('active');
            });
        }
    });
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
            // Add clicked class for emoji animation
            card.classList.add('clicked');
            setTimeout(() => card.classList.remove('clicked'), 600);

            // Create sparkle effects
            createSparkles(card, e);

            // Ripple effect
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

            // Toggle expanded state for persistent scrolling
            card.classList.toggle('expanded');
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

// Create sparkle effects on click
function createSparkles(card, clickEvent) {
    const rect = card.getBoundingClientRect();
    const clickX = clickEvent.clientX - rect.left;
    const clickY = clickEvent.clientY - rect.top;

    // Create multiple sparkles
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'card-sparkle animate';

        // Random position around click point
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 80;

        sparkle.style.left = (clickX + offsetX) + 'px';
        sparkle.style.top = (clickY + offsetY) + 'px';

        // Delay sparkles slightly
        sparkle.style.animationDelay = (i * 0.1) + 's';

        card.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1500 + (i * 100));
    }
}

// Add emoji cycling on double-click
function initEmojiCycling() {
    const cards = document.querySelectorAll('.objective-card');

    const emojiSets = {
        '1': ['🕵️', '🔍', '🔎', '👁️', '🎯'],
        '2': ['📈', '📊', '💹', '🌱', '🎢'],
        '3': ['🚧', '⚠️', '🛠️', '👷', '🔧']
    };

    cards.forEach(card => {
        const cardNumber = card.getAttribute('data-number');
        const emoji = card.querySelector('.card-emoji');
        let currentEmojiIndex = 0;

        if (emoji && emojiSets[cardNumber]) {
            let clickCount = 0;
            let clickTimer;

            card.addEventListener('click', function () {
                clickCount++;

                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 300);
                } else if (clickCount === 2) {
                    clearTimeout(clickTimer);
                    clickCount = 0;

                    // Cycle emoji
                    currentEmojiIndex = (currentEmojiIndex + 1) % emojiSets[cardNumber].length;
                    emoji.textContent = emojiSets[cardNumber][currentEmojiIndex];

                    // Add extra spectacular animation for emoji change
                    emoji.style.transform = 'scale(1.5) rotate(1080deg)';
                    emoji.style.filter = 'drop-shadow(0 15px 30px rgba(255, 255, 255, 0.8)) brightness(1.3)';
                    emoji.style.textShadow = '0 0 40px rgba(255, 255, 255, 1)';

                    setTimeout(() => {
                        emoji.style.transform = 'scale(1.1) rotate(360deg)';
                        emoji.style.filter = 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4))';
                        emoji.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
                    }, 600);
                }
            });
        }
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

// Findings dropdown toggle function
function toggleFindings() {
    const findingsSection = document.querySelector('.findings-section');
    const findingsContent = document.getElementById('findingsContent');

    if (findingsSection) {
        findingsSection.classList.toggle('expanded');

        // Add slight delay for smooth animation
        if (findingsSection.classList.contains('expanded')) {
            // Opening animation
            setTimeout(() => {
                findingsContent.style.maxHeight = findingsContent.scrollHeight + 'px';
            }, 10);
        } else {
            // Closing animation
            findingsContent.style.maxHeight = '0px';
        }
    }
}

// Auto-expand findings section when a finding point is clicked
function connectFindingPointToCards() {
    const findingPoints = document.querySelectorAll('.finding-point');
    const findingsSection = document.querySelector('.findings-section');

    findingPoints.forEach(findingPoint => {
        findingPoint.addEventListener('click', function () {
            // Auto-expand findings section if not already expanded
            if (!findingsSection.classList.contains('expanded')) {
                toggleFindings();
            }

            // Highlight corresponding card
            const position = this.getAttribute('data-position') || this.style.left;
            const correspondingCard = document.querySelector(`.finding-card[data-position="${position}"]`);

            if (correspondingCard) {
                // Remove highlight from other cards
                document.querySelectorAll('.finding-card').forEach(card => {
                    card.classList.remove('highlighted');
                });

                // Highlight the corresponding card
                correspondingCard.classList.add('highlighted');

                // Scroll to the card
                setTimeout(() => {
                    correspondingCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 400);
            }
        });
    });
}

// Initialize findings functionality
function initFindings() {
    connectFindingPointToCards();
    initFindingFilters();

    // Make toggleFindings function globally available
    window.toggleFindings = toggleFindings;
    window.clearAllFilters = clearAllFilters;
    window.showAllFindings = showAllFindings;
}

// Initialize finding filters
function initFindingFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            toggleFilter(filter, this);
        });
    });
}

// Toggle individual filter
function toggleFilter(filter, buttonElement) {
    const isActive = buttonElement.classList.contains('active');

    if (isActive) {
        // Remove filter
        buttonElement.classList.remove('active');
    } else {
        // Add filter
        buttonElement.classList.add('active');
    }

    applyFilters();
}

// Apply all active filters
function applyFilters() {
    const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active[data-filter]'))
        .map(btn => btn.getAttribute('data-filter'));

    const findingCards = document.querySelectorAll('.finding-card:not(.placeholder)');

    findingCards.forEach(card => {
        const cardLabels = card.getAttribute('data-labels');

        if (!cardLabels) {
            card.classList.add('hidden');
            return;
        }

        const cardLabelsArray = cardLabels.split(',').map(label => label.trim());

        if (activeFilters.length === 0) {
            // No filters active, show all cards
            card.classList.remove('hidden');
        } else {
            // Check if card matches any active filter
            const hasMatchingFilter = activeFilters.some(filter =>
                cardLabelsArray.includes(filter)
            );

            if (hasMatchingFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });

    updateFilterCounts();
}

// Update the findings count in the header
function updateFilterCounts() {
    const visibleCards = document.querySelectorAll('.finding-card:not(.placeholder):not(.hidden)').length;
    const findingsCount = document.querySelector('.findings-count');

    if (findingsCount) {
        findingsCount.textContent = `(${visibleCards})`;
    }
}

// Clear all filters
function clearAllFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');

    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    applyFilters();
}

// Show all findings
function showAllFindings() {
    clearAllFilters();

    // Ensure findings section is expanded
    const findingsSection = document.querySelector('.findings-section');
    if (findingsSection && !findingsSection.classList.contains('expanded')) {
        toggleFindings();
    }
}

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links .nav-link');

    if (!hamburger || !mobileMenu) return;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMobileMenu);

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on overlay
    mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}