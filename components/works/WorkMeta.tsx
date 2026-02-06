"use client";

import { useTheme } from "@/components/theme-context";

interface WorkMetaProps {
  date: string;
  location: string;
}

export function WorkMeta({ date, location }: WorkMetaProps) {
  const { colors } = useTheme();

  return (
    <div
      className="flex flex-col gap-0.5 text-xs font-bold"
      style={{ color: colors.textColor }}
    >
      <span>{date}</span>
      <span>{location}</span>
    </div>
  );
}
