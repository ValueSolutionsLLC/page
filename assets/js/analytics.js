// Analytics Tracking for Value Solutions LLC
// This script provides basic visitor tracking functionality

(function() {
    'use strict';
    
    // Analytics configuration
    const ANALYTICS_CONFIG = {
        siteId: 'valuesolutions-llc',
        endpoint: 'https://api.simpleanalytics.com/collect',
        trackPageViews: true,
        trackEvents: true,
        respectPrivacy: true
    };
    
    // Check if user has opted out of tracking
    function hasOptedOut() {
        return localStorage.getItem('analytics-opt-out') === 'true' || 
               localStorage.getItem('do-not-track') === 'true';
    }
    
    // Generate a simple visitor ID
    function generateVisitorId() {
        let visitorId = localStorage.getItem('visitor-id');
        if (!visitorId) {
            visitorId = 'v_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('visitor-id', visitorId);
        }
        return visitorId;
    }
    
    // Get page information
    function getPageInfo() {
        return {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenSize: screen.width + 'x' + screen.height,
            timestamp: new Date().toISOString()
        };
    }
    
    // Send analytics data
    function sendAnalytics(data) {
        if (hasOptedOut()) return;
        
        const payload = {
            siteId: ANALYTICS_CONFIG.siteId,
            visitorId: generateVisitorId(),
            ...data
        };
        
        // Store analytics data locally
        const analyticsData = JSON.parse(localStorage.getItem('analytics-data') || '[]');
        analyticsData.push(payload);
        localStorage.setItem('analytics-data', JSON.stringify(analyticsData));
        
        // Send to analytics service (uncomment when ready for production)
        /*
        fetch(ANALYTICS_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).catch(error => {
            console.warn('Analytics error:', error);
        });
        */
    }
    
    // Track page view
    function trackPageView() {
        if (!ANALYTICS_CONFIG.trackPageViews) return;
        
        sendAnalytics({
            type: 'pageview',
            ...getPageInfo()
        });
    }
    
    // Track custom events
    function trackEvent(eventName, eventData = {}) {
        if (!ANALYTICS_CONFIG.trackEvents) return;
        
        sendAnalytics({
            type: 'event',
            eventName: eventName,
            eventData: eventData,
            ...getPageInfo()
        });
    }
    
    // Track form submissions
    function trackFormSubmission(formType) {
        trackEvent('form_submission', { formType: formType });
    }
    
    // Track button clicks
    function trackButtonClick(buttonText, buttonLocation) {
        trackEvent('button_click', { 
            buttonText: buttonText, 
            location: buttonLocation 
        });
    }
    
    // Track language changes
    function trackLanguageChange(newLanguage) {
        trackEvent('language_change', { newLanguage: newLanguage });
    }
    
    // Initialize analytics
    function initAnalytics() {
        if (hasOptedOut()) return;
        
        // Track initial page view
        trackPageView();
        
        // Track form submissions
        document.addEventListener('submit', function(e) {
            if (e.target.tagName === 'FORM') {
                const formType = e.target.getAttribute('data-form-type') || 'contact';
                trackFormSubmission(formType);
            }
        });
        
        // Track button clicks
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                const buttonText = e.target.textContent.trim();
                const buttonLocation = e.target.closest('section')?.className || 'unknown';
                trackButtonClick(buttonText, buttonLocation);
            }
        });
        
        // Track language selector changes
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', function(e) {
                trackLanguageChange(e.target.value);
            });
        }
        
        // Track navigation
        window.addEventListener('popstate', function() {
            setTimeout(trackPageView, 100);
        });
    }
    
    // Analytics dashboard functions (for admin use)
    window.ValueSolutionsAnalytics = {
        trackPageView: trackPageView,
        trackEvent: trackEvent,
        trackFormSubmission: trackFormSubmission,
        trackButtonClick: trackButtonClick,
        trackLanguageChange: trackLanguageChange,
        
        // Get analytics data
        getAnalyticsData: function() {
            return JSON.parse(localStorage.getItem('analytics-data') || '[]');
        },
        
        // Clear analytics data
        clearAnalyticsData: function() {
            localStorage.removeItem('analytics-data');
            localStorage.removeItem('visitor-id');
        },
        
        // Opt out of tracking
        optOut: function() {
            localStorage.setItem('analytics-opt-out', 'true');
        },
        
        // Opt in to tracking
        optIn: function() {
            localStorage.removeItem('analytics-opt-out');
        },
        
        // Get visitor count (unique visitors)
        getVisitorCount: function() {
            const data = this.getAnalyticsData();
            const uniqueVisitors = new Set(data.map(item => item.visitorId));
            return uniqueVisitors.size;
        },
        
        // Get page view count
        getPageViewCount: function() {
            const data = this.getAnalyticsData();
            return data.filter(item => item.type === 'pageview').length;
        },
        
        // Get most visited pages
        getMostVisitedPages: function() {
            const data = this.getAnalyticsData();
            const pageViews = data.filter(item => item.type === 'pageview');
            const pageCounts = {};
            
            pageViews.forEach(item => {
                const url = item.url;
                pageCounts[url] = (pageCounts[url] || 0) + 1;
            });
            
            return Object.entries(pageCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10);
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalytics);
    } else {
        initAnalytics();
    }
    
})(); 