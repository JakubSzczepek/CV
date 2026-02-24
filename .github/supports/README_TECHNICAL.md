# Dwujęzyczne CV - Dokumentacja Techniczna

## 📋 Przegląd

Nowoczesna, w pełni responsywna aplikacja webowa CV z obsługą dwóch języków (Polski/Angielski), zbudowana z wykorzystaniem czystego JavaScript ES6+ i modularnej architektury.

## 🏗️ Architektura

### Struktura Plików

```
noweCV/
├── index.html                 # Główny plik HTML
├── candidate_data.json        # Dane w języku polskim
├── candidate_data_en.json     # Dane w języku angielskim
├── css/
│   ├── tokens.css            # Design tokens (kolory, typografia)
│   ├── layout.css            # Layout i grid system
│   ├── components.css        # Komponenty UI
│   ├── utilities.css         # Utility classes
│   └── animations.css        # Animacje i dynamiczne style
└── js/
    ├── app.js                # Główny punkt wejścia
    ├── dataLoader.js         # Ładowanie i cachowanie danych
    ├── languageSwitcher.js   # Obsługa przełączania języków
    └── renderer.js           # Renderowanie sekcji UI
```

## 🚀 Główne Moduły

### 1. **dataLoader.js** - Zarządzanie Danymi

**Odpowiedzialność:**
- Ładowanie danych JSON z plików
- Cachowanie w localStorage (24h)
- Walidacja struktury danych
- Graceful degradation (stale cache przy błędach)

**Kluczowe Metody:**
```javascript
loadData(lang)           // Ładuje dane dla wybranego języka
validateData(data)       // Waliduje strukturę danych
getCachedData(lang)      // Pobiera dane z cache
setCachedData(lang, data) // Zapisuje dane do cache
clearCache(lang)         // Czyści cache dla języka
```

**Bezpieczeństwo:**
- Timeout dla żądań HTTP
- Walidacja typów danych
- Obsługa błędów sieci
- XSS prevention w renderowaniu

### 2. **languageSwitcher.js** - Przełączanie Języków

**Odpowiedzialność:**
- Detekcja preferencji językowych (localStorage → browser → default)
- Przełączanie między PL/EN
- Persystencja wyboru w localStorage
- Aktualizacja aria-labels dla accessibility

**Kluczowe Metody:**
```javascript
init()                      // Inicjalizacja switchera
detectLanguage()           // Wykrywa preferowany język
switchLanguage(lang)       // Przełącza na wybrany język
onLanguageChange(callback) // Rejestruje callback przy zmianie
```

**Accessibility:**
- ARIA labels dla przycisków
- Keyboard navigation (Enter, Space)
- Screen reader announcements
- Focus management

### 3. **renderer.js** - Renderowanie UI

**Odpowiedzialność:**
- Renderowanie wszystkich sekcji CV
- Tworzenie circular progress dla umiejętności
- Timeline dla doświadczenia
- Intersection Observer dla animacji scroll
- XSS protection (HTML escaping)

**Kluczowe Metody:**
```javascript
renderAll(data)              // Renderuje wszystkie sekcje
renderPersonal(personal)     // Profile card
renderSkills(skills)         // Sekcja umiejętności z circular progress
renderExperience(experience) // Timeline doświadczenia
renderEducation(education)   // Karty wykształcenia
renderCertificates(certs)    // Badges certyfikatów
animateCircularProgress()    // Animacja circular progress
initScrollAnimations()       // Intersection Observer dla sekcji
```

**Bezpieczeństwo:**
- Wszystkie dane są escapowane przed renderowaniem
- Walidacja URL-i (profile picture)
- Sanityzacja HTML

### 4. **app.js** - Główny Koordynator

**Odpowiedzialność:**
- Inicjalizacja wszystkich modułów
- Koordynacja przepływu danych
- Smooth scroll navigation
- Keyboard navigation
- Focus management
- Loading states
- Error handling

**Kluczowe Metody:**
```javascript
init()                      // Inicjalizacja aplikacji
loadAndRender(lang)        // Ładuje dane i renderuje
handleLanguageChange(...)  // Obsługuje zmianę języka
setupEventListeners()      // Konfiguruje event handlers
initSmoothScroll()         // Smooth scroll do sekcji
initKeyboardNavigation()   // Wsparcie klawiatury
```

## 🎨 Circular Progress Implementation

Circular progress bars wykorzystują SVG z dynamiczną kalkulacją `stroke-dashoffset`:

```javascript
const radius = 54;
const circumference = 2 * Math.PI * radius; // 339.292
const offset = circumference - (progress / 100) * circumference;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = offset;
```

**Animacja:**
- Transition: 1s ease-in-out
- Staggered delays (50ms per element)
- requestAnimationFrame dla smooth rendering

## 🔒 Bezpieczeństwo

### XSS Protection
```javascript
escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### Walidacja Danych
- Sprawdzanie wszystkich wymaganych pól
- Walidacja typów (arrays, objects)
- Fallback dla brakujących danych

### Content Security
- Brak inline scripts w HTML
- ES6 modules dla izolacji scope
- Strict validation dla user input

## ♿ Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- Tab navigation przez wszystkie interaktywne elementy
- Arrow keys dla menu nawigacji
- Enter/Space dla przycisków
- Escape dla zamykania mobile menu

### Screen Readers
- ARIA labels dla wszystkich kontrolek
- ARIA live regions dla dynamicznych zmian
- Semantic HTML (nav, main, section, article)
- Skip to main content link

### Focus Management
- Visible focus indicators
- Focus trap w mobile menu
- Logiczne tab order
- Focus restoration po akcjach

### Visual
- Sufficient color contrast
- Scalable text (rem units)
- Responsive design
- Prefers-reduced-motion support

## 🎭 Animacje i Performance

### Intersection Observer
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Unobserve po animacji
    }
  });
}, { threshold: 0.1 });
```

### CSS Transitions
- Hardware-accelerated (transform, opacity)
- Staggered delays dla sequential animations
- Respect for prefers-reduced-motion

### Performance Optimizations
- LocalStorage caching (24h)
- Lazy animations (Intersection Observer)
- Debounced scroll events
- RequestAnimationFrame dla animations

## 📱 Responsywność

### Breakpoints
```css
/* Mobile-first approach */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Grid System
- CSS Grid dla layouts
- Auto-fit/auto-fill dla responsive grids
- Fluid typography (clamp)

## 🔄 Data Flow

```
1. DOM Ready
   ↓
2. App.init()
   ↓
3. LanguageSwitcher.init() → detectLanguage()
   ↓
4. DataLoader.loadData(lang)
   ↓
5. Renderer.renderAll(data)
   ↓
6. InitScrollAnimations()
   ↓
7. Ready State
```

### Language Change Flow
```
1. User clicks PL/EN
   ↓
2. LanguageSwitcher.switchLanguage(newLang)
   ↓
3. Save to localStorage
   ↓
4. Trigger callbacks
   ↓
5. App.handleLanguageChange()
   ↓
6. DataLoader.loadData(newLang)
   ↓
7. Renderer.renderAll(newData)
```

## 🧪 Testing Recommendations

### Unit Tests
- DataLoader: caching, validation, error handling
- LanguageSwitcher: detection, switching, persistence
- Renderer: HTML escaping, DOM manipulation

### Integration Tests
- End-to-end language switching
- Data loading and rendering pipeline
- Error recovery scenarios

### Accessibility Tests
- Keyboard navigation flow
- Screen reader compatibility
- Focus management
- ARIA attributes

### Performance Tests
- First Contentful Paint
- Time to Interactive
- Cache effectiveness
- Memory leaks (long sessions)

## 🚀 Deployment

### Production Build
1. Minify JavaScript modules
2. Optimize images (profile picture)
3. Enable compression (gzip/brotli)
4. Set proper cache headers
5. Add CSP headers

### Recommended Headers
```
Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

## 🐛 Debugging

### Console Logging
Wszystkie moduły używają prefixów:
```
[DataLoader] ...
[LanguageSwitcher] ...
[Renderer] ...
[App] ...
```

### Common Issues

**Problem:** Dane nie ładują się
- Sprawdź ścieżki do JSON files
- Sprawdź CORS (jeśli serwowane przez HTTP)
- Sprawdź console dla błędów fetch

**Problem:** Circular progress nie animuje się
- Sprawdź czy `animateCircularProgress()` jest wywołane
- Sprawdź CSS dla circular-progress classes
- Sprawdź strokeDasharray calculations

**Problem:** Język nie przełącza się
- Sprawdź event listeners na .language-toggle
- Sprawdź localStorage permissions
- Sprawdź czy JSON files istnieją dla obu języków

## 📦 Dependencies

### Zero External Dependencies!
Projekt używa tylko:
- Vanilla JavaScript (ES6+)
- CSS3
- Google Fonts (Inter, Sora)

### Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

**Required Features:**
- ES6 Modules
- Intersection Observer
- localStorage
- Fetch API
- CSS Grid
- CSS Custom Properties

## 📄 License

Projekt stworzony dla Jakub Szczepek CV.

---

## 🛠️ Future Enhancements

1. **PWA Support** - Service Worker, offline mode
2. **Print Stylesheet** - Optymalizacja dla PDF export
3. **Dark Mode** - Przełącznik dark/light theme
4. **More Languages** - Rozszerzenie o więcej języków
5. **Analytics** - Integration z Google Analytics/Plausible
6. **Contact Form** - Dynamiczny formularz kontaktowy
7. **Project Gallery** - Sekcja z portfolio projektów
8. **Blog Integration** - RSS feed z artykułami

---

**Wersja:** 1.0.0  
**Data:** 2026-02-23  
**Autor:** Jakub Szczepek
