# Website Accessibility Features

I built this site with accessibility as a priority. Here's what I implemented. 

## Core Features

### 1. Keyboard Navigation
Everything works with just a keyboard:
- Tab order makes sense as you navigate through
- Focus indicators show where you are
- Skip link lets you jump to main content (press Tab when page loads)
- Focus gets trapped in modals so you don't lose your place
- Escape closes dialogs

**Keyboard shortcuts:**
- `Tab` - Move forward through elements
- `Shift + Tab` - Go backwards
- `Enter` or `Space` - Click buttons/links
- `Escape` - Close the accessibility panel
- `Alt + A` - Toggle accessibility menu
- `Alt + T` - Switch themes
- `Alt + +` - Increase font size
- `Alt + -` - Decrease font size

### 2. Screen Reader Support

I added proper ARIA labels and landmarks:
- `role="banner"` on the header
- `role="main"` on main content area
- `role="navigation"` on nav elements
- `role="dialog"` on the accessibility panel
- All icon buttons have `aria-label`
- Toggle buttons have `aria-expanded` and `aria-pressed` states
- Dynamic content uses `aria-live` regions
- Decorative icons are marked `aria-hidden="true"`

**Images:**
- All images have descriptive alt text
- Profile photo describes who and where
- Gallery images describe what's shown
- Purely decorative stuff gets `aria-hidden="true"`

### 3. Customizable Interface

The accessibility panel (eye icon in top right) lets you adjust:

**Themes:**
- Light mode (default)
- Dark mode with higher contrast

**Font Size:**
- Range from 80% to 150% of base size
- Adjustable in 10% steps
- Affects all text across the site
- Settings persist between visits

**Text Spacing:**
- Double line height for easier reading
- More letter spacing (0.12em)
- More word spacing (0.16em)
- Helps with dyslexia

**Link Highlighting:**
- Adds background colors to links
- Underlines everything
- Makes links way more visible
- Good for visual impairments

**Persistence:**
- All your preferences save to localStorage
- Automatically loads when you come back
- Reset button if you want defaults back

### 4. Semantic HTML
I used proper HTML structure:
- Heading hierarchy goes h1, then h2, then h3 (no skipping)
- Semantic tags like `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`
- Link text is descriptive (no "click here" nonsense)
- Language set to English with `lang="en"`
- Valid HTML5 throughout

### 5. Visual Accessibility

**Color Contrast:**
- All text meets WCAG AA standards (at least 4.5:1 ratio)
- Dark mode has even better contrast
- High contrast mode available

**Typography:**
- Base font size is 16px minimum
- Using Fraunces and DM Sans (both very readable)
- Line spacing is 1.6 base
- No justified text (it's hard to read)

**Focus Indicators:**
- 3px solid outline when you focus on something
- 3px offset so it's clearly visible
- Uses the site's accent color
- Shows on every interactive element

### 6. Responsive & Touch-Friendly
- Works on phones, tablets, and desktops
- Touch targets are at least 44x44px
- Nothing requires hover (works on touch screens)
- Text scales responsively
- Mobile navigation is optimized

### 7. Animation Control
- Scroll animations use the AOS library
- Respects your system's `prefers-reduced-motion` setting
- Animations only happen once
- Nothing auto-plays

### 8. Forms & Interactive Stuff
- All buttons are labeled clearly
- Form inputs have proper labels
- Error states are obvious
- Focus is visible on all controls

## Testing I did

### Screen Reader Testing:
Tested with VoiceOver on macOS. Everything's accessible, states are announced properly, and the reading order makes sense.

### Keyboard Testing:
Can navigate the entire site without a mouse. All functions work via keyboard. No keyboard traps. Tab order is logical.

### Color Contrast Testing:
Ran everything through a WCAG contrast checker. All text passes AA, most passes AAA.

## WCAG 2.1 Compliance

Aiming for **WCAG 2.1 Level AA**:

**Perceivable:**
- Images have text alternatives
- Color contrast is sufficient
- Layout adapts to different sizes
- Content is distinguishable

**Operable:**
- Fully keyboard accessible
- Users have enough time to read/interact
- No seizure-inducing flashing content
- Navigation is logical

**Understandable:**
- Text is readable
- Navigation is predictable
- Input help is provided when needed

**Robust:**
- Works with assistive tech
- HTML is valid
- ARIA is implemented correctly

## How it's built

### HTML:
- Semantic structure throughout
- ARIA landmarks where needed
- Proper heading hierarchy
- Alt text on all images

### CSS:
- Using relative units (rem, em)
- CSS custom properties for theming
- Focus-visible for keyboard users
- No info conveyed by color alone

### JavaScript:
- Progressive enhancement approach
- Keyboard event handlers
- Focus management
- ARIA states update dynamically

## Content Accessibility

- Language is clear and concise
- Links describe where they go
- Content structure is logical
- Headings are used properly
- Images have meaningful alt text

## What I might add later

Some ideas for improvements:
- Breadcrumb navigation
- Loading indicators
- Form validation with better error messages
- Video captions if I add any videos

## Feedback

If you find any accessibility issues, let me know so I can fix them.

---

**Last Updated:** February 2026  
**Standards:** WCAG 2.1 Level AA  
**Testing:** Keyboard, Screen Reader, Color Contrast
