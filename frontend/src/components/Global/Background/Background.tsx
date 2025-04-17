import React, { useEffect, useRef } from 'react';
import Dot from './Dot';
import styles from './Background.module.scss';

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Dots settings
        const numDots = 100;
        const dots: Dot[] = [];

        // Create dots with random positions and speeds
        for (let i = 0; i < numDots; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = Math.random() > 0.5 ? 'red' : 'blue';
            dots.push(new Dot(x, y, color));
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

            // Update and draw each dot
            dots.forEach((dot) => {
                dot.update(canvas, ctx);
            });

            // Detect and resolve collisions between dots
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    Dot.detectCollision(dots[i], dots[j]);
                }
            }

            // Request next frame
            requestAnimationFrame(animate);
        };

        animate(); // Start the animation loop

        // Resize canvas when window is resized
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas className={styles.canvas} ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default Background;
