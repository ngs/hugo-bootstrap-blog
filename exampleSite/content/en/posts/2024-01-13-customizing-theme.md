---
title: "Customizing the Bootstrap Blog Theme"
slug: "customizing-theme"
date: 2024-01-13T14:00:00Z
description: "Learn how to customize the Bootstrap Blog theme to match your style"
categories: ["Tutorial", "Customization"]
tags: ["Hugo", "Bootstrap", "CSS", "Customization"]
toc: true
author: "John Doe"
---

## Introduction

The Bootstrap Blog theme is highly customizable. This guide will show you how to modify various aspects of the theme to match your personal style and requirements.

## Color Scheme

### Using Bootstrap Variables

The theme uses Bootstrap 5.3, which means you can customize colors using Bootstrap's CSS variables:

```css
:root {
  --bs-primary: #0066cc;
  --bs-secondary: #6c757d;
  --bs-success: #28a745;
  --bs-info: #17a2b8;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
}
```

### Dark Mode Colors

Customize dark mode colors in `assets/scss/_dark-mode.scss`:

```scss
[data-bs-theme="dark"] {
  background-color: #1a1a1a;
  color: #e9ecef;
  
  a {
    color: #66b3ff;
  }
}
```

## Sidebar Configuration

### Module Order

Control the order of sidebar modules in your `hugo.toml`:

```toml
[params]
  sidebarModules = [
    "search",
    "profile", 
    "categories",
    "tags",
    "recent",
    "archives",
    "social"
  ]
```

### Custom Modules

You can create custom sidebar modules by:

1. Creating a new partial in `layouts/partials/sidebar/`
2. Adding it to your sidebar configuration

Example custom module:

```html
<!-- layouts/partials/sidebar/custom.html -->
<div class="sidebar-module">
    <h4>Custom Module</h4>
    <p>Your custom content here</p>
</div>
```

## Typography

### Font Family

Change the font family in `assets/scss/_variables.scss`:

```scss
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Font Sizes

Adjust font sizes:

```scss
$font-size-base: 1rem;
$h1-font-size: $font-size-base * 2.5;
$h2-font-size: $font-size-base * 2;
$h3-font-size: $font-size-base * 1.75;
```

## Layout Options

### Sidebar Position

Choose between left or right sidebar:

```toml
[params]
  sidebarPosition = "left" # or "right"
```

### Container Width

Modify the maximum container width:

```scss
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);
```

## Adding Features

### Comments System

Add Disqus comments:

```toml
[params]
  comments = true
  disqusShortname = "your-disqus-shortname"
```

### Analytics

Add Google Analytics:

```toml
googleAnalytics = "UA-XXXXXXXXX-X"
```

### Social Links

Add more social links:

```toml
[params.social]
  twitter = "https://twitter.com/yourusername"
  github = "https://github.com/yourusername"
  linkedin = "https://linkedin.com/in/yourusername"
  facebook = "https://facebook.com/yourusername"
  instagram = "https://instagram.com/yourusername"
  youtube = "https://youtube.com/yourusername"
```

## Custom CSS

Add your custom CSS by creating a file at `assets/css/custom.css` and including it in your head partial:

```html
<!-- layouts/partials/head.html -->
<link rel="stylesheet" href="{{ "css/custom.css" | relURL }}">
```

## Custom JavaScript

Similarly, add custom JavaScript:

```html
<!-- layouts/partials/footer.html -->
<script src="{{ "js/custom.js" | relURL }}"></script>
```

## Building for Production

When you're ready to deploy:

1. Build your CSS:
   ```bash
   npm run build
   ```

2. Generate your site:
   ```bash
   hugo --minify
   ```

## Conclusion

The Bootstrap Blog theme provides extensive customization options while maintaining clean, maintainable code. Experiment with different settings to create a unique blog that reflects your style!
