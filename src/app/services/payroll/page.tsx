import type { Metadata } from "next";

import { ServicePage } from "@/components/accounting-service-page";
import { payrollPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Payroll Accounting for Greek Businesses | KRS",
  description: payrollPage.description,
  alternates: { canonical: "/services/payroll" },
};

export default function PayrollPage() {
  return <ServicePage page={payrollPage} />;
}
