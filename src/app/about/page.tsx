import type { Metadata } from "next";

import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Us | KRS AI",
  description:
    "KRS is a licensed Greek accounting practice with an AI operating file. Accounting, payroll, tax, and filings stay reviewed, so founders can run the company.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
