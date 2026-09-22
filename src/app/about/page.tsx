import type { Metadata } from "next";

import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Us | KRS AI",
  description:
    "KRS is a licensed Greek accounting practice with its own platform. Bookkeeping, payroll and tax stay with named advisors, so you can run the company.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
