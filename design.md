# design.md — Wzorzec Webowego CV Testera (na bazie referencji) — wersja z ciemniejszym tłem

> Cel: stworzyć **premium webowe CV / portfolio QA/Testera** w stylu z referencji: miękkie karty, delikatne cienie, „glass / soft neumorphism”, mało obrysów, dużo oddechu.  
> Zmiana względem referencji: **tło wyraźnie ciemniejsze**, ale zachowujemy ciepłe, subtelne poświaty i akcenty (zielony + ciepły bursztyn).

---

## 1) Kierunek wizualny

### Wrażenie
- Profesjonalne, spokojne, „senior / confident”
- Nowoczesne, ale nie krzykliwe
- Minimalizm + luksusowa miękkość (soft shadows, rounded, gradienty w tle)

### Motywy z referencji do zachowania
- **Duże, zaokrąglone karty** (radius 20–28)
- **Miękkie cienie** zamiast borderów
- **Pastelowe / ciepłe gradienty na grafikach** wewnątrz kart
- **Pigułki-tag** (badge) z bardzo lekkim tłem
- Ikony w kółkach / „floating action” w kartach (np. mały okrąg w prawym górnym rogu)

---

## 2) Siatka i layout

### Breakpointy
- Desktop: 1200–1440 px (primary)
- Laptop: 992–1199 px
- Tablet: 768–991 px
- Mobile: 360–767 px

### Kontener i odstępy
- Max width: `1200px` (opcjonalnie 1280)
- Padding strony: `32px` desktop / `20px` mobile
- Spacing system (8pt): `8 / 16 / 24 / 32 / 48 / 64`

### Układ sekcji (kolejność)
1. Top Nav (sticky)
2. Hero (2 kolumny)
3. „Facts / Highlights” (karta + staty)
4. Services (karty ofert / specjalizacji)
5. Skills (karty z procentami / wykresami)
6. Experience (timeline / listy w 2 kolumnach)
7. Process (kroki współpracy)
8. CTA Contact (social + przycisk)

---

## 3) Kolory (tokens) — ciemniejsze tło

> Wszystkie kolory zapisuj jako tokeny CSS (zmienne), żeby łatwo było stroić klimat.

### Tło i powierzchnie
- `--bg-0`: `#0B0F14`  (główne tło)
- `--bg-1`: `#0E141B`  (tło sekcji / alternatywa)
- `--surface-0`: `#111A22` (karty – bazowa)
- `--surface-1`: `#141F29` (karty podbite / hover)
- `--surface-glass`: `rgba(255,255,255,0.04)` (szkło na kartach/badge)

### Tekst
- `--text-0`: `#EAF0F6` (nagłówki)
- `--text-1`: `#C9D4DF` (treść)
- `--text-2`: `#92A3B4` (muted / opisy)
- `--text-invert`: `#0B0F14` (na jasnych akcentach)

### Akcenty (jak w referencji, ale pod dark)
- `--accent-green`: `#33D17A` (primary action)
- `--accent-green-2`: `#1FAE64` (hover)
- `--accent-amber`: `#F6A53A` (wyróżnienia w nagłówkach)
- `--accent-gold-soft`: `rgba(246,165,58,0.20)` (poświaty)
- `--accent-pink-soft`: `rgba(255,105,180,0.18)` (delikatny gradient)
- `--accent-cyan-soft`: `rgba(79,209,197,0.16)` (delikatny gradient)

### Linie i separatory (prawie niewidoczne)
- `--line-0`: `rgba(255,255,255,0.06)`
- `--line-1`: `rgba(255,255,255,0.10)` (dla inputów)

---

## 4) Tło globalne — „dark + warm glow”

Tło strony ma być ciemne, ale z miękkimi poświatami jak w referencji.

### Wzór tła (zalecenie)
- Bazowy kolor: `--bg-0`
- 2–3 radial gradienty:
  - lewy górny: bursztyn `--accent-gold-soft`
  - prawy górny: zielony soft `rgba(51,209,122,0.12)`
  - środek/lewy: róż soft `--accent-pink-soft`

Przykładowa koncepcja:
- `radial-gradient(900px 600px at 10% 10%, rgba(246,165,58,0.18), transparent 60%)`
- `radial-gradient(700px 500px at 85% 5%, rgba(51,209,122,0.12), transparent 55%)`
- `radial-gradient(700px 700px at 35% 35%, rgba(255,105,180,0.10), transparent 55%)`

---

## 5) Typografia

### Fonty (propozycja)
- Headings: `Inter` / `Sora` (bardziej „premium”)
- Body: `Inter`

### Skale
- H1 (Hero): 44–56 / 1.05
- H2 (sekcje): 28–34 / 1.15
- H3 (karty): 18–22 / 1.25
- Body: 15–16 / 1.6
- Small: 12–13 / 1.4

### Wyróżnienia w nagłówkach (jak w referencji)
- Jedno słowo w H1/H2 ma gradient/kolor akcentu:
  - np. „QA” w bursztynie, „Automation” w zieleni

---

## 6) Styl komponentów (global)

### Border radius
- `--r-lg`: 28 (hero cards / duże sekcje)
- `--r-md`: 22 (karty standard)
- `--r-sm`: 14 (badge / input)
- `--r-pill`: 999 (pigułki)

### Cienie (miękkie, warstwowe)
- `--shadow-1`: 0 12px 30px rgba(0,0,0,0.35)
- `--shadow-2`: 0 6px 18px rgba(0,0,0,0.25)
- `--shadow-inset`: inset 0 1px 0 rgba(255,255,255,0.06)

### Obramowania
- Domyślnie brak borderów.
- Jeśli potrzebne: 1px `--line-0`.

### Animacje
- Hover cards: translateY(-2px), cień +10%
- Buttons: lekki glow na hover (zielony)
- Duration: 160–220ms
- Ease: `cubic-bezier(.2,.8,.2,1)`

---

## 7) Sekcje i komponenty (mapowanie na Webowe CV Testera)

### 7.1 Top Navigation
**Układ jak w referencji**
- Lewo: logo/monogram + „QA Portfolio”
- Środek: linki (Home, About, Skills, Experience, Projects, Contact)
- Prawo: CTA button „Let’s talk” -> „Umów rozmowę”

**Style**
- Tło nav: przezroczyste + blur (glass)
- Link active: zielony + mały underline/indicator
- CTA: zielony pill button

---

### 7.2 Hero (2 kolumny)
**Lewa kolumna (karta profilu)**
- Avatar w okręgu
- Imię i rola: „Principal Software Quality Engineer”
- Tagline: „QA • Automation • Quality Strategy”
- 1 główny przycisk: „Download CV” lub „Contact”
- 1 drugorzędny: „LinkedIn / GitHub”

**Prawa kolumna (headline + opis + social icons)**
- H1: np. „Obsessed with Reliable Quality & Automation”
- Słowo „Quality” w bursztynie, „Automation” w zieleni
- Krótki opis (2–3 linie)
- Pod spodem: rząd ikon-linków (GitHub, LinkedIn, Email, Calendly)

**Dodatki**
- Mała ikonka „scroll” na dole hero (jak w referencji)

---

### 7.3 Facts / Highlights (sekcja liczb)
W referencji: duża karta z opisem + 4 mniejsze stat-cards.

**Propozycja dla QA**
- „Years in QA” (np. 8)
- „Automation suites” (np. 40+)
- „Test cases executed” (np. 12k+)
- „Incidents prevented / escaped bugs reduced” (np. -35%)

**Styl stat-card**
- Mały nagłówek (muted)
- Duża liczba
- Mini-wizualizacja: prosta linia/arc (placeholder)
- Ikona w małym kółku w prawym górnym rogu

---

### 7.4 Services / What I do (karty usług)
W referencji: 3 duże karty po prawej + tekst po lewej.

**Dla testera**
Karty:
1. **Test Strategy & Quality Gates**
2. **Automation (UI/API)**
3. **CI/CD & Observability Quality**

Każda karta:
- Badge u góry (np. „QA STRATEGY”)
- Tytuł 2-linijkowy
- Mini tagi na dole (np. Java, Python, Cucumber, Playwright, REST, GCP)
- Ikona akcji w okręgu (prawy górny róg)

---

### 7.5 Skills (karty z procentami / wykresami)
W referencji: 3 większe bloki („UI-UX”, „Web Design”, „Development”) z circular progress.

**Dla QA — 3 kolumny**
1. **Automation**
   - UI: 80%
   - API: 85%
   - Frameworks: 75%
2. **Quality Engineering**
   - Test design: 90%
   - Risk analysis: 80%
   - Metrics: 70%
3. **Tooling / DevOps**
   - CI pipelines: 70%
   - Cloud (GCP): 65%
   - Observability: 60%

**Wizual**
- Circular progress: cienki ring + akcent kolor
- Pod spodem ikona tech (np. Playwright, Selenium, REST, GitHub Actions)

---

### 7.6 Experience (2 kolumny jak w referencji)
W referencji: „Full Time” i „Freelance” jako dwa panele.

**Dla CV**
- Panel 1: „Enterprise / Full-time”
- Panel 2: „Freelance / Projects / Consulting” (opcjonalnie)

Każdy wpis:
- Logo firmy (okrąg)
- Rola (bold)
- Data (badge)
- 1-liner co robiłeś (muted)
- Mała ikonka linku (arrow) po prawej

---

### 7.7 Process (Steps of a Project)
W referencji: wykres po lewej + lista kroków po prawej z numerami.

**Dla QA**
Kroki:
1. Understand product risk & scope
2. Define test strategy & acceptance
3. Prepare environments & data
4. Implement automation & pipelines
5. Execute, report, advise
6. Stabilize & optimize (flaky, performance, coverage)

**Lista kroków**
- Numer w kółku
- Tytuł
- Subtext (krótko)
- Ikona po prawej w małym kółku

---

### 7.8 Contact CTA (footer)
- Headline: „One step to connect with me”
- Duży zielony button: „Contact / Email”
- Pod spodem: 4 ikonki-linki (LinkedIn, GitHub, Email, Calendar)

---

## 8) UI Elements — szczegóły

### Buttons
- Primary: zielony fill, text `--text-invert`, radius pill, shadow-2
- Secondary: surface + line-0, text `--text-0`
- Hover: jaśniejszy fill + delikatny glow

### Badges / Pills
- Tło: `rgba(255,255,255,0.06)`
- Text: `--text-1`
- Akcentowe badge: `rgba(51,209,122,0.16)` lub `rgba(246,165,58,0.16)`

### Icon buttons (okrągłe)
- 40–44px
- Tło: `--surface-glass`
- Cień: shadow-2
- Hover: podbicie tła +1 stopień

### Cards
- Tło: `--surface-0`
- Cień: shadow-1 + inset
- Hover: `--surface-1`, translateY(-2px)

---

## 9) Obrazy i ilustracje
- Wnętrza kart mogą mieć **ciepły gradient** (bursztyn/pomarańcz + lekki róż), ale na zewnątrz wszystko pozostaje „dark premium”.
- Screenshots projektów: na tle jasnego, ciepłego „paper” jak w referencji (dla kontrastu z dark UI).

---

## 10) Dostępność i czytelność
- Kontrast tekstu: minimum WCAG AA (szczególnie `--text-1` na `--surface-0`)
- Focus ring: 2px `rgba(51,209,122,0.65)`
- Klikalne elementy: min 44x44
- Prefer reduced motion: wyłącz translate/animacje

---

## 11) Responsywność (zasady)
- Desktop: układ 2 kolumny hero + sekcje 2/3 kolumn
- Tablet: hero wciąż 2 kolumny, ale ciaśniej; services w 2 kolumnach
- Mobile:
  - hero: jedna kolumna (profil card -> headline -> social)
  - stats: 2x2
  - services/skills: 1 kolumna
  - experience: panele jeden pod drugim

---

## 12) Copy (przykładowe treści pod QA)
- Hero title: **“Driven by Quality. Powered by Automation.”**
- Subtitle: “I build test strategies, automation suites, and CI quality gates for reliable releases.”
- CTA: “Download CV”, “Let’s talk”
- Sections:
  - “Effective Facts” -> “Quality Impact”
  - “My Eyes to Work” -> “What I Deliver”
  - “My Weapons Power” -> “Core Skills”
  - “Biography Experiences” -> “Experience”
  - “Steps of A Project” -> “How I Work”

---

## 13) Checklist implementacyjny (MVP)
- [ ] Dark background z 3 radial glow
- [ ] Card system + shadows + radius
- [ ] Hero: profil-card + headline + social
- [ ] Facts: 4 stat cards
- [ ] Services: 3 feature cards z badge/tagami
- [ ] Skills: 3 karty z ring progress
- [ ] Experience: 2 panele z listą ról
- [ ] Process steps: lista kroków
- [ ] CTA contact: button + social icons

---

## 14) Tokeny (skrót)
- Radius: 28 / 22 / 14 / 999
- Shadows: 2 poziomy + inset
- Palette: dark surfaces + green/amber accents
- Spacing: 8pt system
- Typography: Inter/Sora + duże H1, mocny hierarchy

---
Koniec pliku.
