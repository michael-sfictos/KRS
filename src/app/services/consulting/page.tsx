import type { Metadata } from "next";

import { ServicePage } from "@/components/accounting-service-page";
import { consultingPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Business Consulting Services | KRS",
  description: consultingPage.description,
  alternates: { canonical: "/services/consulting" },
};

export default function ConsultingPage() {
  return <ServicePage page={consultingPage} />;
}
