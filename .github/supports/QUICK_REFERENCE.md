# Quick Reference - CV Application

## 🚀 Najszybszy Start

```bash
# 1. Uruchom serwer
./start-server.sh          # Linux/Mac
start-server.bat           # Windows

# 2. Otwórz w przeglądarce
http://localhost:8000/index.html

# 3. Testuj
http://localhost:8000/test.html
```

## 📝 Szybka Edycja Danych

### Podstawowe Informacje
```json
// candidate_data.json lub candidate_data_en.json
{
  "personal": {
    "name": "Imię Nazwisko",
    "email": "email@example.com",
    "phone": "+48 XXX XXX XXX",
    "profile_picture": "zdjecie.png"
  }
}
```

### Dodawanie Umiejętności
```json
{
  "skills": [
    {"name": "JavaScript", "level": 5},  // 1-5 scale
    {"name": "Python", "level": 4}
  ]
}
```

### Dodawanie Doświadczenia
```json
{
  "experience": [
    {
      "period": "01.2020 - obecnie",
      "title": "Senior Developer",
      "company": "Tech Corp",
      "tasks": [
        "Task 1",
        "Task 2"
      ]
    }
  ]
}
```

## 🎨 Szybkie Zmiany Wyglądu

### Zmiana Głównego Koloru
```css
/* css/tokens.css */
:root {
  --color-primary: #4f46e5;  /* Zmień na swój kolor */
}
```

### Zmiana Czcionki
```css
/* css/tokens.css */
:root {
  --font-primary: 'Inter', sans-serif;  /* Twoja czcionka */
}
```

## 🔧 Częste Problemy i Rozwiązania

| Problem | Rozwiązanie |
|---------|-------------|
| Dane nie ładują się | Użyj HTTP server (nie file://) |
| Brak zdjęcia | Dodaj plik do głównego folderu |
| Język nie przełącza się | Sprawdź console (F12) |
| Cache nie działa | Sprawdź localStorage w DevTools |

## ⌨️ Skróty Klawiszowe

| Akcja | Skrót |
|-------|-------|
| Nawigacja do przodu | `Tab` |
| Nawigacja wstecz | `Shift+Tab` |
| Aktywacja przycisku | `Enter` lub `Space` |
| Zamknij menu | `Escape` |
| DevTools | `F12` |

## 📊 Struktura JSON - Cheat Sheet

```json
{
  "personal": {...},        // ✅ Wymagane
  "about": "...",          // ✅ Wymagane
  "skills": [...],         // ✅ Wymagane (array)
  "tools": [...],          // ✅ Wymagane (array)
  "experience": [...],     // ✅ Wymagane (array)
  "education": [...],      // ✅ Wymagane (array)
  "certificates": [...],   // ⚠️ Opcjonalne (array)
  "consent": "..."         // ⚠️ Opcjonalne (string)
}
```

## 🌐 Dodawanie Języka (3 kroki)

```javascript
// 1. Skopiuj plik
cp candidate_data.json candidate_data_de.json

// 2. Edytuj js/languageSwitcher.js
const SUPPORTED_LANGUAGES = ['pl', 'en', 'de'];

// 3. Edytuj index.html
<span data-lang-value="de">DE</span>
```

## 🐛 Debug Commands

```javascript
// W console (F12):

// Sprawdź załadowane dane
console.log(window.dataLoader?.getCurrentData());

// Sprawdź bieżący język
console.log(window.languageSwitcher?.getCurrentLanguage());

// Wyczyść cache
localStorage.clear();

// Przeładuj bez cache
location.reload(true);
```

## 📦 Deployment - 1 Minuta

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial"
git push origin main
# Settings → Pages → Deploy from main
```

### Netlify
```bash
# Drag & drop folder na netlify.com
```

## 📐 Poziomy Umiejętności - Konwersja

| Level | Percentage | Label |
|-------|-----------|-------|
| 1 | 20% | Beginner |
| 2 | 40% | Basic |
| 3 | 60% | Intermediate |
| 4 | 80% | Proficient |
| 5 | 100% | Expert |

## 🎯 Najważniejsze Pliki

```
DO EDYCJI:
├── candidate_data.json      # Twoje dane (PL)
├── candidate_data_en.json   # Twoje dane (EN)
└── css/tokens.css           # Kolory i czcionki

NIE EDYTUJ (chyba że wiesz co robisz):
├── js/app.js
├── js/dataLoader.js
├── js/languageSwitcher.js
└── js/renderer.js
```

## ✅ Pre-Launch Checklist

- [ ] Zaktualizowane dane osobowe
- [ ] Dodane zdjęcie profilowe
- [ ] Sprawdzone oba języki
- [ ] Przetestowane na mobile
- [ ] Sprawdzone linki (email, LinkedIn)
- [ ] Wyczyścić cache przed testem finalnym
- [ ] Przetestować keyboard navigation

## 🔗 Przydatne Linki

- **Test Page**: `/test.html`
- **Main Page**: `/index.html`
- **Documentation**: `/README.md`
- **Technical Docs**: `/README_TECHNICAL.md`
- **Changelog**: `/CHANGELOG.md`

## 💡 Pro Tips

1. **Zawsze używaj HTTP server** - nie otwieraj przez file://
2. **Testuj na prawdziwym mobile** - nie tylko w DevTools
3. **Regularnie czyść cache** - podczas edycji danych
4. **Używaj test.html** - do szybkiego sprawdzenia zmian
5. **Rób backup JSON** - przed większymi zmianami

## 📞 Gdy coś nie działa

1. Otwórz DevTools (F12)
2. Sprawdź Console tab
3. Szukaj błędów (czerwone linie)
4. Sprawdź Network tab (czy JSON się ładuje)
5. Sprawdź localStorage (Application tab)

---

**Więcej info**: Zobacz [README.md](README.md) i [README_TECHNICAL.md](README_TECHNICAL.md)
