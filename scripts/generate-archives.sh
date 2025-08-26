#!/bin/bash

# Generate archive pages for both English and Japanese content
# This script creates year, month, and day archive pages based on existing posts

set -e

# Change to the project root directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Function to generate archives for a specific language
generate_archives() {
    local lang=$1
    local lang_name=$2
    
    echo "Generating archives for $lang_name ($lang)..."
    
    # Set paths
    local content_dir="exampleSite/content/$lang"
    local post_dir="$content_dir/posts"
    local archives_dir="$content_dir/archives"
    
    if [ ! -d "$post_dir" ]; then
        echo "  No posts directory found for $lang"
        return
    fi
    
    # Clean up existing archive directory
    if [ -d "$archives_dir" ]; then
        echo "  Cleaning up existing archives..."
        rm -rf "$archives_dir"
    fi
    
    # Create archives directory
    mkdir -p "$archives_dir"
    
    # Get all unique years from post files (format: YYYY-MM-DD-*.md)
    years=$(find "$post_dir" -name "*.md" -type f | \
            sed -n 's/.*\/\([0-9]\{4\}\)-[0-9]\{2\}-[0-9]\{2\}-.*/\1/p' | \
            sort -u)
    
    if [ -z "$years" ]; then
        echo "  No date-prefixed posts found"
        return
    fi
    
    for year in $years; do
        # Create year archive directory
        year_dir="$archives_dir/$year"
        mkdir -p "$year_dir"
        
        # Set title based on language
        if [ "$lang" = "ja" ]; then
            year_title="${year}年のアーカイブ"
        else
            year_title="$year Archives"
        fi
        
        # Create year index file with correct URL format
        if [ "$lang" = "en" ]; then
            archive_url="/$year/"
        else
            archive_url="/$lang/$year/"
        fi
        
        cat > "$year_dir/_index.md" << EOF
---
title: "$year_title"
layout: archive
type: archive
url: $archive_url
---

{{< archive-posts year="$year" lang="$lang" >}}
EOF
        echo "  Created year archive: $year"
        
        # Get all unique months for this year
        months=$(find "$post_dir" -name "${year}-*.md" -type f | \
                sed -n "s/.*\/${year}-\([0-9]\{2\}\)-[0-9]\{2\}-.*/\1/p" | \
                sort -u)
        
        for month in $months; do
            # Create month archive directory
            month_dir="$year_dir/$month"
            mkdir -p "$month_dir"
            
            # Convert month number to integer (remove leading zero)
            month_num=$((10#$month))
            
            # Set title based on language
            if [ "$lang" = "ja" ]; then
                month_title="${year}年${month_num}月のアーカイブ"
            else
                # Month names in English
                case $month_num in
                    1)  month_name="January" ;;
                    2)  month_name="February" ;;
                    3)  month_name="March" ;;
                    4)  month_name="April" ;;
                    5)  month_name="May" ;;
                    6)  month_name="June" ;;
                    7)  month_name="July" ;;
                    8)  month_name="August" ;;
                    9)  month_name="September" ;;
                    10) month_name="October" ;;
                    11) month_name="November" ;;
                    12) month_name="December" ;;
                esac
                month_title="$month_name $year Archives"
            fi
            
            # Create month index file with correct URL format
            if [ "$lang" = "en" ]; then
                archive_url="/$year/$month/"
            else
                archive_url="/$lang/$year/$month/"
            fi
            
            cat > "$month_dir/_index.md" << EOF
---
title: "$month_title"
layout: archive
type: archive
url: $archive_url
---

{{< archive-posts year="$year" month="$month_num" lang="$lang" >}}
EOF
            echo "    Created month archive: $year/$month"
            
            # Get all unique days for this month
            days=$(find "$post_dir" -name "${year}-${month}-*.md" -type f | \
                  sed -n "s/.*\/${year}-${month}-\([0-9]\{2\}\)-.*/\1/p" | \
                  sort -u)
            
            for day in $days; do
                # Create day archive directory
                day_dir="$month_dir/$day"
                mkdir -p "$day_dir"
                
                # Convert day number to integer (remove leading zero)
                day_num=$((10#$day))
                
                # Set title based on language
                if [ "$lang" = "ja" ]; then
                    day_title="${year}年${month_num}月${day_num}日のアーカイブ"
                else
                    day_title="$month_name $day_num, $year Archives"
                fi
                
                # Create day index file with correct URL format
                if [ "$lang" = "en" ]; then
                    archive_url="/$year/$month/$day/"
                else
                    archive_url="/$lang/$year/$month/$day/"
                fi
                
                cat > "$day_dir/_index.md" << EOF
---
title: "$day_title"
layout: archive
type: archive
url: $archive_url
---

{{< archive-posts year="$year" month="$month_num" day="$day_num" lang="$lang" >}}
EOF
                echo "      Created day archive: $year/$month/$day"
            done
        done
    done
    
    # Count total archives created
    local total_archives=$(find "$archives_dir" -name "_index.md" | wc -l | tr -d ' ')
    echo "  Total archives created: $total_archives"
    echo ""
}

# Main execution
echo "========================================="
echo "Hugo Archive Generator"
echo "========================================="
echo ""

# Generate archives for English
generate_archives "en" "English"

# Generate archives for Japanese
generate_archives "ja" "Japanese"

echo "========================================="
echo "All archive pages have been generated successfully!"
echo "========================================="