# Jordan Majd - Personal Portfolio Website

## Overview
This is Jordan Majd's personal portfolio website showcasing his work as a Senior Software Developer. The site features his resume, portfolio projects (VR experiences, holographic applications), and technical articles.

**Current Status**: Project successfully set up and running in Replit environment.

## Project Architecture

### Technology Stack
- **Static Site Generator**: Custom markdown-to-HTML build system
- **Frontend**: Static HTML/CSS/JS files
- **Server**: Node.js HTTP server serving static files
- **Build System**: GNU Make with Node.js scripts
- **Content Format**: Markdown files compiled to HTML

### Directory Structure
- `www/` - Production-ready static site (served by the web server)
- `article/` - Source markdown files for blog articles
- `project/` - Source markdown files for portfolio projects
- `src/` - Build scripts (render_html.js, render_rss.js, etc.)
- `html/` - Build output directory (gitignored)
- `server.js` - Custom Node.js HTTP server for Replit deployment

### Key Files
- `server.js` - Production HTTP server (port 5000, serves www/ directory)
- `Makefile` - Build automation for generating HTML from markdown
- `package.json` - Node.js dependencies for build tools and server

## Build Process

The site uses a two-stage build process:
1. **Build Stage**: `make clean html rss` - Converts markdown to HTML
2. **Package Stage**: `make package` - Copies built files to www/ directory

For Replit, the `www/` directory already contains pre-built static files ready to serve.

## Development

### Local Development (Original Setup)
```bash
npm install
make clean serve  # Builds and serves with Python http.server
```

### Replit Environment
```bash
npm install
node server.js  # Serves pre-built www/ directory on port 5000
```

The workflow is configured to run `node server.js` automatically.

## Deployment

Configured for **autoscale** deployment (stateless static website):
- Run command: `node server.js`
- Port: 5000
- Host: 0.0.0.0 (required for Replit)
- Cache-Control headers: Disabled to ensure updates are visible

## Recent Changes

**2025-11-13**: Initial Replit setup
- Created custom Node.js HTTP server (server.js) to replace Python http.server
- Configured server to bind to 0.0.0.0:5000 for Replit environment
- Added Cache-Control headers to prevent browser caching issues
- Set up workflow and deployment configuration
- Installed dependencies via npm

## Content

### Portfolio Projects
- Sanofi Holographic (HoloLens)
- Trilogy Home Tour (VR)
- Solar Eclipse (VR)
- CSU Immersive Experience (VR)
- Various Mobile VR experiences

### Articles
- Farming Dittos for Fun and Profit
- 360 Capture in UE4 with Nvidia Ansel
- Hand Tracked Natural Interaction in VR

## Notes

- The site uses Eloquent JavaScript's template/design (licensed under Creative Commons)
- Static assets include custom fonts, images, and CSS
- 404 page with custom artwork by Katerina Limpitsouni
- RSS feed available at /feed.xml
