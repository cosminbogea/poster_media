"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "./theme-context";

const InteractiveLines = () => {
  const { colors } = useTheme();
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
    let transitionProgress = 0; // 0 = logo, 1 = pattern
    let hasInteracted = false;
    let isTransitionQueued = false;
    let autoTransitionTimer: NodeJS.Timeout | null = null;
    let interactionTransitionTimer: NodeJS.Timeout | null = null;
    const InteractionTransitionDelayMs = 2000;

    // Logo data extracted from poster-logo.svg (viewBox: 1622.65 x 614.73)
    // Format: [x, y, height]
    const logoData: Array<[number, number, number]> = [
      // P letter
      [11.4, 11.4, 591.66],
      [51.4, 11.4, 591.66],
      [91.39, 11.4, 63.26],
      [91.39, 261.88, 60.29],
      [131.39, 11.4, 63.26],
      [131.39, 261.88, 60.29],
      [171.39, 11.4, 310.77],
      [211.38, 53.47, 227.05],
      // O letter
      [291.76, 53.47, 501.97],
      [331.75, 28.12, 557.85],
      [371.75, 11.4, 63.5],
      [371.75, 539.83, 63.5],
      [411.75, 11.4, 63.5],
      [411.75, 539.83, 63.5],
      [451.74, 28.12, 557.85],
      [491.74, 53.47, 501.97],
      // S letter
      [571.36, 366.42, 188.27],
      [571.35, 75.78, 190.68],
      [611.36, 366.41, 218.8],
      [611.36, 28.43, 273.67],
      [651.36, 11.4, 62.52],
      [651.36, 261.13, 61.04],
      [651.36, 540.07, 63.26],
      [691.35, 11.44, 62.48],
      [691.35, 261.13, 61.04],
      [691.35, 540.07, 63.26],
      [731.35, 289.26, 295.95],
      [731.35, 28.43, 187.54],
      [771.35, 54.43, 161.54],
      [771.35, 324.9, 207.28],
      // T letter
      [851.32, 11.4, 63.26],
      [891.32, 11.4, 63.26],
      [931.31, 11.4, 591.66],
      [971.31, 11.4, 591.66],
      [1011.3, 11.4, 63.26],
      [1051.3, 11.4, 63.26],
      // E letter
      [1131.29, 11.4, 591.66],
      [1171.29, 11.4, 591.66],
      [1211.29, 11.4, 63.26],
      [1211.29, 261.88, 60.29],
      [1211.29, 539.95, 63.11],
      [1251.28, 11.4, 63.26],
      [1251.28, 261.88, 60.29],
      [1251.28, 539.95, 63.11],
      [1291.28, 11.4, 63.26],
      [1291.28, 261.88, 60.29],
      [1291.28, 539.95, 63.11],
      [1331.27, 11.4, 63.26],
      [1331.27, 261.88, 60.29],
      [1331.27, 539.95, 63.11],
      // R letter
      [1411.27, 11.4, 591.66],
      [1451.26, 11.4, 591.66],
      [1491.26, 11.4, 63.26],
      [1491.26, 261.88, 60.29],
      [1531.25, 11.4, 63.26],
      [1531.25, 261.88, 60.29],
      [1571.25, 11.4, 591.66],
      [1611.25, 53.95, 212.52],
      [1611.25, 324.91, 278.15],
    ];

    // Background pattern data from bg_pattern.svg (viewBox: 1920 x 1080)
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

    // Mobile start shape extracted from public/logo.svg
    // Format: [x, y, height] in logo.svg (1920 x 1080) space
    const mobileStartData: Array<[number, number, number]> = [
      [1027.88, 514.26, 63.8],
      [1062.83, 506.04, 80.25],
      [1062.83, 668.79, 41.71],
      [1062.83, 381.86, 41.64],
      [1097.74, 502.24, 87.84],
      [1097.74, 625.53, 107.76],
      [1097.74, 359.07, 107.72],
      [1132.68, 387.02, 318.33],
      [1167.63, 414.96, 262.41],
      [1202.54, 323.29, 446.15],
      [1237.49, 307.05, 478.29],
      [1272.4, 322.92, 446.22],
      [1307.34, 415, 262.44],
      [1342.25, 387.09, 318.29],
      [1377.2, 625.58, 107.75],
      [1377.2, 359.11, 107.79],
      [1377.2, 502.32, 87.84],
      [1412.15, 668.9, 41.64],
      [1412.15, 381.9, 41.71],
      [1412.15, 506.11, 80.25],
      [1447.06, 514.26, 63.8],
    ];

    // Detect mobile/portrait mode
    const isMobile = () => width < 768 || height > width;

    // Configuration - adjusted for mobile
    const getConfig = () => {
      const mobile = isMobile();
      return {
        lineWidth: mobile ? 12 : 18,
        mouseRadius: mobile ? 120 : 200,
        mouseForce: mobile ? 0.3 : 0.4,
        returnSpeed: 0.12,
        maxDisplacement: mobile ? 80 : 150,
        transitionSpeed: 0.015,
      };
    };

    let CONFIG = getConfig();
    const mouse = { x: null as number | null, y: null as number | null };
    const prevMouse = { x: null as number | null, y: null as number | null };

    const currentLineColor = colors.lineColor;
    const currentBackgroundColor = colors.background;

    // Line class with morphing capability
    class Line {
      // Logo positions (start state)
      logoX: number;
      logoY: number;
      logoHeight: number;
      // Pattern positions (end state)
      patternX: number;
      patternY: number;
      patternHeight: number;
      // Current positions (for animation)
      x: number;
      y: number;
      lineHeight: number;
      // Base positions (interpolated between logo and pattern)
      baseX: number;
      baseY: number;
      baseLineHeight: number;
      // Mouse displacement
      displaceY: number;
      allowHorizontalMorph: boolean;

      constructor(
        logoX: number,
        logoY: number,
        logoHeight: number,
        patternX: number,
        patternY: number,
        patternHeight: number,
        allowHorizontalMorph = false,
      ) {
        this.logoX = logoX;
        this.logoY = logoY;
        this.logoHeight = logoHeight;
        this.patternX = patternX;
        this.patternY = patternY;
        this.patternHeight = patternHeight;

        // Start at logo position
        this.x = logoX;
        this.y = logoY;
        this.lineHeight = logoHeight;
        this.baseX = logoX;
        this.baseY = logoY;
        this.baseLineHeight = logoHeight;
        this.displaceY = 0;
        this.allowHorizontalMorph = allowHorizontalMorph;
      }

      // Update base position based on transition progress
      updateBase(progress: number) {
        // Easing function for smoother transition
        const eased = easeInOutCubic(progress);

        this.baseX = this.allowHorizontalMorph
          ? lerp(this.logoX, this.patternX, eased)
          : this.logoX;
        // Only animate vertical position (up/down) and height
        this.baseY = lerp(this.logoY, this.patternY, eased);
        this.baseLineHeight = lerp(this.logoHeight, this.patternHeight, eased);
      }

      update() {
        // Smoothly move towards base position
        this.x += (this.baseX - this.x) * 0.1;
        this.lineHeight += (this.baseLineHeight - this.lineHeight) * 0.1;

        if (mouse.x !== null && mouse.y !== null) {
          const mouseMoved =
            prevMouse.x === null ||
            prevMouse.y === null ||
            prevMouse.x !== mouse.x ||
            prevMouse.y !== mouse.y;

          const lineTop = this.baseY + this.displaceY;
          const lineBottom = lineTop + this.lineHeight;
          const closestY = Math.max(lineTop, Math.min(mouse.y, lineBottom));

          const dx = this.x - mouse.x;
          const dy = closestY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRadius && distance > 0) {
            const force = Math.pow(
              (CONFIG.mouseRadius - distance) / CONFIG.mouseRadius,
              0.7,
            );

            const lineCenter = lineTop + this.lineHeight / 2;
            const centerDy = lineCenter - mouse.y;

            let targetDisplaceY = this.displaceY;
            if (centerDy > 0) {
              targetDisplaceY += force * CONFIG.mouseForce * 25;
            } else {
              targetDisplaceY -= force * CONFIG.mouseForce * 25;
            }

            // Clamp to max displacement
            targetDisplaceY = Math.max(
              -CONFIG.maxDisplacement,
              Math.min(CONFIG.maxDisplacement, targetDisplaceY),
            );
            this.displaceY = targetDisplaceY;
          } else if (mouseMoved) {
            this.displaceY += (0 - this.displaceY) * CONFIG.returnSpeed;
          }
        } else {
          this.displaceY += (0 - this.displaceY) * CONFIG.returnSpeed;
        }

        this.y = this.baseY + this.displaceY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = currentLineColor;
        ctx.beginPath();
        // Use half the line width as border radius for pill-shaped ends
        const radius = CONFIG.lineWidth / 2;
        ctx.roundRect(
          this.x - CONFIG.lineWidth / 2,
          this.y,
          CONFIG.lineWidth,
          this.lineHeight,
          radius,
        );
        ctx.fill();
      }
    }

    // Utility functions
    function lerp(a: number, b: number, t: number): number {
      return a + (b - a) * t;
    }

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

    // Initialize lines with both logo and pattern positions
    const initLines = () => {
      CONFIG = getConfig();
      lines = [];

      const mobile = isMobile();

      // Logo SVG dimensions
      const logoSvgWidth = 1622.65;
      const logoSvgHeight = 614.73;

      // Pattern SVG dimensions
      const patternSvgWidth = 1920;
      const patternSvgHeight = 1080;

      // Calculate logo scale
      // Desktop: fill full width and ~60% height (non-uniform scaling)
      // Mobile: keep smaller and centered
      const logoPaddingX = mobile ? 0.95 : 0.98;
      const logoPaddingY = mobile ? 0.4 : 0.7;
      const logoScaleX = (width * logoPaddingX) / logoSvgWidth;
      const logoScaleY = (height * logoPaddingY) / logoSvgHeight;
      const logoScale = mobile ? Math.min(logoScaleX, logoScaleY) : 1;
      const logoOffsetX = mobile
        ? (width - logoSvgWidth * logoScale) / 2
        : (width - logoSvgWidth * logoScaleX) / 2;
      const logoOffsetY = mobile
        ? (height - logoSvgHeight * logoScale) / 2
        : height * ((1 - logoPaddingX) / 2);

      // Calculate pattern scale
      // On mobile (portrait), fit pattern within screen and distribute evenly
      const patternScaleX = width / patternSvgWidth;
      const patternScaleY = height / patternSvgHeight;

      let patternScale: number;
      let patternOffsetX: number;
      let patternOffsetY: number;

      // Fill screen with pattern target (same behavior as desktop)
      patternScale = Math.max(patternScaleX, patternScaleY);
      patternOffsetX = (width - patternSvgWidth * patternScale) / 2;
      patternOffsetY = (height - patternSvgHeight * patternScale) / 2;

      if (mobile) {
        const startMinX = Math.min(...mobileStartData.map((line) => line[0]));
        const startMaxX = Math.max(...mobileStartData.map((line) => line[0]));
        const startMinY = Math.min(...mobileStartData.map((line) => line[1]));
        const startMaxY = Math.max(
          ...mobileStartData.map((line) => line[1] + line[2]),
        );
        const mobileStartWidth = startMaxX - startMinX;
        const mobileStartHeight = startMaxY - startMinY;

        const startScale = Math.min(
          (width * 0.82) / mobileStartWidth,
          (height * 0.58) / mobileStartHeight,
        );
        const startOffsetX = (width - mobileStartWidth * startScale) / 2;
        const startOffsetY = (height - mobileStartHeight * startScale) / 2;

        const maxLines = Math.max(mobileStartData.length, patternData.length);

        for (let i = 0; i < maxLines; i++) {
          const [startSvgX, startSvgY, startSvgH] =
            mobileStartData[i % mobileStartData.length];
          const startX = startOffsetX + (startSvgX - startMinX) * startScale;
          const startY = startOffsetY + (startSvgY - startMinY) * startScale;
          const startH = startSvgH * startScale;

          const [patternSvgX, patternSvgY, patternSvgH] =
            patternData[i % patternData.length];
          const patternX = patternOffsetX + patternSvgX * patternScale;
          const patternY = patternOffsetY + patternSvgY * patternScale;
          const patternH = patternSvgH * patternScale;

          lines.push(
            new Line(
              startX,
              startY,
              startH,
              patternX,
              patternY,
              patternH,
              false,
            ),
          );
        }
        return;
      }

      // Create lines - match logo and pattern by index
      const maxLines = Math.max(logoData.length, patternData.length);

      for (let i = 0; i < maxLines; i++) {
        // Get logo data (wrap if fewer logo lines)
        const logoIdx = i % logoData.length;
        const [logoSvgX, logoSvgY, logoSvgH] = logoData[logoIdx];
        const logoX = logoOffsetX + logoSvgX * logoScaleX;
        const logoY = logoOffsetY + logoSvgY * logoScaleY;
        const logoH = logoSvgH * logoScaleY;

        // Get pattern data (wrap if fewer pattern lines)
        const patternIdx = i % patternData.length;
        const [patternSvgX, patternSvgY, patternSvgH] = patternData[patternIdx];

        const patternX = patternOffsetX + patternSvgX * patternScale;
        const patternY = patternOffsetY + patternSvgY * patternScale;
        const patternH = patternSvgH * patternScale;

        lines.push(new Line(logoX, logoY, logoH, patternX, patternY, patternH));
      }
    };

    // Animation loop
    const animate = () => {
      if (!isAnimating || !canvas) return;

      // Update transition progress
      if (hasInteracted && transitionProgress < 1) {
        transitionProgress = Math.min(
          1,
          transitionProgress + CONFIG.transitionSpeed,
        );
      }

      // Fill background
      ctx.fillStyle = currentBackgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Update and draw lines
      for (let i = 0; i < lines.length; i++) {
        lines[i].updateBase(transitionProgress);
        lines[i].update();
        lines[i].draw();
      }

      // Update previous mouse position
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start transition
    const triggerTransition = (withDelay = true) => {
      if (hasInteracted || isTransitionQueued) return;

      if (withDelay) {
        isTransitionQueued = true;
        interactionTransitionTimer = setTimeout(() => {
          isTransitionQueued = false;
          hasInteracted = true;
        }, InteractionTransitionDelayMs);
        return;
      }

      hasInteracted = true;
    };

    // Check if mouse/touch is near any line
    const checkLineProximity = () => {
      if (mouse.x === null || mouse.y === null || hasInteracted) return;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineTop = line.baseY + line.displaceY;
        const lineBottom = lineTop + line.lineHeight;
        const closestY = Math.max(lineTop, Math.min(mouse.y, lineBottom));
        const dx = line.x - mouse.x;
        const dy = closestY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const touchRadius = CONFIG.lineWidth * 2;
        if (distance < touchRadius) {
          triggerTransition();
          return;
        }
      }
    };

    // Event handlers
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        setupCanvas();
        initLines();
        // Restore transition progress after resize
        for (let i = 0; i < lines.length; i++) {
          lines[i].updateBase(transitionProgress);
        }
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      checkLineProximity();
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
        checkLineProximity();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
        checkLineProximity();
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

    // Auto-trigger transition after 15 seconds if no interaction
    autoTransitionTimer = setTimeout(() => {
      triggerTransition(false);
    }, 15000);

    // Add event listeners
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // Cleanup
    return () => {
      isAnimating = false;
      clearTimeout(resizeTimeout);
      if (autoTransitionTimer) clearTimeout(autoTransitionTimer);
      if (interactionTransitionTimer) clearTimeout(interactionTransitionTimer);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [colors.lineColor, colors.background]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
      }}
    />
  );
};

export default InteractiveLines;
