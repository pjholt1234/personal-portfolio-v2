import {FC} from 'react';
import styles from './MobileNavigation.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MobileNavigationProps {}

const navItems = [
  { label: 'Home', key: 'home', path: '/' },
  { label: 'Experience', key: 'experience', path: '/experience' },
  { label: 'Projects', key: 'projects', path: '/projects' },
];

const MobileNavigation: FC<MobileNavigationProps> = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const navRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    useLayoutEffect(() => {
        const idx = navItems.findIndex(item => {
            let isActive = pathname.includes(item.path);
            if(item.path === "/") isActive = pathname === "/";
            return isActive;
        });
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
    }, [pathname]);

    return (
        <nav className={styles.mobileNav} ref={navRef as any} style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw' }}>
            {navItems.map((item, idx) => {
                let isActive = pathname.includes(item.path);
                if(item.path === "/") {
                    isActive = pathname === "/";
                }
                return (
                    <button
                        key={item.key}
                        ref={el => { btnRefs.current[idx] = el; }}
                        className={[
                            styles.navItem,
                            isActive ? styles.active : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => navigate(item.path)}
                        type="button"
                    >
                        {item.label}
                    </button>
                );
            })}
            <div
                className={styles.mobileNav__underline}
                style={{ left: underlineStyle.left, width: underlineStyle.width }}
            />
        </nav>
    );
};

export default MobileNavigation;