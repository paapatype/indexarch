import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — IndexArch",
  description:
    "Insights on B2B catalogs, digital sales tools, and manufacturing technology from the Index team.",
};

export default function BlogPage() {
  return <BlogListClient />;
}
