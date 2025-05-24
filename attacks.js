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