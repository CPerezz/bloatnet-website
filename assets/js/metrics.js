// Metrics page functionality with enhanced features
document.addEventListener('DOMContentLoaded', function () {
    initMetricsPage();
});

function initMetricsPage() {
    // Initialize DataRenderer and load metrics
    initDataRenderer();

    initTitleAnimations();
    initMetricsFiltering();
    initSeeMoreFunctionality();
    initInteractiveHeader();
    initEmbeddedFormLoader();
    initMetricsAnimations();
    initMetricCardDropdowns();

    // Initialize collision system after shapes are loaded
    setTimeout(() => {
        initEthereumCollisionSystem();
    }, 1000);
}

// Initialize DataRenderer and load metrics
async function initDataRenderer() {
    try {
        if (window.dataRenderer) {
            await window.dataRenderer.init();
            if (window.dataRenderer.initialized) {
                window.dataRenderer.renderMetrics();

                // Re-initialize dropdown functionality for dynamically added cards
                setTimeout(() => {
                    initMetricCardDropdowns();
                }, 100);
            }
        } else {
            // Fallback: try to create DataRenderer if not available
            const dataRenderer = new DataRenderer();
            await dataRenderer.init();
            if (dataRenderer.initialized) {
                dataRenderer.renderMetrics();
                setTimeout(() => {
                    initMetricCardDropdowns();
                }, 100);
            }
            window.dataRenderer = dataRenderer;
        }
    } catch (error) {
        console.error('Failed to initialize DataRenderer for metrics:', error);
    }
}

// Title animation effects
function initTitleAnimations() {
    const title = document.querySelector('.animated-title');
    const subtitle = document.querySelector('.animated-subtitle');

    // Add entrance animations (CSS handles the animations, this adds interaction)
    if (title) {
        title.addEventListener('animationend', () => {
            title.classList.add('animation-complete');
        });
    }

    if (subtitle) {
        subtitle.addEventListener('animationend', () => {
            subtitle.classList.add('animation-complete');
        });
    }
}

// Interactive header functionality
function initInteractiveHeader() {
    const header = document.querySelector('.metrics-header');
    const collaborationOverlay = document.querySelector('.collaboration-overlay');

    if (header && collaborationOverlay) {
        // Click to scroll to form
        header.addEventListener('click', function () {
            const formSection = document.querySelector('.request-metric-section');
            if (formSection) {
                // Add click feedback
                collaborationOverlay.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    collaborationOverlay.style.transform = 'scale(1)';
                }, 150);

                // Smooth scroll to form
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add emphasis to form after scroll
                setTimeout(() => {
                    const formContainer = document.querySelector('.request-form-container');
                    if (formContainer) {
                        formContainer.style.transform = 'scale(1.02)';
                        formContainer.style.boxShadow = '0 20px 60px rgba(30, 215, 154, 0.3)';

                        setTimeout(() => {
                            formContainer.style.transform = 'scale(1)';
                            formContainer.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
                        }, 1000);
                    }
                }, 800);
            }
        });

        // Add keyboard accessibility
        header.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });

        // Make header focusable
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-label', 'Click to navigate to metric request form');
    }
}

// Embedded form loader functionality
function initEmbeddedFormLoader() {
    const iframe = document.querySelector('.embedded-form-container iframe');
    const loadingOverlay = document.querySelector('.form-loading-overlay');

    if (iframe && loadingOverlay) {
        // Create global function for iframe onload
        window.hideFormLoader = function () {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                loadingOverlay.style.transform = 'scale(0.9)';
                iframe.classList.add('loaded');

                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000); // Small delay to ensure form is fully loaded
        };

        // Fallback timeout in case onload doesn't fire
        setTimeout(() => {
            if (loadingOverlay.style.display !== 'none') {
                window.hideFormLoader();
            }
        }, 5000);

        // Add loading animation enhancement
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            // Add random color shifts to the spinner
            setInterval(() => {
                const hue = Math.random() * 60 + 120; // Green range
                spinner.style.borderTopColor = `hsl(${hue}, 70%, 50%)`;
            }, 1000);
        }
    }
}

// See More functionality
function initSeeMoreFunctionality() {
    const seeMoreBtn = document.getElementById('see-more-btn');
    let isLoading = false;

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function () {
            if (isLoading) return;

            isLoading = true;
            seeMoreBtn.classList.add('loading');
            seeMoreBtn.disabled = true;

            // Show loading state
            const btnText = seeMoreBtn.querySelector('.see-more-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Loading...';

            // Simulate loading delay for better UX
            setTimeout(() => {
                showMoreMetrics();

                // Update button state
                isLoading = false;
                seeMoreBtn.classList.remove('loading');
                seeMoreBtn.disabled = false;

                // Check if all cards are shown
                const hiddenCards = document.querySelectorAll('.loadmore-card[style*="display: none"]');
                if (hiddenCards.length === 0) {
                    seeMoreBtn.style.display = 'none';
                } else {
                    btnText.textContent = originalText;
                }
            }, 800);
        });
    }
}

function showMoreMetrics() {
    // Get all currently hidden loadmore cards
    const hiddenCards = Array.from(document.querySelectorAll('.loadmore-card')).filter(card =>
        card.style.display === 'none' || getComputedStyle(card).display === 'none'
    );

    // Show up to 6 more cards
    const cardsToShow = hiddenCards.slice(0, 6);

    // Simple entrance sequence

    cardsToShow.forEach((card, index) => {
        setTimeout(() => {
            // Show card with simple fade in
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            // Simple fade in animation
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Removed flashy loading animations

// Metric card dropdown functionality with enhanced flashy animations
function initMetricCardDropdowns() {
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent event bubbling
            e.stopPropagation();

            // Toggle expanded state
            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                // Simple collapse
                card.classList.remove('expanded');
            } else {
                // Close other expanded cards
                metricCards.forEach((otherCard) => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                    }
                });

                // Expand this card
                card.classList.add('expanded');
            }
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        // Update aria-expanded when state changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isExpanded = card.classList.contains('expanded');
                    card.setAttribute('aria-expanded', isExpanded);
                }
            });
        });

        observer.observe(card, { attributes: true });
    });
}

// Removed flashy animation functions

// Updated filtering functionality
function initMetricsFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards (including both initial and loadmore cards)
            filterCards(filter);
        });
    });
}

function filterCards(filter) {
    const allCards = document.querySelectorAll('.metric-card');

    allCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const requesterBadges = card.querySelectorAll('.requester-badge');

        let shouldShow = filter === 'all';

        if (!shouldShow) {
            // Check if filter matches category
            if (category === filter) {
                shouldShow = true;
            }

            // Check if filter matches any requester badge
            requesterBadges.forEach(badge => {
                const badgeText = badge.textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
                if (badgeText === filter) {
                    shouldShow = true;
                }
            });
        }

        if (shouldShow) {
            // Show card with staggered animation
            setTimeout(() => {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';

                setTimeout(() => {
                    card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            }, index * 100);
        } else {
            // Hide card
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px) scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Update see more button visibility based on filter
    updateSeeMoreButton(filter);
}

function updateSeeMoreButton(filter) {
    const seeMoreBtn = document.getElementById('see-more-btn');
    const loadMoreCards = document.querySelectorAll('.loadmore-card');

    if (filter === 'all') {
        // Check if there are hidden cards to show
        const hiddenCards = Array.from(loadMoreCards).filter(card =>
            card.style.display === 'none'
        );
        seeMoreBtn.style.display = hiddenCards.length > 0 ? 'flex' : 'none';
    } else {
        // Hide see more button when filtering
        seeMoreBtn.style.display = 'none';
    }
}

// Enhanced animations and interactions
function initMetricsAnimations() {
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function () {
            const requesterBadge = card.querySelector('.requester-badge');
            if (requesterBadge) {
                requesterBadge.style.transform = 'scale(1.05)';
                requesterBadge.style.boxShadow = '0 6px 20px rgba(30, 215, 154, 0.4)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const requesterBadge = card.querySelector('.requester-badge');
            if (requesterBadge) {
                requesterBadge.style.transform = 'scale(1)';
                requesterBadge.style.boxShadow = '0 4px 15px rgba(30, 215, 154, 0.2)';
            }
        });

        // Click interaction with ripple effect
        card.addEventListener('click', function (e) {
            createRippleEffect(e, card);
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    metricCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // Add parallax effect to header particles
    initParallaxParticles();
}

function initParallaxParticles() {
    const particles = document.querySelectorAll('.particle');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.2;
            particle.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Removed ripple effect function

// Global functions for external access
window.searchBloatnetMetrics = function (searchTerm) {
    const cards = document.querySelectorAll('.metric-card');
    const term = searchTerm.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.metric-description').textContent.toLowerCase();
        const requester = card.querySelector('.requester-badge').textContent.toLowerCase();

        const matches = title.includes(term) || description.includes(term) || requester.includes(term);

        if (matches || term === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px) scale(0.8)';
            setTimeout(() => {
                if (card.style.opacity === '0') {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
};

// Utility function to scroll to form (can be called externally)
window.scrollToBloatnetForm = function () {
    const formSection = document.querySelector('.request-metric-section');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add dynamic CSS for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .metric-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .see-more-btn.loading .see-more-arrow {
        animation: loadingPulse 1s infinite;
    }
    
    @keyframes loadingPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .metrics-header:focus {
        outline: 2px solid #1ed79a;
        outline-offset: 4px;
    }
    
    .metrics-header:focus:not(:focus-visible) {
        outline: none;
    }
    
    .request-form-container {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

document.head.appendChild(dynamicStyles);

// Ethereum Shape Collision Detection System
function initEthereumCollisionSystem() {
    const shapes = document.querySelectorAll('.ethereum-shape');
    const collisionDistance = 120; // Distance threshold for collision
    const collisionCooldown = 2000; // Cooldown period in milliseconds
    const collisionTracker = new Map();

    // Initialize collision tracker
    shapes.forEach((shape, index) => {
        collisionTracker.set(index, {
            lastCollision: 0,
            element: shape
        });
    });

    function getShapePosition(shape) {
        const rect = shape.getBoundingClientRect();
        const containerRect = shape.closest('.metrics-header').getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
            element: shape
        };
    }

    function calculateDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function triggerCollisionEffect(shape1, shape2) {
        const now = Date.now();
        const effects = ['collision-glow', 'collision-pulse', 'collision-rainbow'];

        // Random effect selection
        const effect1 = effects[Math.floor(Math.random() * effects.length)];
        const effect2 = effects[Math.floor(Math.random() * effects.length)];

        // Apply effects
        shape1.classList.add(effect1);
        shape2.classList.add(effect2);

        // Create collision particles
        createCollisionParticles(getShapePosition(shape1), getShapePosition(shape2));

        // Remove effects after animation
        setTimeout(() => {
            shape1.classList.remove(effect1);
            shape2.classList.remove(effect2);
        }, 1000);

        // Play collision sound (optional - can be uncommented if you add audio)
        // playCollisionSound();
    }

    function createCollisionParticles(pos1, pos2) {
        const midPoint = {
            x: (pos1.x + pos2.x) / 2,
            y: (pos1.y + pos2.y) / 2
        };

        const container = document.querySelector('.metrics-header');
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'collision-particle';

            const angle = (i / particleCount) * 2 * Math.PI;
            const velocity = 150 + Math.random() * 100;
            const endX = midPoint.x + Math.cos(angle) * velocity;
            const endY = midPoint.y + Math.sin(angle) * velocity;

            particle.style.cssText = `
                position: absolute;
                left: ${midPoint.x}px;
                top: ${midPoint.y}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #FFD700, #FF6B35);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 15px #FFD700;
                animation: particleExplosion 0.8s ease-out forwards;
                transform: translate(-50%, -50%);
            `;

            // Add CSS keyframes for particle animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes particleExplosion {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${endX - midPoint.x}px, ${endY - midPoint.y}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 800);
        }
    }

    function checkCollisions() {
        const now = Date.now();
        const positions = Array.from(shapes).map(getShapePosition);

        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const distance = calculateDistance(positions[i], positions[j]);

                if (distance < collisionDistance) {
                    const shape1Data = collisionTracker.get(i);
                    const shape2Data = collisionTracker.get(j);

                    // Check cooldown period
                    if (now - shape1Data.lastCollision > collisionCooldown &&
                        now - shape2Data.lastCollision > collisionCooldown) {

                        triggerCollisionEffect(positions[i].element, positions[j].element);

                        // Update last collision time
                        shape1Data.lastCollision = now;
                        shape2Data.lastCollision = now;
                    }
                }
            }
        }
    }

    // Run collision detection at 60fps
    setInterval(checkCollisions, 16);
}

// Optional: Add collision sound effect
function playCollisionSound() {
    // Create audio context for web audio API
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();

        // Create a simple collision sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
} 