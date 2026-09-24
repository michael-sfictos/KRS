"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Check, Mail, Minus, Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const inputClassName =
  "mt-2 h-12 w-full border border-primary/20 bg-transparent px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/65 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18";

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "inputs", label: "Inputs" },
  { id: "choice", label: "Choice controls" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "cards", label: "Cards" },
  { id: "separator", label: "Separator" },
  { id: "sheet", label: "Sheet" },
  { id: "alerts", label: "Alerts" },
] as const;

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;
const buttonSizes = ["xs", "sm", "default", "lg"] as const;
const badgeVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;

export function ComponentGallery() {
  const [singleChoice, setSingleChoice] = useState("IKE / EPE");
  const [multiChoice, setMultiChoice] = useState<string[]>(["Tax advisory"]);
  const [documents, setDocuments] = useState(20);
  const [privacy, setPrivacy] = useState(false);
  const [selectValue, setSelectValue] = useState("en");

  return (
    <div className="bg-[#FDF8F0]">
      <section className="border-b border-primary/12">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-12">
          <p className="mono-label text-secondary">Living index</p>
          <h1 className="mt-5 max-w-4xl text-balance text-[54px] leading-[0.94] sm:text-7xl lg:text-[88px]">
            Browse the components already in production.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Each example below is the real primitive from the UI kit, or the form pattern used on
            onboarding and pricing. Click, type, and open them the way a page would.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-12 lg:py-16">
        <aside className="hidden lg:block">
          <nav aria-label="Component sections" className="sticky top-36 grid gap-1">
            {sections.map((section) => (
              <a
                className="px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-primary/5 hover:text-foreground"
                href={`#${section.id}`}
                key={section.id}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="grid gap-16">
          <GallerySection
            description="shadcn Button with the site CTA override: h-12 rounded-full px-6. Marketing pages almost always use the pill treatment."
            file="src/components/ui/button.tsx"
            id="buttons"
            title="Buttons"
          >
            <div className="grid gap-8">
              <div>
                <p className="mb-4 text-sm font-semibold">Variants</p>
                <div className="flex flex-wrap gap-3">
                  {buttonVariants.map((variant) => (
                    <Button key={variant} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  {buttonSizes.map((size) => (
                    <Button key={size} size={size}>
                      {size}
                    </Button>
                  ))}
                  <Button size="icon" aria-label="Mail">
                    <Mail className="size-4" strokeWidth={1.75} />
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold">Site CTAs</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="h-12 rounded-full px-6 shadow-[var(--shadow-md)]" variant="secondary">
                    Book a consultation
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Button>
                  <Button className="h-12 rounded-full border-primary/20 bg-transparent px-6" variant="outline">
                    Talk to an advisor
                  </Button>
                  <Button className="h-10 rounded-full px-5 shadow-sm">
                    Contact
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </Button>
                  <Button disabled className="h-12 rounded-full px-6">
                    Submitting
                  </Button>
                </div>
              </div>
            </div>
          </GallerySection>

          <GallerySection
            description="Compact status labels. The site often overrides to rounded-full with gold or navy fills."
            file="src/components/ui/badge.tsx"
            id="badges"
            title="Badges"
          >
            <div className="flex flex-wrap items-center gap-3">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
              <Badge className="rounded-full bg-secondary text-secondary-foreground" variant="secondary">
                Most chosen
              </Badge>
              <Badge className="h-7 rounded-full bg-primary px-3 text-primary-foreground">Connection layer</Badge>
            </div>
          </GallerySection>

          <GallerySection
            description="Native fields styled to match onboarding. Label sits above the control. Error text sits below. Placeholders are never used as labels."
            file="src/components/onboarding-flow.tsx"
            id="inputs"
            title="Inputs"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="text-sm font-semibold" htmlFor="gallery-name">
                Full name
                <input className={inputClassName} id="gallery-name" placeholder="Maria Papadopoulou" type="text" />
              </label>
              <label className="text-sm font-semibold" htmlFor="gallery-email">
                Work email
                <input
                  className={inputClassName}
                  id="gallery-email"
                  placeholder="you@company.com"
                  type="email"
                />
              </label>
              <div>
                <label className="text-sm font-semibold" htmlFor="gallery-error">
                  Company
                  <input
                    aria-describedby="gallery-error-message"
                    aria-invalid
                    className={cn(inputClassName, "border-destructive/50")}
                    defaultValue="K"
                    id="gallery-error"
                    type="text"
                  />
                </label>
                <span className="mt-2 block text-xs font-medium leading-5 text-destructive" id="gallery-error-message" role="alert">
                  Please enter your company name.
                </span>
              </div>
              <label className="text-sm font-semibold" htmlFor="gallery-language">
                Language
                <select
                  className={cn(inputClassName, "appearance-none")}
                  id="gallery-language"
                  onChange={(event) => setSelectValue(event.target.value)}
                  value={selectValue}
                >
                  <option value="en">English</option>
                  <option value="el">Greek</option>
                  <option value="he">Hebrew</option>
                </select>
              </label>
              <label className="text-sm font-semibold md:col-span-2" htmlFor="gallery-notes">
                Notes
                <textarea
                  className={cn(inputClassName, "h-28 resize-none py-3 leading-6")}
                  id="gallery-notes"
                  placeholder="A deadline, current challenge, or question you want us to prepare for."
                />
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-foreground">
                <input
                  checked={privacy}
                  className="mt-1 size-4 shrink-0 accent-[#AE882F]"
                  name="privacy"
                  onChange={(event) => setPrivacy(event.target.checked)}
                  type="checkbox"
                />
                <span>I agree that KRS may contact me about this consultation request.</span>
              </label>
            </div>
          </GallerySection>

          <GallerySection
            description="Pressed choice tiles from the calculator and onboarding. Single-select fills navy. Multi-select fills gold at 12%."
            file="src/components/pricing-calculator.tsx"
            id="choice"
            title="Choice controls"
          >
            <div className="grid gap-8">
              <fieldset>
                <legend className="text-sm font-semibold">Business structure</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">
                  {["Sole trader", "IKE / EPE", "AE", "Custom"].map((option) => {
                    const selected = singleChoice === option;
                    return (
                      <button
                        aria-pressed={selected}
                        className={cn(
                          "min-h-12 border px-4 text-left text-sm font-semibold transition",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-primary/15 bg-card text-foreground hover:border-primary/42"
                        )}
                        key={option}
                        onClick={() => setSingleChoice(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold">Services</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {["Tax advisory", "Accounting and myDATA", "Payroll", "Funding and grants"].map((option) => {
                    const selected = multiChoice.includes(option);
                    return (
                      <button
                        aria-pressed={selected}
                        className={cn(
                          "flex min-h-12 items-center justify-between gap-3 border border-primary/18 px-4 py-3 text-left text-sm font-semibold text-primary transition hover:border-primary/42 hover:bg-primary/4",
                          selected && "border-secondary bg-secondary/12"
                        )}
                        key={option}
                        onClick={() =>
                          setMultiChoice((current) =>
                            current.includes(option)
                              ? current.filter((item) => item !== option)
                              : [...current, option]
                          )
                        }
                        type="button"
                      >
                        <span>{option}</span>
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center border border-primary/22",
                            selected && "border-secondary bg-secondary text-secondary-foreground"
                          )}
                        >
                          {selected ? <Check className="size-3.5" strokeWidth={2.25} /> : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex items-center justify-between gap-4 border border-primary/12 bg-background px-4 py-4">
                <div>
                  <p className="font-semibold text-foreground">Monthly documents</p>
                  <p className="mt-1 text-sm text-muted-foreground">Invoices, receipts, and bank movements</p>
                </div>
                <div className="flex shrink-0 items-center border border-primary/18 bg-background">
                  <button
                    aria-label="Decrease monthly documents"
                    className="grid size-9 place-items-center text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-35"
                    disabled={documents === 0}
                    onClick={() => setDocuments((value) => Math.max(0, value - 1))}
                    type="button"
                  >
                    <Minus className="size-4" strokeWidth={1.75} />
                  </button>
                  <span className="grid w-9 place-items-center text-sm font-semibold tabular-nums">{documents}</span>
                  <button
                    aria-label="Increase monthly documents"
                    className="grid size-9 place-items-center text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    onClick={() => setDocuments((value) => value + 1)}
                    type="button"
                  >
                    <Plus className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </GallerySection>

          <GallerySection
            description="Default pill tabs and the sharp service-page treatment used on the homepage."
            file="src/components/ui/tabs.tsx"
            id="tabs"
            title="Tabs"
          >
            <div className="grid gap-10">
              <Tabs defaultValue="advisory">
                <TabsList>
                  <TabsTrigger value="advisory">Tax advisory</TabsTrigger>
                  <TabsTrigger value="accounting">Accounting</TabsTrigger>
                  <TabsTrigger value="payroll">Payroll</TabsTrigger>
                </TabsList>
                <TabsContent className="mt-4 text-sm leading-6 text-muted-foreground" value="advisory">
                  Advisors review entity structure, VAT exposure, and owner decisions through one evidence trail.
                </TabsContent>
                <TabsContent className="mt-4 text-sm leading-6 text-muted-foreground" value="accounting">
                  Transactions are connected to documents and reviewed before they become management reports.
                </TabsContent>
                <TabsContent className="mt-4 text-sm leading-6 text-muted-foreground" value="payroll">
                  Payroll administration and ERGANI coordination sit next to the monthly close.
                </TabsContent>
              </Tabs>

              <Tabs defaultValue="advisory">
                <TabsList
                  className="grid h-auto w-full grid-cols-1 gap-px rounded-none border border-primary/15 bg-primary/15 p-0 group-data-horizontal/tabs:h-auto sm:grid-cols-3"
                  variant="default"
                >
                  {[
                    { value: "advisory", label: "Tax Advisory" },
                    { value: "accounting", label: "Accounting" },
                    { value: "payroll", label: "Payroll" },
                  ].map((tab, index) => (
                    <TabsTrigger
                      className="h-auto min-h-16 justify-start rounded-none bg-background px-4 py-4 text-left text-sm font-semibold leading-tight whitespace-normal data-active:bg-primary data-active:text-primary-foreground"
                      key={tab.value}
                      value={tab.value}
                    >
                      <span className="mr-3 font-mono text-xs text-secondary">0{index + 1}</span>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent className="mt-4 border border-primary/12 bg-background p-5 text-sm leading-6" value="advisory">
                  Tax advisory for decisions before they become filings.
                </TabsContent>
                <TabsContent className="mt-4 border border-primary/12 bg-background p-5 text-sm leading-6" value="accounting">
                  Accounting that closes the month with less friction.
                </TabsContent>
                <TabsContent className="mt-4 border border-primary/12 bg-background p-5 text-sm leading-6" value="payroll">
                  Payroll that stays aligned with ERGANI and the monthly file.
                </TabsContent>
              </Tabs>
            </div>
          </GallerySection>

          <GallerySection
            description="Used for FAQs on the homepage and pricing page. Keep answers short and operational."
            file="src/components/ui/accordion.tsx"
            id="accordion"
            title="Accordion"
          >
            <Accordion className="border border-primary/12 bg-background px-5" collapsible defaultValue="one" type="single">
              <AccordionItem value="one">
                <AccordionTrigger>Are the listed prices monthly fees?</AccordionTrigger>
                <AccordionContent>
                  Yes. The plan prices are monthly starting fees for ongoing accounting support. They exclude VAT.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="two">
                <AccordionTrigger>How is payroll priced?</AccordionTrigger>
                <AccordionContent>
                  Payroll administration and ERGANI coordination start at €14 per employee per month.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="three">
                <AccordionTrigger>What happens if the business grows?</AccordionTrigger>
                <AccordionContent>
                  Your advisor explains the revised scope and fee before any change takes effect.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </GallerySection>

          <GallerySection
            description="Default shadcn card, plus the sharp bordered panel used across pricing and services."
            file="src/components/ui/card.tsx"
            id="cards"
            title="Cards"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Operating company</CardTitle>
                  <CardDescription>Recurring bookkeeping, VAT, and myDATA review.</CardDescription>
                  <CardAction>
                    <Badge variant="secondary">From €149</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  Monthly close with a visible evidence trail and a named KRS advisor.
                </CardContent>
                <CardFooter>
                  <Button className="rounded-full" size="sm">
                    Choose plan
                  </Button>
                </CardFooter>
              </Card>

              <div className="border border-primary/16 bg-background p-6 shadow-[var(--shadow-lg)]">
                <p className="mono-label text-secondary">Indicative monthly fee</p>
                <p className="mt-3 font-heading text-6xl leading-none tracking-tight">€149</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Starting fee for IKE / EPE, excluding VAT. Confirmed after scoping.
                </p>
                <Button className="mt-6 h-12 rounded-full px-6" variant="secondary">
                  Book a consultation
                </Button>
              </div>
            </div>
          </GallerySection>

          <GallerySection
            description="Hairline divider. The footer tints it to primary-foreground/10 on navy."
            file="src/components/ui/separator.tsx"
            id="separator"
            title="Separator"
          >
            <div className="grid gap-6">
              <div>
                <p className="text-sm font-semibold">Horizontal</p>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">Used between stacked content blocks.</p>
              </div>
              <div className="flex h-16 items-center gap-4">
                <p className="text-sm font-semibold">Vertical</p>
                <Separator orientation="vertical" />
                <p className="text-sm text-muted-foreground">Language selector in the header uses a similar split.</p>
              </div>
            </div>
          </GallerySection>

          <GallerySection
            description="Slide-over panel from the right. Overlay uses a light navy scrim and a short blur."
            file="src/components/ui/sheet.tsx"
            id="sheet"
            title="Sheet"
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button className="h-11 rounded-full px-5" variant="outline">
                  Open sheet
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Request a consultation</SheetTitle>
                  <SheetDescription>
                    Share a few essentials and we will match you with the right KRS advisor.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4">
                  <label className="text-sm font-semibold" htmlFor="sheet-email">
                    Work email
                    <input className={inputClassName} id="sheet-email" placeholder="you@company.com" type="email" />
                  </label>
                </div>
                <SheetFooter>
                  <Button className="h-11 rounded-full">Continue</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </GallerySection>

          <GallerySection
            description="Inline error treatment from onboarding. Keep alerts next to the action, not in a toast."
            file="src/components/onboarding-flow.tsx"
            id="alerts"
            title="Alerts"
          >
            <div className="grid gap-4">
              <div className="border border-destructive/28 bg-destructive/6 px-4 py-3 text-sm leading-6 text-destructive" role="alert">
                We could not send your request. Please try again, or email krs@krs.gr directly.
              </div>
              <p className="flex gap-2 text-xs leading-5 text-muted-foreground">
                <Check className="mt-0.5 size-3.5 shrink-0 text-secondary" strokeWidth={2} />
                No commitment. Your final scope and pricing will be confirmed before onboarding.
              </p>
            </div>
          </GallerySection>
        </div>
      </div>
    </div>
  );
}

function GallerySection({
  id,
  title,
  file,
  description,
  children,
}: {
  id: string;
  title: string;
  file: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-44" id={id}>
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] font-semibold tracking-wide text-muted-foreground">{file}</p>
        <h2 className="mt-3 text-4xl leading-none">{title}</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 border border-primary/12 bg-background p-5 sm:p-8">{children}</div>
    </section>
  );
}
