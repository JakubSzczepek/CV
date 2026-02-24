/**
 * Data Loader Module
 * Handles fetching, caching, and error handling for candidate data
 * 
 * @module dataLoader
 * @author Jakub Szczepek
 * @version 1.0.0
 */

const CACHE_PREFIX = 'cv_data_';
const CACHE_EXPIRY_KEY = 'cv_data_expiry_';
const CACHE_DURATION = 0; // DISABLED FOR DEVELOPMENT - was: 1000 * 60 * 60 * 24 (24 hours)

// Auto-clear cache in development mode (localhost)
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
if (isDevelopment) {
  // Clear cache on page load in development
  const cacheKeys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX) || key.startsWith(CACHE_EXPIRY_KEY));
  if (cacheKeys.length > 0) {
    cacheKeys.forEach(key => localStorage.removeItem(key));
    console.log('[DataLoader] Development mode: Cleared cache automatically');
  }
}

/**
 * Data Loader Class
 * Manages loading and caching of candidate data for different languages
 */
class DataLoader {
  constructor() {
    this.data = null;
    this.currentLang = null;
    this.loadingState = false;
  }

  /**
   * Load candidate data for specified language
   * @param {string} lang - Language code ('pl' or 'en')
   * @returns {Promise<Object>} Candidate data object
   * @throws {Error} If data loading fails
   */
  async loadData(lang = 'pl') {
    // Validate language parameter
    if (!['pl', 'en'].includes(lang)) {
      console.warn(`Invalid language "${lang}", defaulting to "pl"`);
      lang = 'pl';
    }

    // Return cached data if available and valid
    const cachedData = this.getCachedData(lang);
    if (cachedData) {
      console.log(`[DataLoader] Using cached data for language: ${lang}`);
      this.data = cachedData;
      this.currentLang = lang;
      return cachedData;
    }

    // Set loading state
    this.loadingState = true;

    try {
      console.log(`[DataLoader] Fetching fresh data for language: ${lang}`);
      
      // Load common data and language-specific data
      const [commonResponse, langResponse] = await Promise.all([
        fetch('data/common.json'),
        fetch(`data/${lang}.json`)
      ]);

      // Check response statuses
      if (!commonResponse.ok) {
        throw new Error(`HTTP error loading common data! Status: ${commonResponse.status}`);
      }
      if (!langResponse.ok) {
        throw new Error(`HTTP error loading ${lang} data! Status: ${langResponse.status}`);
      }

      // Parse JSON data
      const commonData = await commonResponse.json();
      const langData = await langResponse.json();

      // Merge data
      const data = this.mergeData(commonData, langData);

      // Validate data structure
      if (!this.validateData(data)) {
        throw new Error('Invalid data structure received from server');
      }

      // Cache the data
      this.setCachedData(lang, data);

      // Update instance state
      this.data = data;
      this.currentLang = lang;
      this.loadingState = false;

      console.log(`[DataLoader] Successfully loaded data for language: ${lang}`);
      return data;

    } catch (error) {
      this.loadingState = false;
      console.error('[DataLoader] Error loading data:', error);
      
      // Try to return stale cache if available (graceful degradation)
      const staleCache = this.getStaleCache(lang);
      if (staleCache) {
        console.warn('[DataLoader] Using stale cache due to loading error');
        this.data = staleCache;
        this.currentLang = lang;
        return staleCache;
      }

      throw new Error(`Failed to load candidate data: ${error.message}`);
    }
  }

  /**
   * Merge common data with language-specific data
   * @param {Object} common - Common data
   * @param {Object} lang - Language-specific data
   * @returns {Object} Merged data object
   * @private
   */
  mergeData(common, lang) {
    // Merge personal info (common + lang-specific address)
    const personal = {
      ...common.personal,
      ...lang.personal
    };

    // Map skills with language-specific names
    const skills = common.skills.map(skill => ({
      name: lang.skill_names[skill.name_key] || skill.name_key,
      level: skill.level
    }));

    // Map experience with language-specific data
    const experience = common.experience.map(exp => ({
      period: lang.experience_data[exp.period_key],
      title: lang.experience_data[exp.title_key],
      company: exp.company,
      tasks: lang.experience_data[exp.tasks_key]
    }));

    // Map education with language-specific data
    const education = common.education.map(edu => ({
      period: edu.period,
      degree: lang.education_data[edu.degree_key],
      school: lang.education_data[edu.school_key],
      specialization: lang.education_data[edu.specialization_key]
    }));

    // Map certificates
    const certificates = common.certificates_keys.map(key => 
      lang.certificates_data[key]
    );

    return {
      ui_translations: lang.ui_translations,
      personal,
      hero_description: lang.hero_description,
      about: lang.about,
      skills,
      tools: common.tools,
      experience,
      education,
      certificates,
      consent: lang.consent
    };
  }

  /**
   * Validate data structure
   * @param {Object} data - Data object to validate
   * @returns {boolean} True if valid, false otherwise
   * @private
   */
  validateData(data) {
    try {
      // Check required top-level properties
      const requiredProps = ['personal', 'about', 'skills', 'tools', 'experience', 'education'];
      
      for (const prop of requiredProps) {
        if (!data.hasOwnProperty(prop)) {
          throw new Error(`Missing required property: ${prop}`);
        }
      }

      // Validate ui_translations (optional but should be object if present)
      if (data.ui_translations && typeof data.ui_translations !== 'object') {
        throw new Error('ui_translations must be an object');
      }

      // Validate personal data structure
      if (!data.personal || typeof data.personal !== 'object') {
        throw new Error('Invalid personal data - must be an object');
      }

      const personalRequiredFields = ['name', 'email'];
      for (const field of personalRequiredFields) {
        if (!data.personal[field] || typeof data.personal[field] !== 'string') {
          throw new Error(`Personal data missing or invalid field: ${field}`);
        }
      }

      // Validate about is a string
      if (typeof data.about !== 'string') {
        throw new Error('About field must be a string');
      }

      // Validate arrays
      const arrayProps = ['skills', 'tools', 'experience', 'education'];
      for (const prop of arrayProps) {
        if (!Array.isArray(data[prop])) {
          throw new Error(`Property "${prop}" must be an array`);
        }
      }

      // Validate skills structure
      for (let i = 0; i < data.skills.length; i++) {
        const skill = data.skills[i];
        if (!skill.name || typeof skill.name !== 'string') {
          throw new Error(`Skill at index ${i} missing or invalid name`);
        }
        if (typeof skill.level !== 'number' || skill.level < 1 || skill.level > 5) {
          throw new Error(`Skill "${skill.name}" has invalid level (must be 1-5)`);
        }
      }

      // Validate tools structure
      for (let i = 0; i < data.tools.length; i++) {
        const tool = data.tools[i];
        if (!tool.name || typeof tool.name !== 'string') {
          throw new Error(`Tool at index ${i} missing or invalid name`);
        }
        if (typeof tool.level !== 'number' || tool.level < 1 || tool.level > 10) {
          throw new Error(`Tool "${tool.name}" has invalid level (must be 1-10)`);
        }
      }

      // Validate experience structure
      for (let i = 0; i < data.experience.length; i++) {
        const exp = data.experience[i];
        const requiredExpFields = ['period', 'title', 'company'];
        for (const field of requiredExpFields) {
          if (!exp[field] || typeof exp[field] !== 'string') {
            throw new Error(`Experience at index ${i} missing or invalid field: ${field}`);
          }
        }
        if (exp.tasks && !Array.isArray(exp.tasks)) {
          throw new Error(`Experience "${exp.title}" tasks must be an array`);
        }
      }

      // Validate education structure
      for (let i = 0; i < data.education.length; i++) {
        const edu = data.education[i];
        const requiredEduFields = ['period', 'degree', 'school'];
        for (const field of requiredEduFields) {
          if (!edu[field] || typeof edu[field] !== 'string') {
            throw new Error(`Education at index ${i} missing or invalid field: ${field}`);
          }
        }
      }

      // Validate certificates if present
      if (data.certificates) {
        if (!Array.isArray(data.certificates)) {
          throw new Error('Certificates must be an array');
        }
        for (let i = 0; i < data.certificates.length; i++) {
          const cert = data.certificates[i];
          if (!cert.name || typeof cert.name !== 'string') {
            throw new Error(`Certificate at index ${i} missing or invalid name`);
          }
        }
      }

      console.log('[DataLoader] Data validation passed');
      return true;

    } catch (error) {
      console.error('[DataLoader] Data validation failed:', error.message);
      throw new Error(`Data validation failed: ${error.message}`);
    }
  }

  /**
   * Get cached data for specified language
   * @param {string} lang - Language code
   * @returns {Object|null} Cached data or null if not found/expired
   * @private
   */
  getCachedData(lang) {
    try {
      const cacheKey = CACHE_PREFIX + lang;
      const expiryKey = CACHE_EXPIRY_KEY + lang;

      // Check if cache exists
      const cachedString = localStorage.getItem(cacheKey);
      const expiryString = localStorage.getItem(expiryKey);

      if (!cachedString || !expiryString) {
        return null;
      }

      // Check if cache is expired
      const expiryTime = parseInt(expiryString, 10);
      const now = Date.now();

      if (now > expiryTime) {
        console.log(`[DataLoader] Cache expired for language: ${lang}`);
        this.clearCache(lang);
        return null;
      }

      // Parse and return cached data
      return JSON.parse(cachedString);

    } catch (error) {
      console.error('[DataLoader] Error reading cache:', error);
      return null;
    }
  }

  /**
   * Get stale cache (expired but still available)
   * Used as fallback when loading fails
   * @param {string} lang - Language code
   * @returns {Object|null} Stale cached data or null
   * @private
   */
  getStaleCache(lang) {
    try {
      const cacheKey = CACHE_PREFIX + lang;
      const cachedString = localStorage.getItem(cacheKey);

      if (!cachedString) {
        return null;
      }

      return JSON.parse(cachedString);

    } catch (error) {
      console.error('[DataLoader] Error reading stale cache:', error);
      return null;
    }
  }

  /**
   * Set cached data for specified language
   * @param {string} lang - Language code
   * @param {Object} data - Data to cache
   * @private
   */
  setCachedData(lang, data) {
    try {
      const cacheKey = CACHE_PREFIX + lang;
      const expiryKey = CACHE_EXPIRY_KEY + lang;
      const expiryTime = Date.now() + CACHE_DURATION;

      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(expiryKey, expiryTime.toString());

      console.log(`[DataLoader] Data cached for language: ${lang}`);

    } catch (error) {
      console.error('[DataLoader] Error caching data:', error);
      // Non-critical error, continue execution
    }
  }

  /**
   * Clear cached data for specified language
   * @param {string} lang - Language code
   */
  clearCache(lang) {
    try {
      const cacheKey = CACHE_PREFIX + lang;
      const expiryKey = CACHE_EXPIRY_KEY + lang;

      localStorage.removeItem(cacheKey);
      localStorage.removeItem(expiryKey);

      console.log(`[DataLoader] Cache cleared for language: ${lang}`);

    } catch (error) {
      console.error('[DataLoader] Error clearing cache:', error);
    }
  }

  /**
   * Clear all cached data
   */
  clearAllCache() {
    this.clearCache('pl');
    this.clearCache('en');
  }

  /**
   * Check if data is currently loading
   * @returns {boolean} True if loading, false otherwise
   */
  isLoading() {
    return this.loadingState;
  }

  /**
   * Get current data without reloading
   * @returns {Object|null} Current data or null if not loaded
   */
  getCurrentData() {
    return this.data;
  }

  /**
   * Get current language
   * @returns {string|null} Current language code or null if not loaded
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// Create and export singleton instance
const dataLoader = new DataLoader();

export default dataLoader;
export { DataLoader };
