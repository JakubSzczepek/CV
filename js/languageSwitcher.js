/**
 * Language Switcher Module
 * Handles language switching, preference persistence, and UI updates
 * 
 * @module languageSwitcher
 * @author Jakub Szczepek
 * @version 1.0.0
 */

const LANGUAGE_PREFERENCE_KEY = 'cv_language_preference';
const SUPPORTED_LANGUAGES = ['pl', 'en'];
const DEFAULT_LANGUAGE = 'pl';

/**
 * Language Switcher Class
 * Manages application language state and switching functionality
 */
class LanguageSwitcher {
  constructor() {
    this.currentLanguage = null;
    this.onLanguageChangeCallbacks = [];
    this.toggleButton = null;
  }

  /**
   * Initialize language switcher
   * Sets up event listeners and initial language
   * @returns {string} Detected or default language
   */
  init() {
    // Get toggle button
    this.toggleButton = document.querySelector('.language-toggle');
    
    if (!this.toggleButton) {
      console.error('[LanguageSwitcher] Toggle button not found');
      return DEFAULT_LANGUAGE;
    }

    // Detect initial language
    const detectedLang = this.detectLanguage();
    this.currentLanguage = detectedLang;

    // Set up event listeners
    this.setupEventListeners();

    // Update UI to reflect current language
    this.updateToggleUI(detectedLang);

    console.log(`[LanguageSwitcher] Initialized with language: ${detectedLang}`);
    return detectedLang;
  }

  /**
   * Detect user's preferred language
   * Priority: localStorage > browser language > default
   * @returns {string} Detected language code
   * @private
   */
  detectLanguage() {
    // 1. Check localStorage for saved preference
    const savedLang = this.getSavedLanguage();
    if (savedLang && this.isValidLanguage(savedLang)) {
      console.log(`[LanguageSwitcher] Using saved language: ${savedLang}`);
      return savedLang;
    }

    // 2. Check browser language
    const browserLang = this.getBrowserLanguage();
    if (browserLang && this.isValidLanguage(browserLang)) {
      console.log(`[LanguageSwitcher] Using browser language: ${browserLang}`);
      return browserLang;
    }

    // 3. Use default language
    console.log(`[LanguageSwitcher] Using default language: ${DEFAULT_LANGUAGE}`);
    return DEFAULT_LANGUAGE;
  }

  /**
   * Get saved language from localStorage
   * @returns {string|null} Saved language or null
   * @private
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    } catch (error) {
      console.error('[LanguageSwitcher] Error reading saved language:', error);
      return null;
    }
  }

  /**
   * Get browser's preferred language
   * @returns {string|null} Browser language code or null
   * @private
   */
  getBrowserLanguage() {
    try {
      const browserLang = navigator.language || navigator.userLanguage;
      
      if (!browserLang) return null;

      // Extract language code (e.g., 'en-US' -> 'en')
      const langCode = browserLang.toLowerCase().split('-')[0];
      
      return langCode;
    } catch (error) {
      console.error('[LanguageSwitcher] Error detecting browser language:', error);
      return null;
    }
  }

  /**
   * Validate language code
   * @param {string} lang - Language code to validate
   * @returns {boolean} True if valid, false otherwise
   * @private
   */
  isValidLanguage(lang) {
    return SUPPORTED_LANGUAGES.includes(lang);
  }

  /**
   * Set up event listeners for language toggle
   * @private
   */
  setupEventListeners() {
    // Click on entire toggle button
    this.toggleButton.addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Click on individual language options
    const languageOptions = this.toggleButton.querySelectorAll('[data-lang-value]');
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent double triggering
        const targetLang = option.dataset.langValue;
        if (targetLang !== this.currentLanguage) {
          this.switchLanguage(targetLang);
        }
      });
    });

    // Keyboard support
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleLanguage();
      }
    });

    console.log('[LanguageSwitcher] Event listeners set up');
  }

  /**
   * Toggle between languages
   */
  toggleLanguage() {
    const newLang = this.currentLanguage === 'pl' ? 'en' : 'pl';
    this.switchLanguage(newLang);
  }

  /**
   * Switch to specific language
   * @param {string} lang - Language code to switch to
   */
  switchLanguage(lang) {
    // Validate language
    if (!this.isValidLanguage(lang)) {
      console.error(`[LanguageSwitcher] Invalid language: ${lang}`);
      return;
    }

    // Check if already on this language
    if (lang === this.currentLanguage) {
      console.log(`[LanguageSwitcher] Already on language: ${lang}`);
      return;
    }

    console.log(`[LanguageSwitcher] Switching from ${this.currentLanguage} to ${lang}`);

    // Update current language
    const previousLang = this.currentLanguage;
    this.currentLanguage = lang;

    // Save preference
    this.saveLanguage(lang);

    // Update UI
    this.updateToggleUI(lang);
    this.updateDocumentLanguage(lang);
    this.updateAriaLabels(lang);

    // Trigger callbacks
    this.triggerLanguageChange(lang, previousLang);
  }

  /**
   * Save language preference to localStorage
   * @param {string} lang - Language code to save
   * @private
   */
  saveLanguage(lang) {
    try {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, lang);
      console.log(`[LanguageSwitcher] Language preference saved: ${lang}`);
    } catch (error) {
      console.error('[LanguageSwitcher] Error saving language preference:', error);
    }
  }

  /**
   * Update toggle button UI
   * @param {string} lang - Current language code
   * @private
   */
  updateToggleUI(lang) {
    const options = this.toggleButton.querySelectorAll('[data-lang-value]');
    
    options.forEach(option => {
      const optionLang = option.dataset.langValue;
      
      if (optionLang === lang) {
        option.classList.add('language-toggle__option--active');
        option.setAttribute('aria-current', 'true');
      } else {
        option.classList.remove('language-toggle__option--active');
        option.removeAttribute('aria-current');
      }
    });

    // Update button data attribute
    this.toggleButton.dataset.lang = lang;
  }

  /**
   * Update document language attribute
   * @param {string} lang - Language code
   * @private
   */
  updateDocumentLanguage(lang) {
    document.documentElement.lang = lang;
  }

  /**
   * Update ARIA labels for accessibility
   * @param {string} lang - Language code
   * @private
   */
  updateAriaLabels(lang) {
    const ariaLabel = lang === 'pl' 
      ? 'Przełącz język na angielski' 
      : 'Switch language to Polish';
    
    this.toggleButton.setAttribute('aria-label', ariaLabel);
  }

  /**
   * Register callback for language change events
   * @param {Function} callback - Callback function to execute on language change
   */
  onLanguageChange(callback) {
    if (typeof callback === 'function') {
      this.onLanguageChangeCallbacks.push(callback);
      console.log('[LanguageSwitcher] Language change callback registered');
    } else {
      console.error('[LanguageSwitcher] Invalid callback provided');
    }
  }

  /**
   * Trigger all registered language change callbacks
   * @param {string} newLang - New language code
   * @param {string} previousLang - Previous language code
   * @private
   */
  triggerLanguageChange(newLang, previousLang) {
    console.log(`[LanguageSwitcher] Triggering ${this.onLanguageChangeCallbacks.length} callback(s)`);
    
    this.onLanguageChangeCallbacks.forEach((callback, index) => {
      try {
        callback(newLang, previousLang);
      } catch (error) {
        console.error(`[LanguageSwitcher] Error in callback ${index}:`, error);
      }
    });
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get supported languages
   * @returns {Array<string>} Array of supported language codes
   */
  getSupportedLanguages() {
    return [...SUPPORTED_LANGUAGES];
  }
}

// Create and export singleton instance
const languageSwitcher = new LanguageSwitcher();

export default languageSwitcher;
export { LanguageSwitcher, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };
