/**
 * Bloatnet Data Rendering System
 * Loads JSON data and dynamically renders content
 */

class DataRenderer {
    constructor() {
        this.data = {};
        this.initialized = false;
    }

    // Initialize the data renderer
    async init() {
        try {
            await this.loadAllData();
            this.initialized = true;
            console.log('DataRenderer initialized successfully');
        } catch (error) {
            console.error('Failed to initialize DataRenderer:', error);
        }
    }

    // Load all JSON data files
    async loadAllData() {
        const dataFiles = [
            { key: 'metrics', url: 'data/metrics.json' },
            { key: 'bloating', url: 'data/bloating.json' },
            { key: 'attacks', url: 'data/attacks.json' },
            { key: 'findings', url: 'data/findings.json' }
        ];

        const loadPromises = dataFiles.map(async (file) => {
            try {
                const response = await fetch(file.url);
                if (!response.ok) {
                    throw new Error(`Failed to load ${file.url}: ${response.statusText}`);
                }
                const data = await response.json();
                this.data[file.key] = data;
                console.log(`Loaded ${file.key} data:`, data);
            } catch (error) {
                console.error(`Error loading ${file.key}:`, error);
                this.data[file.key] = null;
            }
        });

        await Promise.all(loadPromises);
    }

    // Render metrics page
    renderMetrics() {
        if (!this.data.metrics) {
            console.error('Metrics data not available');
            return;
        }

        const metricsGrid = document.getElementById('metrics-grid');
        if (!metricsGrid) return;

        metricsGrid.innerHTML = '';

        // Render initial metrics
        this.data.metrics.initial_metrics.forEach(metric => {
            const metricCard = this.createMetricCard(metric, 'initial-card');
            metricsGrid.appendChild(metricCard);
        });

        // Render additional metrics (initially hidden)
        this.data.metrics.additional_metrics.forEach(metric => {
            const metricCard = this.createMetricCard(metric, 'loadmore-card');
            metricCard.style.display = 'none';
            metricsGrid.appendChild(metricCard);
        });
    }

    // Create a metric card element
    createMetricCard(metric, className) {
        const card = document.createElement('div');
        card.className = `metric-card ${className}`;
        card.setAttribute('data-category', metric.category);

        const badges = metric.requester_badges.map(badge =>
            `<div class="requester-badge">${badge}</div>`
        ).join('');

        card.innerHTML = `
            <div class="metric-header">
                <div class="requester-badges">
                    ${badges}
                </div>
                <div class="metric-title-row">
                    <h3>${metric.title}</h3>
                    <span class="expand-indicator">▼</span>
                </div>
            </div>
            <div class="metric-content">
                <p class="metric-description">
                    ${metric.description}
                </p>
            </div>
        `;

        return card;
    }

    // Render bloating techniques page
    renderBloating() {
        if (!this.data.bloating) {
            console.error('Bloating data not available');
            return;
        }

        const tableBody = document.querySelector('.bloating-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        this.data.bloating.techniques.forEach(technique => {
            // Main row
            const row = document.createElement('tr');
            row.className = 'bloating-row';
            row.setAttribute('data-bloating-id', technique.id);

            row.innerHTML = `
                <td class="bloating-number">
                    <div class="rank-badge rank-${technique.rank}">${technique.rank_badge}</div>
                </td>
                <td class="technique-cell">
                    <div class="technique-name">${technique.technique_name}</div>
                    <div class="technique-detail">${technique.technique_detail}</div>
                </td>
                <td class="what-written">
                    <span class="written-content">${technique.what_written}</span>
                </td>
                <td class="intrinsic-gas">
                    <span class="gas-breakdown">${technique.intrinsic_gas.breakdown}</span>
                    <span class="gas-total">${technique.intrinsic_gas.total}</span>
                </td>
                <td class="gas-cost">
                    <span class="gas-value">${technique.gas_per_byte}</span>
                </td>
            `;

            tableBody.appendChild(row);

            // Details row
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'bloating-details';
            detailsRow.setAttribute('data-bloating-id', technique.id);

            const detailItems = Object.entries(technique.details).map(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const className = key === 'technical_notes' ? 'notes' : '';
                return `
                    <div class="detail-item ${className}">
                        <label>${label}:</label>
                        <span>${value}</span>
                    </div>
                `;
            }).join('');

            detailsRow.innerHTML = `
                <td colspan="5">
                    <div class="details-content">
                        <div class="details-grid">
                            ${detailItems}
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(detailsRow);
        });
    }

    // Render attack vectors page
    renderAttacks() {
        if (!this.data.attacks) {
            console.error('Attacks data not available');
            return;
        }

        // Render transient attacks table
        this.renderTransientAttacks();

        // Render persistent attacks table
        this.renderPersistentAttacks();
    }

    // Render transient attacks table
    renderTransientAttacks() {
        const tableBody = document.querySelector('.attacks-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        this.data.attacks.attack_vectors.forEach(attack => {
            // Main row
            const row = document.createElement('tr');
            row.className = 'attack-row';
            row.setAttribute('data-attack-id', attack.id);

            row.innerHTML = `
                <td class="attack-number">
                    <div class="rank-badge rank-${attack.rank}">${attack.rank_badge}</div>
                </td>
                <td class="technique-cell">
                    <div class="technique-name">${attack.technique_name}</div>
                    <div class="technique-detail">${attack.technique_detail}</div>
                </td>
                <td class="gas-cost">
                    <span class="gas-value">${attack.cost_per_transient_byte}</span>
                    <span class="gas-calculation">${attack.cost_calculation}</span>
                </td>
                <td class="expand-cell">
                    <span class="expand-icon">▼</span>
                </td>
            `;

            tableBody.appendChild(row);

            // Details row
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'attack-details';
            detailsRow.setAttribute('data-attack-id', attack.id);

            const detailItems = Object.entries(attack.details).map(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const className = key === 'technical_notes' ? 'notes' : '';
                return `
                    <div class="detail-item ${className}">
                        <label>${label}:</label>
                        <span>${value}</span>
                    </div>
                `;
            }).join('');

            detailsRow.innerHTML = `
                <td colspan="4">
                    <div class="details-content">
                        <div class="details-grid">
                            ${detailItems}
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(detailsRow);
        });
    }

    // Render persistent attacks table
    renderPersistentAttacks() {
        if (!this.data.attacks || !this.data.attacks.persistent_attacks) {
            return;
        }

        const tableBody = document.getElementById('persistent-attacks-tbody');
        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = '';

        this.data.attacks.persistent_attacks.forEach((attack, index) => {
            // Main row
            const row = document.createElement('tr');
            row.className = 'persistent-attack-row';
            row.setAttribute('data-persistent-attack-id', attack.id);

            row.innerHTML = `
                <td class="attack-name-cell">
                    <div class="attack-name">${attack.attack}</div>
                </td>
                <td class="attack-description-cell">
                    <div class="attack-description">${attack.description}</div>
                </td>
                <td class="expand-cell">
                    <span class="expand-icon">▼</span>
                </td>
            `;

            tableBody.appendChild(row);

            // Details row
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'persistent-attack-details';
            detailsRow.setAttribute('data-persistent-attack-id', attack.id);

            const detailItems = Object.entries(attack.details)
                .filter(([key, value]) => key !== 'difficulty' && key !== 'impact_level') // Exclude difficulty and impact_level
                .map(([key, value]) => {
                    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    const className = key === 'technical_notes' ? 'notes' : '';

                    // Special handling for boolean values
                    const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;

                    return `
                        <div class="detail-item ${className}">
                            <label>${label}:</label>
                            <span>${displayValue}</span>
                        </div>
                    `;
                }).join('');

            detailsRow.innerHTML = `
                <td colspan="3">
                    <div class="details-content">
                        <div class="details-grid">
                            ${detailItems}
                        </div>
                    </div>
                </td>
            `;

            tableBody.appendChild(detailsRow);
        });

        // Add click event handling for persistent attacks table
        this.initPersistentAttackTableEvents();
    }

    // Initialize click events for persistent attacks table
    initPersistentAttackTableEvents() {
        const persistentAttackRows = document.querySelectorAll('.persistent-attack-row');

        persistentAttackRows.forEach(row => {
            // Skip if already has event listener
            if (row.hasAttribute('data-events-initialized')) {
                return;
            }

            // Mark as initialized
            row.setAttribute('data-events-initialized', 'true');

            const attackId = row.getAttribute('data-persistent-attack-id');
            const detailsRow = document.querySelector(`.persistent-attack-details[data-persistent-attack-id="${attackId}"]`);
            const expandIcon = row.querySelector('.expand-icon');

            // Click event to toggle details
            row.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePersistentAttackDetails(row, detailsRow, expandIcon);
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
                    this.togglePersistentAttackDetails(row, detailsRow, expandIcon);
                }
            });

            // Make rows focusable for keyboard navigation
            row.setAttribute('tabindex', '0');
            row.setAttribute('role', 'button');
            row.setAttribute('aria-expanded', 'false');
            row.setAttribute('aria-label', `Expand details for persistent attack ${attackId}`);
        });
    }

    // Toggle persistent attack details
    togglePersistentAttackDetails(row, detailsRow, expandIcon) {
        const isExpanded = row.classList.contains('expanded');

        // Close all other expanded rows first
        this.closeAllPersistentAttackDetails();

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
            this.animatePersistentAttackDetailsContent(detailsRow);
        }
    }

    // Close all persistent attack details
    closeAllPersistentAttackDetails() {
        const allRows = document.querySelectorAll('.persistent-attack-row');
        const allDetails = document.querySelectorAll('.persistent-attack-details');

        allRows.forEach(row => {
            row.classList.remove('expanded');
            row.setAttribute('aria-expanded', 'false');
        });

        allDetails.forEach(detail => {
            detail.classList.remove('show');
        });
    }

    // Animate persistent attack details content
    animatePersistentAttackDetailsContent(detailsRow) {
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

    // Render research findings (home page)
    renderFindings() {
        if (!this.data.findings) {
            console.error('Findings data not available');
            return;
        }

        this.renderProgressBar();
        this.renderFindingsSection();

        // Re-initialize dropdown functionality for dynamically created cards
        this.initFindingCardDropdowns();
    }

    // Render the progress bar and milestones
    renderProgressBar() {
        const progressBar = document.querySelector('.current-progress');
        if (progressBar) {
            progressBar.style.width = this.data.findings.current_progress.percentage;
        }

        // Render milestones
        const sizeScale = document.querySelector('.size-scale');
        if (sizeScale) {
            // Clear existing milestones except progress bar
            const existingMarkers = sizeScale.querySelectorAll('.size-marker');
            existingMarkers.forEach(marker => marker.remove());

            this.data.findings.milestones.forEach(milestone => {
                const marker = document.createElement('div');
                marker.className = 'size-marker';
                marker.setAttribute('data-size', milestone.size);
                marker.style.left = milestone.position;

                marker.innerHTML = `
                    <div class="marker-dot"></div>
                    <span class="marker-label">${milestone.label}</span>
                `;

                sizeScale.appendChild(marker);
            });
        }

        // Render finding points
        this.data.findings.findings.forEach(finding => {
            const findingPoint = document.createElement('div');
            findingPoint.className = 'finding-point';
            findingPoint.setAttribute('data-position', finding.position);
            findingPoint.style.left = finding.position;

            findingPoint.innerHTML = `
                <div class="finding-marker"></div>
                <div class="finding-content">
                    <h4>${finding.title}</h4>
                    <p><strong>Size:</strong> ${finding.size}</p>
                    <p><strong>Finding:</strong> ${finding.summary}</p>
                    <p><strong>Impact:</strong> ${finding.details.impact_analysis}</p>
                </div>
            `;

            sizeScale.appendChild(findingPoint);
        });
    }

    // Render the findings dropdown section
    renderFindingsSection() {
        const findingsGrid = document.querySelector('.findings-grid');
        if (!findingsGrid) return;

        findingsGrid.innerHTML = '';

        // Render actual findings
        this.data.findings.findings.forEach(finding => {
            const findingCard = this.createFindingCard(finding);
            findingsGrid.appendChild(findingCard);
        });

        // Render placeholder cards
        this.data.findings.placeholders.forEach(placeholder => {
            const placeholderCard = this.createPlaceholderCard(placeholder);
            findingsGrid.appendChild(placeholderCard);
        });

        // Update findings count
        const findingsCount = document.querySelector('.findings-count');
        if (findingsCount) {
            findingsCount.textContent = `(${this.data.findings.findings.length})`;
        }
    }

    // Create a finding card element
    createFindingCard(finding) {
        const card = document.createElement('div');
        card.className = 'finding-card';
        card.setAttribute('data-position', finding.position);
        card.setAttribute('data-labels', finding.labels.join(','));

        const labels = finding.labels.map(label => {
            const labelConfig = this.getLabelConfig(label);
            return `<div class="finding-label ${labelConfig.category} ${label}">${labelConfig.name}</div>`;
        }).join('');

        const keyFindings = finding.details.key_findings.map(finding =>
            `<li>${finding}</li>`
        ).join('');

        card.innerHTML = `
            <div class="card-header">
                <div class="finding-labels">
                    ${labels}
                </div>
                <div class="finding-title-row">
                    <h4>${finding.title}</h4>
                    <span class="expand-indicator">▼</span>
                </div>
            </div>
            <div class="card-body">
                <p class="finding-summary">${finding.summary}</p>
                <div class="finding-details">
                    <div class="detail-section">
                        <h5>Key Findings</h5>
                        <ul>
                            ${keyFindings}
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h5>Impact Analysis</h5>
                        <p>${finding.details.impact_analysis}</p>
                    </div>
                    <div class="detail-section">
                        <h5>Recommendations</h5>
                        <p>${finding.details.recommendations}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="reproduction-link">
                    <span class="link-label">Reproduce:</span>
                    <a href="${finding.reproduction_link.url}" target="_blank" rel="noopener noreferrer" class="scenario-link">${finding.reproduction_link.text} →</a>
                </div>
                <div class="finding-date">${finding.date}</div>
            </div>
        `;

        return card;
    }

    // Create a placeholder card
    createPlaceholderCard(placeholder) {
        const card = document.createElement('div');
        card.className = 'finding-card placeholder';

        card.innerHTML = `
            <div class="card-header">
                <div class="finding-labels">
                    <div class="finding-label status placeholder-label">Coming Soon</div>
                </div>
                <div class="finding-title-row">
                    <h4>${placeholder.title}</h4>
                    <span class="expand-indicator">▼</span>
                </div>
            </div>
            <div class="card-body">
                <div class="placeholder-content">
                    <div class="placeholder-icon">${placeholder.icon}</div>
                    <p>${placeholder.content}</p>
                </div>
            </div>
        `;

        return card;
    }

    // Get label configuration for styling
    getLabelConfig(label) {
        const { labels } = this.data.findings;

        // Check in severity labels
        if (labels.severity[label]) {
            return { ...labels.severity[label], category: 'severity' };
        }

        // Check in status labels
        if (labels.status[label]) {
            return { ...labels.status[label], category: 'status' };
        }

        // Check in client labels
        if (labels.clients[label]) {
            return { ...labels.clients[label], category: 'client' };
        }

        // Default fallback
        return { name: label, category: 'default' };
    }

    // Initialize dropdown functionality for finding cards
    initFindingCardDropdowns() {
        const findingCards = document.querySelectorAll('.finding-card');

        findingCards.forEach(card => {
            // Skip if already has event listener
            if (card.hasAttribute('data-dropdown-initialized')) {
                return;
            }

            // Mark as initialized
            card.setAttribute('data-dropdown-initialized', 'true');

            // Add click event listener
            card.addEventListener('click', function (e) {
                // Prevent event bubbling
                e.stopPropagation();

                // Don't process clicks on links
                if (e.target.closest('.scenario-link')) {
                    return;
                }

                // Toggle expanded state
                const isExpanded = card.classList.contains('expanded');

                if (isExpanded) {
                    card.classList.remove('expanded');
                } else {
                    // Close other expanded cards
                    findingCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('expanded');
                        }
                    });

                    // Expand this card
                    card.classList.add('expanded');
                }

                // Add click feedback
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
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

    // Get data for external use
    getData(type) {
        return this.data[type] || null;
    }

    // Add new data entry (for future admin interface)
    async addData(type, newEntry) {
        if (!this.data[type]) {
            console.error(`Data type ${type} not found`);
            return false;
        }

        // This would typically make an API call to save the data
        // For now, just add to local data
        if (type === 'metrics') {
            this.data[type].additional_metrics.push(newEntry);
        } else if (type === 'bloating') {
            this.data[type].techniques.push(newEntry);
        } else if (type === 'attacks') {
            this.data[type].attack_vectors.push(newEntry);
        } else if (type === 'findings') {
            this.data[type].findings.push(newEntry);
        }

        // Re-render the appropriate section
        switch (type) {
            case 'metrics':
                this.renderMetrics();
                break;
            case 'bloating':
                this.renderBloating();
                break;
            case 'attacks':
                this.renderAttacks();
                break;
            case 'findings':
                this.renderFindings();
                break;
        }

        return true;
    }
}

// Create global instance
window.dataRenderer = new DataRenderer();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await window.dataRenderer.init();

    // Render content based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'metrics.html':
            window.dataRenderer.renderMetrics();
            break;
        case 'bloating.html':
            window.dataRenderer.renderBloating();
            break;
        case 'attacks.html':
            window.dataRenderer.renderAttacks();
            break;
        case 'index.html':
        case '':
            window.dataRenderer.renderFindings();
            break;
    }
}); 