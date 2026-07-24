export type ServiceMenuItem = {
  index: string;
  title: string;
  description: string;
  href: string;
  available: boolean;
};

export const serviceMenu: ServiceMenuItem[] = [
  {
    index: "01",
    title: "Tax Advisory",
    description: "Tax strategy, direct expert advice and support through important business decisions.",
    href: "/#services",
    available: false,
  },
  {
    index: "02",
    title: "Accounting",
    description: "Formation, recurring books, reporting and closure in one accountable relationship.",
    href: "/services/accounting",
    available: true,
  },
  {
    index: "03",
    title: "Payroll Accounting",
    description: "Accurate payroll operations, employee changes and labour-cost planning.",
    href: "/#services",
    available: false,
  },
  {
    index: "04",
    title: "Consulting Services",
    description: "Business planning, management support and practical guidance for the next stage.",
    href: "/#services",
    available: false,
  },
  {
    index: "05",
    title: "Funding & Grants",
    description: "Identify suitable programmes and build a better-prepared funding process.",
    href: "/#services",
    available: false,
  },
];

export const accountingPage = {
  title: "Accounting that keeps business in view.",
  description:
    "From formation to monthly books, financial insight and closure, KRS keeps the full accounting lifecycle connected.",
  heroImage: "/images/krs-accountant-advisor.png",
  heroImageAlt: "KRS accounting advisor speaking directly with a business client",
  features: [
    {
      title: "Books that stay current",
      description:
        "Documents, reconciliations, myDATA workflows and recurring obligations move through one dependable monthly process.",
    },
    {
      title: "People who know your file",
      description:
        "Ask questions directly and receive practical guidance from KRS professionals who understand the context behind your numbers.",
    },
    {
      title: "Information you can use",
      description:
        "See obligations, results and cash-flow signals early enough to support management decisions, not only historical reporting.",
    },
  ],
  ctaTitle: "Your accounting should reduce uncertainty, not create another monthly chase.",
  ctaDescription:
    "Bring KRS the current setup, the open questions and the reporting you wish you had. We will map the right next step.",
  benefitsTitle: "One accounting partner across the company lifecycle.",
  benefitsDescription:
    "Formation, day-to-day books, management reporting and closure stay connected in one accountable relationship.",
  benefits: [
    {
      index: "01",
      title: "Company formation",
      description:
        "Choose a workable entity structure, coordinate the opening steps and establish the first accounting, invoicing and reporting routines.",
    },
    {
      index: "02",
      title: "Ongoing accounting",
      description:
        "Maintain accurate books, reconcile accounts, organise source documents and keep tax obligations visible throughout the year.",
    },
    {
      index: "03",
      title: "Financial services",
      description:
        "Use cash-flow monitoring, budgets and financial analysis to understand performance, pressure points and available options.",
    },
    {
      index: "04",
      title: "Company closure",
      description:
        "Review open periods and obligations, coordinate the required actions and finish with a clear, documented record.",
    },
  ],
  processTitle: "How to switch your accounting to KRS",
  processDescription:
    "A controlled handover protects current deadlines while creating a better rhythm for the next monthly close.",
  process: [
    {
      title: "Understand the business",
      description: "We map the entities, activity, team, systems, obligations and the questions management needs answered.",
    },
    {
      title: "Review the accounting file",
      description: "KRS examines current records, open periods, missing evidence and responsibilities held by the existing provider.",
    },
    {
      title: "Plan the handover",
      description: "You receive a clear transition plan covering information requests, dates, owners and continuity of active obligations.",
    },
    {
      title: "Run the first KRS close",
      description: "We connect the working flows, resolve inherited gaps and establish the reporting cadence going forward.",
    },
  ],
  testimonials: [
    {
      quote:
        "The monthly close stopped being a search across inboxes. We know what is missing, who owns it and when the numbers are ready.",
      role: "Composite of common operator feedback",
    },
    {
      quote:
        "What changed was access. We can ask the person responsible for our file and get an answer that reflects how our business actually works.",
      role: "Composite of common founder feedback",
    },
    {
      quote:
        "The reports now lead to a management conversation about cash, costs and the next decision instead of arriving after the moment has passed.",
      role: "Composite of common finance-team feedback",
    },
  ],
  faqs: [
    {
      question: "Does KRS handle the full accounting process?",
      answer:
        "KRS organises and performs the accounting work agreed for your company, from recurring books and reconciliations to the relevant filings and reporting. Your team still provides business context and documents that only you can supply.",
    },
    {
      question: "Can KRS take over from our current accountant?",
      answer:
        "Yes. The switch begins with a file review and a dated responsibility plan, so active deadlines continue while records, authorisations and working methods move to KRS.",
    },
    {
      question: "Can you help with older or incomplete accounting periods?",
      answer:
        "Often, yes. We first assess the state of the books, missing evidence and outstanding submissions, then define the remediation work and realistic timing.",
    },
    {
      question: "Can KRS help us form a new company?",
      answer:
        "Yes. KRS can support entity selection, formation planning and the first accounting setup, then continue as the recurring accounting team after launch.",
    },
    {
      question: "What financial reporting can management receive?",
      answer:
        "The scope can include accounting results, cash-flow monitoring, budgets and actual-versus-plan analysis. The format and frequency are shaped around the decisions your team needs to make.",
    },
    {
      question: "Can KRS also manage an orderly company closure?",
      answer:
        "Yes. We begin by reviewing the entity, records and open obligations, then coordinate the accounting and tax actions required for a documented closure.",
    },
    {
      question: "Will we speak with real people?",
      answer:
        "Yes. You communicate directly with KRS professionals who know your file and can bring specialised accounting, tax, payroll or financial expertise into the conversation when needed.",
    },
  ],
  finalTitle: "Make accounting part of how the business moves forward.",
  finalDescription:
    "One team, one operating rhythm and a clearer view from the first company decision to the latest monthly close.",
} as const;
