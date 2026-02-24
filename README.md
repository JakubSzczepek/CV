# Dwujęzyczne CV - Przewodnik Użytkownika

## 🚀 Szybki Start

### 1. Instalacja

Po prostu otwórz plik `index.html` w przeglądarce. Nie wymaga serwera!

```bash
# Opcja 1: Otwórz bezpośrednio w przeglądarce
open index.html

# Opcja 2: Użyj prostego serwera (zalecane dla development)
python -m http.server 8000
# Następnie otwórz http://localhost:8000
```

### 2. Aktualizacja Danych

#### Edycja Danych Polskich (`candidate_data.json`)

```json
{
  "personal": {
    "name": "Twoje Imię Nazwisko",
    "birth_date": "DD Miesiąc RRRR",
    "address": "ul. Twoja 1/2, 00-000 Miasto",
    "phone": "+48 XXX XXX XXX",
    "email": "twoj@email.com",
    "linkedin": "www.linkedin.com/in/twojprofil",
    "profile_picture": "twoje_zdjecie.png"
  },
  "about": "Twój opis biograficzny...",
  "skills": [
    {"name": "Nazwa Umiejętności", "level": 5}
  ],
  "tools": [
    {"name": "Nazwa Narzędzia", "level": 8}
  ],
  "experience": [
    {
      "period": "MM.RRRR - MM.RRRR",
      "title": "Stanowisko",
      "company": "Nazwa Firmy",
      "tasks": [
        "Opis obowiązków 1",
        "Opis obowiązków 2"
      ]
    }
  ],
  "education": [
    {
      "period": "RRRR-RRRR",
      "degree": "Stopień Kierunek",
      "school": "Nazwa Uczelni",
      "specialization": "Specjalizacja (opcjonalne)"
    }
  ],
  "certificates": [
    {"type": "Typ", "name": "Nazwa Certyfikatu"}
  ],
  "consent": "Tekst zgody RODO..."
}
```

#### Poziomy Umiejętności

**Dla skills (skala 1-5):**
- `1` = Beginner (20%)
- `2` = Basic (40%)
- `3` = Intermediate (60%)
- `4` = Proficient (80%)
- `5` = Expert (100%)

**Dla tools (skala 1-10):**
- `1-2` = Beginner (10-20%)
- `3-4` = Basic (30-40%)
- `5-6` = Intermediate (50-60%)
- `7-8` = Proficient (70-80%)
- `9-10` = Expert (90-100%)

### 3. Dodawanie Zdjęcia Profilowego

1. Umieść plik zdjęcia w głównym folderze projektu
2. Zaktualizuj `profile_picture` w JSON:
```json
"profile_picture": "nazwa_pliku.png"
```

**Zalecenia:**
- Format: PNG, JPG, WEBP
- Wymiary: 400x400px (kwadrat)
- Rozmiar: < 200KB
- Jakość: wysoka (użyj kompresji)

## 🎨 Dostosowywanie Wyglądu

### Kolory (css/tokens.css)

```css
:root {
  /* Primary Colors */
  --color-primary: #4f46e5;        /* Główny kolor */
  --color-primary-dark: #4338ca;   /* Ciemniejsza wersja */
  --color-primary-light: #eef2ff;  /* Jasne tło */
  
  /* Zmień na swoje kolory */
  --color-primary: #your-color;
}
```

### Czcionki

Projekt używa Google Fonts (Inter, Sora). Zmiana w `index.html`:

```html
<!-- Zamień na swoje czcionki -->
<link href="https://fonts.googleapis.com/css2?family=TwojaCzcionka:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Następnie w `css/tokens.css`:

```css
:root {
  --font-primary: 'TwojaCzcionka', sans-serif;
}
```

## 🌐 Dodawanie Więcej Języków

### Krok 1: Stwórz nowy plik JSON

```bash
cp candidate_data_en.json candidate_data_de.json
# Przetłumacz zawartość na niemiecki
```

### Krok 2: Aktualizuj languageSwitcher.js

```javascript
const SUPPORTED_LANGUAGES = ['pl', 'en', 'de']; // Dodaj 'de'
```

### Krok 3: Aktualizuj HTML toggle

```html
<button class="language-toggle">
  <span data-lang-value="pl">PL</span>
  <span>/</span>
  <span data-lang-value="en">EN</span>
  <span>/</span>
  <span data-lang-value="de">DE</span>
</button>
```

## 📱 Testowanie

### Lokalne Testowanie

```bash
# Python 3
python -m http.server 8000

# Node.js (npx http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Testowanie Responsywności

1. Otwórz DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Testuj różne rozdzielczości:
   - Mobile: 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1440px, 1920px

### Testowanie Accessibility

**Keyboard Navigation:**
- `Tab` - Nawigacja do przodu
- `Shift+Tab` - Nawigacja wstecz
- `Enter`/`Space` - Aktywacja przycisku
- `Escape` - Zamknięcie menu mobilnego

**Screen Reader:**
- macOS: VoiceOver (Cmd+F5)
- Windows: NVDA (darmowy)
- Chrome: ChromeVox extension

## 🐛 Rozwiązywanie Problemów

### Problem: "Dane nie ładują się"

**Sprawdź:**
1. Czy pliki JSON są w tym samym folderze co index.html?
2. Czy struktura JSON jest poprawna? (użyj JSONLint.com)
3. Czy otwierasz przez serwer HTTP (nie file://)?

**Rozwiązanie:**
```bash
# Użyj prostego serwera
python -m http.server 8000
```

### Problem: "Circular progress nie animuje się"

**Sprawdź:**
1. Czy animations.css jest załadowany?
2. Czy CSS animations nie są wyłączone?

**Debug:**
```javascript
// Otwórz console (F12) i sprawdź:
console.log(document.querySelector('.circular-progress'));
```

### Problem: "Zdjęcie profilowe się nie wyświetla"

**Sprawdź:**
1. Czy nazwa pliku w JSON zgadza się z rzeczywistą nazwą?
2. Czy plik jest w głównym folderze?
3. Czy ścieżka nie zawiera polskich znaków?

**Fallback:**
System automatycznie wyświetli placeholder jeśli zdjęcie nie istnieje.

### Problem: "Język nie przełącza się"

**Sprawdź:**
1. Console errors (F12)
2. Czy oba pliki JSON istnieją?
3. Czy localStorage jest włączony?

**Reset:**
```javascript
// W console (F12):
localStorage.clear();
location.reload();
```

## 🔧 Konfiguracja Zaawansowana

### Wyłączenie Cachowania

W `js/dataLoader.js` zmień:

```javascript
const CACHE_DURATION = 0; // Wyłącza cache
```

### Zmiana Czasu Cache

```javascript
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 dni
```

### Własny Loading Spinner

W `js/app.js` metoda `showLoading()` - dostosuj HTML i CSS.

### Dodanie Google Analytics

Przed `</head>` w index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📤 Publikacja

### GitHub Pages

```bash
# 1. Stwórz repozytorium na GitHub
# 2. Push kod
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/cv.git
git push -u origin main

# 3. Włącz GitHub Pages w Settings → Pages
# Wybierz branch: main, folder: / (root)
```

Twoje CV będzie dostępne pod:
`https://username.github.io/cv/`

### Netlify

1. Przeciągnij folder projektu na netlify.com
2. Gotowe! 🎉

### Własny Hosting

1. Skompresuj wszystkie pliki do .zip
2. Upload na serwer przez FTP
3. Upewnij się że index.html jest w głównym folderze

## 🎓 Best Practices

### 1. **Optymalizuj Obrazy**

```bash
# Używaj narzędzi do kompresji
# Online: tinypng.com, squoosh.app
# CLI: imagemagick
convert profile.jpg -resize 400x400 -quality 85 profile_optimized.jpg
```

### 2. **Regularnie Aktualizuj**

- Dodawaj nowe doświadczenie
- Aktualizuj umiejętności
- Odświeżaj zdjęcie co 1-2 lata

### 3. **Testuj po Zmianach**

- Sprawdź oba języki
- Przetestuj na mobile
- Sprawdź keyboard navigation

### 4. **Backup Danych**

```bash
# Regularnie rób backup JSON files
cp candidate_data.json backups/candidate_data_$(date +%Y%m%d).json
```

## 📞 Pomoc i Wsparcie

### Debugging Console

Otwórz DevTools (F12) i szukaj:
- `[DataLoader]` - problemy z ładowaniem danych
- `[LanguageSwitcher]` - problemy z językiem
- `[Renderer]` - problemy z renderowaniem
- `[App]` - ogólne problemy aplikacji

### Sprawdzenie Wersji

```javascript
// W console (F12):
console.log('Data loaded:', window.dataLoader?.getCurrentData());
console.log('Current language:', window.languageSwitcher?.getCurrentLanguage());
```

## 🌐 Deployment na GitHub Pages

### Krok 1: Przygotowanie Repozytorium

```bash
# Inicjalizuj repo git (jeśli jeszcze nie zrobiłeś)
git init

# Dodaj wszystkie pliki
git add .

# Utwórz pierwszy commit
git commit -m "Initial commit: CV website"

# Dodaj remote repository
git remote add origin https://github.com/JakubSzczepek/noweCV.git

# Wypchnij na GitHub
git push -u origin main
```

### Krok 2: Włączenie GitHub Pages

1. Przejdź do repozytorium na GitHub: `https://github.com/JakubSzczepek/noweCV`
2. Kliknij **Settings** (Ustawienia)
3. W menu z lewej wybierz **Pages**
4. W sekcji **Source** wybierz:
   - Branch: `main`
   - Folder: `/ (root)`
5. Kliknij **Save**
6. Po kilku minutach Twoja strona będzie dostępna pod adresem:
   `https://jakubszczepek.github.io/noweCV/`

### Krok 3: Aktualizacje

```bash
# Po każdej zmianie:
git add .
git commit -m "Update CV data"
git push

# Strona automatycznie się zaktualizuje w ciągu 1-2 minut
```

### Własna Domena (Opcjonalnie)

Jeśli masz własną domenę:

1. W ustawieniach GitHub Pages dodaj **Custom domain**
2. W ustawieniach DNS domeny dodaj rekord CNAME wskazujący na: `jakubszczepek.github.io`
3. Zaznacz **Enforce HTTPS**

Więcej informacji: [GitHub Pages Documentation](https://docs.github.com/en/pages)

## ✅ Checklist przed Publikacją

- [ ] Wszystkie dane są aktualne
- [ ] Oba pliki JSON są przetłumaczone
- [ ] Zdjęcie profilowe jest dodane i zoptymalizowane
- [ ] Email i telefon są poprawne
- [ ] LinkedIn URL jest aktualny
- [ ] Testowano na mobile i desktop
- [ ] Sprawdzono wszystkie linki
- [ ] Przetestowano keyboard navigation
- [ ] Sprawdzono console errors
- [ ] Cache został wyczyszczony przed testem

---

**Powodzenia z Twoim nowym CV! 🎉**

Jeśli masz pytania lub napotkasz problemy, sprawdź [README_TECHNICAL.md](README_TECHNICAL.md) dla szczegółów technicznych.
