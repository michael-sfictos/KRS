import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MegaMenuLink = {
  label: string;
  description?: string;
  href: string;
};

type MegaMenuColumn = {
  title: string;
  links: MegaMenuLink[];
};

type MegaMenuFeature = MegaMenuLink & {
  eyebrow: string;
};

type MegaNavItem = {
  label: string;
  columns: MegaMenuColumn[];
  features: MegaMenuFeature[];
  ctaLabel: string;
  ctaHref: string;
};

const navItems: MegaNavItem[] = [
  {
    label: "Services",
    ctaLabel: "Talk to our team",
    ctaHref: "/onboarding",
    columns: [
      {
        title: "Our Services",
        links: [
          {
            label: "Tax Advisory",
            description: "Personal advice on our platform - tax strategy, advice and audit",
            href: "/#services",
          },
          {
            label: "Accounting",
            description: "Digital accounting for businesses - formation, records, finance and closure",
            href: "/services/accounting",
          },
          {
            label: "Payroll Accounting",
            description: "Accurate payroll fully integrated - cost strategy and program participation",
            href: "/#services",
          },
          {
            label: "Consulting Services",
            description: "Business plan, funding, and business development support",
            href: "/#services",
          },
          {
            label: "Funding & Grants",
            description: "Local and European grants - we help you find the right funding",
            href: "/#services",
          },
        ],
      },
      {
        title: "Platform Features",
        links: [
          { label: "Meet Tax Deadlines", description: "All deadlines automatically tracked", href: "/#process" },
          { label: "Manage Tax Documents", description: "Documents digitally organized and secure", href: "/#agents" },
          { label: "Get Expert Advice", description: "Direct questions to your tax advisor", href: "/onboarding" },
          { label: "Automated Data Exchange", description: "Seamlessly connect your tools", href: "/#agents" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Book a demo",
        label: "Talk to our expert team",
        description: "See how the operating file works before onboarding.",
        href: "/onboarding",
      },
      {
        eyebrow: "Guide",
        label: "Taxes, Accounting, and Tips for Starting a Business",
        description: "A practical entry point for founders and operators.",
        href: "/#field-notes",
      },
    ],
  },
  {
    label: "Industries",
    ctaLabel: "Book a free demo",
    ctaHref: "/onboarding",
    columns: [
      {
        title: "By company type",
        links: [
          { label: "Tax Advisory for UG", description: "Tailored tax advice for your UG", href: "/onboarding" },
          {
            label: "Tax Advisory for GmbH",
            description: "Custom tax advice for limited liability companies",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Holding",
            description: "Specialized advice for holding structures",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Startups",
            description: "Smart tax support for your startup",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Companies",
            description: "Personal tax advice for SMEs",
            href: "/onboarding",
          },
          {
            label: "Tax Advisory for Founders",
            description: "Professional guidance from day one",
            href: "/onboarding",
          },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Learn more",
        label: "Tax Advisor Costs",
        description: "The costs of a tax advisor explained.",
        href: "/#field-notes",
      },
      {
        eyebrow: "Learn more",
        label: "Tax Advisor Obligation",
        description: "Is a tax advisor mandatory?",
        href: "/#faq",
      },
    ],
  },
  {
    label: "Guides",
    ctaLabel: "Explore our guides",
    ctaHref: "/#field-notes",
    columns: [
      {
        title: "Tax Advisory",
        links: [
          { label: "Tax Advisor Search", href: "/#field-notes" },
          { label: "Tax Advisor Costs", href: "/#field-notes" },
          { label: "Tax Advisor Switch", href: "/#field-notes" },
          { label: "Free tax advice", href: "/#field-notes" },
          { label: "Do I need a tax advisor?", href: "/#faq" },
        ],
      },
      {
        title: "Bookkeeping",
        links: [
          { label: "Bookkeeper search", href: "/#field-notes" },
          { label: "Bookkeeping costs", href: "/#field-notes" },
          { label: "Bookkeeping outsourcing", href: "/#field-notes" },
          { label: "Bookkeeping UG", href: "/#field-notes" },
          { label: "Bookkeeping GmbH", href: "/#field-notes" },
        ],
      },
      {
        title: "Tax tips",
        links: [
          { label: "Tax return documents", href: "/#field-notes" },
          { label: "Deducting tax consulting costs", href: "/#field-notes" },
          { label: "Common questions about tax advisors", href: "/#faq" },
          { label: "When should I consult a tax advisor?", href: "/#faq" },
          { label: "Tax Advisor Comparison", href: "/#field-notes" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Learn more",
        label: "Cost calculator",
        description: "Calculate costs for tax consulting and accounting.",
        href: "/onboarding",
      },
      {
        eyebrow: "Learn more",
        label: "Digital tax advice",
        description: "Benefits and practical tips.",
        href: "/#services",
      },
    ],
  },
  {
    label: "About Us",
    ctaLabel: "Book a free demo",
    ctaHref: "/onboarding",
    columns: [
      {
        title: "About KRS AI",
        links: [
          { label: "About us", description: "KRS AI's story and mission", href: "/#about" },
          { label: "Why KRS AI?", description: "Benefits of our platform and advice", href: "/#why" },
          { label: "Careers", description: "Open positions at KRS AI", href: "/#careers" },
          { label: "FAQs", description: "Answers to common questions", href: "/#faq" },
          { label: "Contact us", description: "Personal contact with our team", href: "/onboarding" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Learn more",
        label: "Book a Demo",
        description: "Talk to our expert team.",
        href: "/onboarding",
      },
      {
        eyebrow: "Learn more",
        label: "Open positions",
        description: "Your start at KRS AI.",
        href: "/#careers",
      },
    ],
  },
  {
    label: "Blog",
    ctaLabel: "Read all articles",
    ctaHref: "/#field-notes",
    columns: [
      {
        title: "Latest articles",
        links: [
          {
            label: "What agentic accounting changes for Greek SMEs.",
            description: "Brief / 08 min",
            href: "/#field-notes",
          },
          {
            label: "myDATA as an operating rhythm, not an afterthought.",
            description: "Guide / 11 min",
            href: "/#field-notes",
          },
          {
            label: "The CFO question founders ask too late.",
            description: "Conversation / 17 min",
            href: "/#field-notes",
          },
        ],
      },
      {
        title: "Browse topics",
        links: [
          { label: "Accounting", href: "/#field-notes" },
          { label: "Payroll", href: "/#field-notes" },
          { label: "Tax Filings", href: "/#field-notes" },
          { label: "Tax tips", href: "/#field-notes" },
        ],
      },
    ],
    features: [
      {
        eyebrow: "Guide Hub",
        label: "Taxes, Accounting, and Tips for Starting a Business",
        description: "A founder-friendly resource path.",
        href: "/#field-notes",
      },
      {
        eyebrow: "Press",
        label: "Known from",
        description: "Media, updates, and public notes from KRS AI.",
        href: "/#media",
      },
    ],
  },
];

const languageOptions = [
  { value: "el", label: "Greek" },
  { value: "en", label: "English" },
  { value: "he", label: "Hebrew" },
  { value: "ar", label: "Arabic" },
  { value: "zh", label: "Chinese" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/12 bg-background/88 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-18 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link aria-label="KRS AI home" className="flex items-center" href="/">
          <Image
            alt="KRS AI"
            className="h-14 w-auto"
            height={157}
            priority
            src="/logos/Full%20logo%20Dark.svg"
            unoptimized
            width={382}
          />
        </Link>
        <div className="hidden h-full items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <HeaderMegaNavItem item={item} key={item.label} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 border-l border-primary/12 pl-4 sm:flex">
            <label className="sr-only" htmlFor="site-language">
              Select language
            </label>
            <Languages className="size-3.5 text-secondary" strokeWidth={1.75} />
            <div className="relative">
              <select
                aria-label="Language selector"
                className="h-9 w-[118px] appearance-none rounded-full border border-primary/12 bg-background py-0 pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition hover:border-primary/25 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                defaultValue="en"
                id="site-language"
              >
                {languageOptions.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.75}
              />
            </div>
          </div>
          <Button asChild className="hidden h-10 rounded-full px-5 sm:inline-flex" variant="ghost">
            <a href="https://krs-platform-staging-6xbnf.ondigitalocean.app/">Log-in</a>
          </Button>
          <Button asChild className="h-10 rounded-full px-5 shadow-sm">
            <a href="/onboarding">
              Contact
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function HeaderMegaNavItem({ item }: { item: MegaNavItem }) {
  return (
    <div className="mega-menu-group flex h-full items-center">
      <button
        aria-haspopup="true"
        className="flex h-full appearance-none items-center gap-1 bg-transparent px-2 text-sm font-medium text-muted-foreground outline-none transition hover:text-foreground focus-visible:text-foreground"
        type="button"
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className="mega-menu-chevron size-3.5 transition duration-200"
          strokeWidth={1.75}
        />
      </button>
      <div className="mega-menu-panel absolute left-1/2 top-full z-50 w-[min(1040px,calc(100vw-3rem))] pt-3 transition duration-200 ease-out">
        <div className="grid overflow-hidden border border-primary/15 bg-white shadow-[var(--shadow-xl)] lg:grid-cols-[1fr_320px]">
          <div className="bg-white p-5 sm:p-6">
            <div
              className={cn(
                "grid gap-x-8 gap-y-6",
                item.columns.length > 2
                  ? "lg:grid-cols-3"
                  : item.columns.length > 1
                    ? "md:grid-cols-2"
                    : "grid-cols-1"
              )}
            >
              {item.columns.map((column) => (
                <div key={column.title}>
                  <p className="mono-label mb-3 text-muted-foreground">{column.title}</p>
                  <ul>
                    {column.links.map((link) => (
                      <li className="border-t border-primary/10 first:border-t-0" key={link.label}>
                        <a className="group/link block py-3 outline-none" href={link.href}>
                          <span className="flex items-start justify-between gap-4">
                            <span className="text-sm font-semibold leading-5 text-foreground transition group-hover/link:text-secondary group-focus-visible/link:text-secondary">
                              {link.label}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover/link:translate-x-0.5 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                              strokeWidth={1.75}
                            />
                          </span>
                          {link.description ? (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {link.description}
                            </span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-full flex-col justify-between bg-primary p-5 text-primary-foreground sm:p-6">
            <div className="grid gap-3">
              {item.features.map((feature) => (
                <a
                  className="group/card block border border-primary-foreground/12 bg-primary-foreground/8 p-4 outline-none transition hover:bg-primary-foreground/12 focus-visible:bg-primary-foreground/12"
                  href={feature.href}
                  key={feature.label}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="mono-label text-secondary">{feature.eyebrow}</span>
                      <span className="mt-2 block text-base font-semibold leading-5 text-primary-foreground">
                        {feature.label}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary-foreground/40 transition group-hover/card:translate-x-0.5 group-hover/card:text-secondary group-focus-visible/card:text-secondary"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="mt-3 block text-xs leading-5 text-primary-foreground/58">
                    {feature.description}
                  </span>
                </a>
              ))}
            </div>

            <a
              className="mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-primary-foreground px-5 text-sm font-semibold text-primary transition hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href={item.ctaHref}
            >
              {item.ctaLabel}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
