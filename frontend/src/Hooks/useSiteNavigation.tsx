import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SiteNavigationContextType {
  location: string;
  setLocation: (loc: string) => void;
  isNavigating: boolean;
  setIsNavigating: (nav: boolean) => void;
}

const SiteNavigationContext = createContext<SiteNavigationContextType | undefined>(undefined);

export const SiteNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  return (
    <SiteNavigationContext.Provider value={{ location, setLocation, isNavigating, setIsNavigating }}>
      {children}
    </SiteNavigationContext.Provider>
  );
};

interface UseSiteNavigationOptions {
  disableScroll?: boolean;
}

export const useSiteNavigation = (options: UseSiteNavigationOptions = {}) => {
  const context = useContext(SiteNavigationContext);
  if (!context) {
    throw new Error('useSiteNavigation must be used within a SiteNavigationProvider');
  }

  // Scroll effect when location changes, with offset
  useEffect(() => {
    if (options.disableScroll) return;
    if (context.location && context.isNavigating) {
      const id = context.location.startsWith('/') ? context.location.slice(1) : context.location;
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -20; // Adjust this value for your header height
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          // Set isNavigating to false after scroll finishes (timeout)
          setTimeout(() => {
            context.setIsNavigating(false);
          }, 500); // Adjust timeout as needed for scroll duration
        } else {
          context.setIsNavigating(false);
        }
      } else {
        context.setIsNavigating(false);
      }
    }
  }, [context.location, options.disableScroll, context.isNavigating]);

  return context;
};
