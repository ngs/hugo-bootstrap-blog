---
title: "Markdown Syntax Guide"
date: 2024-01-14T09:00:00Z
description: "A comprehensive guide to Markdown syntax supported by this theme"
categories: ["Tutorial", "Documentation"]
tags: ["Markdown", "Syntax", "Writing"]
toc: true
author: "John Doe"
---

## Headings

Markdown supports six levels of headings:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Emphasis

You can add emphasis to your text:

*This text is italicized*
_This is also italicized_

**This text is bold**
__This is also bold__

***This text is bold and italic***
___This is also bold and italic___

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered Lists

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

## Links and Images

### Links

[This is a link to Hugo](https://gohugo.io)

[This is a link with a title](https://gohugo.io "Hugo Static Site Generator")

### Images

![Alt text for image](/images/sample.jpg)

## Code

### Inline Code

Use `backticks` for inline code.

### Code Blocks

```javascript
// JavaScript code
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
# Python code
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > Blockquotes can be nested.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |

## Horizontal Rules

Use three or more hyphens, asterisks, or underscores:

---

***

___

## Task Lists

- [x] Completed task
- [ ] Uncompleted task
- [x] Another completed task

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## HTML

You can also use <mark>HTML tags</mark> directly in Markdown.

<details>
<summary>Click to expand</summary>

This is hidden content that can be expanded.

</details>

## Conclusion

This guide covers the most common Markdown syntax elements. The Bootstrap Blog theme renders all of these elements beautifully with proper styling.