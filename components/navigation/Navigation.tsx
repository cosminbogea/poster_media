"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-context";

type NavigationVariant = "homepage" | "subpage";

interface NavigationProps {
  variant?: NavigationVariant;
  isWorksView?: boolean;
  onViewToggle?: () => void;
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

  // Check if a link is active (current page)
  const isActive = (href: string) => pathname === href;
  const isWorksSection = pathname.startsWith("/works");

  return (
    <nav className={`${positionClasses} px-4 md:px-8 z-50`}>
      <div className="flex items-center">
        {/* POSTER MEDIA - left aligned */}
        <Link
          href="/"
          data-nav="poster-media"
          className="text-xs font-bold hover:opacity-80 transition-opacity"
          style={{ color: variant === "homepage" ? colors.textColor : colors.lineColor }}
        >
          POSTER MEDIA
        </Link>

        {/* WORKS, ABOUT, CONTACT US - starting from center with equal spacing */}
        <div className="absolute left-1/2 right-4 md:right-8 flex justify-between">
          {navLinks.map((link) => {
            const isLinkActive = variant === "homepage"
              ? false
              : link.href === "/works" ? isWorksSection : isActive(link.href);
            const linkColor = variant === "homepage"
              ? colors.textColor
              : isLinkActive ? colors.textColor : colors.lineColor;

            // For WORKS link, show MOODBOARD next to it when in works section
            if (link.href === "/works" && isWorksSection && variant !== "homepage") {
              return (
                <div key={link.href} className="flex gap-4">
                  <button
                    onClick={onViewToggle}
                    data-nav="works"
                    className="text-xs font-bold hover:opacity-80 transition-opacity"
                    style={{ color: isWorksView ? colors.textColor : colors.lineColor }}
                  >
                    WORKS
                  </button>
                  <button
                    onClick={onViewToggle}
                    className="text-xs font-bold hover:opacity-80 transition-opacity"
                    style={{ color: !isWorksView ? colors.textColor : colors.lineColor }}
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
                className="text-xs font-bold hover:opacity-80 transition-opacity"
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
