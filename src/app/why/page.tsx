import type { Metadata } from "next";

import { WhyPage } from "@/components/why-page";

export const metadata: Metadata = {
  title: "Why KRS AI?",
  description:
    "A licensed Greek accounting practice with an AI operating file. Bookkeeping, payroll, and tax stay in one reviewed place, so founders can run the company.",
  alternates: { canonical: "/why" },
};

export default function Why() {
  return <WhyPage />;
}
