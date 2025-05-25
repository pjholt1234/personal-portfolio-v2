import {FC} from 'react';
import styles from './MobileNavigation.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import { useSiteNavigation } from '@/Hooks/useSiteNavigation';

interface MobileNavigationProps {}

const navItems = [
  { label: 'About me', key: 'home' },
  { label: 'Experience', key: 'experience' },
  { label: 'Projects', key: 'projects' },
];

const MobileNavigation: FC<MobileNavigationProps> = () => {
    const { location, setLocation, setIsNavigating } = useSiteNavigation();
    const navRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    useLayoutEffect(() => {
        const idx = navItems.findIndex(item => location === item.key);
        const btn = btnRefs.current[idx];
        const nav = navRef.current;
        if (btn && nav) {
            const btnRect = btn.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            setUnderlineStyle({
                left: btnRect.left - navRect.left,
                width: btnRect.width
            });
        }
    }, [location]);

    return (
        <nav className={styles.mobileNav} ref={navRef as any}>
            {navItems.map((item, idx) => {
                let isActive = location === item.key;
                return (
                    <button
                        key={item.key}
                        ref={el => { btnRefs.current[idx] = el; }}
                        className={[
                            styles.navItem,
                            isActive ? styles.active : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => {
                          setIsNavigating(true);
                          setLocation(item.key);
                        }}
                        type="button"
                    >
                        {item.label}
                    </button>
                );
            })}
            <div
                className={styles.mobileNav__underline}
                style={{
                  ['--underline-left' as any]: `${underlineStyle.left}px`,
                  ['--underline-width' as any]: `${underlineStyle.width}px`,
                }}
            />
        </nav>
    );
};

export default MobileNavigation;