# 🎉 Witaj w Twoim Dwujęzycznym CV!

## Pierwsze Uruchomienie - Start w 3 Minuty

### Krok 1: Uruchom Serwer ⚡

**Na Linux/Mac:**
```bash
./start-server.sh
```

**Na Windows:**
```
start-server.bat
```

**Lub ręcznie:**
```bash
python -m http.server 8000
```

### Krok 2: Otwórz w Przeglądarce 🌐

```
http://localhost:8000/index.html
```

### Krok 3: Sprawdź Działanie ✅

1. Kliknij przełącznik **PL/EN** w górnym menu
2. Sprawdź czy dane się przełączają
3. Przewiń stronę - zobacz animacje
4. Sprawdź responsywność (zmień rozmiar okna)

## Co Dalej?

### 📝 Zaktualizuj Swoje Dane

Edytuj pliki:
- `candidate_data.json` - wersja polska
- `candidate_data_en.json` - wersja angielska

Zmień:
- Imię i nazwisko
- Email i telefon
- LinkedIn URL
- Opis "about"
- Umiejętności (skills)
- Narzędzia (tools)
- Doświadczenie (experience)
- Wykształcenie (education)
- Certyfikaty (certificates)

### 🖼️ Dodaj Swoje Zdjęcie

1. Umieść plik zdjęcia w głównym folderze (np. `moje_zdjecie.jpg`)
2. W pliku JSON zmień:
```json
"profile_picture": "moje_zdjecie.jpg"
```

**Zalecenia:**
- Format: JPG, PNG lub WEBP
- Rozmiar: 400x400px (kwadrat)
- Waga: < 200KB

### 🎨 Zmień Kolory

Edytuj `css/tokens.css`:
```css
:root {
  --color-primary: #4f46e5;  /* Twój kolor główny */
}
```

## 🧪 Testowanie

### Strona Testowa
```
http://localhost:8000/test.html
```

Uruchom wszystkie testy aby upewnić się że wszystko działa!

### Testuj na Urządzeniach

1. **Desktop** - normalne okno przeglądarki
2. **Tablet** - zmień szerokość okna do ~768px
3. **Mobile** - zmień szerokość okna do ~375px

Lub użyj DevTools (F12) → Device Toolbar

## 📚 Dokumentacja

- **[README.md](README.md)** - Pełny przewodnik użytkownika
- **[README_TECHNICAL.md](README_TECHNICAL.md)** - Dokumentacja techniczna
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Szybka ściąga
- **[CHANGELOG.md](CHANGELOG.md)** - Historia zmian

## ⌨️ Skróty Klawiszowe

- `Tab` - Nawigacja między elementami
- `Enter`/`Space` - Aktywacja przycisków
- `Escape` - Zamknięcie menu mobilnego
- `F12` - DevTools (konsola, debugowanie)

## 🐛 Problemy?

### "Dane się nie ładują"
- Upewnij się że używasz HTTP server (nie file://)
- Sprawdź console (F12) czy są błędy

### "Zdjęcie się nie wyświetla"
- Sprawdź czy nazwa pliku w JSON zgadza się z rzeczywistą
- Sprawdź czy plik jest w głównym folderze
- Sprawdź console (F12) czy jest błąd 404

### "Język nie przełącza się"
- Otwórz console (F12) i sprawdź błędy
- Sprawdź czy oba pliki JSON istnieją
- Wyczyść cache: `localStorage.clear()` w console

## 🚀 Publikacja

### GitHub Pages (Darmowe)
```bash
git init
git add .
git commit -m "My CV"
git push origin main
```
Włącz w Settings → Pages

### Netlify (Darmowe)
Przeciągnij folder na netlify.com

### Własny Hosting
Upload wszystkich plików przez FTP

## ✨ Struktura Plików

```
noweCV/
├── index.html              ← Główna strona
├── test.html               ← Strona testowa
├── candidate_data.json     ← EDYTUJ: Twoje dane (PL)
├── candidate_data_en.json  ← EDYTUJ: Twoje dane (EN)
├── Profilowe3.png         ← Twoje zdjęcie
│
├── css/
│   ├── tokens.css         ← EDYTUJ: Kolory, czcionki
│   ├── layout.css
│   ├── components.css
│   ├── utilities.css
│   └── animations.css
│
├── js/
│   ├── app.js             ← Główna aplikacja
│   ├── dataLoader.js      ← Ładowanie danych
│   ├── languageSwitcher.js ← Przełączanie języków
│   └── renderer.js        ← Renderowanie UI
│
├── start-server.sh        ← Uruchom serwer (Linux/Mac)
├── start-server.bat       ← Uruchom serwer (Windows)
│
└── README.md              ← Dokumentacja
```

## 💡 Pro Tips

1. **Zawsze testuj na prawdziwym serwerze HTTP**
2. **Rób backup przed dużymi zmianami**
3. **Testuj oba języki po każdej edycji**
4. **Używaj test.html do szybkiego sprawdzenia**
5. **Sprawdź keyboard navigation przed publikacją**

## ✅ Checklist Przed Publikacją

- [ ] Zaktualizowane wszystkie dane osobowe
- [ ] Dodane własne zdjęcie
- [ ] Sprawdzone obie wersje językowe (PL + EN)
- [ ] Przetestowane na desktop, tablet, mobile
- [ ] Sprawdzone wszystkie linki (email, LinkedIn)
- [ ] Wyczyszczony cache przed finalnym testem
- [ ] Przetestowana nawigacja klawiaturą
- [ ] Sprawdzone na różnych przeglądarkach

## 🎯 Co Teraz?

1. ✅ Uruchom serwer (`./start-server.sh`)
2. ✅ Otwórz `http://localhost:8000/index.html`
3. ✅ Przetestuj `http://localhost:8000/test.html`
4. 📝 Edytuj `candidate_data.json`
5. 🖼️ Dodaj swoje zdjęcie
6. 🎨 Dostosuj kolory w `css/tokens.css`
7. 🧪 Testuj na różnych urządzeniach
8. 🚀 Publikuj!

---

## 🆘 Potrzebujesz Pomocy?

**Zobacz dokumentację:**
- [README.md](README.md) - Pełny przewodnik
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Szybka ściąga
- [README_TECHNICAL.md](README_TECHNICAL.md) - Szczegóły techniczne

**Debug:**
1. Otwórz DevTools (F12)
2. Sprawdź Console tab
3. Szukaj błędów (czerwone wpisy)

---

**🎊 Powodzenia z Twoim nowym CV!**

Made with ❤️ using Vanilla JavaScript, CSS3, and HTML5
