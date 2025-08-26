---
title: "Getting Started with Bootstrap Blog Theme"
date: 2024-01-15T10:00:00Z
description: "Learn how to get started with the Bootstrap Blog theme for Hugo"
categories: ["Tutorial"]
tags: ["Hugo", "Bootstrap", "Getting Started"]
image: "/images/getting-started.jpg"
toc: true
author: "John Doe"
---

## Introduction

Welcome to the Bootstrap Blog theme for Hugo! This theme provides a clean, modern, and fully responsive design for your blog, powered by Bootstrap 5.3 and packed with features.

## Features

### Responsive Design

The theme is fully responsive and looks great on all devices, from mobile phones to desktop computers.

### Dark Mode Support

Toggle between light and dark modes with a single click. The theme automatically respects your system preferences.

### Modular Sidebar

Customize your sidebar with various modules:
- Search functionality
- Categories and tags
- Recent posts
- Archives
- Author profile
- And more!

## Installation

### Step 1: Install Hugo

First, make sure you have Hugo installed. You need Hugo version 0.120.0 or later.

```bash
brew install hugo
```

### Step 2: Create a New Site

```bash
hugo new site my-blog
cd my-blog
```

### Step 3: Install the Theme

You can install the theme as a Git submodule:

```bash
git init
git submodule add https://github.com/ngs/hugo-bootstrap-blog themes/hugo-bootstrap-blog
```

Or using Hugo Modules:

```bash
hugo mod init github.com/yourusername/my-blog
hugo mod get go.ngs.io/hugo-bootstrap-blog
```

### Step 4: Configure Your Site

Copy the example configuration from the theme:

```bash
cp themes/hugo-bootstrap-blog/exampleSite/hugo.toml .
```

## Configuration

### Basic Settings

Edit your `hugo.toml` file to customize your site:

```toml
baseURL = "https://yourdomain.com/"
title = "My Awesome Blog"
theme = "hugo-bootstrap-blog"
```

### Sidebar Modules

Configure which modules appear in your sidebar:

```toml
[params]
  sidebarModules = ["search", "categories", "tags", "recent", "archives"]
```

## Creating Content

Create your first blog post:

```bash
hugo new posts/my-first-post.md
```

## Conclusion

You're now ready to start blogging with the Bootstrap Blog theme! Explore the configuration options to customize the theme to your liking.