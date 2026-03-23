import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export const metadata: Metadata = {
  title: "Case Study: Kayu & Kov — IndexArch",
  description:
    "How Kayu & Kov reduced architect back-and-forth by 40% with an interactive 3D product catalog by Index.",
  openGraph: {
    title: "Case Study: Kayu & Kov — IndexArch",
    description:
      "A premium tiles manufacturer replaced their 200-page PDF catalog and transformed their sales process.",
    type: "article",
  },
};

export default function CaseStudyPage() {
  return <CaseStudyClient />;
}
