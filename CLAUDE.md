# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume website for Pu Chen (Software Engineer) built as a static website with multilingual support. The site features an interactive design with animations and includes an AI-generated recommendation section.

## Architecture

### Core Technologies
- **Static HTML/CSS/JavaScript**: Pure vanilla web technologies, no frameworks
- **Jekyll**: Static site generator (configured via `_config.yml`)
- **GitHub Pages**: Deployment target (configured for puchentw.github.io)

### File Structure
- `index.html` - Main resume page with bilingual content
- `styles.css` - Complete styling with responsive design and animations
- `script.js` - Interactive functionality including language switching and AI section toggle
- `_config.yml` - Jekyll configuration for GitHub Pages deployment
- `README.md` - Content source for resume information
- `Resume.pdf` - PDF version of resume

### Key Features
1. **Multilingual Support**: English/Chinese language switching with localStorage persistence
2. **AI Perspective Section**: Expandable/collapsible AI-generated recommendation with smooth animations
3. **Responsive Design**: Mobile-first approach with media queries
4. **Interactive Animations**: Scroll-based animations, hover effects, and smooth transitions
5. **Accessibility**: ARIA attributes for screen readers

## Development Workflow

### Local Development
Since this is a static site:
- Open `index.html` directly in a browser for testing
- No build process or local server required
- All functionality works with file:// protocol

### Content Updates
- Resume content is embedded directly in `index.html` with `data-en` and `data-zh` attributes
- The AI recommendation section content is also embedded in the HTML
- Styling changes go in `styles.css`
- Interactive behavior changes go in `script.js`

### Deployment
- This site deploys automatically to GitHub Pages when pushed to the main branch
- The site is configured to use Jekyll for processing
- URL: https://puchentw.github.io (as configured in `_config.yml`)

## Code Architecture Details

### Language System (script.js:2-52)
The `LanguageSwitcher` class manages bilingual content:
- Stores language preference in localStorage
- Dynamically updates all elements with `data-en`/`data-zh` attributes
- Updates page title and document language attributes

### AI Perspective Feature (script.js:58-128)
Interactive expandable content section:
- Toggle visibility with smooth animations
- Expand/collapse detailed content within the section
- Maintains animation timing constants for consistency

### Enhanced User Experience Features (script.js:130-165)
Additional interactive functionality:
- Smooth scrolling for anchor links
- Intersection observer for scroll-based animations
- Progressive element animation on viewport entry

### Styling Architecture (styles.css)
- CSS custom properties for theme colors (primarily #667eea and #764ba2 gradient)
- Component-based styling (`.job`, `.skill-category`, `.project`, etc.)
- Responsive breakpoints at 768px and 480px
- Print-specific styles for PDF generation

## Important Notes

### Content Management
- All resume content is hardcoded in HTML with bilingual attributes
- No CMS or external data sources
- Updates require direct HTML editing

### Performance Considerations
- Vanilla JavaScript for minimal bundle size
- CSS animations use transforms for hardware acceleration
- Font Awesome loaded from CDN
- No build process required

### Deployment Requirements
- GitHub Pages compatible
- Jekyll plugins: jekyll-feed, jekyll-sitemap, jekyll-seo-tag
- No Node.js dependencies or build process