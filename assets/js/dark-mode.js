// Dark mode toggle functionality with OS preference support
(function() {
  'use strict';
  
  // Function to get OS theme preference
  function getOSThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Function to get effective theme
  function getEffectiveTheme(mode) {
    if (mode === 'auto' || !mode) {
      return getOSThemePreference();
    }
    return mode;
  }
  
  // Get saved mode (can be 'light', 'dark', 'auto', or null)
  const savedMode = localStorage.getItem('theme-mode');
  const effectiveTheme = getEffectiveTheme(savedMode);
  
  // Apply the theme on initial load
  document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('darkModeToggle');
    const toggleIcon = document.getElementById('darkModeIcon');
    
    if (!toggleButton || !toggleIcon) return;
    
    // Update icon based on current theme and mode
    updateIcon(effectiveTheme, savedMode || 'auto', toggleIcon);
    
    // Add click event listener to toggle button
    toggleButton.addEventListener('click', function() {
      const currentMode = localStorage.getItem('theme-mode') || 'auto';
      let newMode;
      
      // Cycle through: auto -> light -> dark -> auto
      switch(currentMode) {
        case 'auto':
          newMode = 'light';
          break;
        case 'light':
          newMode = 'dark';
          break;
        case 'dark':
          newMode = 'auto';
          break;
        default:
          newMode = 'auto';
      }
      
      // Save new mode
      if (newMode === 'auto') {
        localStorage.removeItem('theme-mode');
      } else {
        localStorage.setItem('theme-mode', newMode);
      }
      
      // Apply effective theme
      const effectiveTheme = getEffectiveTheme(newMode);
      document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
      
      // Update icon
      updateIcon(effectiveTheme, newMode, toggleIcon);
      
      // Update button title for accessibility
      updateButtonTitle(toggleButton, newMode);
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const currentMode = localStorage.getItem('theme-mode') || 'auto';
        
        // Only update if in auto mode
        if (currentMode === 'auto' || !currentMode) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-bs-theme', newTheme);
          if (toggleIcon) {
            updateIcon(newTheme, 'auto', toggleIcon);
          }
        }
      });
    }
    
    // Set initial button title
    updateButtonTitle(toggleButton, savedMode || 'auto');
  });
  
  function updateIcon(theme, mode, iconElement) {
    // Remove all possible classes
    iconElement.classList.remove('bi-moon-fill', 'bi-sun-fill', 'bi-circle-half');
    
    // Add appropriate icon based on mode
    if (mode === 'auto') {
      iconElement.classList.add('bi-circle-half');
    } else if (theme === 'dark') {
      iconElement.classList.add('bi-sun-fill');
    } else {
      iconElement.classList.add('bi-moon-fill');
    }
  }
  
  function updateButtonTitle(button, mode) {
    const titles = {
      'auto': 'Theme: Auto (following system)',
      'light': 'Theme: Light',
      'dark': 'Theme: Dark'
    };
    button.setAttribute('title', titles[mode] || titles['auto']);
  }
})();