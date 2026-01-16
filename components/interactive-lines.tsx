"use client";

import React, { useRef, useEffect } from "react";

const InteractiveLines = ({
  lineColor = "rgb(186, 186, 186)",
  backgroundColor = "#050505",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let lines: Line[] = [];
    let isAnimating = true;
    let width = 0;
    let height = 0;

    // Detect mobile device
    const isMobileDevice = () => {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };

    // Configuration
    const getConfig = () => {
      const mobile = isMobileDevice();
      return {
        spacing: mobile ? 30 : 20, // Distance between lines
        lineLength: mobile ? 20 : 25, // Length of each line
        lineWidth: 1,
        mouseRadius: 120,
        mouseForce: 0.2,
        returnSpeed: 0.08,
      };
    };

    let CONFIG = getConfig();
    const mouse = { x: null as number | null, y: null as number | null };

    // Line class
    class Line {
      x: number;
      y: number;
      baseX: number;
      baseY: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRadius && distance > 0) {
            // Calculate force - stronger when closer
            const force = (CONFIG.mouseRadius - distance) / CONFIG.mouseRadius;
            const angle = Math.atan2(dy, dx);

            // Move line away from mouse
            this.x += Math.cos(angle) * force * CONFIG.mouseForce * 10;
            this.y += Math.sin(angle) * force * CONFIG.mouseForce * 10;
          } else {
            // Return to base position
            const dx = this.baseX - this.x;
            const dy = this.baseY - this.y;
            this.x += dx * CONFIG.returnSpeed;
            this.y += dy * CONFIG.returnSpeed;
          }
        } else {
          // Return to base position when mouse leaves
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          this.x += dx * CONFIG.returnSpeed;
          this.y += dy * CONFIG.returnSpeed;
        }
      }

      draw() {
        if (!ctx) return;

        // Draw diagonal line at 45 degrees
        const halfLength = CONFIG.lineLength / 2;
        const angle = Math.PI / 4; // 45 degrees
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = CONFIG.lineWidth;
        ctx.beginPath();
        ctx.moveTo(
          this.x + Math.cos(angle) * halfLength,
          this.y + Math.sin(angle) * halfLength
        );
        ctx.lineTo(
          this.x - Math.cos(angle) * halfLength,
          this.y - Math.sin(angle) * halfLength
        );
        ctx.stroke();
      }
    }

    // Setup canvas
    const setupCanvas = () => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Initialize lines
    const initLines = () => {
      CONFIG = getConfig();
      lines = [];

      // Create grid of lines covering the entire screen
      for (let y = CONFIG.spacing; y < height; y += CONFIG.spacing) {
        for (let x = CONFIG.spacing; x < width; x += CONFIG.spacing) {
          lines.push(new Line(x, y));
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!isAnimating || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Update and draw lines
      for (let i = 0; i < lines.length; i++) {
        lines[i].update();
        lines[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event handlers
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        setupCanvas();
        initLines();
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
      e.preventDefault();
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
    initLines();
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // Cleanup
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
  }, [lineColor, backgroundColor]);

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
