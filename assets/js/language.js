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
    
    // Update UI elements
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    document.querySelectorAll('.lang-es').forEach(el => {
        el.style.display = lang === 'es' ? 'block' : 'none';
    });
    
    // Update select dropdown if it exists
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Handle inline navigation items that might be using display: inline-block
    document.querySelectorAll('nav .lang-en, nav .lang-es').forEach(el => {
        if ((el.classList.contains('lang-en') && lang === 'en') || 
            (el.classList.contains('lang-es') && lang === 'es')) {
            el.style.display = 'inline-block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Make setLanguage and currentLanguage available globally
window.setLanguage = setLanguage;
let currentLanguage = localStorage.getItem('language') || 'en';
