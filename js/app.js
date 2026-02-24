/**
 * Main Application Entry Point
 * Coordinates all modules and initializes the CV application
 * 
 * @module app
 * @author Jakub Szczepek
 * @version 1.0.0
 */

import dataLoader from './dataLoader.js';
import languageSwitcher from './languageSwitcher.js';
import renderer from './renderer.js';

/**
 * Application Class
 * Main coordinator for the CV application
 */
class App {
  constructor() {
    this.initialized = false;
    this.currentLanguage = null;
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.initialized) {
      console.warn('[App] Application already initialized');
      return;
    }

    console.log('[App] Initializing CV application...');

    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Clear hash from URL without reloading
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    try {
      // Show loading state
      this.showLoading();

      // Initialize language switcher first (to detect preferred language)
      this.currentLanguage = languageSwitcher.init();

      // Register language change handler
      languageSwitcher.onLanguageChange((newLang, prevLang) => {
        this.handleLanguageChange(newLang, prevLang);
      });

      // Load initial data
      await this.loadAndRender(this.currentLanguage);

      // Set up additional event listeners
      this.setupEventListeners();

      // Initialize smooth scroll
      this.initSmoothScroll();

      // Initialize keyboard navigation
      this.initKeyboardNavigation();

      // Initialize focus management
      this.initFocusManagement();

      // Hide loading state
      this.hideLoading();

      this.initialized = true;
      console.log('[App] Application initialized successfully');

    } catch (error) {
      console.error('[App] Error initializing application:', error);
      this.showError(error);
      this.hideLoading();
    }
  }

  /**
   * Load data and render all sections
   * @param {string} lang - Language code
   * @private
   */
  async loadAndRender(lang) {
    try {
      console.log(`[App] Loading data for language: ${lang}`);

      // Load data
      const data = await dataLoader.loadData(lang);

      // Translate UI elements
      if (data.ui_translations) {
        this.translateUI(data.ui_translations);
      }

      // Render all sections
      renderer.renderAll(data);

      this.currentLanguage = lang;

    } catch (error) {
      console.error('[App] Error loading and rendering:', error);
      throw error;
    }
  }

  /**
   * Translate UI elements with data-lang-key attributes
   * @param {Object} translations - UI translations object
   * @private
   */
  translateUI(translations) {
    if (!translations || typeof translations !== 'object') {
      console.warn('[App] Invalid translations object');
      return;
    }

    try {
      // Find all elements with data-lang-key
      const elements = document.querySelectorAll('[data-lang-key]');
      
      elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (!key) return;

        // Navigate through nested translation object
        const translation = this.getNestedTranslation(translations, key);
        
        if (translation) {
          // Use textContent to prevent XSS
          element.textContent = translation;
        } else {
          console.warn(`[App] Translation not found for key: ${key}`);
        }
      });

      console.log(`[App] Translated ${elements.length} UI elements`);
    } catch (error) {
      console.error('[App] Error translating UI:', error);
    }
  }

  /**
   * Get nested translation from object using dot notation
   * @param {Object} obj - Translations object
   * @param {string} key - Dot-notated key (e.g., 'nav.about')
   * @returns {string|null} Translation or null if not found
   * @private
   */
  getNestedTranslation(obj, key) {
    const keys = key.split('.');
    let current = obj;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return null;
      }
    }

    return typeof current === 'string' ? current : null;
  }

  /**
   * Handle language change event
   * @param {string} newLang - New language code
   * @param {string} prevLang - Previous language code
   * @private
   */
  async handleLanguageChange(newLang, prevLang) {
    console.log(`[App] Language changed from ${prevLang} to ${newLang}`);

    try {
      // Show loading state
      this.showLoading();

      // Load and render new data
      await this.loadAndRender(newLang);

      // Hide loading state
      this.hideLoading();

      // Announce to screen readers
      this.announceLanguageChange(newLang);

    } catch (error) {
      console.error('[App] Error handling language change:', error);
      this.showError(error);
      this.hideLoading();
    }
  }

  /**
   * Set up global event listeners
   * @private
   */
  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation__menu');

    if (mobileMenuToggle && navigation) {
      mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navigation.classList.toggle('navigation__menu--open');
        
        // Trap focus when menu is open
        if (!isExpanded) {
          this.trapFocus(navigation);
        } else {
          this.releaseFocus();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
          if (isExpanded) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navigation.classList.remove('navigation__menu--open');
            this.releaseFocus();
            mobileMenuToggle.focus();
          }
        }
      });
    }

    // Close mobile menu when clicking navigation links
    const navLinks = document.querySelectorAll('.navigation__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenuToggle && navigation) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          navigation.classList.remove('navigation__menu--open');
          this.releaseFocus();
        }
      });
    });

    console.log('[App] Event listeners set up');
  }

  /**
   * Initialize smooth scroll behavior
   * @private
   */
  initSmoothScroll() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip empty anchors
        if (href === '#' || href === '#!') return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();

          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }

          // Set focus on target for accessibility
          setTimeout(() => {
            targetElement.focus({ preventScroll: true });
            
            // If element can't receive focus, make it focusable temporarily
            if (document.activeElement !== targetElement) {
              targetElement.setAttribute('tabindex', '-1');
              targetElement.focus({ preventScroll: true });
            }
          }, 500);
        }
      });
    });

    console.log('[App] Smooth scroll initialized');
  }

  /**
   * Initialize keyboard navigation enhancements
   * @private
   */
  initKeyboardNavigation() {
    // Navigation menu keyboard support
    const menuItems = document.querySelectorAll('.navigation__link');
    
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        let targetIndex;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = (index + 1) % menuItems.length;
            menuItems[targetIndex].focus();
            break;

          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = (index - 1 + menuItems.length) % menuItems.length;
            menuItems[targetIndex].focus();
            break;

          case 'Home':
            e.preventDefault();
            menuItems[0].focus();
            break;

          case 'End':
            e.preventDefault();
            menuItems[menuItems.length - 1].focus();
            break;
        }
      });
    });

    // Button keyboard support (Space and Enter)
    const buttons = document.querySelectorAll('button:not([disabled])');
    buttons.forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

    console.log('[App] Keyboard navigation initialized');
  }

  /**
   * Initialize focus management
   * @private
   */
  initFocusManagement() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-primary, #4f46e5);
      color: white;
      padding: 0.5rem 1rem;
      text-decoration: none;
      z-index: 10000;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ID to main if not exists
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main';
    }

    console.log('[App] Focus management initialized');
  }

  /**
   * Trap focus within an element (for modals/menus)
   * @param {HTMLElement} element - Element to trap focus in
   * @private
   */
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store reference for cleanup
    this.focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);

    // Focus first element
    firstElement.focus();
  }

  /**
   * Release focus trap
   * @private
   */
  releaseFocus() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }

  /**
   * Show loading state
   * @private
   */
  showLoading() {
    let loader = document.querySelector('.app-loader');

    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'app-loader';
      loader.setAttribute('role', 'status');
      loader.setAttribute('aria-live', 'polite');
      loader.setAttribute('aria-label', 'Loading content');
      
      loader.innerHTML = `
        <div class="app-loader__spinner"></div>
        <span class="app-loader__text">Loading...</span>
      `;

      loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        gap: 1rem;
      `;

      const spinner = loader.querySelector('.app-loader__spinner');
      spinner.style.cssText = `
        width: 48px;
        height: 48px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--color-primary, #4f46e5);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      `;

      // Add keyframes for spinner animation
      if (!document.querySelector('#spinner-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spinner-keyframes';
        style.textContent = `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(loader);
    }

    loader.style.display = 'flex';
  }

  /**
   * Hide loading state
   * @private
   */
  hideLoading() {
    const loader = document.querySelector('.app-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  /**
   * Show error message
   * @param {Error} error - Error object
   * @private
   */
  showError(error) {
    // Remove existing error
    const existingError = document.querySelector('.app-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error message
    const errorEl = document.createElement('div');
    errorEl.className = 'app-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('aria-live', 'assertive');

    errorEl.innerHTML = `
      <div class="app-error__content">
        <h2 class="app-error__title">Error Loading Content</h2>
        <p class="app-error__message">${this.escapeHtml(error.message)}</p>
        <button class="app-error__retry" onclick="location.reload()">Retry</button>
      </div>
    `;

    errorEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      max-width: 400px;
      text-align: center;
    `;

    document.body.appendChild(errorEl);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (errorEl.parentNode) {
        errorEl.remove();
      }
    }, 10000);
  }

  /**
   * Announce language change to screen readers
   * @param {string} lang - New language code
   * @private
   */
  announceLanguageChange(lang) {
    const announcement = lang === 'pl' 
      ? 'Język zmieniony na polski' 
      : 'Language changed to English';

    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;

    // Add screen reader only styles
    announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      announcer.remove();
    }, 1000);
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   * @private
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Clean up and destroy app instance
   */
  destroy() {
    console.log('[App] Cleaning up application...');
    
    // Clean up renderer
    renderer.destroy();

    // Release focus trap if active
    this.releaseFocus();

    // Remove custom elements
    const loader = document.querySelector('.app-loader');
    const error = document.querySelector('.app-error');
    const skipLink = document.querySelector('.skip-link');

    [loader, error, skipLink].forEach(el => {
      if (el && el.parentNode) {
        el.remove();
      }
    });

    this.initialized = false;
    console.log('[App] Application destroyed');
  }
}

// Create app instance
const app = new App();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  });
} else {
  // DOM already loaded
  app.init();
}

// Export for potential external use
export default app;
export { App };
