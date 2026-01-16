"use client"; // Required for Next.js 13+ (App Router)

import React, { useRef, useEffect } from "react";

const InteractiveLines = ({
  lineColor = "#00ffcc",
  backgroundColor = "#050505",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isAnimating = true;
    let width = 0;
    let height = 0;

    // Detect mobile device - check dynamically
    const isMobileDevice = () => {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };

    // CONFIGURATION - Different settings for mobile vs desktop
    const getConfig = () => {
      const mobile = isMobileDevice();
      return {
        particleCount: mobile ? 120 : 400,
        connectionDistance: mobile ? 100 : 120,
        lineWidth: 0.5,
        particleRadius: 1,
        mouseRadius: 150,
        mouseForce: 0.15,
        friction: 0.92,
        speed: 0.3,
      };
    };

    let CONFIG = getConfig();

    const mouse = { x: null as number | null, y: null as number | null };

    // --- PARTICLE CLASS ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * CONFIG.speed;
        this.vy = (Math.random() - 0.5) * CONFIG.speed;
        this.radius = CONFIG.particleRadius;
      }

      update() {
        // Mouse interaction - particles repel from cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRadius && distance > 0) {
            // Stronger repulsion force - particles move away from cursor
            const force = (CONFIG.mouseRadius - distance) / CONFIG.mouseRadius;
            const angle = Math.atan2(dy, dx);
            // Add velocity away from mouse
            this.vx += Math.cos(angle) * force * CONFIG.mouseForce;
            this.vy += Math.sin(angle) * force * CONFIG.mouseForce;
          }
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction
        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;

        // Boundary collision with wrap-around
        if (this.x < 0) {
          this.x = width;
        } else if (this.x > width) {
          this.x = 0;
        }
        if (this.y < 0) {
          this.y = height;
        } else if (this.y > height) {
          this.y = 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- INITIALIZATION ---
    const setupCanvas = () => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Store CSS dimensions
      width = rect.width;
      height = rect.height;

      // Set actual canvas size accounting for device pixel ratio
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Reset transform and scale context
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      // Update config based on current screen size
      CONFIG = getConfig();
      particles = [];

      // Create a dense grid of particles for more lines
      const spacing = Math.sqrt((width * height) / CONFIG.particleCount);
      const cols = Math.ceil(width / spacing);

      for (let i = 0; i < CONFIG.particleCount; i++) {
        // Mix grid and random positioning for natural look
        if (i < CONFIG.particleCount * 0.7) {
          const col = (i % cols) * spacing;
          const row = Math.floor(i / cols) * spacing;
          particles.push(
            new Particle(
              col + (Math.random() - 0.5) * spacing * 0.5,
              row + (Math.random() - 0.5) * spacing * 0.5
            )
          );
        } else {
          particles.push(
            new Particle(Math.random() * width, Math.random() * height)
          );
        }
      }
    };

    // --- DRAW CONNECTIONS ---
    const drawConnections = () => {
      if (!ctx) return;

      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : { r: 0, g: 255, b: 204 };
      };

      const rgb = hexToRgb(lineColor);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.connectionDistance) {
            const opacity = 1 - distance / CONFIG.connectionDistance;
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.lineWidth = CONFIG.lineWidth;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      if (!isAnimating || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      // Draw connections
      drawConnections();

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT LISTENERS ---
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        setupCanvas();
        initParticles();
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas) return;
      e.preventDefault(); // Prevent scrolling
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Initialize
    setupCanvas();
    initParticles();
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // --- CLEANUP ---
    return () => {
      isAnimating = false;
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [lineColor]); // Re-run if color changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    />
  );
};

export default InteractiveLines;
