// @ts-check
const { test } = require('@playwright/test');
const path = require('path');

test.describe('Screenshot Generation', () => {
  test('capture homepage screenshot', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Take desktop screenshot
    await page.screenshot({
      path: path.join(__dirname, '..', 'images', 'screenshot.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 900,
        height: 600
      }
    });
    
    // Take thumbnail
    await page.screenshot({
      path: path.join(__dirname, '..', 'images', 'tn.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 900,
        height: 600
      }
    });
  });

  test('capture mobile screenshot', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await page.screenshot({
      path: path.join(__dirname, '..', 'images', 'mobile-screenshot.png'),
      fullPage: false
    });
  });

  test('capture dark mode screenshot', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Toggle dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    });
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Take dark mode screenshot
    await page.screenshot({
      path: path.join(__dirname, '..', 'images', 'dark-mode-screenshot.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 900,
        height: 600
      }
    });
  });

  test('capture post page screenshot', async ({ page }) => {
    // Navigate to a post
    await page.goto('/posts/');
    
    // Click on first post if available
    const firstPost = await page.locator('.blog-post .post-title a').first();
    if (await firstPost.isVisible()) {
      await firstPost.click();
      await page.waitForLoadState('networkidle');
      
      // Take post screenshot
      await page.screenshot({
        path: path.join(__dirname, '..', 'images', 'post-screenshot.png'),
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 900,
          height: 600
        }
      });
    }
  });
});