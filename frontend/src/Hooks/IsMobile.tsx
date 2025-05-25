import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Initial check
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Check on mount
        checkIfMobile();

        // Set up event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up event listener
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;