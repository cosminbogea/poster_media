"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTheme } from "@/components/theme-context";

interface MobileTopBarProps {
  showLinks?: boolean;
  isWorksView?: boolean;
  onWorksViewChange?: (isWorks: boolean) => void;
}

export function MobileTopBar({
  showLinks = true,
  isWorksView = true,
  onWorksViewChange,
}: MobileTopBarProps) {
  const pathname = usePathname();
  const { colors } = useTheme();
  const isWorksSection = pathname.startsWith("/works");
  const isHomepage = pathname === "/";
  const shouldShowLinks = showLinks && !isHomepage;
  const showWorksToggle = isWorksSection && typeof onWorksViewChange === "function";

  return (
    <header
      className="sticky top-0 z-50 px-4 pb-3 md:hidden"
      style={{ backgroundColor: isHomepage ? "transparent" : colors.background }}
    >
      <div className="space-y-4 pt-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold leading-none"
            style={{ color: colors.textColor }}
          >
            POSTER MEDIA
          </Link>
          <ThemeSwitcher />
        </div>

        {shouldShowLinks ? (
          <nav className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              {showWorksToggle ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onWorksViewChange(true)}
                    className="text-xs font-bold leading-none transition-opacity"
                    style={{
                      color: isWorksView ? colors.textColor : colors.inactiveNavColor,
                    }}
                  >
                    WORKS
                  </button>
                  <span className="h-6 w-px" style={{ backgroundColor: colors.textColor }} />
                  <button
                    onClick={() => onWorksViewChange(false)}
                    className="text-xs font-bold leading-none transition-opacity"
                    style={{
                      color: !isWorksView ? colors.textColor : colors.inactiveNavColor,
                    }}
                  >
                    MOODBOARD
                  </button>
                </div>
              ) : (
                <Link
                  href="/works"
                  className="text-xs font-bold leading-none transition-opacity"
                  style={{
                    color: isWorksSection ? colors.textColor : colors.inactiveNavColor,
                  }}
                >
                  WORKS
                </Link>
              )}
            </div>

            <Link
              href="/about"
              className="justify-self-center text-xs font-bold leading-none transition-opacity"
              style={{
                color: pathname === "/about" ? colors.textColor : colors.inactiveNavColor,
              }}
            >
              ABOUT
            </Link>

            <Link
              href="/contact"
              className="justify-self-end text-xs font-bold leading-none transition-opacity"
              style={{
                color: pathname === "/contact" ? colors.textColor : colors.inactiveNavColor,
              }}
            >
              CONTACT US
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
