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

    // SVG logo data extracted from poster-logo.tsx
    // Each entry: [x, y, lineHeight] in SVG coordinates (viewBox: 0 0 1622.65 614.73)
    const logoData: Array<[number, number, number]> = [
      // P
      [11.4, 0, 603.06],
      [51.4, 0, 603.06],
      [131.39, 261.88, 71.69],
      [131.39, 0, 74.67],
      [91.39, 0, 74.67],
      [91.39, 261.88, 71.69],
      [171.39, 0, 322.17],
      [211.38, 42.07, 249.85],
      // O
      [291.76, 42.07, 524.77],
      [331.75, 11.55, 585.81],
      [371.75, 0, 74.8],
      [371.75, 551.23, 63.5],
      [411.75, 0, 74.8],
      [411.75, 551.23, 63.5],
      [451.74, 11.55, 585.81],
      [491.74, 42.07, 524.77],
      // S
      [571.36, 366.82, 199.27],
      [571.35, 0, 277.86],
      [611.36, 377.81, 218.8],
      [611.36, 0, 285.07],
      [731.35, 300.66, 295.95],
      [731.35, 0, 198.94],
      [771.35, 43.03, 183.94],
      [771.35, 336.3, 207.28],
      [651.36, 0, 73.92],
      [651.36, 272.53, 61.04],
      [651.36, 551.47, 63.26],
      [691.35, 0, 73.88],
      [691.35, 272.53, 61.04],
      [691.35, 551.47, 63.26],
      // T
      [851.32, 0, 74.67],
      [891.32, 0, 74.67],
      [931.31, 0, 603.06],
      [971.31, 0, 603.06],
      [1011.3, 0, 74.67],
      [1051.3, 0, 74.67],
      // E
      [1131.29, 0, 603.06],
      [1171.29, 0, 603.06],
      [1251.28, 261.88, 71.69],
      [1251.28, 551.35, 63.11],
      [1251.28, 0, 74.67],
      [1211.29, 261.88, 71.69],
      [1211.29, 551.35, 63.11],
      [1211.29, 0, 74.67],
      [1291.28, 261.88, 71.69],
      [1291.28, 551.35, 63.11],
      [1291.28, 0, 74.67],
      [1331.27, 261.88, 71.69],
      [1331.27, 551.35, 63.11],
      [1331.27, 0, 74.67],
      // R
      [1411.27, 0, 603.06],
      [1451.26, 0, 603.06],
      [1531.25, 261.88, 71.69],
      [1531.25, 0, 74.67],
      [1491.26, 261.88, 71.69],
      [1491.26, 0, 74.67],
      [1571.25, 0, 603.06],
      [1611.25, 42.55, 235.41],
      [1611.25, 336.31, 278.15],
    ];

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
        lineWidth: 11.4, // Width of each vertical line (matches SVG)
        mouseRadius: 120,
        mouseForce: 0.2,
        returnSpeed: 0.08,
        logoScale: mobile ? 0.3 : 0.5, // Scale factor for logo
      };
    };

    let CONFIG = getConfig();
    const mouse = { x: null as number | null, y: null as number | null };

    // Line class - represents a vertical line segment
    class Line {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      lineHeight: number;
      baseLineHeight: number;

      constructor(x: number, y: number, lineHeight: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.lineHeight = lineHeight;
        this.baseLineHeight = lineHeight;
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

        // Draw vertical line (matching SVG style)
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = CONFIG.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.lineHeight);
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

    // Initialize lines from logo data
    const initLines = () => {
      CONFIG = getConfig();
      lines = [];

      // SVG viewBox height
      const svgHeight = 614.73;

      // Logo position (bottom left, matching page.tsx)
      const logoX = 32; // 32px from left (matches md:left-8)
      const logoY = height - svgHeight * CONFIG.logoScale - 32; // 32px from bottom

      // Create lines from logo data
      logoData.forEach(([svgX, svgY, svgHeight]) => {
        const x = logoX + svgX * CONFIG.logoScale;
        const y = logoY + svgY * CONFIG.logoScale;
        const lineHeight = svgHeight * CONFIG.logoScale;
        lines.push(new Line(x, y, lineHeight));
      });
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
