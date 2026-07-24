"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Mail, RotateCcw } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";

import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  workEmail: string;
  countryCode: string;
  phone: string;
  company: string;
  companyStage: string;
  teamSize: string;
  industry: string;
  payroll: string;
  services: string[];
  timeline: string;
  callWindow: string;
  notes: string;
  privacy: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "email" | "error";

const initialState: FormState = {
  fullName: "",
  workEmail: "",
  countryCode: "+30",
  phone: "",
  company: "",
  companyStage: "",
  teamSize: "",
  industry: "",
  payroll: "",
  services: [],
  timeline: "",
  callWindow: "",
  notes: "",
  privacy: false,
  website: "",
};

const countryCodes = [
  { code: "+30", label: "GR +30" },
  { code: "+357", label: "CY +357" },
  { code: "+1", label: "US/CA +1" },
  { code: "+44", label: "UK +44" },
  { code: "+49", label: "DE +49" },
  { code: "+33", label: "FR +33" },
  { code: "+39", label: "IT +39" },
  { code: "+34", label: "ES +34" },
  { code: "+31", label: "NL +31" },
  { code: "+32", label: "BE +32" },
  { code: "+41", label: "CH +41" },
  { code: "+43", label: "AT +43" },
  { code: "+351", label: "PT +351" },
  { code: "+353", label: "IE +353" },
  { code: "+46", label: "SE +46" },
  { code: "+47", label: "NO +47" },
  { code: "+45", label: "DK +45" },
  { code: "+358", label: "FI +358" },
  { code: "+48", label: "PL +48" },
  { code: "+40", label: "RO +40" },
  { code: "+359", label: "BG +359" },
  { code: "+355", label: "AL +355" },
  { code: "+90", label: "TR +90" },
  { code: "+971", label: "AE +971" },
  { code: "+61", label: "AU +61" },
  { code: "+64", label: "NZ +64" },
  { code: "+81", label: "JP +81" },
  { code: "+86", label: "CN +86" },
  { code: "+91", label: "IN +91" },
  { code: "+55", label: "BR +55" },
  { code: "+27", label: "ZA +27" },
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsOnly = (value: string) => value.replace(/\D/g, "");

const normalizeCountryCode = (value: string) => {
  const digits = digitsOnly(value).slice(0, 3);
  return digits ? `+${digits}` : "";
};

const formatPhoneForSubmit = (countryCode: string, phone: string) => {
  const national = digitsOnly(phone);
  if (!national) return "";
  const code = normalizeCountryCode(countryCode) || "+30";
  return `${code}${national}`;
};

const progressLabels = ["About you", "Your business", "Call preference"] as const;
const companyStages = ["Operating company", "Starting a company", "Switching advisor", "Group or holding"] as const;
const teamSizes = ["Just me", "2-10 people", "11-50 people", "51+ people"] as const;
const industries = [
  "Technology and SaaS",
  "Professional services",
  "Retail and e-commerce",
  "Hospitality and short-term rentals",
  "Construction and real estate",
  "Healthcare",
  "Creative and media",
  "Other",
] as const;
const payrollOptions = ["Yes", "Not yet", "Soon"] as const;
const serviceOptions = ["Tax advisory", "Accounting and myDATA", "Payroll", "Business advisory", "Funding and grants"] as const;
const timelineOptions = ["This week", "Within two weeks", "I am flexible"] as const;
const callWindows = ["Morning, 09:00-12:00", "Midday, 12:00-15:00", "Afternoon, 15:00-18:00"] as const;

const inputClassName =
  "mt-2 h-12 w-full border border-primary/20 bg-transparent px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/65 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18";

export function OnboardingFlow() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: FormErrors = {};

    if (currentStep === 0) {
      if (formData.fullName.trim().length < 2) nextErrors.fullName = "Please enter your name.";
      if (!emailPattern.test(formData.workEmail.trim())) {
        nextErrors.workEmail = "Please enter a valid work email.";
      }
      if (formData.company.trim().length < 2) nextErrors.company = "Please enter your company name.";
      const phoneDigits = digitsOnly(formData.phone);
      const countryDigits = digitsOnly(formData.countryCode);
      if (phoneDigits && !countryDigits) {
        nextErrors.phone = "Enter a country code, for example +30.";
      } else if (phoneDigits && (phoneDigits.length < 6 || phoneDigits.length > 15)) {
        nextErrors.phone = "Enter a valid phone number, or leave this field blank.";
      } else if (countryDigits && !phoneDigits) {
        nextErrors.phone = "Enter a phone number, or clear the country code.";
      }
    }

    if (currentStep === 1) {
      if (!formData.companyStage) nextErrors.companyStage = "Choose the option that best describes your company.";
      if (!formData.teamSize) nextErrors.teamSize = "Choose your current team size.";
      if (!formData.industry) nextErrors.industry = "Choose your industry.";
      if (!formData.payroll) nextErrors.payroll = "Let us know whether you currently run payroll.";
      if (formData.services.length === 0) nextErrors.services = "Choose at least one area where you need help.";
    }

    if (currentStep === 2) {
      if (!formData.timeline) nextErrors.timeline = "Choose a preferred timeframe.";
      if (!formData.callWindow) nextErrors.callWindow = "Choose the best part of the day for a call.";
      if (!formData.privacy) nextErrors.privacy = "Please confirm that KRS may contact you about this request.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveBack = () => {
    setDirection(-1);
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const openEmailFallback = () => {
    const phone = formatPhoneForSubmit(formData.countryCode, formData.phone);
    const body = [
      `Name: ${formData.fullName}`,
      `Work email: ${formData.workEmail.trim()}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${formData.company}`,
      `Company status: ${formData.companyStage}`,
      `Team size: ${formData.teamSize}`,
      `Industry: ${formData.industry}`,
      `Payroll: ${formData.payroll}`,
      `Help needed: ${formData.services.join(", ")}`,
      `Preferred timing: ${formData.timeline}`,
      `Preferred call window: ${formData.callWindow}`,
      `Additional context: ${formData.notes || "None"}`,
    ].join("\n");
    const mailto = `mailto:hello@krs.ai?subject=${encodeURIComponent(`Consultation request from ${formData.company}`)}&body=${encodeURIComponent(body)}`;

    setStatus("email");
    window.location.href = mailto;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(step)) return;

    if (step < 2) {
      setDirection(1);
      setStep((current) => current + 1);
      return;
    }

    setStatus("submitting");

    const payload = {
      ...formData,
      workEmail: formData.workEmail.trim().toLowerCase(),
      phone: formatPhoneForSubmit(formData.countryCode, formData.phone),
    };

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      if (response.status === 503) {
        openEmailFallback();
        return;
      }

      setStatus("error");
    } catch {
      openEmailFallback();
    }
  };

  if (status === "success" || status === "email") {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          {status === "success" ? <Check className="size-6" strokeWidth={2} /> : <Mail className="size-6" strokeWidth={1.75} />}
        </span>
        <p className="mono-label mt-8 text-secondary">Consultation request</p>
        <h2 className="mt-4 max-w-xl text-balance text-4xl font-medium leading-tight sm:text-5xl">
          {status === "success" ? "Your request is with KRS." : "One last click in your email app."}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {status === "success"
            ? "A KRS advisor will review your answers and confirm a suitable call time within one business day."
            : "Your answers are prepared in a new email. Send it and a KRS advisor will confirm a suitable call time."}
        </p>
        <div className="mt-9 flex flex-col gap-3 border-t border-primary/14 pt-7 sm:flex-row">
          {status === "email" && (
            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
              onClick={openEmailFallback}
              type="button"
            >
              Open prepared email
              <Mail className="size-4" strokeWidth={1.75} />
            </button>
          )}
          <Link
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/20 px-6 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
            href="/"
          >
            Return to KRS
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <ol aria-label="Consultation request progress" className="grid grid-cols-3 gap-3 border-b border-primary/14 pb-4">
        {progressLabels.map((label, index) => (
          <li
            aria-current={step === index ? "step" : undefined}
            className={cn(
              "text-xs font-semibold text-muted-foreground transition-colors sm:text-sm",
              index <= step && "text-primary"
            )}
            key={label}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/18 font-mono text-[0.62rem]",
                  index < step && "border-primary bg-primary text-primary-foreground",
                  index === step && "border-secondary bg-secondary text-secondary-foreground"
                )}
              >
                {index < step ? <Check className="size-3" strokeWidth={2.25} /> : index + 1}
              </span>
              <span className="leading-4">{label}</span>
            </span>
          </li>
        ))}
      </ol>

      <form className="mt-8" noValidate onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="absolute -left-[9999px]"
          name="website"
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          type="text"
          value={formData.website}
        />

        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            custom={direction}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? -22 : 22 }}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction > 0 ? 22 : -22 }}
            key={step}
            transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div>
                <p className="mono-label text-secondary">A few essentials</p>
                <h2 className="mt-4 text-balance text-3xl font-medium leading-tight sm:text-4xl" ref={headingRef} tabIndex={-1}>
                  Let&apos;s make the first call useful.
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  We use these details to match you with the right advisor and reply personally.
                </p>

                <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <TextField
                    autoComplete="name"
                    error={errors.fullName}
                    label="Your name"
                    name="fullName"
                    onChange={(value) => updateField("fullName", value)}
                    placeholder="Full name"
                    value={formData.fullName}
                  />
                  <TextField
                    autoComplete="organization"
                    error={errors.company}
                    label="Company"
                    name="company"
                    onChange={(value) => updateField("company", value)}
                    placeholder="Company name"
                    value={formData.company}
                  />
                  <EmailField
                    error={errors.workEmail}
                    label="Work email"
                    name="workEmail"
                    onBlur={(value) => updateField("workEmail", value.trim().toLowerCase())}
                    onChange={(value) => updateField("workEmail", value.replace(/\s/g, ""))}
                    value={formData.workEmail}
                  />
                  <PhoneField
                    countryCode={formData.countryCode}
                    error={errors.phone}
                    label="Phone (optional)"
                    onCountryCodeChange={(value) => updateField("countryCode", value)}
                    onPhoneChange={(value) => updateField("phone", digitsOnly(value))}
                    phone={formData.phone}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="mono-label text-secondary">Your business</p>
                <h2 className="mt-4 text-balance text-3xl font-medium leading-tight sm:text-4xl" ref={headingRef} tabIndex={-1}>
                  Give us the shape of your business.
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  A quick profile helps us bring the right tax, accounting, or payroll context to the call.
                </p>

                <div className="mt-8 grid gap-7">
                  <OptionGroup
                    error={errors.companyStage}
                    label="Where are you today?"
                    onSelect={(value) => updateField("companyStage", value)}
                    options={companyStages}
                    value={formData.companyStage}
                  />
                  <OptionGroup
                    error={errors.teamSize}
                    label="How large is the team?"
                    onSelect={(value) => updateField("teamSize", value)}
                    options={teamSizes}
                    value={formData.teamSize}
                  />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-sm font-semibold" htmlFor="industry">
                      Industry
                      <select
                        aria-invalid={Boolean(errors.industry)}
                        className={cn(inputClassName, "appearance-none")}
                        id="industry"
                        onChange={(event) => updateField("industry", event.target.value)}
                        value={formData.industry}
                      >
                        <option value="">Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                      {errors.industry && <FieldError>{errors.industry}</FieldError>}
                    </label>
                    <OptionGroup
                      columns="grid-cols-3"
                      error={errors.payroll}
                      label="Do you run payroll?"
                      onSelect={(value) => updateField("payroll", value)}
                      options={payrollOptions}
                      value={formData.payroll}
                    />
                  </div>

                  <MultiOptionGroup
                    error={errors.services}
                    label="What should we help with?"
                    onToggle={(value) => {
                      const services = formData.services.includes(value)
                        ? formData.services.filter((service) => service !== value)
                        : [...formData.services, value];
                      updateField("services", services);
                    }}
                    options={serviceOptions}
                    values={formData.services}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="mono-label text-secondary">Call preference</p>
                <h2 className="mt-4 text-balance text-3xl font-medium leading-tight sm:text-4xl" ref={headingRef} tabIndex={-1}>
                  When should we talk?
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  Choose a general window. A KRS advisor will confirm the exact time by email within one business day.
                </p>

                <div className="mt-8 grid gap-7">
                  <OptionGroup
                    columns="sm:grid-cols-3"
                    error={errors.timeline}
                    label="Preferred timeframe"
                    onSelect={(value) => updateField("timeline", value)}
                    options={timelineOptions}
                    value={formData.timeline}
                  />
                  <OptionGroup
                    columns="sm:grid-cols-3"
                    error={errors.callWindow}
                    label="Best part of the day (Athens time)"
                    onSelect={(value) => updateField("callWindow", value)}
                    options={callWindows}
                    value={formData.callWindow}
                  />

                  <label className="text-sm font-semibold" htmlFor="notes">
                    Anything we should know before the call? (optional)
                    <textarea
                      className={cn(inputClassName, "h-28 resize-none py-3 leading-6")}
                      id="notes"
                      maxLength={1000}
                      onChange={(event) => updateField("notes", event.target.value)}
                      placeholder="A deadline, current challenge, or question you want us to prepare for."
                      value={formData.notes}
                    />
                  </label>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <input
                        checked={formData.privacy}
                        className="mt-1 size-4 shrink-0 accent-[#AE882F]"
                        onChange={(event) => updateField("privacy", event.target.checked)}
                        type="checkbox"
                      />
                      <span>I agree that KRS may contact me about this consultation request.</span>
                    </label>
                    {errors.privacy && <FieldError>{errors.privacy}</FieldError>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex items-center justify-between gap-4 border-t border-primary/14 pt-6">
          {step > 0 ? (
            <button
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px sm:px-4"
              onClick={moveBack}
              type="button"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              Back
            </button>
          ) : (
            <span />
          )}

          <button
            className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px disabled:cursor-wait disabled:opacity-65"
            disabled={status === "submitting"}
            type="submit"
          >
            {status === "submitting" ? (
              <>
                Sending
                <RotateCcw className="size-4 animate-spin" strokeWidth={1.75} />
              </>
            ) : step === 2 ? (
              <>
                Request my consultation
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </>
            )}
          </button>
        </div>

        {status === "error" && (
          <div className="mt-5 border border-destructive/28 bg-destructive/6 px-4 py-3 text-sm leading-6 text-destructive" role="alert">
            We could not send your request. Please try again, or email hello@krs.ai directly.
          </div>
        )}
      </form>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text";
  autoComplete?: string;
}) {
  return (
    <label className="text-sm font-semibold" htmlFor={name}>
      {label}
      <input
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={inputClassName}
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function EmailField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}) {
  const errorId = `${name}-error`;

  return (
    <label className="text-sm font-semibold" htmlFor={name}>
      {label}
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoCapitalize="off"
        autoComplete="email"
        autoCorrect="off"
        className={inputClassName}
        enterKeyHint="next"
        id={name}
        inputMode="email"
        maxLength={254}
        name={name}
        onBlur={(event) => onBlur(event.target.value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder="you@company.com"
        spellCheck={false}
        type="email"
        value={value}
      />
      {error && (
        <FieldError id={errorId}>{error}</FieldError>
      )}
    </label>
  );
}

function PhoneField({
  label,
  countryCode,
  phone,
  error,
  onCountryCodeChange,
  onPhoneChange,
}: {
  label: string;
  countryCode: string;
  phone: string;
  error?: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}) {
  const errorId = "phone-error";
  const listboxId = useId();
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredCountries = countryCodes.filter((country) => {
    const query = countryCode.replace("+", "").trim();
    if (!query) return true;
    return country.code.includes(query) || country.label.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!comboboxRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const selectCountry = (code: string) => {
    setActiveIndex(0);
    onCountryCodeChange(code);
    setIsOpen(false);
  };

  const handleCountryKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
      "Enter",
      "Escape",
      "ArrowUp",
      "ArrowDown",
    ];

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setActiveIndex((current) => Math.min(current + 1, Math.max(filteredCountries.length - 1, 0)));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && isOpen && filteredCountries[activeIndex]) {
      event.preventDefault();
      selectCountry(filteredCountries[activeIndex].code);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (allowedKeys.includes(event.key) || event.metaKey || event.ctrlKey) return;
    if (event.key === "+" && event.currentTarget.selectionStart === 0) return;
    if (!/^\d$/.test(event.key)) event.preventDefault();
  };

  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 flex">
        <label className="sr-only" htmlFor="countryCode">
          Country code
        </label>
        <div className="relative shrink-0" ref={comboboxRef}>
          <div className="flex">
            <input
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-label="Country code"
              autoComplete="tel-country-code"
              className="h-12 w-[4.75rem] border border-r-0 border-primary/20 bg-transparent px-3 text-sm font-semibold text-foreground outline-none transition placeholder:text-muted-foreground/65 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18"
              id="countryCode"
              inputMode="tel"
              maxLength={4}
              name="countryCode"
              onBlur={(event) => {
                const relatedTarget = event.relatedTarget as Node | null;
                if (comboboxRef.current?.contains(relatedTarget)) return;
                const normalized = normalizeCountryCode(event.target.value);
                onCountryCodeChange(normalized || "+30");
                setIsOpen(false);
              }}
              onChange={(event) => {
                setActiveIndex(0);
                const next = event.target.value;
                setIsOpen(true);
                if (next === "" || next === "+") {
                  onCountryCodeChange(next === "+" ? "+" : "");
                  return;
                }
                onCountryCodeChange(normalizeCountryCode(next));
              }}
              onFocus={() => {
                setActiveIndex(0);
                setIsOpen(true);
              }}
              onKeyDown={handleCountryKeyDown}
              onPaste={(event) => {
                event.preventDefault();
                setActiveIndex(0);
                setIsOpen(true);
                onCountryCodeChange(normalizeCountryCode(event.clipboardData.getData("text")));
              }}
              placeholder="+30"
              role="combobox"
              spellCheck={false}
              type="tel"
              value={countryCode}
            />
            <button
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-label="Browse country codes"
              className="flex h-12 w-9 items-center justify-center border border-r-0 border-primary/20 bg-transparent text-muted-foreground outline-none transition hover:border-primary/38 hover:text-foreground focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18"
              onClick={() => setIsOpen((current) => !current)}
              tabIndex={-1}
              type="button"
            >
              <ChevronDown className={cn("size-3.5 transition", isOpen && "rotate-180")} strokeWidth={1.75} />
            </button>
          </div>

          {isOpen && filteredCountries.length > 0 && (
            <ul
              className="absolute left-0 top-full z-20 mt-1 max-h-56 w-[13.5rem] overflow-auto border border-primary/15 bg-[#FDF8F0] py-1 shadow-[var(--shadow-md)]"
              id={listboxId}
              role="listbox"
            >
              {filteredCountries.map((country, index) => {
                const selected = country.code === countryCode;
                const active = index === activeIndex;

                return (
                  <li key={country.code} role="option" aria-selected={selected}>
                    <button
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold text-foreground transition hover:bg-primary/6",
                        (active || selected) && "bg-primary/8"
                      )}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectCountry(country.code)}
                      type="button"
                    >
                      <span>{country.label}</span>
                      {selected && <Check className="size-3.5 text-secondary" strokeWidth={2.25} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          autoComplete="tel-national"
          className="h-12 w-full min-w-0 border border-primary/20 bg-transparent px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/65 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18"
          enterKeyHint="next"
          id="phone"
          inputMode="numeric"
          maxLength={15}
          name="phone"
          onChange={(event) => onPhoneChange(event.target.value)}
          onKeyDown={(event) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Tab",
              "Home",
              "End",
              "Enter",
            ];
            if (allowedKeys.includes(event.key) || event.metaKey || event.ctrlKey) return;
            if (!/^\d$/.test(event.key)) event.preventDefault();
          }}
          onPaste={(event) => {
            event.preventDefault();
            onPhoneChange(digitsOnly(event.clipboardData.getData("text")));
          }}
          pattern="[0-9]*"
          placeholder="6912345678"
          spellCheck={false}
          type="tel"
          value={phone}
        />
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onSelect,
  error,
  columns = "sm:grid-cols-2",
}: {
  label: string;
  options: readonly string[];
  value: string;
  onSelect: (value: string) => void;
  error?: string;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className={cn("mt-3 grid gap-2", columns)}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 border border-primary/18 px-4 py-3 text-left text-sm font-semibold text-primary transition hover:border-primary/42 hover:bg-primary/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px",
                selected && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
              key={option}
              onClick={() => onSelect(option)}
              type="button"
            >
              <span>{option}</span>
              {selected && <Check className="size-4 shrink-0 text-secondary" strokeWidth={2.25} />}
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

function MultiOptionGroup({
  label,
  options,
  values,
  onToggle,
  error,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 border border-primary/18 px-4 py-3 text-left text-sm font-semibold text-primary transition hover:border-primary/42 hover:bg-primary/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px",
                selected && "border-secondary bg-secondary/12"
              )}
              key={option}
              onClick={() => onToggle(option)}
              type="button"
            >
              <span>{option}</span>
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center border border-primary/22",
                  selected && "border-secondary bg-secondary text-secondary-foreground"
                )}
              >
                {selected && <Check className="size-3.5" strokeWidth={2.25} />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </fieldset>
  );
}

function FieldError({ children, id }: { children: string; id?: string }) {
  return (
    <span className="mt-2 block text-xs font-medium leading-5 text-destructive" id={id} role="alert">
      {children}
    </span>
  );
}
