import { useEffect, useRef } from 'react';

/**
 * Floating heart particles effect using canvas
 * Lightweight, no external dependencies
 *
 * @param {Object} props
 * @param {string} props.theme - Theme to determine particle style
 * @param {number} props.count - Number of particles
 * @param {boolean} props.active - Whether effect is active
 */
export default function HeartParticles({ theme = 'romantic', count = 20, active = true }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // Graceful exit when canvas is unavailable (test env / old browsers)
    if (!ctx) return;
    let particles = [];

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Theme-based particle configs
    const configs = {
      romantic: {
        emojis: ['❤️', '💕', '💖', '💗', '💘', '✨'],
        colors: ['#ff2861', '#ff6b9d', '#ed0447'],
      },
      birthday: {
        emojis: ['🎈', '🎉', '⭐', '🎊', '✨', '🎂'],
        colors: ['#ffd93d', '#ff6b6b', '#4ecdc4'],
      },
      friendship: {
        emojis: ['⭐', '🌟', '✨', '👍', '🔥', '💛'],
        colors: ['#4ecdc4', '#45b7d1', '#ffd93d'],
      },
    };

    const config = configs[theme] || configs.romantic;

    // Create particles
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 1,
      vy: -(Math.random() * 1.5 + 0.5),
      size: Math.random() * 16 + 12,
      emoji: config.emojis[Math.floor(Math.random() * config.emojis.length)],
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      life: 1,
    });

    // Initialize particles
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 0.002;

        // Draw emoji
        ctx.save();
        ctx.globalAlpha = p.opacity * Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();

        // Reset if off screen or dead
        if (p.y < -30 || p.life <= 0) {
          particles[index] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, count, active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
