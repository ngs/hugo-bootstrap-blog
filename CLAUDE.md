# Hugo Bootstrap Blog Theme - Project Requirements

## Overview
A clean, modern, and customizable Hugo theme for blogging with Bootstrap 5.3, featuring a modular sidebar system, dark mode support, and full responsiveness.

## Project Information
- **Theme Name**: Bootstrap Blog
- **Repository**: https://github.com/ngs/hugo-bootstrap-blog
- **License**: MIT
- **Minimum Hugo Version**: 0.120.0
- **Hugo Modules**: Enabled

## Key Features
- Simple and user-friendly design
- Modular sidebar system with configurable widgets
- High performance (Lighthouse score 95+)
- Fully responsive design
- Dark mode support
- SEO optimized
- Accessibility compliant (WCAG 2.1 AA)
- Multi-language support (English/Japanese)

## Technical Stack
- **CSS Framework**: Bootstrap 5.3 (latest stable)
- **Icons**: Bootstrap Icons
- **Hugo Features**: Hugo Modules, Partials, i18n
- **JavaScript**: Minimal, vanilla JS for search and dark mode toggle
- **Search**: Client-side search with Lunr.js

## Layout Structure
### Main Layout
- Two-column layout: main content + sidebar
- Sidebar position: Right side (configurable)
- Mobile: Sidebar moves below content or off-canvas menu

### Sidebar Modules (Widgets)
#### Required Modules
1. **Search Box** - Client-side search functionality
2. **Categories** - List of post categories with post count
3. **Tag Cloud** - Visual tag display with weighted sizes
4. **Recent Posts** - Latest 5-10 posts
5. **Archives** - Monthly/yearly post archives

#### Optional Modules
1. **Author Profile** - Bio, avatar, social links
2. **Table of Contents** - For single post pages
3. **Social Links** - Icons linking to social profiles
4. **Advertisement Space** - Placeholder for ads
5. **Related Posts** - On single post pages

### Page Types
1. **Home Page** - List of recent posts with pagination
2. **Single Post** - Article with metadata, content, and comments
3. **List Pages** - Category, tag, and archive pages
4. **Static Pages** - About, Contact, etc.

## Content Features
### Post Metadata
- Title
- Date (created/updated)
- Author
- Categories
- Tags
- Reading time
- Featured image
- Description/excerpt

### SEO & Social
- Open Graph meta tags
- Twitter Card support
- Structured data (JSON-LD)
- XML sitemap
- RSS/Atom feeds
- Canonical URLs

## Styling & UX
### Design Principles
- Clean, minimal design
- Focus on readability
- Consistent spacing and typography
- Mobile-first approach

### Dark Mode
- System preference detection
- Manual toggle switch
- Persistent user preference (localStorage)
- Smooth transitions

### Responsive Breakpoints
- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: ≥ 992px

## Performance Requirements
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 100
- No render-blocking resources
- Optimized images (lazy loading, responsive images)
- Minimal JavaScript

## i18n Support
### Languages
- English (en) - Default
- Japanese (ja)

### Translatable Elements
- UI text (navigation, buttons, labels)
- Date formats
- Sidebar module titles
- Meta descriptions
- 404 page content

## Configuration
### Site Configuration (hugo.toml)
```toml
[params]
  # Sidebar modules configuration
  sidebar_modules = ["search", "categories", "tags", "recent", "archives"]
  
  # Dark mode
  dark_mode = true
  
  # Layout
  sidebar_position = "right" # left or right
  
  # Social links
  [params.social]
    twitter = ""
    github = ""
    linkedin = ""
  
  # Author
  [params.author]
    name = ""
    bio = ""
    avatar = ""
```

## Directory Structure
```
hugo-bootstrap-blog/
├── LICENSE (MIT)
├── README.md
├── theme.toml
├── go.mod (Hugo Modules)
├── package.json (npm scripts for build tools)
├── archetypes/
│   └── default.md
├── assets/
│   ├── scss/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   └── _dark-mode.scss
│   └── js/
│       ├── search.js
│       └── dark-mode.js
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   ├── single.html
│   │   └── terms.html
│   ├── partials/
│   │   ├── head.html
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── sidebar.html
│   │   └── sidebar/
│   │       ├── search.html
│   │       ├── categories.html
│   │       ├── tags.html
│   │       ├── recent.html
│   │       └── archives.html
│   └── index.html
├── i18n/
│   ├── en.yaml
│   └── ja.yaml
├── static/
│   └── (compiled assets)
├── exampleSite/
│   ├── hugo.toml
│   ├── content/
│   │   ├── posts/
│   │   └── pages/
│   └── static/
└── images/
    ├── screenshot.png
    └── tn.png (thumbnail)
```

## Development & Testing
### Build Tools
- npm scripts for SCSS compilation
- Hugo server for development
- Playwright for screenshot generation

### Automation (GitHub Actions)
1. **CI Pipeline**
   - Build theme
   - Run Hugo with exampleSite
   - Validate HTML
   - Check Lighthouse scores

2. **Screenshot Generation**
   - Automated screenshot on main branch updates
   - Generate both desktop and mobile views
   - Create thumbnail automatically

### Testing Checklist
- [ ] Hugo builds without errors
- [ ] All links work correctly
- [ ] Responsive design works on all breakpoints
- [ ] Dark mode toggles properly
- [ ] Sidebar modules load correctly
- [ ] Search functionality works
- [ ] i18n switches languages properly
- [ ] Lighthouse scores meet requirements
- [ ] Accessibility: keyboard navigation works
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## Hugo Theme Gallery Requirements
- Complete `theme.toml` with all metadata
- Working `exampleSite/` with demo content
- Screenshots (screenshot.png: 900x600px, tn.png: 900x600px)
- Clear README with installation and usage instructions
- MIT license file
- No console errors or warnings
- Mobile-responsive design
- Proper HTML5 semantic markup

## Future Enhancements (Post-MVP)
- Comments system integration (Disqus, utterances)
- Google Analytics/Plausible integration
- Newsletter subscription
- Reading progress bar
- Copy code button for code blocks
- Image gallery/lightbox
- Social share buttons
- Pagination options (infinite scroll)
- Multiple layout options for lists
- Custom shortcodes