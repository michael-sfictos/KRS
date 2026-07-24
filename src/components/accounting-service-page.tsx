import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { accountingPage, serviceMenu } from "@/lib/service-pages";
import { cn } from "@/lib/utils";

const ctaLabel = "Talk to KRS";

export function AccountingServicePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Features />
      <InlineCta />
      <Benefits />
      <OurServices />
      <SwitchProcess />
      <AccountingTestimonials />
      <AccountingFaq />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="border-b border-primary/12 bg-[#fdf8f0]">
      <div className="mx-auto grid max-w-[1400px] lg:min-h-[620px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-18 lg:px-12 lg:py-20">
          <p className="mono-label text-secondary">Services / Accounting</p>
          <h1 className="hero-headline mt-7 max-w-[680px] text-balance text-5xl sm:text-6xl lg:text-7xl">
            {accountingPage.title}
          </h1>
          <p className="mt-7 max-w-[590px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {accountingPage.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-full px-6 text-sm">
              <Link href="/onboarding">
                {ctaLabel}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <Link
              className="inline-flex h-12 items-center gap-2 border-b border-primary/30 px-1 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href="#accounting-features"
            >
              Explore accounting
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden bg-primary sm:min-h-[520px] lg:min-h-full">
          <Image
            alt={accountingPage.heroImageAlt}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            src={accountingPage.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/82 via-primary/6 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-primary-foreground sm:p-8 lg:p-10">
            <p className="max-w-md font-mono text-xs font-semibold uppercase leading-5 tracking-[0.14em]">
              Formation / books / reporting / closure
            </p>
            <span className="font-mono text-xs text-primary-foreground/60">KRS / Athens</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="accounting-features">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl text-balance text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
          Accounting should leave more time for the business.
        </h2>
        <div className="mt-14 grid border-y border-primary/16 md:grid-cols-3">
          {accountingPage.features.map((feature, index) => (
            <article
              className="border-b border-primary/12 px-0 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              key={feature.title}
            >
              <span className="font-mono text-xs font-semibold text-secondary">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold leading-tight">{feature.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InlineCta() {
  return (
    <section className="border-y border-primary/12 bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight">
            {accountingPage.ctaTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-secondary-foreground/78">
            {accountingPage.ctaDescription}
          </p>
        </div>
        <Button
          asChild
          className="h-12 shrink-0 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/onboarding">
            {ctaLabel}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="max-w-xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
              {accountingPage.benefitsTitle}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/66">
              {accountingPage.benefitsDescription}
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-[#fdf8f0]">
            <Image
              alt="KRS accounting and financial reporting interface"
              className="object-contain p-4 sm:p-8"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/images/krs-tax-advisory-os-snapshot.webp"
            />
          </div>
        </div>

        <div className="mt-14 grid border-t border-primary-foreground/18 md:grid-cols-2">
          {accountingPage.benefits.map((benefit, index) => (
            <article
              className={cn(
                "border-b border-primary-foreground/16 py-8 md:px-8",
                index % 2 === 0 && "md:border-r md:pl-0",
                index % 2 === 1 && "md:pr-0"
              )}
              key={benefit.title}
            >
              <span className="font-mono text-xs font-semibold text-secondary">{benefit.index}</span>
              <h3 className="mt-7 text-2xl font-semibold leading-tight">{benefit.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/62">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurServices() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="mono-label text-secondary">Our services</p>
          <h2 className="mt-6 max-w-md text-balance text-4xl font-normal leading-tight sm:text-5xl">
            The KRS service team around your business.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            Accounting, tax, payroll and growth support stay connected as your business needs change.
          </p>
        </div>

        <div className="border-t border-primary/16">
          {serviceMenu.map((service) => (
            <Link
              aria-current={service.available ? "page" : undefined}
              className={cn(
                "group grid gap-4 border-b border-primary/14 py-7 transition hover:bg-primary/4 sm:grid-cols-[60px_0.65fr_1.35fr_24px] sm:items-start sm:px-4",
                service.available && "bg-primary text-primary-foreground hover:bg-primary"
              )}
              href={service.href}
              key={service.title}
            >
              <span className={cn("font-mono text-xs font-semibold text-secondary", service.available && "text-secondary")}>
                {service.index}
              </span>
              <h3 className="text-xl font-semibold leading-tight">{service.title}</h3>
              <p className={cn("text-sm leading-6 text-muted-foreground", service.available && "text-primary-foreground/62")}>
                {service.description}
              </p>
              <ArrowRight
                aria-hidden="true"
                className={cn(
                  "size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-secondary",
                  service.available && "text-primary-foreground/50"
                )}
                strokeWidth={1.75}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SwitchProcess() {
  return (
    <section className="border-y border-primary/12 bg-[#fdf8f0] px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
          {accountingPage.processTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {accountingPage.processDescription}
        </p>
        <ol className="mt-14 grid border-t border-primary/16 md:grid-cols-2 lg:grid-cols-4">
          {accountingPage.process.map((step, index) => (
            <li
              className="border-b border-primary/12 py-8 md:border-r md:px-6 md:first:pl-0 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              key={step.title}
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-secondary text-xs font-semibold text-secondary">
                {index + 1}
              </span>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AccountingTestimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden bg-primary lg:grid-cols-[0.4fr_0.6fr]">
        <div className="relative min-h-[480px]">
          <Image
            alt="KRS accounting specialist"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            src="/images/krs-expert-accounting-advisor.webp"
          />
        </div>

        <div className="p-8 text-primary-foreground sm:p-12 lg:p-14">
          <p className="mono-label text-secondary">Accounting perspectives</p>
          <h2 className="mt-6 max-w-2xl text-balance text-4xl font-normal leading-tight sm:text-5xl">
            What better accounting changes first.
          </h2>
          <div className="mt-10 border-t border-primary-foreground/18">
            {accountingPage.testimonials.map((testimonial, index) => (
              <figure className="border-b border-primary-foreground/16 py-7" key={testimonial.quote}>
                <div className="grid gap-4 sm:grid-cols-[42px_1fr]">
                  <span className="font-mono text-xs font-semibold text-secondary">0{index + 1}</span>
                  <div>
                    <blockquote className="text-balance text-xl font-semibold leading-snug sm:text-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-xs leading-5 text-primary-foreground/52">
                      {testimonial.role}
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-primary-foreground/44">
            Representative composite wording, not attributed to named customers.
          </p>
        </div>
      </div>
    </section>
  );
}

function AccountingFaq() {
  return (
    <section className="border-t border-primary/12 px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-normal leading-tight sm:text-5xl">Accounting questions worth asking early.</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            The first conversation is free and focused on understanding the facts before recommending a route.
          </p>
        </div>

        <Accordion className="border-t border-primary/16" collapsible type="single">
          {accountingPage.faqs.map((faq, index) => (
            <AccordionItem className="border-primary/14" key={faq.question} value={`accounting-faq-${index}`}>
              <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-7 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <span className="flex size-11 items-center justify-center rounded-full border border-secondary text-secondary">
          <Check className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="mt-8 max-w-5xl text-balance text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-7xl">
          {accountingPage.finalTitle}
        </h2>
        <div className="mt-9 flex flex-col gap-7 border-t border-primary-foreground/16 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base leading-7 text-primary-foreground/64">
            {accountingPage.finalDescription}
          </p>
          <Button
            asChild
            className="h-12 w-fit shrink-0 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/onboarding">
              {ctaLabel}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
