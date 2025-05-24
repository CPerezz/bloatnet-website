// Attack Vectors Interactive Table JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initializeAttackTable();
});

function initializeAttackTable() {
    const attackRows = document.querySelectorAll('.attack-row');

    attackRows.forEach(row => {
        const attackId = row.getAttribute('data-attack-id');
        const detailsRow = document.querySelector(`.attack-details[data-attack-id="${attackId}"]`);
        const expandIcon = row.querySelector('.expand-icon');

        // Click event to toggle details
        row.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAttackDetails(row, detailsRow, expandIcon);
        });

        // Hover events for subtle feedback
        row.addEventListener('mouseenter', () => {
            if (!row.classList.contains('expanded')) {
                expandIcon.style.transform = 'scale(1.1)';
            }
        });

        row.addEventListener('mouseleave', () => {
            if (!row.classList.contains('expanded')) {
                expandIcon.style.transform = 'scale(1)';
            }
        });

        // Keyboard accessibility
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAttackDetails(row, detailsRow, expandIcon);
            }
        });

        // Make rows focusable for keyboard navigation
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.setAttribute('aria-expanded', 'false');
        row.setAttribute('aria-label', `Expand details for attack ${attackId}`);
    });

    // Initialize animations after a short delay
    setTimeout(() => {
        addTableEntranceAnimations();
    }, 100);
}

function toggleAttackDetails(row, detailsRow, expandIcon) {
    const isExpanded = row.classList.contains('expanded');

    // Close all other expanded rows first
    closeAllDetails();

    if (!isExpanded) {
        // Expand this row
        row.classList.add('expanded');
        detailsRow.classList.add('show');
        row.setAttribute('aria-expanded', 'true');

        // Add smooth scroll to bring details into view
        setTimeout(() => {
            detailsRow.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }, 100);

        // Animate the details content
        animateDetailsContent(detailsRow);
    }
}

function closeAllDetails() {
    const allRows = document.querySelectorAll('.attack-row');
    const allDetails = document.querySelectorAll('.attack-details');

    allRows.forEach(row => {
        row.classList.remove('expanded');
        row.setAttribute('aria-expanded', 'false');
    });

    allDetails.forEach(detail => {
        detail.classList.remove('show');
    });
}

function animateDetailsContent(detailsRow) {
    const content = detailsRow.querySelector('.details-content');
    const detailItems = content.querySelectorAll('.detail-item');

    // Animate each detail item with a stagger effect
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function addTableEntranceAnimations() {
    const tableWrapper = document.querySelector('.attacks-table-wrapper');
    const analysisCards = document.querySelectorAll('.analysis-card');

    // Animate table entrance
    if (tableWrapper) {
        tableWrapper.style.opacity = '0';
        tableWrapper.style.transform = 'translateY(30px)';

        setTimeout(() => {
            tableWrapper.style.transition = 'all 0.6s ease';
            tableWrapper.style.opacity = '1';
            tableWrapper.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animate analysis cards
    analysisCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 150));
    });
}

// Search/filter functionality (for future enhancement)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search attack vectors...';
    searchInput.className = 'attack-search';

    const tableContainer = document.querySelector('.table-container');
    const tableWrapper = document.querySelector('.attacks-table-wrapper');

    if (tableContainer && tableWrapper) {
        tableContainer.insertBefore(searchInput, tableWrapper);

        searchInput.addEventListener('input', (e) => {
            filterAttacks(e.target.value);
        });
    }
}

function filterAttacks(searchTerm) {
    const attackRows = document.querySelectorAll('.attack-row');
    const lowerSearchTerm = searchTerm.toLowerCase();

    attackRows.forEach(row => {
        const techniqueText = row.querySelector('.technique-name').textContent.toLowerCase();
        const detailText = row.querySelector('.technique-detail').textContent.toLowerCase();

        if (techniqueText.includes(lowerSearchTerm) || detailText.includes(lowerSearchTerm)) {
            row.style.display = '';
            // Also show/hide corresponding details row
            const attackId = row.getAttribute('data-attack-id');
            const detailsRow = document.querySelector(`.attack-details[data-attack-id="${attackId}"]`);
            if (detailsRow) {
                detailsRow.style.display = '';
            }
        } else {
            row.style.display = 'none';
            // Hide details row as well
            const attackId = row.getAttribute('data-attack-id');
            const detailsRow = document.querySelector(`.attack-details[data-attack-id="${attackId}"]`);
            if (detailsRow) {
                detailsRow.style.display = 'none';
            }
        }
    });
}

// Enhanced accessibility features
function enhanceAccessibility() {
    const table = document.querySelector('.attacks-table');
    if (table) {
        table.setAttribute('role', 'table');
        table.setAttribute('aria-label', 'Attack vectors and scenarios data table');
    }

    const headerCells = document.querySelectorAll('.attacks-table thead th');
    headerCells.forEach(cell => {
        cell.setAttribute('role', 'columnheader');
    });

    const dataCells = document.querySelectorAll('.attacks-table tbody td');
    dataCells.forEach(cell => {
        cell.setAttribute('role', 'cell');
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function () {
    enhanceAccessibility();

    // Optional: Initialize search (uncomment to enable)
    // initializeSearch();
});

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.analysis-card, .table-container h2');
    animateElements.forEach(el => observer.observe(el));
}

// Call scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeScrollAnimations, 500);
});

// Attack Ethereum Shape Collision Detection System
function initAttackEthereumCollisionSystem() {
    const shapes = document.querySelectorAll('.attack-ethereum-shape');
    const collisionDistance = 100; // Smaller distance for more aggressive collisions
    const collisionCooldown = 1500; // Faster cooldown for attack scenarios
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
        const containerRect = shape.closest('.attacks-header').getBoundingClientRect();

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

    function triggerAttackCollisionEffect(shape1, shape2) {
        const now = Date.now();
        const attackEffects = ['collision-attack', 'collision-defense', 'collision-warning'];

        // Random effect selection with attack themes
        const effect1 = attackEffects[Math.floor(Math.random() * attackEffects.length)];
        const effect2 = attackEffects[Math.floor(Math.random() * attackEffects.length)];

        // Apply effects
        shape1.classList.add(effect1);
        shape2.classList.add(effect2);

        // Create attack collision particles
        createAttackCollisionParticles(getShapePosition(shape1), getShapePosition(shape2));

        // Remove effects after animation
        setTimeout(() => {
            shape1.classList.remove(effect1);
            shape2.classList.remove(effect2);
        }, 1200);

        // Play attack collision sound (optional)
        // playAttackCollisionSound();
    }

    function createAttackCollisionParticles(pos1, pos2) {
        const midPoint = {
            x: (pos1.x + pos2.x) / 2,
            y: (pos1.y + pos2.y) / 2
        };

        const container = document.querySelector('.attacks-header');
        const particleCount = 12; // More particles for attack effects

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'attack-collision-particle';

            const angle = (i / particleCount) * 2 * Math.PI;
            const velocity = 180 + Math.random() * 120;
            const endX = midPoint.x + Math.cos(angle) * velocity;
            const endY = midPoint.y + Math.sin(angle) * velocity;

            // Attack-themed particle colors
            const colors = [
                'radial-gradient(circle, #FF0000, #8B0000)',
                'radial-gradient(circle, #FF6B35, #DC143C)',
                'radial-gradient(circle, #FFA500, #FF4500)',
                'radial-gradient(circle, #00FF7F, #228B22)'
            ];
            const particleColor = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: absolute;
                left: ${midPoint.x}px;
                top: ${midPoint.y}px;
                width: 10px;
                height: 10px;
                background: ${particleColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
                animation: attackParticleExplosion 1s ease-out forwards;
                transform: translate(-50%, -50%);
            `;

            // Add CSS keyframes for attack particle animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes attackParticleExplosion {
                    0% {
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(${(endX - midPoint.x) * 0.7}px, ${(endY - midPoint.y) * 0.7}px) scale(1.2) rotate(180deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(${endX - midPoint.x}px, ${endY - midPoint.y}px) scale(0) rotate(360deg);
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
            }, 1000);
        }
    }

    function checkAttackCollisions() {
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

                        triggerAttackCollisionEffect(positions[i].element, positions[j].element);

                        // Update last collision time
                        shape1Data.lastCollision = now;
                        shape2Data.lastCollision = now;
                    }
                }
            }
        }
    }

    // Run collision detection at 60fps
    setInterval(checkAttackCollisions, 16);
}

// Optional: Add attack collision sound effect
function playAttackCollisionSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();

        // Create a more aggressive collision sound for attacks
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    }
}

// Initialize attack collision system
document.addEventListener('DOMContentLoaded', function () {
    initializeAttackTable();
    enhanceAccessibility();

    // Initialize attack collision system after shapes are loaded
    setTimeout(() => {
        initAttackEthereumCollisionSystem();
    }, 1000);
}); 