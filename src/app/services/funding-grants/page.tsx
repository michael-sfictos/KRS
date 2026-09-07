import type { Metadata } from "next";

import { ServicePage } from "@/components/accounting-service-page";
import { fundingGrantsPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Funding and Grants for Greek Businesses | KRS",
  description: fundingGrantsPage.description,
  alternates: { canonical: "/services/funding-grants" },
};

export default function FundingGrantsPage() {
  return <ServicePage page={fundingGrantsPage} />;
}
