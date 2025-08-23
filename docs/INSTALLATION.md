# Installation Guide

## Method 1: Hugo Modules (Recommended)

### Prerequisites
- Hugo 0.120.0 or later
- Git
- Go 1.19+ (optional, Hugo will download if needed)

### Steps

1. Initialize your site as a Hugo Module:
```bash
cd your-site
hugo mod init github.com/yourusername/your-site
```

2. Add the theme as a module:
```bash
hugo mod get go.ngs.io/hugo-bootstrap-blog
```

3. Configure your site:
```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "get go.ngs.io/hugo-bootstrap-blog"
```

### Benefits of Hugo Modules
- **No copying files**: Theme files stay in Hugo's module cache
- **Version control**: Pin to specific versions or commits
- **Easy updates**: `hugo mod get -u` to update
- **Selective mounting**: Import only what you need
- **Dependency management**: Handles transitive dependencies

### Advanced Configuration

Mount specific directories:
```toml
[module]
  [[module.imports]]
    path = "github.com/ngs/hugo-bootstrap-blog"
    # Only mount specific directories
    [[module.imports.mounts]]
      source = "layouts"
      target = "layouts"
    [[module.imports.mounts]]
      source = "assets"
      target = "assets"
    [[module.imports.mounts]]
      source = "i18n"
      target = "i18n"
    [[module.imports.mounts]]
      source = "static"
      target = "static"
```

Override theme files:
```bash
# Create your own version - it will take precedence
mkdir -p layouts/partials
echo "<!-- My custom header -->" > layouts/partials/header.html
```

## Method 2: Git Submodule

```bash
# Add as submodule
git submodule add https://github.com/ngs/hugo-bootstrap-blog themes/hugo-bootstrap-blog
git submodule update --init --recursive

# Update theme
cd themes/hugo-bootstrap-blog
git pull origin main
```

```toml
# hugo.toml
theme = "hugo-bootstrap-blog"
```

## Method 3: Direct Download

1. Download the theme:
```bash
cd themes
git clone https://github.com/ngs/hugo-bootstrap-blog
# OR
wget https://github.com/ngs/hugo-bootstrap-blog/archive/main.zip
unzip main.zip
```

2. Configure:
```toml
# hugo.toml
theme = "hugo-bootstrap-blog"
```

## File Structure After Installation

### With Hugo Modules (Nothing to copy!)
```
your-site/
├── content/
│   └── posts/
├── hugo.toml
├── go.mod          # Created by hugo mod init
└── go.sum          # Created automatically
```

### With Git Submodule or Direct Download
```
your-site/
├── content/
│   └── posts/
├── themes/
│   └── hugo-bootstrap-blog/
│       ├── layouts/
│       ├── assets/
│       ├── i18n/
│       └── ...
└── hugo.toml
```

## Customization

### Override Theme Files
Create the same file path in your site root to override:

```bash
# Override the footer
mkdir -p layouts/partials
cp themes/hugo-bootstrap-blog/layouts/partials/footer.html layouts/partials/
# Edit layouts/partials/footer.html
```

### Extend Theme Configuration
```toml
# hugo.toml
baseURL = "https://example.com/"
languageCode = "en"
title = "My Blog"

# Use Hugo Module
[module]
  [[module.imports]]
    path = "github.com/ngs/hugo-bootstrap-blog"

# Theme parameters
[params]
  darkMode = true
  sidebarModules = ["search", "categories", "tags", "recent"]
  
[params.author]
  name = "Your Name"
  bio = "Your bio"
```

## Updating the Theme

### Hugo Modules
```bash
# Update to latest version
hugo mod get -u

# Update to specific version
hugo mod get github.com/ngs/hugo-bootstrap-blog@v1.2.3

# Update all modules
hugo mod get -u ./...
```

### Git Submodule
```bash
cd themes/hugo-bootstrap-blog
git pull origin main
cd ../..
git add themes/hugo-bootstrap-blog
git commit -m "Update theme"
```

## Troubleshooting

### Module Cache Issues
```bash
# Clear module cache
hugo mod clean

# Download modules again
hugo mod download
```

### Version Conflicts
```bash
# Check module graph
hugo mod graph

# Vendor modules locally
hugo mod vendor
```

## Production Build

```bash
# Build your site
hugo --minify

# With specific environment
hugo --environment production --minify
```

## Resources

- [Hugo Modules Documentation](https://gohugo.io/hugo-modules/)
- [Theme Repository](https://github.com/ngs/hugo-bootstrap-blog)
- [Hugo Documentation](https://gohugo.io/documentation/)