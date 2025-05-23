// Metrics page specific functionality
document.addEventListener('DOMContentLoaded', function () {
    initMetricsFiltering();
    initMetricsAnimations();
});

// Initialize filtering functionality
function initMetricsFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const metricCards = document.querySelectorAll('.metric-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            filterCards(filter, metricCards);
        });
    });
}

// Filter cards with animation
function filterCards(filter, cards) {
    cards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
            // Show card with staggered animation
            setTimeout(() => {
                card.classList.remove('hidden');
                card.classList.add('visible');
                card.style.display = 'block';
            }, index * 50);
        } else {
            // Hide card
            card.classList.add('hidden');
            card.classList.remove('visible');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Initialize metrics-specific animations
function initMetricsAnimations() {
    // Enhanced card hover effects
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        // Add shimmer effect on hover
        card.addEventListener('mouseenter', function () {
            const teamBadge = card.querySelector('.team-badge');
            if (teamBadge) {
                teamBadge.style.transform = 'scale(1.05)';
                teamBadge.style.boxShadow = '0 6px 20px rgba(30, 215, 154, 0.4)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const teamBadge = card.querySelector('.team-badge');
            if (teamBadge) {
                teamBadge.style.transform = 'scale(1)';
                teamBadge.style.boxShadow = '0 4px 15px rgba(30, 215, 154, 0.2)';
            }
        });

        // Add click interaction
        card.addEventListener('click', function () {
            // Create expanding circle effect
            const rect = card.getBoundingClientRect();
            const circle = document.createElement('div');
            const size = Math.max(rect.width, rect.height) * 1.5;

            circle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: ${size}px;
                height: ${size}px;
                margin-left: ${-size / 2}px;
                margin-top: ${-size / 2}px;
                border-radius: 50%;
                background: rgba(159, 255, 224, 0.1);
                pointer-events: none;
                transform: scale(0);
                animation: expandCircle 0.6s ease-out;
                z-index: 1;
            `;

            card.style.position = 'relative';
            card.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        });
    });

    // Intersection Observer for cards animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    metricCards.forEach(card => {
        observer.observe(card);
    });

    // Filter buttons hover effect
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(30, 215, 154, 0.3)';
            }
        });

        button.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(13, 183, 175, 0.2)';
            }
        });
    });
}

// Add CSS animations dynamically
const metricsStyle = document.createElement('style');
metricsStyle.textContent = `
    @keyframes expandCircle {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes cardPulse {
        0%, 100% {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        50% {
            box-shadow: 0 25px 50px rgba(30, 215, 154, 0.3);
        }
    }
    
    .metric-card.pulse {
        animation: cardPulse 2s ease-in-out infinite;
    }
    
    .metric-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .filter-btn {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(metricsStyle);

// Utility function to count visible cards
function countVisibleCards() {
    const visibleCards = document.querySelectorAll('.metric-card.visible').length;
    console.log(`Showing ${visibleCards} metrics`);
    return visibleCards;
}

// Utility function to highlight cards by priority
function highlightCriticalMetrics() {
    const criticalCards = document.querySelectorAll('.metric-card');
    criticalCards.forEach(card => {
        const priority = card.querySelector('.metric-priority');
        if (priority && priority.textContent.includes('Critical')) {
            card.classList.add('pulse');
        }
    });
}

// Auto-highlight critical metrics after 3 seconds
setTimeout(highlightCriticalMetrics, 3000);

// Search functionality (if needed in the future)
function searchMetrics(searchTerm) {
    const cards = document.querySelectorAll('.metric-card');
    const term = searchTerm.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.metric-description').textContent.toLowerCase();
        const team = card.querySelector('.team-badge').textContent.toLowerCase();

        const matches = title.includes(term) || description.includes(term) || team.includes(term);

        if (matches) {
            card.style.display = 'block';
            card.classList.add('visible');
            card.classList.remove('hidden');
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });
}

// Make search function globally available
window.searchBloatnetMetrics = searchMetrics; 