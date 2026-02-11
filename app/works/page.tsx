"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "@/components/navigation/Navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { WorksLayout } from "@/components/works/WorksLayout";
import { MoodboardLayout } from "@/components/works/MoodboardLayout";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/theme-context";

export default function WorksPage() {
  const { colors } = useTheme();
  const [isWorksView, setIsWorksView] = useState(true);
  const [scrollToSlug, setScrollToSlug] = useState<string | null>(null);

  const toggleView = () => setIsWorksView((prev) => !prev);

  const handleMoodboardImageClick = (slug: string) => {
    setScrollToSlug(slug);
    setIsWorksView(true);
  };

  const handleScrollComplete = useCallback(() => {
    setScrollToSlug(null);
  }, []);

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      <Navigation
        variant="subpage"
        isWorksView={isWorksView}
        onViewToggle={toggleView}
      />
      <main className="pt-24 pb-8">
        <AnimatePresence mode="wait">
          {isWorksView ? (
            <motion.div
              key="works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <WorksLayout projects={projects} scrollToSlug={scrollToSlug} onScrollComplete={handleScrollComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="moodboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MoodboardLayout projects={projects} onImageClick={handleMoodboardImageClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ThemeSwitcher - same position as homepage footer */}
      <div className="fixed bottom-3 right-4 md:right-8 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
