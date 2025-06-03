// Bloating Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Bloating page loaded');

    // Initialize interactive elements
    initializeBloatingTable();
    initializeBloatingShapes();
    initializeHeaderInteractions();
    initializeSearchFunctionality();
    initializeAnimations();
    initHamburgerMenu();
});

// Table Interactivity
function initializeBloatingTable() {
    const bloatingRows = document.querySelectorAll('.bloating-row');

    // Only initialize if rows don't already have data-events-initialized attribute
    // This prevents conflicts with dataRenderer's event initialization
    const uninitializedRows = Array.from(bloatingRows).filter(row =>
        !row.hasAttribute('data-events-initialized')
    );

    if (uninitializedRows.length === 0) {
        // All rows have been initialized by dataRenderer, skip initialization
        return;
    }

    uninitializedRows.forEach(row => {
        // Mark as initialized to prevent duplicate initialization
        row.setAttribute('data-events-initialized', 'true');

        row.addEventListener('click', function () {
            const bloatingId = this.getAttribute('data-bloating-id');
            const detailsRow = document.querySelector(`.bloating-details[data-bloating-id="${bloatingId}"]`);

            // Toggle expanded state
            const isExpanded = this.classList.contains('expanded');

            // Close all other expanded rows first
            document.querySelectorAll('.bloating-row.expanded').forEach(expandedRow => {
                if (expandedRow !== this) {
                    expandedRow.classList.remove('expanded');
                    const otherDetails = document.querySelector(`.bloating-details[data-bloating-id="${expandedRow.getAttribute('data-bloating-id')}"]`);
                    if (otherDetails) {
                        otherDetails.classList.remove('show');
                    }
                }
            });

            // Toggle current row
            if (isExpanded) {
                this.classList.remove('expanded');
                if (detailsRow) {
                    detailsRow.classList.remove('show');
                }
            } else {
                this.classList.add('expanded');
                if (detailsRow) {
                    detailsRow.classList.add('show');
                }

                // Smooth scroll to details
                setTimeout(() => {
                    detailsRow.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 150);
            }
        });

        // Hover effects
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';

            // Add subtle glow to rank badge
            const rankBadge = this.querySelector('.rank-badge');
            if (rankBadge) {
                rankBadge.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.4)';
            }
        });

        row.addEventListener('mouseleave', function () {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0)';
            }

            const rankBadge = this.querySelector('.rank-badge');
            if (rankBadge) {
                rankBadge.style.boxShadow = '';
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            // Close all expanded rows on Escape
            document.querySelectorAll('.bloating-row.expanded').forEach(row => {
                row.classList.remove('expanded');
                const bloatingId = row.getAttribute('data-bloating-id');
                const detailsRow = document.querySelector(`.bloating-details[data-bloating-id="${bloatingId}"]`);
                if (detailsRow) {
                    detailsRow.classList.remove('show');
                }
            });
        }
    });
}

// Animated Ethereum Shapes
function initializeBloatingShapes() {
    const shapes = document.querySelectorAll('.bloating-ethereum-shape');

    shapes.forEach((shape, index) => {
        // Add random delay to animations
        const delay = Math.random() * 2;
        shape.style.animationDelay = `${delay}s`;

        // Add click interaction for collision effects
        shape.addEventListener('click', function (e) {
            e.stopPropagation();

            // Remove existing collision classes
            this.classList.remove('collision-storage', 'collision-efficiency', 'collision-optimize');

            // Add random collision effect
            const effects = ['collision-storage', 'collision-efficiency', 'collision-optimize'];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            this.classList.add(randomEffect);

            // Remove effect after animation
            setTimeout(() => {
                this.classList.remove(randomEffect);
            }, 1000);
        });

        // Periodic collision effects
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                const effects = ['collision-storage', 'collision-efficiency', 'collision-optimize'];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];

                shape.classList.add(randomEffect);
                setTimeout(() => {
                    shape.classList.remove(randomEffect);
                }, 800);
            }
        }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    });
}

// Header Interactions
function initializeHeaderInteractions() {
    const header = document.querySelector('.bloating-header');
    const collaborationOverlay = document.querySelector('.bloating-collaboration-overlay');

    if (header && collaborationOverlay) {
        // Enhanced hover effect
        header.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });

        header.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });

        // Click effect on collaboration overlay - scroll to form
        collaborationOverlay.addEventListener('click', function (e) {
            e.stopPropagation();

            // Scroll to form section
            const formSection = document.querySelector('.bloating-submission-section');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.clientX - header.offsetLeft - 25 + 'px';
            ripple.style.top = e.clientY - header.offsetTop - 25 + 'px';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Trigger special animation
            const shapes = document.querySelectorAll('.bloating-ethereum-shape');
            shapes.forEach(shape => {
                shape.classList.add('collision-storage');
                setTimeout(() => {
                    shape.classList.remove('collision-storage');
                }, 1000);
            });
        });
    }
}

// Search Functionality
function initializeSearchFunctionality() {
    // Create search input if it doesn't exist
    let searchInput = document.querySelector('.bloating-search');
    if (!searchInput) {
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'bloating-search';
        searchInput.placeholder = 'Search bloating techniques...';

        const tableContainer = document.querySelector('.table-container');
        if (tableContainer) {
            const tableDescription = tableContainer.querySelector('.table-description');
            if (tableDescription) {
                tableDescription.after(searchInput);
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.bloating-row');

            rows.forEach(row => {
                const techniqueName = row.querySelector('.technique-name')?.textContent.toLowerCase() || '';
                const techniqueDetail = row.querySelector('.technique-detail')?.textContent.toLowerCase() || '';
                const writtenContent = row.querySelector('.written-content')?.textContent.toLowerCase() || '';

                const matches = techniqueName.includes(searchTerm) ||
                    techniqueDetail.includes(searchTerm) ||
                    writtenContent.includes(searchTerm);

                if (matches || searchTerm === '') {
                    row.style.display = '';
                    row.classList.add('animate-in');
                } else {
                    row.style.display = 'none';
                    row.classList.remove('animate-in');
                }

                // Also handle details rows
                const bloatingId = row.getAttribute('data-bloating-id');
                const detailsRow = document.querySelector(`.bloating-details[data-bloating-id="${bloatingId}"]`);
                if (detailsRow) {
                    detailsRow.style.display = matches || searchTerm === '' ? '' : 'none';
                }
            });

            // Update analysis cards based on visible rows
            updateAnalysisVisibility(searchTerm);
        });

        // Enhanced focus effects
        searchInput.addEventListener('focus', function () {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.2)';
        });

        searchInput.addEventListener('blur', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    }
}

// Update analysis card visibility based on search
function updateAnalysisVisibility(searchTerm) {
    const analysisSection = document.querySelector('.bloating-analysis');
    if (analysisSection && searchTerm !== '') {
        const visibleRows = document.querySelectorAll('.bloating-row:not([style*="display: none"])');
        if (visibleRows.length === 0) {
            analysisSection.style.opacity = '0.5';
            analysisSection.style.transform = 'translateY(20px)';
        } else {
            analysisSection.style.opacity = '1';
            analysisSection.style.transform = 'translateY(0)';
        }
    } else if (analysisSection) {
        analysisSection.style.opacity = '1';
        analysisSection.style.transform = 'translateY(0)';
    }
}

// Animations and Visual Effects
function initializeAnimations() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe table rows
    document.querySelectorAll('.bloating-row').forEach(row => {
        observer.observe(row);
    });

    // Observe analysis cards
    document.querySelectorAll('.analysis-card').forEach(card => {
        observer.observe(card);
    });

    // Progressive loading animation for table
    const tableRows = document.querySelectorAll('.bloating-row');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';

        setTimeout(() => {
            row.style.transition = 'all 0.6s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy');
    });
}

function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add ripple animation to CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Advanced Features
function initializeAdvancedFeatures() {
    // Add sorting functionality
    const headers = document.querySelectorAll('.bloating-table thead th');
    headers.forEach((header, index) => {
        if (index > 0 && index < headers.length - 1) { // Skip rank and details columns
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => sortTable(index));
        }
    });

    // Add export functionality
    addExportButton();

    // Add fullscreen mode for table
    addFullscreenToggle();
}

function sortTable(columnIndex) {
    const table = document.querySelector('.bloating-table tbody');
    const rows = Array.from(table.querySelectorAll('.bloating-row'));

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex]?.textContent.trim() || '';
        const bValue = b.cells[columnIndex]?.textContent.trim() || '';

        // Try to parse as numbers first
        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }

        return aValue.localeCompare(bValue);
    });

    // Re-append sorted rows
    rows.forEach(row => {
        table.appendChild(row);
        const bloatingId = row.getAttribute('data-bloating-id');
        const detailsRow = document.querySelector(`.bloating-details[data-bloating-id="${bloatingId}"]`);
        if (detailsRow) {
            table.appendChild(detailsRow);
        }
    });
}

function addExportButton() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export Data';
        exportButton.className = 'export-button';
        exportButton.style.cssText = `
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            margin: 1rem auto;
            display: block;
            transition: all 0.3s ease;
        `;

        exportButton.addEventListener('click', exportTableData);
        exportButton.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        });
        exportButton.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        tableContainer.appendChild(exportButton);
    }
}

function exportTableData() {
    const rows = document.querySelectorAll('.bloating-row:not([style*="display: none"])');
    const data = [];

    rows.forEach(row => {
        const rowData = {
            rank: row.querySelector('.rank-badge')?.textContent || '',
            technique: row.querySelector('.technique-name')?.textContent || '',
            written: row.querySelector('.written-content')?.textContent || '',
            gas: row.querySelector('.gas-total')?.textContent || '',
            bytes: row.querySelector('.bytes-value')?.textContent || '',
            gasPerByte: row.querySelector('.gas-value')?.textContent || '',
            maxUnits: row.querySelector('.units-value')?.textContent || ''
        };
        data.push(rowData);
    });

    const csv = convertToCSV(data);
    downloadCSV(csv, 'bloating-techniques.csv');
}

function convertToCSV(data) {
    const headers = ['Rank', 'Technique', 'What is written', 'Intrinsic gas', 'Bytes → state', 'Gas / byte', 'Max units'];
    const csvContent = [
        headers.join(','),
        ...data.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    return csvContent;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function addFullscreenToggle() {
    const tableWrapper = document.querySelector('.bloating-table-wrapper');
    if (tableWrapper) {
        const fullscreenButton = document.createElement('button');
        fullscreenButton.innerHTML = '⛶';
        fullscreenButton.title = 'Toggle Fullscreen';
        fullscreenButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        `;

        tableWrapper.style.position = 'relative';
        tableWrapper.appendChild(fullscreenButton);

        fullscreenButton.addEventListener('click', function () {
            if (tableWrapper.classList.contains('fullscreen')) {
                exitFullscreen(tableWrapper);
            } else {
                enterFullscreen(tableWrapper);
            }
        });
    }
}

function enterFullscreen(element) {
    element.classList.add('fullscreen');
    element.style.cssText += `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background: white;
        overflow: auto;
        padding: 20px;
        box-sizing: border-box;
    `;
}

function exitFullscreen(element) {
    element.classList.remove('fullscreen');
    element.style.position = 'relative';
    element.style.top = '';
    element.style.left = '';
    element.style.width = '';
    element.style.height = '';
    element.style.zIndex = '';
    element.style.background = '';
    element.style.overflow = '';
    element.style.padding = '';
    element.style.boxSizing = '';
}

// Initialize advanced features after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initializeAdvancedFeatures, 1000);
});

// Form loader function
function hideBloatingFormLoader() {
    const loader = document.querySelector('.bloating-form-loading-overlay');
    const iframe = document.querySelector('.embedded-bloating-form-container iframe');

    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    if (iframe) {
        iframe.classList.add('loaded');
        iframe.style.opacity = '1';
    }
}

// Make function globally available
window.hideBloatingFormLoader = hideBloatingFormLoader;

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