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
- `index.html` - Main resume page structure (content now dynamically loaded)
- `data.json` - Centralized resume data in JSON format with bilingual content
- `styles.css` - Complete styling with responsive design and animations
- `script.js` - Interactive functionality including data loading, language switching, and AI section toggle
- `_config.yml` - Jekyll configuration for GitHub Pages deployment
- `README.md` - Content source for resume information
- `Resume.pdf` - PDF version of resume

### Key Features
1. **Data-Driven Architecture**: Resume content loaded dynamically from JSON with separation of concerns
2. **Multilingual Support**: English/Chinese language switching with localStorage persistence
3. **AI Perspective Section**: Expandable/collapsible AI-generated recommendation with smooth animations
4. **Presentation Mode**: Full-screen slide presentation with keyboard navigation
5. **Responsive Design**: Mobile-first approach with media queries
6. **Interactive Animations**: Scroll-based animations, hover effects, and smooth transitions
7. **Accessibility**: ARIA attributes for screen readers

## Development Workflow

### Local Development
**Important**: Due to the dynamic data loading from `data.json`, a local server is required for development:
- **Required**: Start a local HTTP server (e.g., `python3 -m http.server 8000`)
- Navigate to `http://localhost:8000` to view the site
- The `file://` protocol will **not** work due to CORS restrictions when fetching JSON data
- No build process required - all functionality works with vanilla JavaScript

### Content Updates
- **Resume content**: All data is now centralized in `data.json` with bilingual support
- **Easy maintenance**: Update personal info, experience, projects, skills, etc. by editing the JSON file
- **Styling changes**: Continue to use `styles.css`
- **Interactive behavior changes**: Continue to use `script.js`
- **No HTML editing required**: The `index.html` structure remains static while content is injected dynamically

### Deployment
- This site deploys automatically to GitHub Pages when pushed to the main branch
- The site is configured to use Jekyll for processing
- URL: https://puchentw.github.io (as configured in `_config.yml`)

## Code Architecture Details

### Data Management System (script.js:1-465)
**DataLoader Class**: Handles asynchronous loading of resume data from JSON
- Fetches `data.json` with error handling and loading states
- Provides centralized data access for all components

**DataRenderer Class**: Manages dynamic DOM injection
- Renders all resume sections from JSON data
- Handles bilingual content with `data-en`/`data-zh` attributes
- Maintains separation between data and presentation

### Language System (script.js:467-518)
The `LanguageSwitcher` class manages bilingual content:
- Stores language preference in localStorage
- Dynamically updates all elements with `data-en`/`data-zh` attributes
- Updates page title and document language attributes
- Now works with dynamically loaded content

### Interactive Features
**AI Perspective Section**: Expandable/collapsible AI-generated recommendation
**Presentation Mode**: Full-screen slide presentation with navigation
**SVG Modal**: Architecture diagram viewer
**Enhanced UX**: Smooth scrolling, intersection observers, progressive animations

### Styling Architecture (styles.css)
- CSS custom properties for theme colors (primarily #667eea and #764ba2 gradient)
- Component-based styling (`.job`, `.skill-category`, `.project`, etc.)
- Responsive breakpoints at 768px and 480px
- Print-specific styles for PDF generation

## Important Notes

### Content Management
- **Centralized data**: All resume content stored in `data.json` with structured bilingual support
- **Easy updates**: Modify JSON file to update any content without touching HTML/CSS/JS
- **Data validation**: JSON structure ensures consistency across all sections
- **No CMS dependency**: Pure static site with dynamic content loading

### Performance Considerations
- **Minimal overhead**: Single JSON fetch on load, then cached in memory
- **Vanilla JavaScript**: No frameworks, minimal bundle size
- **Efficient rendering**: DOM elements created once and reused
- **CSS animations**: Use transforms for hardware acceleration
- **CDN resources**: Font Awesome loaded from CDN
- **No build process**: Direct deployment with optimized loading

### Data Structure (`data.json`)
The JSON file contains the following main sections:
- **personal**: Name, title, contact information
- **summary**: Professional summary with AI toggle button text
- **aiPerspective**: AI-generated recommendation content (short/long versions)
- **experience**: Work history with achievements
- **projects**: Portfolio projects with descriptions and links
- **education**: Academic background
- **skills**: Categorized technical skills (supports both list and tag display)
- **publications**: Academic publications with links
- **ui**: Interface text for buttons and navigation

Each multilingual field uses `{ "en": "English text", "zh": "Chinese text" }` structure.

### Deployment Requirements
- GitHub Pages compatible
- Jekyll plugins: jekyll-feed, jekyll-sitemap, jekyll-seo-tag
- No Node.js dependencies or build process
- Always use Playwright to verify UI/UX functionality after implementing new features.
