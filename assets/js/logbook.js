let allLogs = [];
let filteredLogs = [];

function linkifyText(text) {
    // Regex to match URLs (including partial ones like hackmd.io/...)
    const urlRegex = /(https?:\/\/[^\s]+)|((?:hackmd\.io|github\.com|ethpandaops\.io|grafana\.[^\s]+|dora\.[^\s]+|cperezz\.[^\s]+)\/[^\s]+)/gi;
    
    return text.replace(urlRegex, function(match) {
        let url = match;
        // Add https:// if the URL doesn't start with http:// or https://
        if (!url.match(/^https?:\/\//)) {
            url = 'https://' + url;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
}

async function loadLogs() {
    try {
        const response = await fetch('data/logs.json');
        const data = await response.json();
        allLogs = data.logs;
        filteredLogs = [...allLogs];
        sortLogs();
        renderLogs();
    } catch (error) {
        console.error('Error loading logs:', error);
        document.getElementById('logsContainer').innerHTML = '<p class="error-message">Error loading logs. Please try again later.</p>';
    }
}

function renderLogs() {
    const container = document.getElementById('logsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    if (filteredLogs.length === 0) {
        container.innerHTML = '';
        noResultsMessage.style.display = 'block';
        return;
    }
    
    noResultsMessage.style.display = 'none';
    
    const logsHTML = filteredLogs.map(log => {
        const date = new Date(log.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const detailsHTML = log.details && log.details.length > 0 
            ? `<ul class="log-details">${log.details.map(detail => `<li>${linkifyText(detail)}</li>`).join('')}</ul>` 
            : '';
        
        const tagsHTML = log.tags && log.tags.length > 0
            ? `<div class="log-tags">${log.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>`
            : '';
        
        return `
            <div class="log-entry" data-category="${log.category}">
                <div class="log-timeline-marker"></div>
                <div class="log-content">
                    <div class="log-header">
                        <span class="log-date">${formattedDate}</span>
                        <span class="log-time">${formattedTime}</span>
                        <span class="log-category category-${log.category}">${formatCategory(log.category)}</span>
                    </div>
                    <h3 class="log-title">${log.title}</h3>
                    <p class="log-description">${log.description}</p>
                    ${detailsHTML}
                    <div class="log-footer">
                        ${tagsHTML}
                        <span class="log-author">By ${log.author}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = logsHTML;
}

function formatCategory(category) {
    const categoryMap = {
        'milestone': 'Milestone',
        'feature': 'Feature',
        'bugfix': 'Bug Fix',
        'research': 'Research',
        'infrastructure': 'Infrastructure',
        'documentation': 'Documentation'
    };
    return categoryMap[category] || category;
}

function filterLogs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filteredLogs = allLogs.filter(log => {
        const matchesSearch = !searchTerm || 
            log.title.toLowerCase().includes(searchTerm) ||
            log.description.toLowerCase().includes(searchTerm) ||
            (log.tags && log.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            (log.details && log.details.some(detail => detail.toLowerCase().includes(searchTerm)));
        
        const matchesCategory = !categoryFilter || log.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    sortLogs();
    renderLogs();
}

function sortLogs() {
    const sortOrder = document.getElementById('sortOrder').value;
    
    filteredLogs.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        
        if (sortOrder === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLogs();
    
    document.getElementById('searchInput').addEventListener('input', filterLogs);
    document.getElementById('categoryFilter').addEventListener('change', filterLogs);
    document.getElementById('sortOrder').addEventListener('change', () => {
        sortLogs();
        renderLogs();
    });
});