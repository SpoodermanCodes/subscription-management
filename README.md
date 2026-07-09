<div align="center">

# SubFlow

### Smart Subscription Management Dashboard

[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Elements-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive%20Design-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub](https://img.shields.io/badge/GitHub-Version%20Control-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SpoodermanCodes/subscription-management)

**A progressive, assignment-driven web application built for the 23IT721 Full Stack Development Laboratory.**

*Monitor SaaS spend · Drag & Drop interactions · Web Storage APIs · Advanced HTML5 Forms*

---

[Live Dashboard](#-getting-started) · [Registration Form](./form.html) · [Assignment Coverage](#-assignment-coverage) · [Report Issue](https://github.com/SpoodermanCodes/subscription-management/issues)

</div>

---

## Overview

**SubFlow** is a professional subscription management dashboard that evolves across multiple lab assignments. Each assignment **adds** new features without removing prior work — creating a single, cohesive product that demonstrates real-world front-end engineering.

| Page | Purpose | Key Technologies |
|------|---------|------------------|
| [`index.html`](./index.html) | Main dashboard | Semantic HTML5, Drag & Drop API, localStorage, sessionStorage |
| [`form.html`](./form.html) | Registration portal | Advanced form controls, validation, semantic layout |

---

## Highlights

```
┌─────────────────────────────────────────────────────────────────┐
│  SubFlow Dashboard                                              │
├──────────────┬──────────────────────────────────────────────────┤
│  Sidebar     │  Live ticker · Carousel · Stats · Notifications │
│  Navigation  │  Drag & Drop zone · Web Storage panel · FAQ     │
│  Theme toggle│  Registration form · Contact · Enhanced footer    │
└──────────────┴──────────────────────────────────────────────────┘
```

- **Dual-theme UI** — Dark/Light mode with `localStorage` persistence
- **Real-time clock** — Live date & time badge on the dashboard
- **Animated statistics** — Count-up metrics with sync & progress bar
- **HTML5 Drag & Drop** — Draggable logo image + colored category cards
- **Web Storage lab** — Save, retrieve, and clear `localStorage` / `sessionStorage`
- **Notification center** — Bell dropdown with read/clear actions
- **Advanced registration** — Separate form page with rich HTML5 inputs
- **Fully responsive** — Mobile-first layout with collapsible sidebar

---

## Assignment Coverage

### Assignment 1 — Dashboard Foundation

| # | Requirement | Status | Location |
|---|-------------|--------|----------|
| 1 | Professional theme | ✅ | `styles.css` |
| 2 | Header with logo & title | ✅ | `index.html` → `.app-header` |
| 3 | Navigation bar | ✅ | `.navigation-bar` |
| 4 | Welcome / About sections | ✅ | `#welcome`, `#about` |
| 5 | Features (`<ul>` / `<li>`) | ✅ | `#features` |
| 6 | Services (`<ol>` / `<li>`) | ✅ | `#services` |
| 7 | Marquee ticker | ✅ | `.marquee-ticker` |
| 8 | Image/banner slider | ✅ | `.slider-section` |
| 9 | Dashboard statistics | ✅ | `#dashboard` |
| 10 | Contact information | ✅ | `#contact` |
| 11 | Footer | ✅ | `.app-footer` |
| 12 | Registration form | ✅ | `#contact` + [`form.html`](./form.html) |

### Assignment 4 — Drag & Drop + Web Storage

| # | Requirement | Status | Implementation |
|---|-------------|--------|----------------|
| 1 | Professional theme design | ✅ | Plus Jakarta Sans, orange accent palette |
| 2 | `<header>` with title & logo | ✅ | Sidebar header block |
| 3 | Nav: Home, About, Features, Storage, Contact, Help | ✅ | All links present (+ prior assignment links retained) |
| 4 | Introduction with `<section>` & `<article>` | ✅ | `#welcome` → `.intro-article` |
| 5 | Draggable image or colored box | ✅ | Logo image + 6 colored category cards |
| 6 | Drop target area | ✅ | `#dndDropZone` |
| 7 | `dragstart`, `dragover`, `drop` events | ✅ | `app.js` → Assignment 4 block |
| 8 | `localStorage` — permanent data | ✅ | `#saveLocalBtn` |
| 9 | `sessionStorage` — session data | ✅ | `#saveSessionBtn` |
| 10 | Retrieve data on button click | ✅ | `#retrieveDataBtn` |
| 11 | Clear stored data | ✅ | `#clearLocalBtn`, `#clearSessionBtn` |
| 12 | Footer with copyright, student, institution, contact | ✅ | Enhanced `.app-footer` |
| 13 | Semantic elements | ✅ | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| 14 | Code organization | ✅ | Commented sections, consistent indentation |

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Markup | HTML5 semantic elements, ARIA labels |
| Styling | CSS3 custom properties, Grid, Flexbox, animations |
| Scripting | Vanilla JavaScript (ES6+), Web APIs |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |
| Typography | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |
| Storage | `localStorage`, `sessionStorage` |
| Interaction | HTML5 Drag and Drop API |

---

## Project Structure

```
subscription-management/
├── index.html          # Main dashboard (Assignments 1 + 4)
├── app.js              # Dashboard logic, DnD, Web Storage
├── styles.css          # Dashboard design system
├── form.html           # Registration portal (Assignment 1 forms)
├── form_app.js         # Form validation & interactivity
├── form_styles.css     # Registration page styles
├── subflow_logo.png    # Application logo asset
├── .gitignore
└── README.md           # You are here
```

---

## Getting Started

### Prerequisites

- Any modern browser (Chrome, Firefox, Edge, Safari)
- A local web server *(optional but recommended)*

### Quick Run

**Option A — Open directly**

```bash
# Clone the repository
git clone https://github.com/SpoodermanCodes/subscription-management.git
cd subscription-management

# Open in browser
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

**Option B — Local dev server**

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`

---

## Feature Walkthrough

### Drag & Drop (`#drag-drop`)

1. Navigate to **Drag & Drop** in the sidebar
2. Grab the **SubFlow logo** or any colored category card
3. Drop it into the **Drop Target** zone
4. Click **Reset All** to restore items to the source grid

> Events used: `dragstart` → `dragover` (with `preventDefault`) → `drop`

### Web Storage (`#storage`)

1. Enter a **Key** and **Value** in the storage form
2. Click **Save to Local** (persists across sessions) or **Save to Session** (tab-only)
3. Click **Retrieve All Data** to render tables for both storage types
4. Use **Clear** buttons or per-row **Delete** to remove entries

> Theme preference (`subflow-theme`) is preserved when clearing local storage.

### Help Center (`#help`)

Expandable FAQ covering drag-and-drop usage, storage differences, and support contact info.

---

## Semantic HTML Map

```html
<body>
  <aside>
    <header>   <!-- App branding & student info -->
    <nav>      <!-- Primary navigation -->
  </aside>
  <main>
    <section id="welcome">
      <article>  <!-- Introduction -->
    </section>
    <section id="about">
      <article>  <!-- About content -->
    </section>
    <section id="drag-drop">  <!-- DnD demo -->
    <section id="storage">
      <aside>    <!-- Storage type reference -->
    </section>
    <section id="help">
      <article>  <!-- Help intro -->
    </section>
    <footer>     <!-- Copyright, institution, contact -->
  </main>
</body>
```

---

## Author

<table>
  <tr>
    <td><strong>Student</strong></td>
    <td>Alex Carter</td>
  </tr>
  <tr>
    <td><strong>Register No.</strong></td>
    <td>23IT701</td>
  </tr>
  <tr>
    <td><strong>Course</strong></td>
    <td>23IT721 – Full Stack Development Laboratory</td>
  </tr>
  <tr>
    <td><strong>Institution</strong></td>
    <td>Department of Information Technology, Full Stack University</td>
  </tr>
  <tr>
    <td><strong>Contact</strong></td>
    <td>
      <a href="mailto:support@subflow.io">support@subflow.io</a> ·
      <a href="tel:+18005550199">+1 (800) 555-0199</a>
    </td>
  </tr>
</table>

---

## License

This project was created as an academic assignment for the Full Stack Development Laboratory.  
© 2026 SubFlow. All rights reserved.

---

<div align="center">

**Built with HTML5 · CSS3 · JavaScript**

*SubFlow — because every subscription deserves a second look.*

[⬆ Back to Top](#subflow)

</div>
