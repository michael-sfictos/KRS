export type ServicePageData = {
  slug: string; eyebrow: string; title: string; description: string; heroImage: string; heroImageAlt: string;
  heroKicker: string; exploreLabel: string; featuresTitle: string;
  features: readonly { title: string; description: string }[];
  ctaTitle: string; ctaDescription: string; benefitsTitle: string; benefitsDescription: string;
  benefitsImage: string; benefitsImageAlt: string;
  benefits: readonly { index: string; title: string; description: string }[];
  processTitle: string; processDescription: string;
  process: readonly { title: string; description: string; image: string; imageAlt: string }[];
  advisorImage: string; advisorImageAlt: string; testimonialEyebrow: string; testimonialTitle: string;
  testimonials: readonly { quote: string; role: string }[];
  faqTitle: string; faqDescription: string; faqs: readonly { question: string; answer: string }[];
  finalTitle: string; finalDescription: string;
};

const onboardingProcess = [
  { title: "Free initial consultation", description: "Tell us how your business operates and where the current process is falling short. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS consultation shown on a modern smartphone" },
  { title: "A clear working plan", description: "Once you choose KRS, we confirm the people, records, deadlines and next actions so responsibility is visible from the beginning.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Business documents moving securely into the KRS operating file" },
  { title: "Your first working rhythm", description: "Meet the KRS team responsible for your file, connect the working flows and receive a clear view of the first priority.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A completed KRS work summary ready for review" },
] as const;

export const accountingPage = {
  slug: "accounting", eyebrow: "Accounting", title: "We keep the books. You keep building.",
  description: "Monthly accounting for Greek companies, reviewed by licensed accountants and kept current through myDATA, VAT and the close.",
  heroImage: "/images/krs-accountant-advisor.png", heroImageAlt: "KRS accounting advisor speaking directly with a business client", heroKicker: "Formation / books / reporting / closure", exploreLabel: "Explore accounting",
  featuresTitle: "Less time on admin. More time on the business.",
  features: [
    { title: "Less admin, every month", description: "Matching, VAT and myDATA move through one monthly process, so the team is not chasing the close." },
    { title: "Expert support when you need it", description: "Talk to accountants who already know the business, not a ticket queue that starts from zero." },
    { title: "Always up to date", description: "Live books, monthly reporting and recurring checks keep a clear picture of performance." },
  ],
  ctaTitle: "Your accounting should reduce uncertainty, not create another monthly chase.", ctaDescription: "Bring KRS the current setup, the open questions and the reporting you wish you had. We will map the right next step.",
  benefitsTitle: "One accounting partner across the company lifecycle.", benefitsDescription: "Formation, day-to-day books, management reporting and closure stay connected in one accountable relationship.", benefitsImage: "/images/krs-tax-advisory-os-snapshot.webp", benefitsImageAlt: "KRS accounting and financial reporting interface",
  benefits: [
    { index: "01", title: "Company formation", description: "Choose a workable entity structure, coordinate the opening steps and establish the first accounting, invoicing and reporting routines." },
    { index: "02", title: "Ongoing accounting", description: "Maintain accurate books, reconcile accounts, organise source documents and keep tax obligations visible throughout the year." },
    { index: "03", title: "Financial services", description: "Use cash-flow monitoring, budgets and financial analysis to understand performance, pressure points and available options." },
    { index: "04", title: "Company closure", description: "Review open periods and obligations, coordinate the required actions and finish with a clear, documented record." },
  ],
  processTitle: "Switch your accounting to KRS in three clear steps.", processDescription: "Changing accountants takes coordination. KRS manages the background work, protects active deadlines and prepares your first monthly close.",
  process: [
    { title: "Free initial consultation", description: "Tell us how your business operates and where the current process is falling short. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS accounting consultation shown on a modern smartphone" },
    { title: "Managed data transfer", description: "Once you choose KRS, we coordinate the handover with your previous accountant, collect the records and protect active deadlines.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Accounting documents moving securely into the KRS operating file" },
    { title: "First monthly close", description: "Meet the KRS team responsible for your file, connect the working flows and receive your first monthly accounting overview.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A completed KRS monthly accounting report" },
  ],
  advisorImage: "/images/krs-expert-accounting-advisor.webp", advisorImageAlt: "KRS accounting specialist", testimonialEyebrow: "Accounting perspectives", testimonialTitle: "What better accounting changes first.",
  testimonials: [
    { quote: "The monthly close stopped being a search across inboxes. We know what is missing, who owns it and when the numbers are ready.", role: "Composite of common operator feedback" },
    { quote: "What changed was access. We can ask the person responsible for our file and get an answer that reflects how our business actually works.", role: "Composite of common founder feedback" },
    { quote: "The reports now lead to a management conversation about cash, costs and the next decision instead of arriving after the moment has passed.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Accounting questions worth asking early.", faqDescription: "The first conversation is free and focused on understanding the facts before recommending a route.",
  faqs: [
    { question: "Does KRS handle the full accounting process?", answer: "KRS organises the agreed accounting work, from recurring books and reconciliations to the relevant filings and reporting. Your team supplies business context and documents that only you can provide." },
    { question: "Can KRS take over from our current accountant?", answer: "Yes. The switch starts with a records review and a dated responsibility plan, so active deadlines continue while working methods move to KRS." },
    { question: "Can you help with older or incomplete periods?", answer: "Often, yes. We assess the books, missing evidence and outstanding submissions, then define the remediation work and timing." },
    { question: "Can KRS help us form a new company?", answer: "Yes. KRS can support entity selection, formation planning and the first accounting setup, then continue as the recurring accounting team." },
    { question: "What financial reporting can management receive?", answer: "The scope can include accounting results, cash-flow monitoring, budgets and actual-versus-plan analysis. The format and frequency are shaped around the decisions your team needs to make." },
    { question: "Can KRS also manage an orderly company closure?", answer: "Yes. We begin by reviewing the entity, records and open obligations, then coordinate the accounting and tax actions required for a documented closure." },
    { question: "Will we speak with real people?", answer: "Yes. You communicate directly with KRS professionals who know your business and can bring specialised accounting, tax, payroll or financial expertise into the conversation when needed." },
  ],
  finalTitle: "Make accounting part of how the business moves forward.", finalDescription: "One team, one operating rhythm and a clearer view from the first company decision to the latest monthly close.",
} as const satisfies ServicePageData;

export const taxAdvisoryPage = {
  slug: "tax-advisory", eyebrow: "Tax", title: "Tax handled. Deadlines kept.",
  description: "VAT returns, the annual income tax filing and practical tax advice for Greek companies, prepared by licensed advisors and submitted through AADE.",
  heroImage: "/images/krs-pricing-advisory-session.png", heroImageAlt: "KRS tax advisor reviewing a filing with a client", heroKicker: "VAT / income tax / OSS / advice", exploreLabel: "Explore tax advisory",
  featuresTitle: "Stay current. No deadline left to chance.",
  features: [
    { title: "VAT on your filing cycle", description: "ΦΠΑ returns are prepared and submitted to AADE on the monthly or quarterly cycle that applies to your books." },
    { title: "Income tax from the closed year", description: "The annual income tax return and E3 are prepared from the accounts, with deductions and advance tax reviewed before filing." },
    { title: "Advice before the return is due", description: "Questions about VAT, cross-border sales and the tax position are answered through the year, with the file already in view." },
  ],
  ctaTitle: "Filings and advice should arrive before the deadline does.", ctaDescription: "Bring the current books, open returns and the next decision. We will map the tax work and the first call.",
  benefitsTitle: "What stays in the tax work, year-round.", benefitsDescription: "VAT, income tax, cross-border filings and deadline watch stay with one advisor, so the position is visible before a return is due.", benefitsImage: "/images/krs-tax-advisory-os-snapshot.webp", benefitsImageAlt: "KRS tax workspace showing a VAT return ready for review",
  benefits: [
    { index: "01", title: "VAT returns", description: "Periodic ΦΠΑ returns prepared from the books, checked for rate, reverse charge and myDATA, then filed with AADE." },
    { index: "02", title: "Corporate income tax", description: "The annual income tax return and E3, including deductions, adjustments and advance tax already paid." },
    { index: "03", title: "EU and cross-border VAT", description: "Domestic VAT, OSS and the intra-EU listing coordinated when sales leave Greece, with one person owning the deadlines." },
    { index: "04", title: "Deadline watch and advice", description: "Upcoming AADE dates stay on a calendar, and tax questions are answered before they become a late return." },
  ],
  processTitle: "Move tax filings to KRS in three clear steps.", processDescription: "Changing who files takes a review of open returns first. KRS protects the next deadline while the tax position comes across.",
  process: [
    { title: "Free initial consultation", description: "Tell us how the company trades and which returns are open. We review the fit and send a clear, no-obligation proposal.", image: "/images/krs-switch-consultation.jpg", imageAlt: "A KRS tax consultation shown on a modern smartphone" },
    { title: "A clear working plan", description: "Once you choose KRS, we confirm authorisations, open AADE deadlines and the records needed before the next filing.", image: "/images/krs-switch-transfer.jpg", imageAlt: "Tax records moving into the KRS file" },
    { title: "Your first filing rhythm", description: "Meet the advisor responsible for the file, and see the next VAT return and income-tax date with a named owner.", image: "/images/krs-switch-first-close.jpg", imageAlt: "A KRS tax calendar ready for the next filing" },
  ],
  advisorImage: "/images/krs-expert-tax-advisor.webp", advisorImageAlt: "KRS tax advisory specialist", testimonialEyebrow: "Tax perspectives", testimonialTitle: "What a watched tax calendar changes first.",
  testimonials: [
    { quote: "The VAT return stopped arriving as a surprise. We can see the period, what is still open, and who files it.", role: "Composite of common operator feedback" },
    { quote: "The income tax conversation started from the closed books, not from a pile of questions in June.", role: "Composite of common founder feedback" },
    { quote: "When we started selling in the EU, the OSS and listing deadlines had an owner before the first invoice went out.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Tax questions worth asking before a deadline.", faqDescription: "The first conversation is free and looks at open returns, how you trade, and the next AADE date.",
  faqs: [
    { question: "Are VAT and income tax filings included?", answer: "Periodic VAT returns and the annual income tax filing, including the E3, are part of the tax work we agree. Specialist matters such as an AADE audit, a restructuring, or a one-off ruling are scoped separately and confirmed in writing before that work starts." },
    { question: "What happens if a deadline is already close?", answer: "We start with the next AADE date. If KRS is taking over the filings, we map what can still be submitted on time and what needs a separate catch-up, so a late return is not discovered after the fact." },
    { question: "Can KRS handle EU and cross-border VAT?", answer: "Yes. We coordinate Greek VAT, the OSS return where you sell to consumers in other EU countries, and the intra-EU listing for B2B sales. Obligations outside that scope are confirmed before work begins." },
    { question: "Can I speak directly with a tax advisor?", answer: "Yes. You message the advisor responsible for the file. They already have the books, the open returns and the prior answers, so the conversation does not start from zero." },
    { question: "Do you only file returns, or also advise?", answer: "Both. Filings are prepared and submitted, and the same advisor flags VAT treatment, deductibility and cross-border questions during the year, before they are locked into a return." },
  ],
  finalTitle: "Keep VAT and income tax on a calendar someone owns.", finalDescription: "One advisor, the next AADE date in view, and a tax position that is reviewed before the return is due.",
} as const satisfies ServicePageData;

export const payrollPage = {
  slug: "payroll", eyebrow: "Services / Payroll accounting", title: "Payroll that keeps people and obligations in step.", description: "KRS coordinates payroll administration, ERGANI workflows and employee changes with the care that people operations require.",
  heroImage: "/images/krs-hero-payroll.jpg", heroImageAlt: "KRS payroll advisor reviewing employee information with a business team", heroKicker: "Employees / payroll / EFKA / ERGANI", exploreLabel: "Explore payroll",
  featuresTitle: "Payroll is a people process, not just a monthly calculation.", features: [
    { title: "Employee changes stay visible", description: "New hires, changes, departures and absences move through a defined working flow with clear ownership." },
    { title: "Deadlines that do not depend on memory", description: "KRS keeps the payroll run, EFKA checks and ERGANI notices connected to the employee record and calendar." },
    { title: "Answers when the situation is sensitive", description: "Payroll specialists help your team navigate practical questions with the right level of care and compliance review." },
  ],
  ctaTitle: "Your payroll process should feel controlled before the deadline arrives.", ctaDescription: "Show us the employee setup, timing and recurring pressure points. We will map a clear payroll working rhythm.",
  benefitsTitle: "One controlled record for each employment moment.", benefitsDescription: "KRS helps your team move from hiring to monthly payroll and employment changes with a visible, accountable process.", benefitsImage: "/images/krs-payroll-vignette.jpg", benefitsImageAlt: "A payroll run reviewed with employee information and deadlines",
  benefits: [
    { index: "01", title: "Payroll administration", description: "Prepare payroll runs, payslips and the recurring data needed to pay people accurately and on time." },
    { index: "02", title: "ERGANI coordination", description: "Coordinate employment notices and record changes so each action has a clear owner and deadline." },
    { index: "03", title: "Employer obligations", description: "Keep EFKA and related employer obligations visible alongside the information your team needs to provide." },
    { index: "04", title: "Employee lifecycle support", description: "Create a dependable path for hiring, changes and departures without losing the underlying record." },
  ],
  processTitle: "Bring payroll to KRS in three clear steps.", processDescription: "KRS reviews the employee setup, protects the next payroll date and builds the practical workflow around your team.", process: onboardingProcess,
  advisorImage: "/images/krs-expert-payroll-advisor.webp", advisorImageAlt: "KRS payroll specialist", testimonialEyebrow: "Payroll perspectives", testimonialTitle: "What a calmer payroll process changes.",
  testimonials: [
    { quote: "We have a clear place to send every employee change, and we know what needs confirming before payroll starts.", role: "Composite of common operator feedback" },
    { quote: "The questions arrive early enough to resolve them properly instead of on the final day.", role: "Composite of common people-team feedback" },
    { quote: "We can speak to someone who understands both the employee context and the payroll deadline.", role: "Composite of common founder feedback" },
  ],
  faqTitle: "Payroll questions worth clarifying early.", faqDescription: "The first conversation focuses on your people, pay cycle and employment workflows so the proposed service reflects how the team operates.",
  faqs: [
    { question: "What does KRS handle for payroll?", answer: "The agreed scope can include payroll processing, payslips, employer obligations, ERGANI coordination and support for employee changes. We confirm responsibilities before each working cycle begins." },
    { question: "Can KRS take over payroll from another provider?", answer: "Yes. We review the employee records, next deadline and outstanding items, then plan the handover so the payroll run remains protected." },
    { question: "Can you help with new hires and departures?", answer: "Yes. KRS can coordinate the payroll and ERGANI steps around employee changes, while your team supplies the employment details and approvals required." },
    { question: "How is payroll pricing calculated?", answer: "Payroll administration starts from a per-employee monthly fee. The final scope reflects the number of employees, pay patterns and employment coordination required." },
  ],
  finalTitle: "Give payroll a reliable operating rhythm.", finalDescription: "Bring together the employee information, dates and advisor support your team needs to make each payroll run feel controlled.",
} as const satisfies ServicePageData;

export const consultingPage = {
  slug: "consulting", eyebrow: "Services / Consulting services", title: "Business advice that moves the plan into action.", description: "KRS helps founders and leadership teams turn financial context, operating questions and growth plans into a focused next step.",
  heroImage: "/images/krs-consulting-advisor.png", heroImageAlt: "KRS business advisor discussing a growth plan with a founder in Athens", heroKicker: "Planning / growth / finance / decisions", exploreLabel: "Explore consulting",
  featuresTitle: "A practical point of view for the decisions ahead.", features: [
    { title: "Plans grounded in the numbers", description: "Use financial information, assumptions and operating constraints to make the business plan more useful to the people running it." },
    { title: "A clearer next decision", description: "KRS helps separate the urgent question from the important one, then builds a realistic path around ownership and timing." },
    { title: "Advice connected to delivery", description: "The recommendation stays close to the accounting, tax and operational work that will make it real." },
  ],
  ctaTitle: "A useful business plan needs a clear next action, not just a polished document.", ctaDescription: "Bring the plan, opportunity or operating question. We will help identify the work that needs to happen next.",
  benefitsTitle: "A more usable view of the business you are building.", benefitsDescription: "KRS brings financial context and practical implementation into the conversations that shape your next stage of growth.", benefitsImage: "/images/krs-tax-advisory-focused.jpg", benefitsImageAlt: "KRS advisor reviewing a focused business decision",
  benefits: [
    { index: "01", title: "Business planning", description: "Translate the goals, assumptions and financial requirements behind a plan into an operating view your team can use." },
    { index: "02", title: "Financial modelling", description: "Test costs, revenue drivers, cash needs and scenarios before a decision depends on an overly simple forecast." },
    { index: "03", title: "Growth decisions", description: "Evaluate the financial and operational implications of a new market, hire, investment or change in direction." },
    { index: "04", title: "Management support", description: "Create a more useful rhythm for reviewing performance, risks and choices that deserve leadership attention." },
  ],
  processTitle: "Start a business advisory project in three clear steps.", processDescription: "KRS begins with the decision in front of you, aligns the facts and people, then agrees the practical work plan.", process: onboardingProcess,
  advisorImage: "/images/krs-consulting-advisor.png", advisorImageAlt: "KRS consulting advisor in conversation with a founder", testimonialEyebrow: "Consulting perspectives", testimonialTitle: "What focused business advice creates.",
  testimonials: [
    { quote: "The plan became more useful once we tied ambition to the numbers, decisions and owners needed to deliver it.", role: "Composite of common founder feedback" },
    { quote: "We left with a practical sequence, not a longer list of things to consider.", role: "Composite of common operator feedback" },
    { quote: "The financial view gave leadership a shared basis for the decision instead of competing assumptions.", role: "Composite of common leadership-team feedback" },
  ],
  faqTitle: "Consulting questions worth discussing early.", faqDescription: "The first conversation is about the decision, timing and business context, so KRS can suggest a focused scope rather than a generic engagement.",
  faqs: [
    { question: "What kinds of consulting services does KRS offer?", answer: "KRS supports business planning, financial modelling, growth decisions, management reporting and operational finance questions. We shape the work around the decision your team needs to make." },
    { question: "Can you help us prepare a business plan?", answer: "Yes. KRS can help structure the assumptions, financial story, operating plan and evidence that make a business plan useful for management, investors or funders." },
    { question: "Will consulting connect to our accounting information?", answer: "Yes. Where useful, KRS connects the advisory work to your accounting and operating information, so recommendations are grounded in current business reality." },
    { question: "How long does a consulting project take?", answer: "Timing depends on the decision, data available and people involved. We agree the milestones, owners and expected outputs before work begins." },
  ],
  finalTitle: "Turn the next business decision into a workable plan.", finalDescription: "Bring KRS into the conversation with the financial context and practical support needed to move from intent to action.",
} as const satisfies ServicePageData;

export const fundingGrantsPage = {
  slug: "funding-grants", eyebrow: "Services / Funding and grants", title: "Funding support that starts with the right opportunity.", description: "KRS helps Greek businesses identify relevant funding routes, prepare a stronger case and manage the financial work around an application.",
  heroImage: "/images/krs-funding-advisor.png", heroImageAlt: "KRS funding advisor and founder reviewing a grant application in Athens", heroKicker: "Opportunities / applications / budgets / reporting", exploreLabel: "Explore funding and grants",
  featuresTitle: "A funding process with more structure from the first search.", features: [
    { title: "Find the relevant route", description: "KRS helps assess opportunities against your business, project, timing and eligibility rather than applying without a fit." },
    { title: "Build a more credible case", description: "Bring the business narrative, budget and supporting records together in a way that helps the application stand up to review." },
    { title: "Keep obligations visible", description: "Once funded, the financial and reporting work stays connected to the project requirements and owners." },
  ],
  ctaTitle: "The right funding opportunity is only useful when the business is ready to carry it through.", ctaDescription: "Share the project, investment or growth plan. We will help identify the useful route and the work needed to pursue it.",
  benefitsTitle: "A clearer route from opportunity to funded project.", benefitsDescription: "KRS connects the grant search, application, financial case and reporting commitments around one accountable project plan.", benefitsImage: "/images/krs-hero-awards.jpg", benefitsImageAlt: "Business funding and recognition material prepared for review",
  benefits: [
    { index: "01", title: "Funding review", description: "Assess local and European programmes against the project, eligibility requirements and timing that matter to your business." },
    { index: "02", title: "Application preparation", description: "Coordinate the financial information, business case and supporting material required to present a complete application." },
    { index: "03", title: "Budget and co-financing", description: "Build a realistic financial view of the project, including costs, funding assumptions and business contribution." },
    { index: "04", title: "Grant reporting", description: "Keep spending records, deliverables and reporting obligations organised after approval so the project remains manageable." },
  ],
  processTitle: "Pursue funding with KRS in three clear steps.", processDescription: "KRS begins with the project and eligibility, confirms the application route, then creates a practical plan for the work ahead.", process: onboardingProcess,
  advisorImage: "/images/krs-funding-advisor.png", advisorImageAlt: "KRS funding advisor reviewing an application with a founder", testimonialEyebrow: "Funding perspectives", testimonialTitle: "What a more structured funding process changes.",
  testimonials: [
    { quote: "We focused on the opportunity that actually matched the project we could deliver.", role: "Composite of common founder feedback" },
    { quote: "The application had a stronger financial story because the budget, evidence and operating plan were built together.", role: "Composite of common operator feedback" },
    { quote: "The reporting work did not become a separate scramble because the project records were already organised.", role: "Composite of common finance-team feedback" },
  ],
  faqTitle: "Funding questions worth asking before you apply.", faqDescription: "The first conversation looks at the project, funding need and business readiness so KRS can recommend a realistic route instead of a broad search.",
  faqs: [
    { question: "Can KRS help us find relevant grants?", answer: "Yes. KRS can help assess available local and European funding opportunities against your project, business profile, eligibility and timing." },
    { question: "Do you prepare the full application?", answer: "The scope can include application coordination, financial information, budgets and supporting material. We confirm responsibilities and specialist inputs before work begins." },
    { question: "Can you help if we have already identified a programme?", answer: "Yes. We can review the programme requirements, project case and financial work needed to decide whether the opportunity is a good fit." },
    { question: "What happens after a grant is approved?", answer: "KRS can help set up the financial recordkeeping, budget tracking and reporting process needed to support the funded project and its obligations." },
  ],
  finalTitle: "Give the right funding opportunity a stronger foundation.", finalDescription: "Connect the project, financial case and reporting plan before an application turns into another unmanaged workstream.",
} as const satisfies ServicePageData;
