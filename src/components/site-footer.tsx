import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Tax Advisory", href: "#services" },
      { label: "Bookkeeping", href: "#services" },
      { label: "Financial Statements & Taxes", href: "#services" },
      { label: "Tax Return", href: "#services" },
      { label: "Payroll", href: "#services" },
    ],
  },
  {
    title: "Tax advice",
    links: [
      { label: "Tax Advisor for Startups", href: "#" },
      { label: "Tax Advisor for IKE", href: "#" },
      { label: "Tax Advisor for EPE", href: "#" },
      { label: "Tax Advisor for Holding", href: "#" },
      { label: "Tax Advisor for Entrepreneurs", href: "#" },
      { label: "Tax Advisor for Companies", href: "#" },
      { label: "Digital Tax Advisory", href: "#" },
      { label: "Tax Advisor Costs", href: "#" },
      { label: "Tax Advisor Cost Calculator", href: "#" },
      { label: "Find a Tax Advisor", href: "#" },
      { label: "Tax Advisor Switch", href: "#" },
      { label: "Terminate Tax Advisor", href: "#" },
      { label: "Tax Advisor Duty", href: "#" },
      { label: "Tax Advisor Questions", href: "#" },
    ],
  },
  {
    title: "Bookkeeping",
    links: [
      { label: "Outsource bookkeeping", href: "#" },
      { label: "Bookkeeping for IKE", href: "#" },
      { label: "Bookkeeping for EPE", href: "#" },
      { label: "Bookkeeping for Start-Ups", href: "#" },
      { label: "Find a Bookkeeping Service", href: "#" },
      { label: "Bookkeeping Costs", href: "#" },
      { label: "Digital bookkeeping", href: "#" },
      { label: "Do Bookkeeping with a Tax Advisor", href: "#" },
      { label: "Automated bookkeeping", href: "#" },
    ],
  },
  {
    title: "KRS AI platform",
    links: [
      { label: "Understanding Deadlines & Processes", href: "#process" },
      { label: "Managing Documents", href: "#" },
      { label: "Get Expertise Quickly", href: "#" },
      { label: "Automate bookkeeping", href: "#agents" },
    ],
  },
  {
    title: "About KRS AI",
    links: [
      { label: "About KRS AI", href: "#" },
      { label: "Guides", href: "#field-notes" },
      { label: "Careers", href: "#careers" },
      { label: "Why KRS AI", href: "#why" },
      { label: "FAQs", href: "#faq" },
      { label: "Press", href: "#media" },
      { label: "Structure", href: "#" },
      { label: "Contact us", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Imprint", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms and Conditions", href: "#" },
      { label: "Trust Center", href: "#" },
    ],
  },
];

function FooterLinkColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div>
      <h3 className="mono-label mb-4 text-primary-foreground/42">{group.title}</h3>
      <ul className="grid gap-2.5">
        {group.links.map((link) => (
          <li key={link.label}>
            <a
              className="text-sm leading-6 text-primary-foreground/68 transition-colors hover:text-primary-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-12">
        <div className="grid gap-12 border-b border-primary-foreground/12 pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <a aria-label="KRS AI home" className="inline-flex items-center" href="#">
              <Image alt="KRS AI" className="h-11 w-auto" height={44} src="/logos/krs-full-logo.svg" unoptimized width={186} />
            </a>

            <p className="mt-8 max-w-sm text-balance text-2xl font-semibold leading-tight">
              Accounting, tax advisory, payroll, and compliance operations for Greek businesses that need precision.
            </p>

            <div className="mt-8 grid gap-5 text-sm leading-7 text-primary-foreground/68 sm:grid-cols-2 lg:grid-cols-1">
              <p>
                <strong className="font-semibold text-primary-foreground">KRS AI Services</strong>
                <br />
                Leoforos Kifisias 44
                <br />
                151 25 Marousi
                <br />
                Greece
              </p>
              <p>
                <strong className="font-semibold text-primary-foreground">Contact</strong>
                <br />
                <a className="transition-colors hover:text-primary-foreground" href="tel:+302101234567">
                  +30 210 123 4567
                </a>
                <br />
                <a className="transition-colors hover:text-primary-foreground" href="mailto:hello@krs.ai">
                  hello@krs.ai
                </a>
              </p>
            </div>

            <Button
              asChild
              className="mt-8 h-11 rounded-full bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90"
              variant="secondary"
            >
              <a href="#contact">
                Contact KRS
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {footerLinkGroups.map((group) => (
                <FooterLinkColumn group={group} key={group.title} />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <p className="max-w-4xl text-xs leading-6 text-primary-foreground/52">
              Copyright 2026 KRS.ai. Your digital tax service with its own platform. The technical platform is
              operated by KRS AI Services. Reserved tasks are performed by licensed tax and accounting professionals.
              KRS AI Services and its licensed tax partners are separate legal entities cooperating as part of a
              network. Each entity is responsible only for its own acts and omissions to the extent permitted by law.
            </p>
            <p className="mono-label text-primary-foreground/36">Athens / Remote / EU</p>
          </div>
        </div>
      </div>
      <Separator className="bg-primary-foreground/10" />
    </footer>
  );
}
