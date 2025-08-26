// Client-side search functionality
(function() {
  'use strict';
  
  let searchIndex = [];
  let lunrIndex = null;
  
  // Initialize search when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Load search index
    loadSearchIndex();
    
    // Add input event listener with debouncing
    let debounceTimer;
    searchInput.addEventListener('input', function(e) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch(e.target.value);
      }, 300);
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        e.target.value = '';
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
      }
    });
  });
  
  function loadSearchIndex() {
    fetch('/index.json')
      .then(response => response.json())
      .then(data => {
        searchIndex = data;
        // Initialize Lunr index
        lunrIndex = lunr(function() {
          this.ref('uri');
          this.field('title', { boost: 10 });
          this.field('content');
          this.field('tags', { boost: 5 });
          this.field('categories', { boost: 5 });
          
          searchIndex.forEach(doc => {
            this.add(doc);
          });
        });
      })
      .catch(error => {
        console.error('Error loading search index:', error);
      });
  }
  
  function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query || query.length < 2) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }
    
    if (!lunrIndex) {
      searchResults.innerHTML = '<div class="alert alert-info">Search index is loading...</div>';
      searchResults.style.display = 'block';
      return;
    }
    
    try {
      const results = lunrIndex.search(query);
      displayResults(results, query);
    } catch (error) {
      console.error('Search error:', error);
      searchResults.innerHTML = '<div class="alert alert-danger">Search error occurred</div>';
      searchResults.style.display = 'block';
    }
  }
  
  function displayResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="alert alert-info">No results found for "${query}"</div>`;
      searchResults.style.display = 'block';
      return;
    }
    
    let html = '<div class="list-group">';
    
    results.slice(0, 10).forEach(result => {
      const item = searchIndex.find(post => post.uri === result.ref);
      if (item) {
        const excerpt = getExcerpt(item.content, query);
        html += `
          <a href="${item.uri}" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">${highlightMatch(item.title, query)}</h6>
              <small>${formatDate(item.date)}</small>
            </div>
            <p class="mb-1 text-muted small">${excerpt}</p>
            ${item.tags ? `<small class="text-muted">Tags: ${item.tags.join(', ')}</small>` : ''}
          </a>
        `;
      }
    });
    
    html += '</div>';
    
    if (results.length > 10) {
      html += `<div class="alert alert-info mt-2">Showing top 10 of ${results.length} results</div>`;
    }
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
  }
  
  function getExcerpt(content, query) {
    const cleanContent = content.replace(/<[^>]*>/g, '');
    const queryIndex = cleanContent.toLowerCase().indexOf(query.toLowerCase());
    
    if (queryIndex === -1) {
      return cleanContent.substring(0, 150) + '...';
    }
    
    const start = Math.max(0, queryIndex - 50);
    const end = Math.min(cleanContent.length, queryIndex + query.length + 100);
    let excerpt = cleanContent.substring(start, end);
    
    if (start > 0) excerpt = '...' + excerpt;
    if (end < cleanContent.length) excerpt += '...';
    
    return highlightMatch(excerpt, query);
  }
  
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
})();