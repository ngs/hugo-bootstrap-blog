#!/bin/bash

# Add slug field to all posts based on filename
# Format: YYYY-MM-DD-slug.md -> slug: "slug"

set -e

# Change to the project root directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Function to add slug to posts
add_slugs() {
    local lang=$1
    local post_dir="exampleSite/content/$lang/posts"
    
    echo "Processing $lang posts..."
    
    if [ ! -d "$post_dir" ]; then
        echo "  No posts directory found for $lang"
        return
    fi
    
    # Find all date-prefixed posts
    for file in "$post_dir"/*-*-*-*.md; do
        if [ ! -f "$file" ]; then
            continue
        fi
        
        # Extract filename without path
        filename=$(basename "$file" .md)
        
        # Extract slug from filename (remove date prefix)
        slug=$(echo "$filename" | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//')
        
        # Check if slug field already exists
        if grep -q "^slug:" "$file"; then
            echo "  Slug already exists in: $filename"
            continue
        fi
        
        # Add slug field after title field
        # Create temporary file
        temp_file="${file}.tmp"
        
        # Process the file
        awk -v slug="$slug" '
            BEGIN { slug_added = 0 }
            /^title:/ && !slug_added {
                print $0
                print "slug: \"" slug "\""
                slug_added = 1
                next
            }
            { print }
        ' "$file" > "$temp_file"
        
        # Replace original file
        mv "$temp_file" "$file"
        
        echo "  Added slug to: $filename -> slug: \"$slug\""
    done
}

echo "========================================="
echo "Adding slugs to posts"
echo "========================================="
echo ""

# Process English posts
add_slugs "en"

# Process Japanese posts
add_slugs "ja"

echo ""
echo "========================================="
echo "Slug addition complete!"
echo "========================================="