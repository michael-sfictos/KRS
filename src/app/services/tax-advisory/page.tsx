import type { Metadata } from "next";

import { ServicePage } from "@/components/accounting-service-page";
import { taxAdvisoryPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Tax Advisory for Greek Businesses | KRS",
  description: taxAdvisoryPage.description,
  alternates: { canonical: "/services/tax-advisory" },
};

export default function TaxAdvisoryPage() {
  return <ServicePage page={taxAdvisoryPage} />;
}
