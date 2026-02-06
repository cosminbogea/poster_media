"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { WorkDetail } from "@/components/works/WorkDetail";
import { getProjectBySlug } from "@/data/projects";
import { useTheme } from "@/components/theme-context";

export default function WorkDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);
  const { colors } = useTheme();

  if (!project) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1
            className="font-erbaum text-2xl font-bold mb-4"
            style={{ color: colors.textColor }}
          >
            Project not found
          </h1>
          <Link
            href="/works"
            className="text-sm underline hover:opacity-80 transition-opacity"
            style={{ color: colors.textColor }}
          >
            Back to Works
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-xs font-bold mb-8 hover:opacity-80 transition-opacity"
          style={{ color: colors.textColor }}
        >
          ← BACK TO WORKS
        </Link>
        <WorkDetail project={project} />
      </div>
    </PageLayout>
  );
}
