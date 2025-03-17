// Dot.ts

export default class Dot {
    x: number;
    y: number;
    dx: number;
    dy: number;
    color: string;
    radius: number;

    // Define a constant speed for all dots
    static SPEED: number = 0.2; // You can adjust this value to control speed

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 2;

        // Use the SPEED constant to set the velocity components
        const angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
        this.dx = Dot.SPEED * Math.cos(angle);  // Set dx based on the angle and SPEED
        this.dy = Dot.SPEED * Math.sin(angle);  // Set dy based on the angle and SPEED
    }

    // Update the dot's position and check for boundary collisions
    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.x += this.dx;
        this.y += this.dy;

        // Check for boundary collision
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Detect collisions with other dots
    static detectCollision(dot1: Dot, dot2: Dot) {
        const dx = dot1.x - dot2.x;
        const dy = dot1.y - dot2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < dot1.radius + dot2.radius) {
            // Reflect the dots in opposite directions (basic bounce logic)
            const angle = Math.atan2(dy, dx);
            const speed1 = Math.sqrt(dot1.dx * dot1.dx + dot1.dy * dot1.dy);
            const speed2 = Math.sqrt(dot2.dx * dot2.dx + dot2.dy * dot2.dy);

            dot1.dx = speed2 * Math.cos(angle);
            dot1.dy = speed2 * Math.sin(angle);

            dot2.dx = speed1 * Math.cos(angle + Math.PI);
            dot2.dy = speed1 * Math.sin(angle + Math.PI);
        }
    }
}