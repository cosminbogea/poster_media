"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MobileTopBar } from "@/components/navigation/MobileTopBar";
import { Navigation } from "@/components/navigation/Navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { WorksLayout } from "@/components/works/WorksLayout";
import { MoodboardLayout } from "@/components/works/MoodboardLayout";
import { ProjectSubsectionLayout } from "@/components/works/ProjectSubsectionLayout";
import { getProjectBySlug, projects } from "@/data/projects";
import { useTheme } from "@/components/theme-context";

export default function WorksPage() {
  const { colors } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isWorksView, setIsWorksView] = useState(true);
  const [scrollToSlug, setScrollToSlug] = useState<string | null>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const worksScrollYRef = useRef(0);
  const shouldRestoreWorksScrollRef = useRef(false);
  const activeProject = activeProjectSlug ? getProjectBySlug(activeProjectSlug) ?? null : null;

  useEffect(() => {
    if (!isWorksView || activeProjectSlug || !shouldRestoreWorksScrollRef.current) {
      return;
    }

    const targetY = worksScrollYRef.current;

    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
      });
    });

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
      shouldRestoreWorksScrollRef.current = false;
    }, 260);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [activeProjectSlug, isWorksView]);

  useLayoutEffect(() => {
    if (!activeProjectSlug) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeProjectSlug]);

  useEffect(() => {
    const uniqueImageSources = Array.from(new Set(projects.map((project) => project.image.src)));
    const preloadedImages: HTMLImageElement[] = [];
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    const preloadMoodboardImages = () => {
      uniqueImageSources.forEach((src) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = src;

        if (typeof image.decode === "function") {
          image.decode().catch(() => undefined);
        }

        preloadedImages.push(image);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(preloadMoodboardImages, {
        timeout: 1500,
      });
    } else {
      timeoutId = window.setTimeout(preloadMoodboardImages, 300);
    }

    return () => {
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      preloadedImages.length = 0;
    };
  }, []);

  const toggleView = () => {
    if (activeProjectSlug) {
      shouldRestoreWorksScrollRef.current = true;
      setActiveProjectSlug(null);
      setIsWorksView(true);
      return;
    }

    setIsWorksView((prev) => !prev);
  };

  const handleWorksViewChange = (isWorks: boolean) => {
    setIsWorksView(isWorks);

    if (activeProjectSlug) {
      shouldRestoreWorksScrollRef.current = true;
      setActiveProjectSlug(null);
    }
  };

  const handleMoodboardImageClick = (slug: string) => {
    setActiveProjectSlug(null);
    setScrollToSlug(slug);
    setIsWorksView(true);
  };

  const handleProjectOpen = (slug: string) => {
    worksScrollYRef.current = window.scrollY;
    shouldRestoreWorksScrollRef.current = false;
    setScrollToSlug(null);
    setIsWorksView(true);
    setActiveProjectSlug(slug);
  };

  const handleProjectBack = () => {
    shouldRestoreWorksScrollRef.current = true;
    setActiveProjectSlug(null);
  };

  const handleScrollComplete = useCallback(() => {
    setScrollToSlug(null);
  }, []);

  const pageTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.24,
        ease: [0.25, 0.1, 0.25, 1] as const,
      };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      <MobileTopBar
        isWorksView={isWorksView}
        onWorksViewChange={handleWorksViewChange}
      />
      <Navigation
        variant="subpage"
        isWorksView={isWorksView}
        onViewToggle={toggleView}
        showWorksSecondaryToggle={!activeProject}
      />
      <main className="pt-4 md:pt-24 pb-8">
        <AnimatePresence mode="sync" initial={false}>
          {isWorksView ? (
            activeProject ? (
              <motion.div
                key={`project-${activeProject.slug}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={pageTransition}
              >
                <ProjectSubsectionLayout project={activeProject} onBack={handleProjectBack} />
              </motion.div>
            ) : (
              <motion.div
                key="works"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={pageTransition}
              >
                <WorksLayout
                  projects={projects}
                  scrollToSlug={scrollToSlug}
                  onScrollComplete={handleScrollComplete}
                  onProjectClick={handleProjectOpen}
                />
              </motion.div>
            )
          ) : (
            <motion.div
              key="moodboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
            >
              <MoodboardLayout projects={projects} onImageClick={handleMoodboardImageClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ThemeSwitcher - same position as homepage footer */}
      <div className="fixed bottom-3 right-4 md:right-8 z-50 hidden md:block">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
