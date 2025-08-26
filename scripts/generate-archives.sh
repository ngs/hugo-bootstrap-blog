#!/bin/bash

# Generate date archive pages for Hugo
# This script creates archive pages for years, months, and days based on existing posts

CONTENT_DIR="${1:-exampleSite/content/en}"
ARCHIVES_DIR="$CONTENT_DIR/archives"

# Create archives directory if it doesn't exist
mkdir -p "$ARCHIVES_DIR"

# Function to create archive page
create_archive_page() {
    local path="$1"
    local title="$2"
    local url="$3"
    local year="$4"
    local month="${5:-}"
    local day="${6:-}"
    
    mkdir -p "$(dirname "$path")"
    
    cat > "$path" << EOF
---
title: "$title"
url: "$url"
layout: "archive"
---

EOF
    
    if [ -n "$day" ]; then
        echo "{{< date-archive year=\"$year\" month=\"$month\" day=\"$day\" >}}" >> "$path"
    elif [ -n "$month" ]; then
        echo "{{< date-archive year=\"$year\" month=\"$month\" >}}" >> "$path"
    else
        echo "{{< date-archive year=\"$year\" >}}" >> "$path"
    fi
}

# Get all unique years from posts
years=$(find "$CONTENT_DIR/posts" -name "*.md" -exec basename {} \; | grep -E '^[0-9]{4}-' | cut -d'-' -f1 | sort -u)

for year in $years; do
    # Create year archive
    create_archive_page "$ARCHIVES_DIR/$year/_index.md" "$year" "/$year/" "$year"
    
    # Get all unique months for this year
    months=$(find "$CONTENT_DIR/posts" -name "$year-*.md" -exec basename {} \; | cut -d'-' -f2 | sort -u)
    
    for month in $months; do
        month_name=$(date -jf "%m" "$month" "+%B" 2>/dev/null || date -d "$year-$month-01" "+%B" 2>/dev/null || echo "Month $month")
        month_int=$(echo "$month" | sed 's/^0*//')
        
        # Create month archive
        create_archive_page "$ARCHIVES_DIR/$year/$month/_index.md" "$month_name $year" "/$year/$month/" "$year" "$month_int"
        
        # Get all unique days for this year/month
        days=$(find "$CONTENT_DIR/posts" -name "$year-$month-*.md" -exec basename {} \; | cut -d'-' -f3 | sort -u)
        
        for day in $days; do
            day_int=$(echo "$day" | sed 's/^0*//')
            # Create day archive
            create_archive_page "$ARCHIVES_DIR/$year/$month/$day.md" "$month_name $day_int, $year" "/$year/$month/$day/" "$year" "$month_int" "$day_int"
        done
    done
done

echo "Archive pages generated successfully!"