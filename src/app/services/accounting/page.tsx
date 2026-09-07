import type { Metadata } from "next";

import { ServicePage } from "@/components/accounting-service-page";
import { accountingPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Accounting Services for Greek Businesses | KRS",
  description: accountingPage.description,
  alternates: { canonical: "/services/accounting" },
};

export default function AccountingPage() {
  return <ServicePage page={accountingPage} />;
}
