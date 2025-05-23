# Bloatnet Initiative Website

A modern, interactive website for the Bloatnet initiative featuring a solarpunk aesthetic with green gradients, animated effects, and comprehensive metrics tracking.

## 🌟 Features

### Landing Page (`index.html`)
- **Hero Section**: Animated solarpunk design with floating particles
- **Interactive Progress Bar**: Customizable progress tracking with milestones
- **Core Objectives**: Three expandable cards explaining the initiative's goals
- **Smooth Animations**: Parallax scrolling, fade-in effects, and hover interactions

### Metrics Page (`metrics.html`)
- **Data Collection Overview**: 12 comprehensive metric categories
- **Team Attribution**: Each metric shows the responsible team
- **Interactive Filtering**: Filter metrics by category with smooth animations
- **Priority Indicators**: Visual priority levels (Critical, High, Medium)

## 🎨 Design Features

- **Solarpunk Aesthetic**: Green color palette inspired by your reference image
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Effects**: Backdrop blur, gradient overlays, and smooth transitions
- **Interactive Elements**: Hover effects, click animations, and scroll-triggered animations

## 🚀 Quick Start

1. **Clone or download** the files to your local machine
2. **Open `index.html`** in any modern web browser
3. **Navigate** between pages using the top navigation bar

No server setup required! The website runs entirely in the browser.

## 📂 File Structure

```
bloatnet_website/
├── index.html          # Landing page
├── metrics.html        # Metrics & data collection page
├── styles.css          # Main styles and animations
├── metrics.css         # Metrics page specific styles
├── script.js           # Landing page JavaScript
├── metrics.js          # Metrics page JavaScript
└── README.md           # This file
```

## ⚙️ Customization Guide

### Updating Progress Bar

To update the progress percentage and milestone:

```javascript
// Call this function from browser console or add to your script
updateBloatnetProgress(35, "New milestone text", 35);
```

Or modify the HTML directly:
```html
<!-- In index.html, update these attributes -->
<div class="progress-fill" data-progress="35"></div>
<div class="milestone" data-position="35">
```

### Adding New Metrics

To add a new metric card in `metrics.html`:

```html
<div class="metric-card" data-category="your-category">
    <div class="metric-header">
        <div class="team-badge">Your Team Name</div>
        <h3>Metric Title</h3>
    </div>
    <div class="metric-content">
        <p class="metric-description">
            Description of what this metric measures and why it's important.
        </p>
        <div class="metric-priority">Priority Level</div>
    </div>
</div>
```

### Color Customization

Main color variables in `styles.css`:
```css
/* Primary colors from the solarpunk palette */
--primary-green: #1ed79a;
--secondary-green: #0db7af;
--dark-green: #34976c;
--accent-green: #9fffe0;
```

### Adding New Filter Categories

1. Add the filter button in `metrics.html`:
```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

2. Add the category color in `metrics.css`:
```css
.metric-card[data-category="new-category"] {
    border-left: 4px solid #your-color;
}
```

## 🎯 Interactive Features

### Progress Bar
- Animates on scroll
- Customizable percentage and milestones
- Glowing effects and pulsing animations

### Objective Cards
- Expand on hover to show detailed descriptions
- Ripple effect on click
- Shimmer animation on hover

### Metrics Filtering
- Smooth category-based filtering
- Staggered animations when switching filters
- Visual feedback for active filters

### Scroll Effects
- Parallax movement for hero elements
- Fade-in animations for sections
- Navbar opacity changes on scroll

## 🛠️ Browser Compatibility

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Edge**: Full support

## 📱 Mobile Responsiveness

- Responsive grid layouts
- Touch-friendly navigation
- Optimized font sizes and spacing
- Swipe-friendly interactions

## 🔧 Development Tips

### Testing Locally
Simply open `index.html` in your browser. For development with live reload, you can use:

```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js serve package
npx serve .

# Using PHP built-in server
php -S localhost:8000
```

### Performance Optimization
- Images are embedded as SVG/base64 for faster loading
- CSS and JS are minified for production use
- Animations use CSS transforms for better performance

### Customizing Animations
All animations can be adjusted in the CSS files:
- Duration: Change `animation-duration` values
- Easing: Modify `cubic-bezier()` timing functions
- Delays: Adjust `animation-delay` for staggered effects

## 🎪 Global Functions

The website exposes these functions for external control:

```javascript
// Update progress bar
updateBloatnetProgress(percentage, milestoneText, milestonePosition);

// Search metrics (if search feature is added)
searchBloatnetMetrics(searchTerm);
```

## 📈 Future Enhancements

Potential additions for future development:
- Real-time data integration
- Search functionality for metrics
- Dark/light theme toggle
- Additional animation presets
- Export functionality for metrics data

## 🤝 Contributing

To contribute to the website:
1. Maintain the solarpunk aesthetic
2. Ensure mobile responsiveness
3. Test across different browsers
4. Follow the existing code structure
5. Document any new features

---

**Built with modern web technologies for the Bloatnet initiative** 