import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SiteNavigationContextType {
  currentSection: string;
  navigateToSection: (section: string) => void;
  isIntentionalNavigation: boolean;
  updateSectionFromScroll: (section: string) => void;
}

const SiteNavigationContext = createContext<SiteNavigationContextType | undefined>(undefined);

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

  const getCurrentSectionFromUrl = useCallback(() => {
    const path = location.pathname;

    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/experience')) return 'experience';
    return URL_TO_SECTION[path] || 'home';
  }, [location.pathname]);

  const currentSection = getCurrentSectionFromUrl();

  const navigateToSection = useCallback((section: string) => {
    setIsIntentionalNavigation(true);
    
    if (scrollUpdateTimeoutRef.current) {
      window.clearTimeout(scrollUpdateTimeoutRef.current);
    }

    const url = SECTION_TO_URL[section] || '/';
    navigate(url);

    const scrollToSection = (retryCount = 0) => {
      const elementId = section === 'home' ? 'home' : section;
      const element = document.getElementById(elementId);
      
      if (element) {
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (retryCount < 3) {
        window.setTimeout(() => {
          scrollToSection(retryCount + 1);
        }, 50 * (retryCount + 1));
        return;
      }
      
      if (intentionalNavTimeoutRef.current) {
        window.clearTimeout(intentionalNavTimeoutRef.current);
      }
      intentionalNavTimeoutRef.current = window.setTimeout(() => {
        setIsIntentionalNavigation(false);
      }, 800);
    };

    scrollToSection();
  }, [navigate]);

  const updateSectionFromScroll = useCallback((section: string) => {
    if (isIntentionalNavigation) {
      return;
    }

    const currentSectionFromUrl = getCurrentSectionFromUrl();
    if (currentSectionFromUrl === section) {
      return;
    }
    
    if (scrollUpdateTimeoutRef.current) {
      window.clearTimeout(scrollUpdateTimeoutRef.current);
    }

    scrollUpdateTimeoutRef.current = window.setTimeout(() => {
      if (!isIntentionalNavigation && getCurrentSectionFromUrl() !== section) {
        const targetUrl = SECTION_TO_URL[section] || '/';
        if (location.pathname !== targetUrl) {
          navigate(targetUrl, { replace: true });
        }
      }
    }, 300);
  }, [isIntentionalNavigation, location.pathname, navigate, getCurrentSectionFromUrl]);

  useEffect(() => {
    const newSection = getCurrentSectionFromUrl();
    
    setIsIntentionalNavigation(true);
    
    const scrollToSection = (retryCount = 0) => {
      const elementId = newSection === 'home' ? 'home' : newSection;
      const element = document.getElementById(elementId);
      
      if (element) {
        const yOffset = -20;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        if (intentionalNavTimeoutRef.current) {
          window.clearTimeout(intentionalNavTimeoutRef.current);
        }
        intentionalNavTimeoutRef.current = window.setTimeout(() => {
          setIsIntentionalNavigation(false);
        }, 2000);
      } else if (retryCount < 10) {
        window.setTimeout(() => {
          scrollToSection(retryCount + 1);
        }, 300 * (retryCount + 1));
      } else {
        if (intentionalNavTimeoutRef.current) {
          window.clearTimeout(intentionalNavTimeoutRef.current);
        }
        intentionalNavTimeoutRef.current = window.setTimeout(() => {
          setIsIntentionalNavigation(false);
        }, 1000);
      }
    };

    window.setTimeout(() => {
      scrollToSection();
    }, 500);
    
  }, [location.pathname]);

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
