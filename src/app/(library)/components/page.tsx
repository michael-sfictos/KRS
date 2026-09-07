import type { Metadata } from "next";

import { ComponentGallery } from "@/components/component-gallery";

export const metadata: Metadata = {
  title: "Components | KRS AI",
  description: "Index of buttons, inputs, tabs, cards, and other components currently used on the KRS website.",
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  return <ComponentGallery />;
}
