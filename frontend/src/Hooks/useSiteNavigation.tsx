import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SiteNavigationContextType {
  currentSection: string;
  navigateToSection: (section: string) => void;
  isIntentionalNavigation: boolean;
  updateSectionFromScroll: (section: string) => void;
}

const SiteNavigationContext = createContext<SiteNavigationContextType | undefined>(undefined);

// Section to URL mapping
const SECTION_TO_URL: Record<string, string> = {
  'home': '/',
  'experience': '/experience',
  'projects': '/projects'
};

const URL_TO_SECTION: Record<string, string> = {
  '/': 'home',
  '/experience': 'experience',
  '/projects': 'projects'
};

export const SiteNavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIntentionalNavigation, setIsIntentionalNavigation] = useState(false);
  const scrollUpdateTimeoutRef = useRef<number | undefined>(undefined);
  const intentionalNavTimeoutRef = useRef<number | undefined>(undefined);

  // Get current section from URL
  const getCurrentSectionFromUrl = useCallback(() => {
    const path = location.pathname;
    // Handle child routes (e.g., /projects/some-project -> projects)
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/experience')) return 'experience';
    return URL_TO_SECTION[path] || 'home';
  }, [location.pathname]);

  const currentSection = getCurrentSectionFromUrl();

  // Handle intentional navigation (button clicks, URL changes)
  const navigateToSection = useCallback((section: string) => {
    setIsIntentionalNavigation(true);
    
    // Clear any pending scroll updates
    if (scrollUpdateTimeoutRef.current) {
      window.clearTimeout(scrollUpdateTimeoutRef.current);
    }

    // Navigate to the URL
    const url = SECTION_TO_URL[section] || '/';
    navigate(url);

    // Scroll to section with retry mechanism
    const scrollToSection = (retryCount = 0) => {
      const elementId = section === 'home' ? 'home' : section;
      const element = document.getElementById(elementId);
      
      if (element) {
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (retryCount < 3) {
        // Element not found, retry after a short delay
        window.setTimeout(() => {
          scrollToSection(retryCount + 1);
        }, 50 * (retryCount + 1)); // Shorter delays for button clicks: 50ms, 100ms, 150ms
        return; // Don't reset intentional navigation flag yet
      }
      
      // Reset intentional navigation flag after scroll completes or max retries
      if (intentionalNavTimeoutRef.current) {
        window.clearTimeout(intentionalNavTimeoutRef.current);
      }
      intentionalNavTimeoutRef.current = window.setTimeout(() => {
        setIsIntentionalNavigation(false);
      }, 800); // Slightly longer than scroll duration
    };

    scrollToSection();
  }, [navigate]);

  // Handle scroll-triggered section updates
  const updateSectionFromScroll = useCallback((section: string) => {
    // Don't update URL if we're in intentional navigation mode
    if (isIntentionalNavigation) {
      return;
    }

    // Don't update if the current section already matches what we want to set
    const currentSectionFromUrl = getCurrentSectionFromUrl();
    if (currentSectionFromUrl === section) {
      return;
    }

    // Debounce scroll updates to avoid rapid URL changes
    if (scrollUpdateTimeoutRef.current) {
      window.clearTimeout(scrollUpdateTimeoutRef.current);
    }

    scrollUpdateTimeoutRef.current = window.setTimeout(() => {
      // Double-check we're still not in intentional navigation and section hasn't changed
      if (!isIntentionalNavigation && getCurrentSectionFromUrl() !== section) {
        const targetUrl = SECTION_TO_URL[section] || '/';
        if (location.pathname !== targetUrl) {
          navigate(targetUrl, { replace: true }); // Use replace to avoid cluttering history
        }
      }
    }, 300); // Debounce delay
  }, [isIntentionalNavigation, location.pathname, navigate, getCurrentSectionFromUrl]);

  // Handle initial page load and URL changes
  useEffect(() => {
    const newSection = getCurrentSectionFromUrl();
    
    // Always handle URL-based navigation on mount or URL change
    setIsIntentionalNavigation(true);
    
    // Scroll to section with retry mechanism
    const scrollToSection = (retryCount = 0) => {
      const elementId = newSection === 'home' ? 'home' : newSection;
      const element = document.getElementById(elementId);
      
      if (element) {
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Reset intentional navigation flag after scroll
        if (intentionalNavTimeoutRef.current) {
          window.clearTimeout(intentionalNavTimeoutRef.current);
        }
        intentionalNavTimeoutRef.current = window.setTimeout(() => {
          setIsIntentionalNavigation(false);
        }, 2000); // Even longer delay
      } else if (retryCount < 10) {
        // Element not found, retry after a delay (DOM might not be ready)
        window.setTimeout(() => {
          scrollToSection(retryCount + 1);
        }, 300 * (retryCount + 1)); // Even longer delays: 300ms, 600ms, 900ms, etc.
      } else {
        // Max retries reached, reset flag anyway
        if (intentionalNavTimeoutRef.current) {
          window.clearTimeout(intentionalNavTimeoutRef.current);
        }
        intentionalNavTimeoutRef.current = window.setTimeout(() => {
          setIsIntentionalNavigation(false);
        }, 1000);
      }
    };

    // Start scrolling after a delay to ensure components are mounted
    window.setTimeout(() => {
      scrollToSection();
    }, 500); // Longer initial delay
    
  }, [location.pathname]); // Trigger on any pathname change

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (scrollUpdateTimeoutRef.current) {
        window.clearTimeout(scrollUpdateTimeoutRef.current);
      }
      if (intentionalNavTimeoutRef.current) {
        window.clearTimeout(intentionalNavTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SiteNavigationContext.Provider value={{ 
      currentSection, 
      navigateToSection, 
      isIntentionalNavigation,
      updateSectionFromScroll 
    }}>
      {children}
    </SiteNavigationContext.Provider>
  );
};

export const useSiteNavigation = () => {
  const context = useContext(SiteNavigationContext);
  if (!context) {
    throw new Error('useSiteNavigation must be used within a SiteNavigationProvider');
  }

  return context;
};
