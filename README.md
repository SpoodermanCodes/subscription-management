<div align="center">

# SubFlow

### Smart Subscription Management Dashboard

[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Elements-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Advanced%20CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub](https://img.shields.io/badge/GitHub-Version%20Control-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SpoodermanCodes/subscription-management)

**A professional, responsive dashboard landing page built to demonstrate Inline, Internal, and External stylesheets using Advanced CSS and JavaScript.**

*Designed for the 23IT721 Full Stack Development Laboratory.*

---

[Live Dashboard](#-getting-started) · [Assignment Details](#-assignment-requirements-mapping) · [Contact Support](#-support)

</div>

---

## Overview

**SubFlow** is a premium subscription management dashboard that provides an executive summary of SaaS spend, active plans, integration gateways, and notifications. 

This page demonstrates **all 32 requirements** of the advanced CSS/JS lab assignment, mapping standard restaurant-themed components (such as reservations, dishes, tables, and menus) to enterprise **Subscription Management** features.

---

## Assignment Requirements Mapping

Below is the verification checklist mapping each of the 32 requirements from the restaurant prompt to the implemented **SubFlow** platform:

| S.No | Assignment Requirement | SubFlow Implementation | File Location / Selector |
| :--- | :--- | :--- | :--- |
| **1** | **Professional Theme** | Indigo/Teal modern SaaS dashboard interface with custom fonts (Inter/Outfit). | `styles.css` |
| **2** | **Navigation Bar** | Sticky top navigation menu with: Home, Subscriptions (Menu), Integrations (Chefs), Reservations, Gallery, Reviews, Contact, Logout. Active highlighting and hover effects. | `index.html` → `.header-container` |
| **3** | **Welcome Banner** | Displays app name, tagline, specialties, vision, mission, and current promos with Fade-In / Slide-In animations. | `index.html` → `#home` |
| **4** | **Dashboard Cards** | Animated cards for: Available Budget (Tables), Tracked Invoices (Orders), AWS Cloud (Popular Dishes), Savings Rating (Customer Ratings). | `index.html` → `.dashboard-cards-grid` |
| **5** | **Dynamic Statistics** | JS-driven animated count-up counters for Daily Actives, Subscriptions Audited, Spend Tracked, and Savings Opportunities. | `app.js` → `animateCounters()` |
| **6** | **Features Section** | Cards detailing: Online Reservations, Instant Alert Delivery, Live API scan, Enterprise Party Hubs, and Secure Gateways. | `index.html` → `#features` |
| **7** | **Services Section** | Grid layout for Dine-In, Takeaway, Online Delivery, Catering, Event Booking equivalents. | `index.html` → `#services` |
| **8** | **Image Slider** | Automatic and manual slide carousel showcasing core platform screens. | `app.js` → `updateSlider()` |
| **9** | **Date & Time** | Dynamic live date and ticking clock widget updating every second. | `app.js` → Ticker Block |
| **10** | **Theme Switcher** | Light & Dark Mode switcher using CSS variables and HTML attributes. | `app.js` → themeToggle event listener |
| **11** | **Notification Panel** | Slidin/toggle panel for renewal alerts and promo confirm items. | `index.html` → `#notificationPanel` |
| **12** | **Reservation Form** | Consultation booking form collecting: Customer Name, Email, Phone, Date, Time, Number of Guests (Team size), and Platform Preference (Seating preference). | `index.html` → `#reservationForm` |
| **13** | **Form Validation** | Rich JS validators enforcing valid input types, regex matching, and future date checks. | `app.js` → validation checks |
| **14** | **Animation Effects** | 5+ animations: Fade-In, Bounce (on pin), Zoom (hover), Pulse (urgency alerts), and Typing Effect (hero tagline). | `styles.css` / `app.js` |
| **15** | **Action Buttons** | CSS transitions applied to CTAs (Submit, Reset, Reserve, Order buttons). | `styles.css` → `.btn`, `.action-transition-btn` |
| **16** | **Scroll-to-Top** | Floating fixed button appearing on scroll to take users to page top. | `app.js` → `backToTopBtn` |
| **17** | **Contact Section** | Displays physical address, phone, support email, mock map, and social links. | `index.html` → `#contact` |
| **18** | **Footer** | Copyright details, SubFlow name, student name (Alex Carter), and register info. | `index.html` → `.footer-container` |
| **19** | **GitHub Repository** | All files uploaded cleanly to Git with this structural README. | [Repository](https://github.com/SpoodermanCodes/subscription-management) |
| **20** | **Vercel Deployment** | Configuration added and ready for serverless static deployment. | `vercel.json` |
| **21** | **CSS Variables** | System-wide tokens defined in `:root` and `[data-theme="dark"]`. | `styles.css` → `:root` |
| **22** | **CSS Grid Layout** | Grid styling applied to Dashboard Cards, Services, and Gallery items. | `styles.css` → `.gallery-grid`, `.services-grid-container` |
| **23** | **CSS Flexbox** | Flex layout configurations for navigation header, footer, cards, and form layouts. | `styles.css` → `.header-inner`, `.form-actions-row` |
| **24** | **Media Queries** | Tailored responsiveness for desktop, tablet, and mobile dimensions. | `styles.css` → Responsive Media Queries |
| **25** | **CSS Pseudo-Elements** | Creative utilization of `::before`, `::after` (tooltips), `::first-letter`, `::first-line` (welcome lead paragraph), and `::selection`. | `index.html` → `<style>` |
| **26** | **CSS Transformations** | Scale, rotate, skew, and translate transforms applied on button hover, card hover, logo, and active notifications. | `styles.css` → `.action-transition-btn`, `.social-icon-btn` |
| **27** | **CSS Transitions** | Smooth animations set on hover events across all cards, buttons, nav links, and theme icons. | `styles.css` |
| **28** | **CSS Icons** | Integration of Font Awesome 6.4.0 library with hover interactions. | `index.html` → Font Awesome link |
| **29** | **Image Hover Effects** | CSS filters demonstrating zoom, grayscale, blur, opacity, and colored overlays. | `styles.css` → Image Hover Effects block |
| **30** | **CSS Positioning** | Demonstrates `relative` (parent wraps), `absolute` (badges/dropdowns), `fixed` (notification panel / scroll-to-top), and `sticky` (header). | `styles.css` |
| **31** | **CSS Progress Bar** | Custom progress bar highlighting budget consumption, utilizing keyframes. | `styles.css` / `app.js` |
| **32** | **CSS Tooltip** | CSS-only tooltip bubbles that display using pseudo-elements `::before`/`::after` on `data-tooltip`. | `index.html` → `<style>` |

---

## Technical Stylesheet Organization

To demonstrate the full breadth of the CSS syllabus, three separate style approaches are utilized:
1. **External Stylesheet**: The major layout styling is handled by [styles.css](./styles.css).
2. **Internal Stylesheet**: Custom specificity overrides (e.g. selection highlight colors, lead paragraph `::first-letter` styling, and the CSS-only tooltip structure) are declared in the `<style>` block in the head of `index.html`.
3. **Inline Styles**: Specific inline configurations (e.g. custom spacing margins or gradients) are embedded directly inside elements (such as `<section id="home" style="...">`) to highlight inline overrides.

---

## Getting Started

### Quick Run Local

1. Clone this repository:
   ```bash
   git clone https://github.com/SpoodermanCodes/subscription-management.git
   cd subscription-management
   ```

2. Open `index.html` directly in any web browser, or launch using a local development server:
   ```bash
   # If you have python installed
   python -m http.server 8000
   ```
   Now visit `http://localhost:8000` in your web browser.
