# Struktura Projektu NoweCV

## 📁 Katalogi

### `/data/` - Dane CV (NOWA STRUKTURA)
- **common.json** - Dane wspólne dla wszystkich języków (telefon, email, poziomy umiejętności, nazwy firm)
- **pl.json** - Polskie tłumaczenia i opisy
- **en.json** - Angielskie tłumaczenia i opisy

### `/css/`
- **tokens.css** - Design system (kolory, spacing, typography)
- **layout.css** - Layout strony (grid, sections)
- **components.css** - Komponenty (cards, buttons, badges)
- **animations.css** - Animacje i dynamiczne style

### `/js/`
- **app.js** - Główny punkt wejścia aplikacji
- **dataLoader.js** - Ładowanie i merge danych z JSON
- **languageSwitcher.js** - Przełączanie języków PL/EN
- **renderer.js** - Renderowanie UI z danych

### `/assets/`
- **images/** - Zdjęcia (Profilowe3.png)

## 🔧 Pliki konfiguracyjne
- **index.html** - Główna strona HTML
- **clear-cache.html** - Narzędzie do czyszczenia localStorage (opcjonalne)
- **start-server.sh** / **start-server.bat** - Skrypty startowe serwera

## 📝 Dokumentacja
- **README.md** - Główna dokumentacja projektu
- **prd.md** - Product Requirements Document
- **design.md** - Specyfikacja designu
- **CHANGELOG.md** - Historia zmian

## 🗑️ Usunięte pliki niepotrzebne
- ❌ `candidate_data.json` / `candidate_data_en.json` - zastąpione przez data/pl.json + data/en.json + data/common.json
- ❌ `test.html` - plik testowy
- ❌ `start.sh` - duplikat start-server.sh
- ❌ `Profilowe3.png` - przeniesione do assets/images/
- ❌ `Bez tytułu.png` - nieużywany plik

## 💾 Cache
Cache jest obecnie **WYŁĄCZONY** dla developmentu (CACHE_DURATION = 0 w dataLoader.js).
Dla produkcji ustaw na 1000 * 60 * 60 * 24 (24 godziny).

## 🚀 Jak edytować dane?

### Zmiana danych wspólnych (telefon, email, poziomy umiejętności):
Edytuj: **data/common.json**

### Zmiana tłumaczeń polskich:
Edytuj: **data/pl.json**

### Zmiana tłumaczeń angielskich:
Edytuj: **data/en.json**

Dane są automatycznie mergowane przy ładowaniu!
