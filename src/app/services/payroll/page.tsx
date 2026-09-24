import type { Metadata } from "next";

import { PayrollPage } from "@/components/payroll-page";
import { payrollPage } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "Payroll for Greek Businesses | KRS",
  description: payrollPage.description,
  alternates: { canonical: "/services/payroll" },
};

export default function PayrollRoute() {
  return <PayrollPage />;
}
