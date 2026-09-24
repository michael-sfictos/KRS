import type { Metadata } from "next";

import { FundingPage } from "@/components/funding-page";
import { fundingGrantsPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Funding and Grants for Greek Businesses | KRS",
  description: fundingGrantsPage.description,
  alternates: { canonical: "/services/funding-grants" },
};

export default function FundingGrantsRoute() {
  return <FundingPage />;
}
