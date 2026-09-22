import type { Metadata } from "next";

import { AccountingPage } from "@/components/accounting-page";
import { accountingPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Accounting Services for Greek Businesses | KRS",
  description: accountingPage.description,
  alternates: { canonical: "/services/accounting" },
};

export default function AccountingRoute() {
  return <AccountingPage />;
}
