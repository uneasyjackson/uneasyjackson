# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Multi-page website with separate HTML files for each section
- 5 pages: Home, About Me, Portfolio, Resume, and Contact
- Interactive portfolio filtering
- Animated typing effect
- Mobile-friendly navigation with hamburger menu
- Contact form
- Skill progress bars with animations
- Clean and modern UI

## Pages

1. **Home** - An engaging landing page with a hero section and call-to-action
2. **About Me** - Professional information and skill highlights
3. **Portfolio** - Showcasing projects with filtering options
4. **Resume** - Education and work experience timeline
5. **Contact** - Contact information and form for inquiries

## File Structure

- `index.html` - Home page
- `about.html` - About Me page
- `portfolio.html` - Portfolio page
- `resume.html` - Resume page
- `contact.html` - Contact page
- `style.css` - Styles for all pages
- `main.js` - JavaScript functionality

## How to Use

1. Clone or download this repository
2. Customize the content in each HTML file to match your information
3. Modify the styles in `style.css` to match your branding
4. Update the JavaScript functionality in `main.js` if needed
5. Replace placeholder content with your actual portfolio items, resume details, etc.
6. Deploy to your web hosting service

## Customization

### Changing Colors

The color scheme can be easily modified by updating the CSS variables in the `:root` section of `style.css`:

```css
:root {
    --primary-color: #4a89dc;
    --secondary-color: #5d9cec;
    --dark-color: #292b2c;
    --light-color: #f4f7f9;
    --success-color: #37bc9b;
    --gray-color: #888;
}
```

### Adding Portfolio Items

To add new portfolio items, copy and modify the existing portfolio item structure in the portfolio.html file:

```html
<div class="portfolio-item" data-category="YOUR_CATEGORY">
    <div class="portfolio-img">
        <div class="img-placeholder">
            <i class="fas fa-YOUR_ICON"></i>
        </div>
    </div>
    <div class="portfolio-info">
        <h3>Project Title</h3>
        <p>Project Type</p>
    </div>
</div>
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid layouts)
- JavaScript (ES6+)
- Font Awesome for icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 