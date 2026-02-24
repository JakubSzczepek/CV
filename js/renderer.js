/**
 * Renderer Module
 * Handles rendering of all CV sections with data from JSON
 * 
 * @module renderer
 * @author Jakub Szczepek
 * @version 1.0.0
 */

/**
 * Renderer Class
 * Manages rendering of all CV sections
 */
class Renderer {
  constructor() {
    this.data = null;
    this.observerInstances = [];
    this.animationTimeouts = [];
  }

  /**
   * Safe render wrapper - error boundary for each section
   * @param {string} sectionName - Name of section being rendered
   * @param {Function} renderFn - Render function to execute
   * @private
   */
  safeRender(sectionName, renderFn) {
    try {
      renderFn();
    } catch (error) {
      console.error(`[Renderer] Error rendering ${sectionName} section:`, error);
      // Continue rendering other sections
    }
  }

  /**
   * Render all sections with provided data
   * @param {Object} data - Candidate data object
   */
  renderAll(data) {
    if (!data) {
      console.error('[Renderer] No data provided for rendering');
      return;
    }

    this.data = data;
    console.log('[Renderer] Starting to render all sections');

    try {
      // Clean up previous observers to prevent memory leaks
      this.cleanup();

      // Render sections in order with error boundaries
      this.safeRender('personal', () => this.renderPersonal(data.personal));
      this.safeRender('hero', () => this.renderHero(data.personal, data.hero_description, data.ui_translations));
      this.safeRender('about', () => this.renderAbout(data.about));
      this.safeRender('skills', () => this.renderSkills(data.skills));
      this.safeRender('tools', () => this.renderTools(data.tools));
      this.safeRender('experience', () => this.renderExperience(data.experience));
      this.safeRender('education', () => this.renderEducation(data.education));
      this.safeRender('certificates', () => this.renderCertificates(data.certificates));
      this.safeRender('consent', () => this.renderConsent(data.consent));
      this.safeRender('contact', () => this.renderContact(data.personal));
      this.safeRender('socialLinks', () => this.renderSocialLinks(data.personal));

      // Initialize animations after rendering
      this.initScrollAnimations();

      console.log('[Renderer] All sections rendered successfully');
    } catch (error) {
      console.error('[Renderer] Error rendering sections:', error);
    }
  }

  /**
   * Render personal information in profile card
   * @param {Object} personal - Personal data object
   */
  renderPersonal(personal) {
    if (!personal) {
      console.error('[Renderer] No personal data provided');
      return;
    }

    try {
      // Profile avatar
      const avatar = document.querySelector('.profile-card__avatar');
      if (avatar && personal.profile_picture) {
        const imagePath = personal.profile_picture;
        avatar.src = imagePath;
        avatar.alt = personal.name || 'Profile picture';
        
        // Better SVG fallback for missing image
        avatar.onerror = () => {
          console.warn('[Renderer] Profile image not found, using SVG fallback');
          const initials = this.getInitials(personal.name);
          avatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%234f46e5' width='200' height='200'/%3E%3Ctext fill='%23ffffff' font-family='sans-serif' font-size='80' dy='130' font-weight='600' x='50%25' text-anchor='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
        };
      }

      // Profile name
      const firstname = document.querySelector('.profile-card__firstname');
      const lastname = document.querySelector('.profile-card__lastname');
      if (firstname && lastname && personal.name) {
        const nameParts = personal.name.split(' ');
        firstname.textContent = nameParts[0] || '';
        lastname.textContent = nameParts.slice(1).join(' ') || '';
      }

      // Contact information
      const infoItems = document.querySelectorAll('.profile-card__info-item');
      if (infoItems.length >= 2) {
        // Location
        const locationSpan = infoItems[0].querySelector('span');
        if (locationSpan && personal.address) {
          const city = this.extractCity(personal.address);
          locationSpan.textContent = city;
        }

        // Email
        const emailLink = infoItems[1].querySelector('a');
        if (emailLink && personal.email) {
          emailLink.href = `mailto:${personal.email}`;
          emailLink.textContent = personal.email;
        }
      }

      console.log('[Renderer] Personal section rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering personal section:', error);
    }
  }

  /**
   * Render hero section
   * @param {Object} personal - Personal data object
   * @param {string} heroDescription - Hero description text
   * @param {Object} uiTranslations - UI translations object
   */
  renderHero(personal, heroDescription, uiTranslations) {
    if (!heroDescription) {
      console.error('[Renderer] No hero description data provided');
      return;
    }

    try {
      // Hero description
      const heroDescriptionEl = document.querySelector('.hero__description');
      if (heroDescriptionEl && heroDescription) {
        heroDescriptionEl.textContent = heroDescription;
      }

      console.log('[Renderer] Hero section rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering hero section:', error);
    }
  }

  /**
   * Render about section
   * @param {string} about - About text
   */
  renderAbout(about) {
    if (!about) {
      console.error('[Renderer] No about data provided');
      return;
    }

    try {
      // Find the about content container
      const aboutContent = document.querySelector('.about__content');
      if (aboutContent && about) {
        // Clear existing content
        aboutContent.innerHTML = '';
        
        // Split into paragraphs if text contains double newlines
        const paragraphs = about.split(/\n\n+/);
        
        paragraphs.forEach((paragraph, index) => {
          const p = document.createElement('p');
          p.className = 'about__text';
          p.textContent = paragraph.trim();
          aboutContent.appendChild(p);
        });
      }

      console.log('[Renderer] About section rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering about section:', error);
    }
  }

  /**
   * Render skills section with circular progress
   * @param {Array} skills - Array of skill objects
   */
  renderSkills(skills) {
    if (!Array.isArray(skills)) {
      console.error('[Renderer] Skills must be an array');
      return;
    }

    try {
      const skillsGrid = document.querySelector('.skills__grid');
      if (!skillsGrid) {
        console.error('[Renderer] Skills grid not found');
        return;
      }

      // Clear existing skills
      skillsGrid.innerHTML = '';

      // Render each skill (skills use 1-5 scale)
      skills.forEach((skill, index) => {
        const skillCard = this.createSkillCard(skill, index, 'skill');
        skillsGrid.appendChild(skillCard);
      });

      // Animate circular progress
      this.animateCircularProgress();

      console.log(`[Renderer] Rendered ${skills.length} skills`);
    } catch (error) {
      console.error('[Renderer] Error rendering skills:', error);
    }
  }

  /**
   * Render tools section with circular progress
   * @param {Array} tools - Array of tool objects
   */
  renderTools(tools) {
    if (!Array.isArray(tools)) {
      console.error('[Renderer] Tools must be an array');
      return;
    }

    try {
      const toolsSection = document.querySelector('#tools .skills__grid');
      if (!toolsSection) {
        console.error('[Renderer] Tools grid not found');
        return;
      }

      // Clear existing tools
      toolsSection.innerHTML = '';

      // Render each tool (tools use 1-10 scale)
      tools.forEach((tool, index) => {
        const toolCard = this.createSkillCard(tool, index, 'tool');
        toolsSection.appendChild(toolCard);
      });

      // Animate circular progress
      this.animateCircularProgress();

      console.log(`[Renderer] Rendered ${tools.length} tools`);
    } catch (error) {
      console.error('[Renderer] Error rendering tools:', error);
    }
  }

  /**
   * Create a skill/tool card element
   * @param {Object} item - Skill or tool object
   * @param {number} index - Item index for animation delay
   * @param {string} type - Type of item: 'skill' (1-5 scale) or 'tool' (1-10 scale)
   * @returns {HTMLElement} Skill card element
   * @private
   */
  createSkillCard(item, index, type = 'skill') {
    if (!item || !item.name) {
      console.warn('[Renderer] Invalid skill/tool item:', item);
      return document.createElement('div');
    }

    const card = document.createElement('div');
    card.className = 'skill-card card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Calculate percentage based on type
    // Skills: 1-5 scale, Tools: 1-10 scale
    const maxLevel = type === 'skill' ? 5 : 10;
    const percentage = Math.round((item.level / maxLevel) * 100);

    // Determine skill level label
    const levelLabel = this.getSkillLevelLabel(percentage);

    // Create header
    const header = document.createElement('div');
    header.className = 'skill-card__header';

    const nameEl = document.createElement('h3');
    nameEl.className = 'skill-card__name';
    nameEl.textContent = item.name;

    const levelEl = document.createElement('span');
    levelEl.className = 'skill-card__level';
    levelEl.textContent = levelLabel;

    header.appendChild(nameEl);
    header.appendChild(levelEl);

    // Create circular progress
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'circular-progress';
    progressWrapper.setAttribute('data-progress', percentage);
    progressWrapper.setAttribute('role', 'progressbar');
    progressWrapper.setAttribute('aria-valuenow', percentage);
    progressWrapper.setAttribute('aria-valuemin', '0');
    progressWrapper.setAttribute('aria-valuemax', '100');
    progressWrapper.setAttribute('aria-label', `${item.name} proficiency: ${percentage}%`);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'circular-progress__svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('aria-hidden', 'true');

    const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    track.setAttribute('class', 'circular-progress__track');
    track.setAttribute('cx', '60');
    track.setAttribute('cy', '60');
    track.setAttribute('r', '54');

    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fill.setAttribute('class', 'circular-progress__fill');
    fill.setAttribute('cx', '60');
    fill.setAttribute('cy', '60');
    fill.setAttribute('r', '54');
    fill.style.setProperty('--progress', '0');
    
    // Set dynamic color based on percentage
    const progressColor = this.getProgressColor(percentage);
    fill.style.setProperty('--progress-color', progressColor);

    svg.appendChild(track);
    svg.appendChild(fill);

    const valueEl = document.createElement('span');
    valueEl.className = 'circular-progress__value';
    valueEl.textContent = `${percentage}%`;

    progressWrapper.appendChild(svg);
    progressWrapper.appendChild(valueEl);

    card.appendChild(header);
    card.appendChild(progressWrapper);

    return card;
  }

  /**
   * Get skill level label based on percentage
   * @param {number} percentage - Skill percentage
   * @returns {string} Level label
   * @private
   */
  getSkillLevelLabel(percentage) {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 75) return 'Advanced';
    if (percentage >= 60) return 'Proficient';
    if (percentage >= 40) return 'Intermediate';
    return 'Beginner';
  }

  /**
   * Get progress color based on percentage
   * @param {number} percentage - Skill percentage
   * @returns {string} Color value
   * @private
   */
  getProgressColor(percentage) {
    // Color gradient from red -> orange -> amber -> green
    if (percentage >= 90) return '#33D17A'; // Vibrant green (Expert)
    if (percentage >= 75) return '#4ADE80'; // Light green (Advanced)
    if (percentage >= 60) return '#F6A53A'; // Amber (Proficient)
    if (percentage >= 40) return '#FB923C'; // Orange (Intermediate)
    if (percentage >= 20) return '#F87171'; // Light red (Beginner)
    return '#EF4444'; // Red (Very beginner)
  }

  /**
   * Animate circular progress indicators
   * Uses CSS custom properties only to avoid conflicts
   * @private
   */
  animateCircularProgress() {
    // Clear previous animation timeouts to prevent conflicts
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];

    const progressElements = document.querySelectorAll('.circular-progress');
    
    progressElements.forEach((element, index) => {
      // Check if element exists and is valid
      if (!element || !element.dataset) {
        console.warn('[Renderer] Invalid progress element at index', index);
        return;
      }

      const progress = parseInt(element.dataset.progress, 10);
      const circle = element.querySelector('.circular-progress__fill');
      
      if (!circle) {
        console.warn('[Renderer] Progress fill circle not found at index', index);
        return;
      }

      // Use CSS custom property for animation
      // This avoids conflicts between CSS and JS
      const timeout = setTimeout(() => {
        try {
          // Set CSS custom property for smooth animation
          circle.style.setProperty('--progress', progress);
        } catch (error) {
          console.error('[Renderer] Error animating progress at index', index, error);
        }
      }, index * 50);

      this.animationTimeouts.push(timeout);
    });

    console.log(`[Renderer] Animated ${progressElements.length} progress indicators`);
  }

  /**
   * Render experience timeline
   * @param {Array} experience - Array of experience objects
   */
  renderExperience(experience) {
    try {
      const timeline = document.querySelector('.timeline');
      if (!timeline) {
        console.error('[Renderer] Timeline not found');
        return;
      }

      // Clear existing timeline
      timeline.innerHTML = '';

      // Render each experience
      experience.forEach((exp, index) => {
        const timelineItem = this.createTimelineItem(exp, index);
        timeline.appendChild(timelineItem);
      });

      console.log(`[Renderer] Rendered ${experience.length} experience items`);
    } catch (error) {
      console.error('[Renderer] Error rendering experience:', error);
    }
  }

  /**
   * Create a timeline item element
   * @param {Object} exp - Experience object
   * @param {number} index - Item index for animation delay
   * @returns {HTMLElement} Timeline item element
   * @private
   */
  createTimelineItem(exp, index) {
    if (!exp || !exp.title) {
      console.warn('[Renderer] Invalid experience item:', exp);
      return document.createElement('div');
    }

    const item = document.createElement('div');
    item.className = 'timeline__item';
    item.style.animationDelay = `${index * 0.15}s`;

    // Create marker
    const marker = document.createElement('div');
    marker.className = 'timeline__marker';
    marker.setAttribute('aria-hidden', 'true');

    // Create content card
    const content = document.createElement('div');
    content.className = 'timeline__content card';

    // Period
    const period = document.createElement('span');
    period.className = 'timeline__period';
    period.textContent = exp.period || '';

    // Title
    const title = document.createElement('h3');
    title.className = 'timeline__title';
    title.textContent = exp.title || '';

    // Company
    const company = document.createElement('p');
    company.className = 'timeline__company';
    company.textContent = exp.company || '';

    content.appendChild(period);
    content.appendChild(title);
    content.appendChild(company);

    // Tasks list
    if (exp.tasks && Array.isArray(exp.tasks) && exp.tasks.length > 0) {
      const tasksList = document.createElement('ul');
      tasksList.className = 'timeline__tasks';

      exp.tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
      });

      content.appendChild(tasksList);
    }

    item.appendChild(marker);
    item.appendChild(content);

    return item;
  }

  /**
   * Render education section
   * @param {Array} education - Array of education objects
   */
  renderEducation(education) {
    try {
      const educationGrid = document.querySelector('.education__grid');
      if (!educationGrid) {
        console.error('[Renderer] Education grid not found');
        return;
      }

      // Clear existing education
      educationGrid.innerHTML = '';

      // Render each education item
      education.forEach((edu, index) => {
        const educationCard = this.createEducationCard(edu, index);
        educationGrid.appendChild(educationCard);
      });

      console.log(`[Renderer] Rendered ${education.length} education items`);
    } catch (error) {
      console.error('[Renderer] Error rendering education:', error);
    }
  }

  /**
   * Create an education card element
   * @param {Object} edu - Education object
   * @param {number} index - Item index for animation delay
   * @returns {HTMLElement} Education card element
   * @private
   */
  createEducationCard(edu, index) {
    if (!edu || !edu.degree) {
      console.warn('[Renderer] Invalid education item:', edu);
      return document.createElement('div');
    }

    const card = document.createElement('div');
    card.className = 'education-card card';
    card.style.animationDelay = `${index * 0.15}s`;

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'education-card__icon';
    iconDiv.setAttribute('aria-hidden', 'true');
    iconDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L4 8l12 6 12-6-12-6zm0 14l-8-4v6c0 2.21 3.58 4 8 4s8-1.79 8-4v-6l-8 4z" fill="currentColor"/>
      </svg>
    `;

    // Content
    const content = document.createElement('div');
    content.className = 'education-card__content';

    // Period
    const period = document.createElement('span');
    period.className = 'education-card__period';
    period.textContent = edu.period || '';

    // Degree
    const degree = document.createElement('h3');
    degree.className = 'education-card__degree';
    degree.textContent = edu.degree || '';

    // School
    const school = document.createElement('p');
    school.className = 'education-card__school';
    school.textContent = edu.school || '';

    content.appendChild(period);
    content.appendChild(degree);
    content.appendChild(school);

    // Optional specialization
    if (edu.specialization) {
      const specialization = document.createElement('p');
      specialization.className = 'education-card__specialization';
      specialization.textContent = edu.specialization;
      content.appendChild(specialization);
    }

    card.appendChild(iconDiv);
    card.appendChild(content);

    return card;
  }

  /**
   * Render certificates section
   * @param {Array} certificates - Array of certificate objects
   */
  renderCertificates(certificates) {
    try {
      const certificatesList = document.querySelector('.certificates__list .badge-list');
      if (!certificatesList) {
        console.error('[Renderer] Certificates list not found');
        return;
      }

      // Clear existing certificates
      certificatesList.innerHTML = '';

      // Render each certificate
      if (certificates && certificates.length > 0) {
        certificates.forEach((cert, index) => {
          const badge = this.createCertificateBadge(cert, index);
          certificatesList.appendChild(badge);
        });

        console.log(`[Renderer] Rendered ${certificates.length} certificates`);
      }
    } catch (error) {
      console.error('[Renderer] Error rendering certificates:', error);
    }
  }

  /**
   * Create a certificate badge element
   * @param {Object} cert - Certificate object
   * @param {number} index - Item index for animation delay
   * @returns {HTMLElement} Badge element
   * @private
   */
  createCertificateBadge(cert, index) {
    if (!cert) {
      console.warn('[Renderer] Invalid certificate item:', cert);
      return document.createElement('div');
    }

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.style.animationDelay = `${index * 0.1}s`;

    // Icon
    const icon = document.createElement('div');
    icon.innerHTML = `
      <svg class="badge__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2l2.5 5 5.5.75-4 3.75 1 5.5L10 14.5 5 17l1-5.5-4-3.75 5.5-.75L10 2z" fill="currentColor"/>
      </svg>
    `;

    // Text
    const certText = cert.name || cert.type || 'Certificate';
    const text = document.createElement('span');
    text.className = 'badge__text';
    text.textContent = certText;

    badge.appendChild(icon.firstElementChild);
    badge.appendChild(text);

    return badge;
  }

  /**
   * Render consent/GDPR text
   * @param {string} consent - Consent text
   */
  renderConsent(consent) {
    try {
      const consentElement = document.querySelector('.footer__text');
      if (consentElement && consent) {
        // Find the span with data-lang-key or add consent to footer
        const existingText = consentElement.innerHTML;
        
        // Add consent as a separate paragraph or append to footer
        const footer = document.querySelector('.footer__container');
        if (footer) {
          let consentParagraph = footer.querySelector('.footer__consent');
          
          if (!consentParagraph) {
            consentParagraph = document.createElement('p');
            consentParagraph.className = 'footer__consent';
            footer.appendChild(consentParagraph);
          }
          
          consentParagraph.textContent = consent;
          consentParagraph.style.fontSize = '0.75rem';
          consentParagraph.style.marginTop = '1rem';
          consentParagraph.style.opacity = '0.7';
        }
      }

      console.log('[Renderer] Consent section rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering consent:', error);
    }
  }

  /**
   * Initialize scroll animations using Intersection Observer
   * @private
   */
  initScrollAnimations() {
    try {
      // Clear previous observers to prevent memory leaks
      this.observerInstances.forEach(observer => {
        try {
          observer.disconnect();
        } catch (error) {
          console.error('[Renderer] Error disconnecting observer:', error);
        }
      });
      this.observerInstances = [];

      // Create intersection observer
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Unobserve after animation to save resources
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe sections
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        observer.observe(section);
      });

      // Observe cards
      const cards = document.querySelectorAll('.card, .skill-card, .timeline__item, .education-card');
      cards.forEach(card => {
        observer.observe(card);
      });

      this.observerInstances.push(observer);

      console.log('[Renderer] Scroll animations initialized');
    } catch (error) {
      console.error('[Renderer] Error initializing scroll animations:', error);
    }
  }

  /**
   * Extract city from full address
   * @param {string} address - Full address string
   * @returns {string} City name
   * @private
   */
  extractCity(address) {
    if (!address || typeof address !== 'string') return '';
    
    // Try to extract city from address
    // Format: "ul. Aleksandry 4/1, 30-867 Kraków"
    const parts = address.split(',');
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 1].trim();
      // Remove postal code
      const city = cityPart.replace(/^\d{2}-\d{3}\s+/, '');
      return city;
    }
    return address;
  }

  /**
   * Get initials from name
   * @param {string} name - Full name
   * @returns {string} Initials
   * @private
   */
  getInitials(name) {
    if (!name || typeof name !== 'string') return 'JS';
    
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length === 0) return 'JS';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /**
   * Render contact section
   * @param {Object} personal - Personal data object
   */
  renderContact(personal) {
    if (!personal || !personal.email) {
      console.warn('[Renderer] No contact email provided');
      return;
    }

    try {
      // Update email button in contact section
      const contactEmailBtn = document.querySelector('.contact__actions .btn[href^="mailto"]');
      if (contactEmailBtn) {
        contactEmailBtn.href = `mailto:${personal.email}`;
      }

      console.log('[Renderer] Contact section rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering contact section:', error);
    }
  }

  /**
   * Render social links
   * @param {Object} personal - Personal data with social_links
   */
  renderSocialLinks(personal) {
    if (!personal || !personal.social_links) {
      console.warn('[Renderer] No social links data provided');
      return;
    }

    try {
      const socialLinks = personal.social_links;
      
      // Render hero social links
      const heroSocial = document.getElementById('hero-social-links');
      if (heroSocial) {
        this.updateSocialLinks(heroSocial, socialLinks, false);
      }

      // Render contact social links
      const contactSocial = document.getElementById('contact-social-links');
      if (contactSocial) {
        this.updateSocialLinks(contactSocial, socialLinks, true);
      }

      console.log('[Renderer] Social links rendered');
    } catch (error) {
      console.error('[Renderer] Error rendering social links:', error);
    }
  }

  /**
   * Update social links in a container
   * @param {HTMLElement} container - Container element
   * @param {Object} links - Social links object
   * @param {boolean} large - Whether to use large icons
   * @private
   */
  updateSocialLinks(container, links, large = false) {
    if (!container) return;

    // Clear existing links
    container.innerHTML = '';

    const iconClass = large ? 'icon-btn icon-btn--large' : 'icon-btn';
    const iconSize = large ? 28 : 24;

    // GitHub
    if (links.github) {
      const github = this.createSocialLink(
        links.github,
        'GitHub',
        iconClass,
        iconSize,
        this.getGitHubIcon(iconSize)
      );
      container.appendChild(github);
    }

    // LinkedIn
    if (links.linkedin) {
      const linkedin = this.createSocialLink(
        links.linkedin,
        'LinkedIn',
        iconClass,
        iconSize,
        this.getLinkedInIcon(iconSize)
      );
      container.appendChild(linkedin);
    }

    // Twitter removed as per user request
  }

  /**
   * Create social link element
   * @param {string} href - Link URL
   * @param {string} label - Aria label
   * @param {string} className - CSS class
   * @param {number} iconSize - Icon size
   * @param {string} iconSvg - SVG icon HTML
   * @returns {HTMLElement} Link element
   * @private
   */
  createSocialLink(href, label, className, iconSize, iconSvg) {
    const link = document.createElement('a');
    link.href = href;
    link.className = className;
    link.setAttribute('aria-label', label);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.innerHTML = iconSvg;
    return link;
  }

  /**
   * Get GitHub icon SVG
   * @param {number} size - Icon size
   * @returns {string} SVG HTML
   * @private
   */
  getGitHubIcon(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`;
  }

  /**
   * Get LinkedIn icon SVG
   * @param {number} size - Icon size
   * @returns {string} SVG HTML
   * @private
   */
  getLinkedInIcon(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`;
  }

  /**
   * Get Twitter icon SVG
   * @param {number} size - Icon size
   * @returns {string} SVG HTML
   * @private
   */
  getTwitterIcon(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.04-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.06 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/></svg>`;
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   * @private
   */
  escapeHtml(text) {
    if (!text) return '';
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Clean up resources and prepare for re-render
   */
  cleanup() {
    // Disconnect all observers
    this.observerInstances.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.error('[Renderer] Error disconnecting observer:', error);
      }
    });
    this.observerInstances = [];

    // Clear animation timeouts
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
    
    console.log('[Renderer] Resources cleaned up');
  }

  /**
   * Destroy renderer and clean up all resources
   */
  destroy() {
    this.cleanup();
    this.data = null;
    console.log('[Renderer] Renderer destroyed');
  }
}

// Create and export singleton instance
const renderer = new Renderer();

export default renderer;
export { Renderer };
