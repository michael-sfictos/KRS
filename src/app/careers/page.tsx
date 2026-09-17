import type { Metadata } from "next";

import { CareersPage } from "@/components/careers-page";

export const metadata: Metadata = {
  title: "Careers | KRS AI",
  description:
    "Join KRS: a six-hour working day with eight-hour pay, licensed accounting work, and an AI operating file. Open roles in Athens.",
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return <CareersPage />;
}
