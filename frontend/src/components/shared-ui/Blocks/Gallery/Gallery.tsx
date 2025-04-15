import styles from "./Gallery.module.scss";
import { FC, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface GalleryProps extends Block {
    images: Image[];
    autoScroll?: boolean;
}

const Gallery: FC<GalleryProps> = ({ images, autoScroll = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [isSliding, setIsSliding] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cardsInnerRef = useRef<HTMLDivElement>(null);

    const getIndices = () => {
        const prev = (currentIndex - 1 + images.length) % images.length;
        const next = (currentIndex + 1) % images.length;
        return { prev, current: currentIndex, next };
    };

    const slide = (dir: 'left' | 'right') => {
        if (isSliding) return;
        setDirection(dir);
        setIsSliding(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => {
                if (dir === 'left') return (prev - 1 + images.length) % images.length;
                return (prev + 1) % images.length;
            });
            setIsSliding(false);
            setDirection(null);
        }, 350);
    };

    const previous = () => slide('left');
    const next = () => slide('right');

    useEffect(() => {
        if (!autoScroll || isSliding) return;
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, autoScroll, isSliding]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const { prev, current, next: nextIdx } = getIndices();

    let translateX = '0%';
    if (direction === 'left' && isSliding) translateX = '33.333%';
    if (direction === 'right' && isSliding) translateX = '-33.333%';

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const modal = modalOpen ? createPortal(
        <div className={styles["gallery--modal-overlay"]} onClick={closeModal}>
            <div className={styles["gallery--modal"]} onClick={e => e.stopPropagation()}>
                <img
                    src={images[current].image_url}
                    alt={images[current].alt}
                    className={styles["gallery--modal-image"]}
                />
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <div className={styles.gallery}>
                <div className={styles["gallery--cards"]}>
                    <div
                        className={styles["gallery--cards-inner"]}
                        ref={cardsInnerRef}
                        style={{
                            display: 'flex',
                            width: '300%',
                            transform: `translateX(${translateX})`,
                            transition: isSliding ? 'transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1)' : 'none',
                        }}
                    >
                        <div
                            className={`${styles["gallery--card"]} ${styles["gallery--card-prev"]}`}
                            onClick={isSliding ? undefined : previous}
                            style={{ cursor: 'pointer', pointerEvents: isSliding ? 'none' : 'auto' }}
                        >
                            <img
                                src={images[prev].image_url}
                                alt={images[prev].alt}
                                className={styles["gallery--image"]}
                                draggable={false}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div
                            className={`${styles["gallery--card"]} ${styles["gallery--card-current"]}`}
                            onClick={openModal}
                            style={{ cursor: 'zoom-in' }}
                        >
                            <img
                                src={images[current].image_url}
                                alt={images[current].alt}
                                className={styles["gallery--image"]}
                                draggable={false}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div
                            className={`${styles["gallery--card"]} ${styles["gallery--card-next"]}`}
                            onClick={isSliding ? undefined : next}
                            style={{ cursor: 'pointer', pointerEvents: isSliding ? 'none' : 'auto' }}
                        >
                            <img
                                src={images[nextIdx].image_url}
                                alt={images[nextIdx].alt}
                                className={styles["gallery--image"]}
                                draggable={false}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {modal}
        </>
    );
};

export default Gallery;
