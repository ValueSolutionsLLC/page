// Language Switcher for Value Solutions LLC Website
document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Initially set language based on stored preference
    setLanguage(currentLanguage);
    
    // Set up language select dropdown
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // Set initial value based on the current language
        languageSelect.value = currentLanguage;
        
        // Add event listener to the select dropdown
        languageSelect.addEventListener('change', function() {
            setLanguage(this.value);
        });
    }
});

// Function to set language
// Making it available globally for access from other scripts
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Show/hide all .lang-en and .lang-es elements
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = (lang === 'en') ? '' : 'none';
    });
    document.querySelectorAll('.lang-es').forEach(el => {
        el.style.display = (lang === 'es') ? '' : 'none';
    });
    
    // Update select dropdown if it exists
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Handle navigation items specifically - including dropdown items
    document.querySelectorAll('nav .lang-en, nav .lang-es').forEach(el => {
        if ((el.classList.contains('lang-en') && lang === 'en') || 
            (el.classList.contains('lang-es') && lang === 'es')) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
    
    // Fix dropdown menu: for each <ul> in nav, only show <a> of selected language
    document.querySelectorAll('#nav ul ul').forEach(ul => {
        ul.querySelectorAll('a.lang-en').forEach(a => {
            a.style.display = (lang === 'en') ? '' : 'none';
        });
        ul.querySelectorAll('a.lang-es').forEach(a => {
            a.style.display = (lang === 'es') ? '' : 'none';
        });
    });
    
    // Also handle .dropotron menus (desktop dropdowns)
    document.querySelectorAll('.dropotron').forEach(ul => {
        ul.querySelectorAll('a.lang-en').forEach(a => {
            a.style.display = (lang === 'en') ? '' : 'none';
        });
        ul.querySelectorAll('a.lang-es').forEach(a => {
            a.style.display = (lang === 'es') ? '' : 'none';
        });
    });
    
    // Handle parent navigation items that contain dropdowns
    document.querySelectorAll('nav ul li').forEach(li => {
        const hasDropdown = li.querySelector('ul');
        if (hasDropdown) {
            const enLink = li.querySelector('a.lang-en, span.lang-en');
            const esLink = li.querySelector('a.lang-es, span.lang-es');
            if (enLink && esLink) {
                if (lang === 'en') {
                    enLink.style.display = '';
                    esLink.style.display = 'none';
                } else {
                    enLink.style.display = 'none';
                    esLink.style.display = '';
                }
            }
        }
    });
    
    // Additional fix for dropdown menu items that might be dynamically created (e.g., after navList() on mobile)
    setTimeout(() => {
        document.querySelectorAll('.dropotron').forEach(ul => {
            ul.querySelectorAll('a.lang-en').forEach(a => {
                a.style.display = (lang === 'en') ? '' : 'none';
            });
            ul.querySelectorAll('a.lang-es').forEach(a => {
                a.style.display = (lang === 'es') ? '' : 'none';
            });
        });
        // Also update mobile navPanel links if present
        document.querySelectorAll('#navPanel .link.lang-en').forEach(a => {
            a.style.display = (lang === 'en') ? '' : 'none';
        });
        document.querySelectorAll('#navPanel .link.lang-es').forEach(a => {
            a.style.display = (lang === 'es') ? '' : 'none';
        });
    }, 100);
}

// Make setLanguage and currentLanguage available globally
window.setLanguage = setLanguage;
let currentLanguage = localStorage.getItem('language') || 'en';
