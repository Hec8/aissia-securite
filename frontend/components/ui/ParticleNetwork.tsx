'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    radius: number;
    iconIndex: number;
    rotation: number;
    rotationSpeed: number;
}

// SVG path data for security-themed icons
const SECURITY_ICONS = [
    // Shield
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.8, -s * 0.7, s, -s * 0.2, s, s * 0.1);
        ctx.bezierCurveTo(s, s * 0.6, s * 0.5, s * 0.9, 0, s);
        ctx.bezierCurveTo(-s * 0.5, s * 0.9, -s, s * 0.6, -s, s * 0.1);
        ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.8, -s * 0.7, 0, -s);
        ctx.closePath();
        ctx.restore();
    },
    // Lock / Padlock
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size * 0.8;
        // Lock body
        ctx.beginPath();
        ctx.roundRect(-s * 0.6, -s * 0.1, s * 1.2, s * 1.1, s * 0.15);
        // Lock shackle
        ctx.moveTo(-s * 0.35, -s * 0.1);
        ctx.bezierCurveTo(-s * 0.35, -s * 0.8, s * 0.35, -s * 0.8, s * 0.35, -s * 0.1);
        ctx.restore();
    },
    // Camera / Eye
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size;
        // Eye shape
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.7, s * 0.5, -s * 0.7, s, 0);
        ctx.bezierCurveTo(s * 0.5, s * 0.7, -s * 0.5, s * 0.7, -s, 0);
        ctx.closePath();
        // Pupil
        ctx.moveTo(s * 0.3, 0);
        ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
        ctx.restore();
    },
    // Key
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size * 0.8;
        // Key head (circle)
        ctx.beginPath();
        ctx.arc(-s * 0.4, 0, s * 0.45, 0, Math.PI * 2);
        // Key shaft
        ctx.moveTo(-s * 0.05, 0);
        ctx.lineTo(s * 0.9, 0);
        // Key teeth
        ctx.moveTo(s * 0.5, 0);
        ctx.lineTo(s * 0.5, s * 0.3);
        ctx.moveTo(s * 0.75, 0);
        ctx.lineTo(s * 0.75, s * 0.25);
        ctx.restore();
    },
    // Star / Badge
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size * 0.9;
        const spikes = 5;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? s : s * 0.45;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.restore();
    },
    // Checkmark in circle
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const s = size;
        ctx.beginPath();
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        // Checkmark
        ctx.moveTo(-s * 0.4, 0);
        ctx.lineTo(-s * 0.1, s * 0.35);
        ctx.lineTo(s * 0.45, -s * 0.3);
        ctx.restore();
    },
];

export const ParticleNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const PARTICLE_COUNT = 60;
        const CONNECTION_DISTANCE = 150;
        const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        const MOUSE_RADIUS = 200;
        const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
        const DRIFT_RANGE = 120;
        const DRIFT_RANGE_SQ = DRIFT_RANGE * DRIFT_RANGE;
        const PARTICLE_SPEED = 0.3;
        const PARTICLE_SPEED_SQ = PARTICLE_SPEED * PARTICLE_SPEED;
        const TARGET_FPS = 30;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        let animationId = 0;
        let lastFrameTime = 0;
        const mouse = { x: -1000, y: -1000 };
        let particles: Particle[] = [];

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
                    vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
                    radius: Math.random() * 2 + 1.5,
                    iconIndex: Math.floor(Math.random() * SECURITY_ICONS.length),
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.005,
                });
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particles.length === 0) {
                initParticles();
            }
        };

        const animate = (timestamp: number) => {
            animationId = requestAnimationFrame(animate);
            if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
            lastFrameTime = timestamp;

            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Update particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = p.x - p.originX;
                const dy = p.y - p.originY;
                const distSq = dx * dx + dy * dy;

                if (distSq > DRIFT_RANGE_SQ) {
                    const dist = Math.sqrt(distSq);
                    p.vx -= (dx / dist) * 0.02;
                    p.vy -= (dy / dist) * 0.02;
                }

                p.vx += (Math.random() - 0.5) * 0.01;
                p.vy += (Math.random() - 0.5) * 0.01;

                const speedSq = p.vx * p.vx + p.vy * p.vy;
                if (speedSq > PARTICLE_SPEED_SQ) {
                    const speed = Math.sqrt(speedSq);
                    p.vx = (p.vx / speed) * PARTICLE_SPEED;
                    p.vy = (p.vy / speed) * PARTICLE_SPEED;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));
            }

            // Draw connections between particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < CONNECTION_DISTANCE_SQ) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(249, 198, 11, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw mouse connections & security icons
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mDistSq = mdx * mdx + mdy * mdy;

                if (mDistSq < MOUSE_RADIUS_SQ) {
                    const mDist = Math.sqrt(mDistSq);
                    const opacity = (1 - mDist / MOUSE_RADIUS) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(249, 198, 11, ${opacity})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }

                // Draw security icon instead of a dot
                const iconSize = p.radius * 3.5;
                const drawIcon = SECURITY_ICONS[p.iconIndex];
                drawIcon(ctx, p.x, p.y, iconSize, p.rotation);
                ctx.strokeStyle = 'rgba(249, 198, 11, 0.4)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = 'rgba(249, 198, 11, 0.08)';
                ctx.fill();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                // resume animation when tab becomes visible
                animationId = requestAnimationFrame(animate);
            }
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ opacity: 0.65, zIndex: 0 }}
        />
    );
};
