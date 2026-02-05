# Laula Nassi - Portfolio Website


<a href="https://github.com/controlmyspace/Laula-Coding-Three-Final-Submission">Link to Laula's Website Portfolio</a>

This is my portfolio site built with accessibility in mind. It's fully responsive & works on pretty much any device. It includes the tasks from all the weeks, figma task from week 4 is in a link in the documentation. 

## What's in here

- **index.html** - Main landing page (about me section)
- **weekly-tasks.html** - Gallery showing my weekly creative tasks
- **task-week#.html** - Example of an individual task page
- **tasks** - Folder with the tasks themselves 
- **images** - Folder with images used 
- **styles.css** - All the styling
- **accessibility.js** - Handles the accessibility features
- **accessibility.md** - Documentation on accessibility features, considerations, reflections and future improvements 
- **documentation.pdf** 


## The animation library

I'm using **AOS (Animate On Scroll)** for the scroll animations. It's lightweight and does the job well.

Setup:
- Version: 2.3.1
- Loaded from unpkg.com CDN (so no npm install needed)
- Settings I used:
  - 800ms duration
  - ease-in-out timing
  - animations only play once
  - trigger point is 100px from viewport

Things fade in as you scroll down the page.

## Main features

### Accessibility panel (the eye icon in top right)
Click the eye icon to open the settings panel. You can adjust:

- **Theme** - Switch between light and dark mode
- **Font size** - From 80% to 150% in 10% steps
- **Text spacing** - Adds more breathing room between lines and letters
- **Link highlighting** - Makes links stand out more with background colors

### task cards
Each card is clickable and takes you to a dedicated page with:
- featured task
- Navigation to previous/next tasks
- Link back to the gallery

### Settings persistence
preferences get saved in localStorage, so they'll still be there when you come back.

### Keyboard shortcuts
- `Alt + A` - Open/close accessibility menu
- `Alt + T` - Switch theme
- `Alt + +` - Bigger text
- `Alt + -` - Smaller text
- `Escape` - Close the panel

## compatible with other devices

The site adapts to different screen sizes:

### Desktop (1400px and up)
Full layout with lots of space, multi-column grids, and hover effects.

### Tablet (768px - 1024px)
2-3 column grids, touch-friendly buttons, adjusted spacing.

### Mobile (under 768px)
Everything stacks in a single column, header stays compact, full-width images.

Just resize your browser or open it on any device to see how it adapts.


## Gradient colors I used:
- Week 1: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- Week 2: Just text, no image
- Week 3: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Week 6: Code block instead of image
- Week 7: `linear-gradient(135deg, #fa709a 0%, #fee140 100%)`
- Week 8: `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`
- Week 10: `linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)`

## Browser support
- Chrome/Edge
- Firefox
- Safari
- Opera


## Customizing

### Colors
The color scheme is set with CSS variables in `styles.css`:
```css
:root {
    --bg-primary: #f8f9f0;
    --accent: #2d5016;
    /* and so on */
}
```

## Links

Social media links are in the footer of `weekly-tasks.html`

## Design notes
- Two fonts: Fraunces for headings, DM Sans for body text
- Subtle scroll animations
- Accessibility comes first
- Mobile-first approach

---

Laula Nassi, 2026
