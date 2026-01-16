"use client";

import React, { useRef, useEffect } from "react";

const InteractiveLines = ({
  lineColor = "#ebebeb",
  backgroundColor = "#c1465c",
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

    // Background pattern data extracted from bg_pattern.svg
    // Each entry: [x, y, lineHeight] in SVG coordinates (viewBox: 0 0 1920 1080)
    const patternData: Array<[number, number, number]> = [
      [39.21, 200.46, 688.77],
      [85.1, 39.58, 688.76],
      [176.87, 332.78, 75.12],
      [176.87, 41.37, 82.58],
      [130.98, 972.76, 75.12],
      [130.98, 691.35, 72.58],
      [222.75, 691.35, 356.53],
      [268.64, 248.72, 270.48],
      [1651.22, 42.62, 688.77],
      [1697.11, 368.47, 688.77],
      [1788.88, 641.49, 72.58],
      [1788.88, 354.14, 72.58],
      [1742.99, 354.14, 72.58],
      [1742.99, 56.78, 82.58],
      [1834.76, 61.22, 688.77],
      [1880.65, 403.63, 240.46],
      [1880.65, 709.4, 324.18],
      [1329.59, 62.85, 688.77],
      [1375.48, 354.72, 688.77],
      [1467.24, 497.81, 72.58],
      [1467.24, 816.83, 72.4],
      [1467.24, 210.46, 72.58],
      [1421.36, 420.06, 72.58],
      [1421.36, 739.07, 72.4],
      [1421.36, 132.7, 72.58],
      [1513.13, 591.94, 72.58],
      [1513.13, 910.95, 72.4],
      [1513.13, 304.58, 72.58],
      [1559.01, 392, 72.58],
      [1559.01, 710.81, 72.4],
      [1559.01, 104.65, 72.58],
      [1050.76, 869.61, 72.58],
      [1004.11, 50.45, 82.58],
      [1097.42, 90.45, 688.77],
      [1144.07, 368.47, 688.77],
      [1190.73, 40.16, 82.58],
      [1237.38, 338.02, 72.58],
      [360.84, 465.99, 585.87],
      [406.73, 219.64, 649.97],
      [452.61, 39.42, 82.85],
      [452.61, 655.65, 72.85],
      [498.5, 371.18, 72.85],
      [498.5, 977.41, 72.85],
      [544.38, 289.64, 649.97],
      [590.27, 82.85, 585.87],
      [682.48, 398.5, 215.99],
      [682.48, 55.07, 216.79],
      [728.36, 718.61, 251.01],
      [728.36, 333.78, 310.19],
      [866.01, 350.22, 340.38],
      [866.01, 40.63, 226.37],
      [911.9, 138.71, 187.29],
      [911.9, 460.31, 228.45],
      [774.24, 200.46, 72.58],
      [774.24, 487.81, 72.58],
      [774.24, 806.82, 72.58],
      [820.13, 370.47, 72.58],
      [820.13, 657.83, 72.58],
      [820.13, 976.83, 72.58],
    ];

    // Configuration
    const getConfig = () => {
      return {
        lineWidth: 10, // Width of each vertical line (matches SVG)
        mouseRadius: 200, // Increased radius for more dramatic effect
        mouseForce: 0.4, // Increased force for more movement
        returnSpeed: 0.12, // Slightly faster return for better responsiveness
        maxDisplacement: 150, // Maximum distance line can move from base position
      };
    };

    let CONFIG = getConfig();
    const mouse = { x: null as number | null, y: null as number | null };
    const prevMouse = { x: null as number | null, y: null as number | null };

    // Store colors for use in draw functions
    const currentLineColor = lineColor;
    const currentBackgroundColor = backgroundColor;

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
          // Check if mouse moved
          const mouseMoved =
            prevMouse.x === null ||
            prevMouse.y === null ||
            prevMouse.x !== mouse.x ||
            prevMouse.y !== mouse.y;

          // Calculate distance from mouse to the closest point on the line segment
          // For a vertical line, the closest point is at the same x, but y is clamped to line bounds
          const lineTop = this.y;
          const lineBottom = this.y + this.lineHeight;

          // Find the closest Y point on the line to the mouse
          const closestY = Math.max(lineTop, Math.min(mouse.y, lineBottom));

          // Calculate distance from mouse to closest point on line
          const dx = this.x - mouse.x;
          const dy = closestY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRadius && distance > 0) {
            // Calculate force - stronger when closer, with smoother falloff
            const force = Math.pow(
              (CONFIG.mouseRadius - distance) / CONFIG.mouseRadius,
              0.7
            );

            // Only move vertically (y direction only) - use line center for direction
            const lineCenter = this.y + this.lineHeight / 2;
            const centerDy = lineCenter - mouse.y;

            // Calculate new position
            let newY = this.y;
            if (centerDy > 0) {
              // Mouse is above center, move line down
              newY += force * CONFIG.mouseForce * 25;
            } else {
              // Mouse is below center, move line up
              newY -= force * CONFIG.mouseForce * 25;
            }

            // Clamp to maximum displacement from base position
            const displacement = Math.abs(newY - this.baseY);
            if (displacement > CONFIG.maxDisplacement) {
              // Stop at max displacement
              if (newY > this.baseY) {
                this.y = this.baseY + CONFIG.maxDisplacement;
              } else {
                this.y = this.baseY - CONFIG.maxDisplacement;
              }
            } else {
              this.y = newY;
            }
          } else if (mouseMoved) {
            // Only return to base position when mouse moves (not automatically)
            const dy = this.baseY - this.y;
            this.y += dy * CONFIG.returnSpeed;
          }
          // If mouse hasn't moved and line is outside radius, keep current position
        } else {
          // Return to base position when mouse leaves (only y changes)
          const dy = this.baseY - this.y;
          this.y += dy * CONFIG.returnSpeed;
        }
      }

      draw() {
        if (!ctx) return;

        // Draw vertical line (matching SVG style) - using fillRect for better visibility
        ctx.fillStyle = currentLineColor;
        ctx.fillRect(
          this.x - CONFIG.lineWidth / 2,
          this.y,
          CONFIG.lineWidth,
          this.lineHeight
        );
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

    // Initialize lines from pattern data
    const initLines = () => {
      CONFIG = getConfig();
      lines = [];

      // SVG viewBox dimensions
      const svgWidth = 1920;
      const svgHeight = 1080;

      // Calculate scale to fill screen
      const scaleX = width / svgWidth;
      const scaleY = height / svgHeight;
      const patternScale = Math.max(scaleX, scaleY); // Use larger scale to fill screen

      // Center the pattern on screen
      const scaledWidth = svgWidth * patternScale;
      const scaledHeight = svgHeight * patternScale;
      const patternX = (width - scaledWidth) / 2;
      const patternY = (height - scaledHeight) / 2;

      // Create lines from pattern data
      patternData.forEach(([svgX, svgY, svgLineHeight]) => {
        const x = patternX + svgX * patternScale;
        const y = patternY + svgY * patternScale;
        const lineHeight = svgLineHeight * patternScale;
        lines.push(new Line(x, y, lineHeight));
      });
    };

    // Animation loop
    const animate = () => {
      if (!isAnimating || !canvas) return;

      // Fill background with color
      ctx.fillStyle = currentBackgroundColor;
      ctx.fillRect(0, 0, width, height);

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
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
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
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;
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
