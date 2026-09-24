import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/legal-document";
import { cookiePolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy | KRS AI",
  description: cookiePolicy.description,
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiePolicyPage() {
  return <LegalDocumentView document={cookiePolicy} />;
}
