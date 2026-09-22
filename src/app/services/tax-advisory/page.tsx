import type { Metadata } from "next";

import { TaxPage } from "@/components/tax-page";
import { taxAdvisoryPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Tax Advisory for Greek Businesses | KRS",
  description: taxAdvisoryPage.description,
  alternates: { canonical: "/services/tax-advisory" },
};

export default function TaxAdvisoryRoute() {
  return <TaxPage />;
}
