// accessibility settings manager
// handles all the theme, font size, spacing stuff

class AccessibilityManager {
    constructor() {
        this.settings = {
            theme: 'light',
            fontSize: 100,
            spacing: 'normal',
            links: 'normal'
        };
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.applyAllSettings();
    }
    
    // grab settings from localStorage if they exist
    loadSettings() {
        const savedSettings = localStorage.getItem('accessibilitySettings');
        if (savedSettings) {
            try {
                this.settings = JSON.parse(savedSettings);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }
    
    // save current settings to browser storage
    saveSettings() {
        localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    }
    
    // apply everything at once when the page loads
    applyAllSettings() {
        this.applyTheme();
        this.applyFontSize();
        this.applySpacing();
        this.applyLinkHighlight();
        this.updateUI();
    }
    
    // switch between light and dark mode
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        const themeLightBtn = document.getElementById('theme-light');
        const themeDarkBtn = document.getElementById('theme-dark');
        
        if (themeLightBtn && themeDarkBtn) {
            if (this.settings.theme === 'dark') {
                themeLightBtn.classList.remove('active');
                themeLightBtn.setAttribute('aria-pressed', 'false');
                themeDarkBtn.classList.add('active');
                themeDarkBtn.setAttribute('aria-pressed', 'true');
            } else {
                themeLightBtn.classList.add('active');
                themeLightBtn.setAttribute('aria-pressed', 'true');
                themeDarkBtn.classList.remove('active');
                themeDarkBtn.setAttribute('aria-pressed', 'false');
            }
        }
    }
    
    setTheme(theme) {
        this.settings.theme = theme;
        this.applyTheme();
        this.saveSettings();
        announceToScreenReader(`Theme changed to ${theme} mode`);
    }
    
    // make text bigger or smaller
    applyFontSize() {
        document.documentElement.setAttribute('data-font-size', this.settings.fontSize);
        const fontDisplay = document.getElementById('font-display');
        if (fontDisplay) {
            fontDisplay.textContent = `${this.settings.fontSize}%`;
        }
    }
    
    increaseFontSize() {
        if (this.settings.fontSize < 150) {
            this.settings.fontSize += 10;
            this.applyFontSize();
            this.saveSettings();
        }
    }
    
    decreaseFontSize() {
        if (this.settings.fontSize > 80) {
            this.settings.fontSize -= 10;
            this.applyFontSize();
            this.saveSettings();
        }
    }
    
    // add more space between lines and letters
    applySpacing() {
        document.documentElement.setAttribute('data-spacing', this.settings.spacing);
        this.updateToggleButton('spacing-toggle', this.settings.spacing === 'increased');
    }
    
    toggleSpacing() {
        this.settings.spacing = this.settings.spacing === 'normal' ? 'increased' : 'normal';
        this.applySpacing();
        this.saveSettings();
    }
    
    // make links more visible with background color
    applyLinkHighlight() {
        document.documentElement.setAttribute('data-links', this.settings.links);
        this.updateToggleButton('links-toggle', this.settings.links === 'highlighted');
    }
    
    toggleLinkHighlight() {
        this.settings.links = this.settings.links === 'normal' ? 'highlighted' : 'normal';
        this.applyLinkHighlight();
        this.saveSettings();
    }
    
    // update the on/off state of toggle buttons
    updateToggleButton(buttonId, isActive) {
        const button = document.getElementById(buttonId);
        if (button) {
            const status = button.querySelector('.toggle-status');
            if (isActive) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                status.textContent = 'On';
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
                status.textContent = 'Off';
            }
        }
    }
    
    // show the accessibility panel
    openAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        const toggle = document.getElementById('accessibility-toggle');
        
        panel.classList.add('open');
        panel.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close accessibility settings menu');
        
        // put keyboard focus on first button so you can start using it right away
        const firstButton = panel.querySelector('button');
        if (firstButton) {
            setTimeout(() => firstButton.focus(), 100);
        }
    }
    
    // hide the accessibility panel
    closeAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        const toggle = document.getElementById('accessibility-toggle');
        
        panel.classList.remove('open');
        panel.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open accessibility settings menu');
    }
    
    // keep focus trapped inside the panel so keyboard users don't get lost
    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    // refresh all the UI elements to match current settings
    updateUI() {
        // update all toggle buttons
        this.updateToggleButton('spacing-toggle', this.settings.spacing === 'increased');
        this.updateToggleButton('links-toggle', this.settings.links === 'highlighted');
    }
    
    // reset everything back to defaults
    resetSettings() {
        this.settings = {
            theme: 'light',
            fontSize: 100,
            spacing: 'normal',
            links: 'normal'
        };
        this.saveSettings();
        this.applyAllSettings();
    }
    
    // wire up all the buttons and keyboard shortcuts
    setupEventListeners() {
        // accessibility panel toggle
        const accessibilityToggle = document.getElementById('accessibility-toggle');
        const accessibilityPanel = document.getElementById('accessibility-panel');
        
        if (accessibilityToggle && accessibilityPanel) {
            accessibilityToggle.addEventListener('click', () => {
                const isOpen = accessibilityPanel.classList.contains('open');
                
                if (isOpen) {
                    this.closeAccessibilityPanel();
                } else {
                    this.openAccessibilityPanel();
                }
            });
            
            // close panel if you click outside of it
            document.addEventListener('click', (e) => {
                if (!accessibilityPanel.contains(e.target) && 
                    !accessibilityToggle.contains(e.target) &&
                    accessibilityPanel.classList.contains('open')) {
                    this.closeAccessibilityPanel();
                }
            });
            
            // pressing escape also closes the panel
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && accessibilityPanel.classList.contains('open')) {
                    this.closeAccessibilityPanel();
                    accessibilityToggle.focus();
                }
            });
            
            // keep keyboard focus inside panel when it's open
            accessibilityPanel.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && accessibilityPanel.classList.contains('open')) {
                    this.trapFocus(e, accessibilityPanel);
                }
            });
        }
        
        // theme toggle buttons
        const themeLightBtn = document.getElementById('theme-light');
        const themeDarkBtn = document.getElementById('theme-dark');
        
        if (themeLightBtn) {
            themeLightBtn.addEventListener('click', () => this.setTheme('light'));
        }
        
        if (themeDarkBtn) {
            themeDarkBtn.addEventListener('click', () => this.setTheme('dark'));
        }
        
        // font size buttons
        const fontIncrease = document.getElementById('font-increase');
        const fontDecrease = document.getElementById('font-decrease');
        
        if (fontIncrease) {
            fontIncrease.addEventListener('click', () => this.increaseFontSize());
        }
        
        if (fontDecrease) {
            fontDecrease.addEventListener('click', () => this.decreaseFontSize());
        }
        
        // spacing toggle
        const spacingToggle = document.getElementById('spacing-toggle');
        if (spacingToggle) {
            spacingToggle.addEventListener('click', () => this.toggleSpacing());
        }
        
        // links toggle
        const linksToggle = document.getElementById('links-toggle');
        if (linksToggle) {
            linksToggle.addEventListener('click', () => this.toggleLinkHighlight());
        }
        
        // reset button
        const resetButton = document.getElementById('reset-settings');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all accessibility settings?')) {
                    this.resetSettings();
                }
            });
        }
        
        // keyboard shortcuts for quick access
        document.addEventListener('keydown', (e) => {
            // alt + a: open/close accessibility panel
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                accessibilityPanel.classList.toggle('open');
            }
            
            // alt + t: switch between light/dark mode
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                const newTheme = this.settings.theme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            }
            
            // alt + plus: make text bigger
            if (e.altKey && e.key === '+') {
                e.preventDefault();
                this.increaseFontSize();
            }
            
            // alt + minus: make text smaller
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.decreaseFontSize();
            }
        });
    }
}

// initialization stuff
// wait for page to load before setting everything up

// check if DOM is still loading or already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccessibility);
} else {
    initializeAccessibility();
}

function initializeAccessibility() {
    // create the main accessibility manager
    window.accessibilityManager = new AccessibilityManager();
    
    // check if user has dark mode turned on in their system
    detectSystemPreferences();
    
    // add a skip link for keyboard users
    addSkipLink();
}

// check what theme the user's system is using
// and match it if they haven't set a preference yet

function detectSystemPreferences() {
    // see if the browser supports checking for dark mode preference
    if (window.matchMedia && !localStorage.getItem('accessibilitySettings')) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (darkModeQuery.matches) {
            window.accessibilityManager.settings.theme = 'dark';
            window.accessibilityManager.applyTheme();
            window.accessibilityManager.saveSettings();
        }
        
        // if system theme changes, ask if they want to update the site
        darkModeQuery.addEventListener('change', (e) => {
            if (confirm('Your system theme has changed. Would you like to update the website theme?')) {
                window.accessibilityManager.settings.theme = e.matches ? 'dark' : 'light';
                window.accessibilityManager.applyTheme();
                window.accessibilityManager.saveSettings();
            }
        });
    }
}

// add a skip link so keyboard users can jump straight to the main content
// without tabbing through the whole nav

function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent);
        color: var(--bg-primary);
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // give the main content an ID so the skip link knows where to go
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
}

// helper functions

// tell screen readers when something changes
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// extending the prototype to add screen reader announcements
// (this is a bit of a hack but it works)
const originalSetTheme = AccessibilityManager.prototype.setTheme;
AccessibilityManager.prototype.setTheme = function(theme) {
    originalSetTheme.call(this, theme);
    // announcement is already in the setTheme method so we're good
};

const originalIncreaseFontSize = AccessibilityManager.prototype.increaseFontSize;
AccessibilityManager.prototype.increaseFontSize = function() {
    const oldSize = this.settings.fontSize;
    originalIncreaseFontSize.call(this);
    if (oldSize !== this.settings.fontSize) {
        announceToScreenReader(`Font size increased to ${this.settings.fontSize}%`);
    }
};

const originalDecreaseFontSize = AccessibilityManager.prototype.decreaseFontSize;
AccessibilityManager.prototype.decreaseFontSize = function() {
    const oldSize = this.settings.fontSize;
    originalDecreaseFontSize.call(this);
    if (oldSize !== this.settings.fontSize) {
        announceToScreenReader(`Font size decreased to ${this.settings.fontSize}%`);
    }
};

// show the keyboard shortcuts in the console for anyone who checks
console.log(`
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘   ACCESSIBILITY KEYBOARD SHORTCUTS     â•‘
â• â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•£
â•‘  Alt + A  â†’  Toggle accessibility menu â•‘
â•‘  Alt + T  â†’  Toggle dark/light theme   â•‘
â•‘  Alt + +  â†’  Increase font size        â•‘
â•‘  Alt + -  â†’  Decrease font size        â•‘
â•‘  Escape   â†’  Close accessibility menu  â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
`);
