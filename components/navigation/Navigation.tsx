"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-context";

type NavigationVariant = "homepage" | "subpage";

interface NavigationProps {
  variant?: NavigationVariant;
  isWorksView?: boolean;
  onViewToggle?: () => void;
  showWorksSecondaryToggle?: boolean;
}

const navLinks = [
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT US" },
];

export function Navigation({
  variant: variantProp,
  isWorksView = true,
  onViewToggle,
  showWorksSecondaryToggle = true,
}: NavigationProps) {
  const { colors } = useTheme();
  const pathname = usePathname();

  // Auto-detect variant from pathname if not explicitly set
  const variant: NavigationVariant =
    variantProp ?? (pathname === "/" ? "homepage" : "subpage");

  const positionClasses =
    variant === "homepage"
      ? "absolute top-[35%] left-0 right-0"
      : "fixed top-0 left-0 right-0 py-6";
  const navStyle =
    variant === "homepage"
      ? undefined
      : {
          backgroundColor: colors.background,
        };

  // Check if a link is active (current page)
  const isActive = (href: string) => pathname === href;
  const isWorksSection = pathname.startsWith("/works");

  return (
    <nav
      className={`${positionClasses} hidden md:block px-4 md:px-8 z-50`}
      style={navStyle}
    >
      <div className="flex items-center">
        {/* POSTER MEDIA - left aligned */}
        <Link
          href="/"
          data-nav="poster-media"
          className="text-xs font-bold hover:opacity-80 transition-opacity leading-none"
          style={{ color: variant === "homepage" ? colors.textColor : colors.inactiveNavColor }}
        >
          POSTER MEDIA
        </Link>

        {/* WORKS, ABOUT, CONTACT US - starting from center with equal spacing */}
        <div className="absolute left-1/2 right-4 md:right-8 flex items-center justify-between">
          {navLinks.map((link) => {
            const isLinkActive = variant === "homepage"
              ? false
              : link.href === "/works" ? isWorksSection : isActive(link.href);
            const linkColor = variant === "homepage"
              ? colors.textColor
              : isLinkActive ? colors.textColor : colors.inactiveNavColor;

            // For WORKS link, show MOODBOARD next to it when in works section
            if (link.href === "/works" && isWorksSection && variant !== "homepage") {
              if (!showWorksSecondaryToggle) {
                return (
                  <button
                    key={link.href}
                    onClick={onViewToggle}
                    data-nav="works"
                    className="text-xs font-bold hover:opacity-80 transition-opacity leading-none"
                    style={{ color: colors.textColor }}
                  >
                    WORKS
                  </button>
                );
              }

              return (
                <div key={link.href} className="relative flex items-center">
                  <button
                    onClick={onViewToggle}
                    data-nav="works"
                    className="text-xs font-bold hover:opacity-80 transition-opacity leading-none"
                    style={{ color: isWorksView ? colors.textColor : colors.inactiveNavColor }}
                  >
                    WORKS
                  </button>
                  <button
                    onClick={onViewToggle}
                    className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+1rem)] text-xs font-bold hover:opacity-80 transition-opacity whitespace-nowrap leading-none"
                    style={{ color: !isWorksView ? colors.textColor : colors.inactiveNavColor }}
                  >
                    MOODBOARD
                  </button>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                data-nav={link.href.replace("/", "")}
                className="text-xs font-bold hover:opacity-80 transition-opacity leading-none"
                style={{ color: linkColor }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
