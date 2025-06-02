// Monitoring Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initMonitoringPanels();
    initPanelActions();
    initPlaceholderAnimations();
});

function initMonitoringPanels() {
    const panels = document.querySelectorAll('.panel-container');

    panels.forEach((panel, index) => {
        // Add staggered entrance animation delay
        panel.style.animationDelay = `${index * 0.1}s`;

        // Initialize panel state
        panel.setAttribute('data-panel-id', `panel-${index + 1}`);
    });
}

function initPanelActions() {
    // Refresh button functionality
    const refreshButtons = document.querySelectorAll('.panel-refresh');
    refreshButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            refreshPanel(this);
        });
    });

    // Fullscreen button functionality
    const fullscreenButtons = document.querySelectorAll('.panel-fullscreen');
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            togglePanelFullscreen(this);
        });
    });
}

function refreshPanel(button) {
    const panel = button.closest('.panel-container');
    const iframe = panel.querySelector('.grafana-panel');

    // Add loading state
    showPanelLoading(panel);

    // Simulate refresh (in real implementation, you'd reload the iframe)
    setTimeout(() => {
        if (iframe) {
            // Refresh iframe by reloading src
            const currentSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = currentSrc;
            }, 100);
        }

        // Animate placeholder panels
        animatePlaceholderRefresh(panel);

        hidePanelLoading(panel);
    }, 1000);

    // Add button feedback
    button.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        button.style.transform = '';
    }, 600);
}

function togglePanelFullscreen(button) {
    const panel = button.closest('.panel-container');

    if (panel.classList.contains('fullscreen')) {
        exitFullscreen(panel, button);
    } else {
        enterFullscreen(panel, button);
    }
}

function enterFullscreen(panel, button) {
    panel.classList.add('fullscreen');
    button.innerHTML = '⤄';
    button.title = 'Exit Fullscreen';

    // Add fullscreen styles
    panel.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        margin: 0;
        border-radius: 0;
    `;

    // Expand iframe
    const iframe = panel.querySelector('.grafana-panel');
    if (iframe) {
        iframe.style.height = 'calc(100vh - 60px)';
    }

    // Expand placeholder
    const placeholder = panel.querySelector('.placeholder-panel');
    if (placeholder) {
        placeholder.style.minHeight = 'calc(100vh - 60px)';
    }

    // Add escape key listener
    document.addEventListener('keydown', escapeFullscreen);
}

function exitFullscreen(panel, button) {
    panel.classList.remove('fullscreen');
    button.innerHTML = '⛶';
    button.title = 'Fullscreen';

    // Remove fullscreen styles
    panel.style.cssText = '';

    // Reset iframe height
    const iframe = panel.querySelector('.grafana-panel');
    if (iframe) {
        iframe.style.height = panel.classList.contains('large') ? '400px' : '300px';
    }

    // Reset placeholder height
    const placeholder = panel.querySelector('.placeholder-panel');
    if (placeholder) {
        placeholder.style.minHeight = '280px';
    }

    // Remove escape key listener
    document.removeEventListener('keydown', escapeFullscreen);
}

function escapeFullscreen(e) {
    if (e.key === 'Escape') {
        const fullscreenPanel = document.querySelector('.panel-container.fullscreen');
        if (fullscreenPanel) {
            const fullscreenButton = fullscreenPanel.querySelector('.panel-fullscreen');
            exitFullscreen(fullscreenPanel, fullscreenButton);
        }
    }
}

function showPanelLoading(panel) {
    const loading = document.createElement('div');
    loading.className = 'panel-loading';
    loading.innerHTML = `
        <div class="loading-spinner"></div>
    `;

    const content = panel.querySelector('.panel-content');
    content.appendChild(loading);
}

function hidePanelLoading(panel) {
    const loading = panel.querySelector('.panel-loading');
    if (loading) {
        loading.remove();
    }
}

function animatePlaceholderRefresh(panel) {
    const bars = panel.querySelectorAll('.bar');
    const alertItems = panel.querySelectorAll('.alert-item');

    // Animate chart bars
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const newHeight = Math.random() * 80 + 20;
            bar.style.height = `${newHeight}%`;
        }, index * 100);
    });

    // Animate alert status changes
    alertItems.forEach((item, index) => {
        setTimeout(() => {
            // Randomly change status
            const statuses = ['status-normal', 'status-warning'];
            const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];

            item.className = `alert-item ${currentStatus}`;

            // Add flash animation
            item.style.background = '#e8f5e8';
            setTimeout(() => {
                item.style.background = '#f8f9fa';
            }, 300);
        }, index * 200);
    });
}

function initPlaceholderAnimations() {
    // Animate chart bars periodically
    setInterval(() => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const newHeight = Math.random() * 80 + 20;
                bar.style.transition = 'height 0.8s ease';
                bar.style.height = `${newHeight}%`;
            }, index * 100);
        });
    }, 5000);

    // Pulse status indicators
    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach(dot => {
        // Add random delay to make them feel more alive
        const delay = Math.random() * 2;
        dot.style.animationDelay = `${delay}s`;
    });
}

// Utility function to check if Grafana iframes are loaded
function checkGrafanaLoad() {
    const iframes = document.querySelectorAll('.grafana-panel');

    iframes.forEach(iframe => {
        iframe.addEventListener('load', function () {
            // Hide placeholder when iframe loads
            const placeholder = this.parentElement.querySelector('.placeholder-panel');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            this.style.display = 'block';
        });

        iframe.addEventListener('error', function () {
            // Show placeholder if iframe fails to load
            const placeholder = this.parentElement.querySelector('.placeholder-panel');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            this.style.display = 'none';
        });
    });
}

// Initialize Grafana iframe handling
checkGrafanaLoad();

// Auto-refresh panels every 5 minutes (optional)
setInterval(() => {
    const refreshButtons = document.querySelectorAll('.panel-refresh');
    refreshButtons.forEach(button => {
        if (!button.closest('.panel-container').classList.contains('fullscreen')) {
            refreshPanel(button);
        }
    });
}, 300000); // 5 minutes 