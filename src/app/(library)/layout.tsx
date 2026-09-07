import { LibrarySubnav } from "@/components/library-subnav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-background text-foreground [scroll-padding-top:9rem]">
      <style>{`html { scroll-padding-top: 9rem; }`}</style>
      <SiteHeader />
      <LibrarySubnav />
      {children}
      <SiteFooter />
    </main>
  );
}
