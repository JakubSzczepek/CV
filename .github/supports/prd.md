 1. Introduction                                                                                                                                                                                                                                                           

  The goal is to create a web-based CV for a candidate, supporting Polish and English languages. The CV will be built using the provided data files (@candidate_data.json for Polish, @candidate_data_en.json for English) and the design specifications (@design.md). The
  final output will include:
  - A Polish version of the CV
  - An English version of the CV
  - A single PRD documenting the process

  ---
  2. Objectives

  1. Create a responsive, accessible, and visually consistent web CV.
  2. Support bilingual content (Polish/English) with a language toggle.
  3. Ensure data-driven structure using the provided JSON files.
  4. Align the design with the specifications in @design.md.

  ---
  3. Scope

  3.1 Features

  - Sections:
    - Personal Information (Name, Contact, Location)
    - Professional Summary
    - Work Experience
    - Education
    - Certifications
    - Skills
    - Languages
    - Projects (optional)
    - References (optional)

  - Language Toggle:
    - Switch between Polish and English versions.
    - Dynamic content rendering based on selected language.

  - Design Requirements:
    - Match the layout, typography, and color scheme from @design.md.
    - Ensure mobile responsiveness (mobile, tablet, desktop).
    - Include accessible UI (keyboard navigation, ARIA labels).

  - Technical Requirements:
    - Use HTML/CSS/JavaScript (or a framework like React/Vue if needed).
    - Load data dynamically from @candidate_data.json and @candidate_data_en.json.
    - Implement language switching via a dropdown or button.

  ---
  4. Key Steps

  Step 1: Analyze Data Files

  - Review @candidate_data.json and @candidate_data_en.json to identify:
    - Structure of data (e.g., nested objects, arrays).
    - Language-specific fields (e.g., "summary" in Polish vs. English).
    - Missing fields to ensure consistency.

  Step 2: Design Implementation

  - Map the design from @design.md to HTML/CSS:
    - Header (Logo, Name, Contact)
    - Sections (e.g., Work Experience, Education)
    - Footer (Social links, Language toggle)
    - Responsive layout (flexbox/grid for mobile).

  Step 3: Language Switching Logic

  - Create a language toggle (e.g., dropdown or button) to switch between:
    - Polish (@candidate_data.json)
    - English (@candidate_data_en.json)

  - Use JavaScript to dynamically load and render the appropriate data.

  Step 4: Dynamic Content Rendering

  - Use JavaScript to:
    - Load the selected language’s JSON data.
    - Render sections dynamically (e.g., loop through work experience entries).
    - Ensure consistent styling across all sections.

  Step 5: Testing & Validation

  - Test the CV in both languages for:
    - Correct data display.
    - Responsive behavior on different screen sizes.
    - Accessibility (keyboard navigation, screen reader compatibility).

  ---
  5. Technical Requirements

  - Frontend Stack:
    - HTML5, CSS3, JavaScript (or React/Vue for advanced features).
    - Frameworks: Optional (e.g., React for dynamic rendering).

  - Data Handling:
    - Load JSON files using fetch() or import (if static).
    - Use JSON.parse() to convert data into usable objects.

  - Language Support:
    - Store translations in separate JSON files (@candidate_data.json, @candidate_data_en.json).
    - Use a language switcher to toggle between versions.

  ---
  6. Design Considerations

  - Typography: Use fonts specified in @design.md (e.g., sans-serif for headings).
  - Color Scheme: Match the primary/secondary colors from the design.
  - Icons: Use consistent icon libraries (e.g., Font Awesome).
  - Accessibility:
    - Ensure sufficient contrast ratios.
    - Add ARIA labels for interactive elements.

  ---
  7. Content Structure

  - Polish Version:
    - Use @candidate_data.json for all text.

  - English Version:
    - Use @candidate_data_en.json for all text.

  - Language Toggle:
    - Place the toggle in the header or footer.

  ---
  8. Deployment

  - Host the CV on a static hosting platform (e.g., GitHub Pages, Netlify).
  - Ensure both versions are accessible via the same URL (e.g., /cv for Polish, /cv/en for English).

  ---
  9. Maintenance

  - Update JSON files to reflect changes in the candidate’s data.
  - Periodically review the design for updates (e.g., new UI/UX trends).

  ---
  10. Deliverables

  1. Web CV (Polish): index.html or cv-pl.html
  2. Web CV (English): index-en.html or cv-en.html
  3. PRD: prd.md (this file)
  4. Design Files: Ensure alignment with @design.md

  ---