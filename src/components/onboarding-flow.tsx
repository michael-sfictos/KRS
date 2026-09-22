"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  workEmail: string;
  phone: string;
  company: string;
  companyStage: string;
  teamSize: string;
  industry: string;
  payroll: string;
  services: string[];
  website: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  workEmail: "",
  phone: "",
  company: "",
  companyStage: "",
  teamSize: "",
  industry: "",
  payroll: "",
  services: [],
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsOnly = (value: string) => value.replace(/\D/g, "");

const formatPhoneForSubmit = (phone: string) => {
  const national = digitsOnly(phone);
  if (!national) return "";
  return `+30${national}`;
};

const progressLabels = ["About you", "Your business", "Pick a time"] as const;
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
const payrollOptions = ["Yes", "Not yet"] as const;
const serviceOptions = ["Tax advisory", "Accounting and myDATA", "Payroll", "Business advisory", "Funding and grants"] as const;

const bookingsPageUrl =
  "https://bookings.cloud.microsoft/book/MichaelSfictos@pgroup.gr/?ismsaljsauthenabled";

const fieldLabelClassName = "block text-sm font-semibold";
const fieldsetClassName = "m-0 min-w-0 border-0 p-0";

const inputClassName =
  "mt-2 h-12 w-full border border-primary/20 bg-transparent px-4 text-base font-normal text-foreground outline-none transition placeholder:font-normal placeholder:text-muted-foreground/55 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18";

const choiceControlClassName =
  "border border-primary/18 bg-transparent text-sm font-semibold text-primary transition hover:border-primary/42 hover:bg-primary/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

export function OnboardingFlow({
  compact = false,
  defaultServices,
}: {
  compact?: boolean;
  defaultServices?: readonly string[];
} = {}) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormState>(() =>
    defaultServices?.length ? { ...initialState, services: [...defaultServices] } : initialState,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadSent = useRef(false);

  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
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
      if (!phoneDigits) {
        nextErrors.phone = "Please enter your phone number.";
      } else if (phoneDigits.length < 6 || phoneDigits.length > 15) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    if (currentStep === 1) {
      if (!formData.companyStage) nextErrors.companyStage = "Choose the option that best describes your company.";
      if (!formData.teamSize) nextErrors.teamSize = "Choose your current team size.";
      if (!formData.industry) nextErrors.industry = "Choose your industry.";
      if (!formData.payroll) nextErrors.payroll = "Let us know whether you currently run payroll.";
      if (formData.services.length === 0) nextErrors.services = "Choose at least one area where you need help.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveBack = () => {
    setDirection(-1);
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const sendLead = () => {
    if (leadSent.current) return;
    leadSent.current = true;

    void fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        workEmail: formData.workEmail.trim().toLowerCase(),
        phone: formatPhoneForSubmit(formData.phone),
        booking: "microsoft_bookings",
      }),
    }).catch(() => {
      leadSent.current = false;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(step) || step >= 2) return;

    if (step === 1) sendLead();

    setDirection(1);
    setStep((current) => current + 1);
  };

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

      {step < 2 && (
      <form className={compact ? "mt-6" : "mt-8"} noValidate onSubmit={handleSubmit}>
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
                <h2
                  className={cn(
                    "mt-4 text-balance font-medium leading-tight",
                    compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
                  )}
                  ref={headingRef}
                  tabIndex={-1}
                >
                  Let&apos;s make the first call useful.
                </h2>
                <p
                  className={cn(
                    "mt-4 max-w-xl text-muted-foreground",
                    compact ? "text-sm leading-6" : "leading-7",
                  )}
                >
                  We use these details to match you with the right advisor and reply personally.
                </p>

                <div className={cn("grid gap-x-5 gap-y-6 sm:grid-cols-2", compact ? "mt-6" : "mt-8")}>
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
                    error={errors.phone}
                    onPhoneChange={(value) => updateField("phone", digitsOnly(value))}
                    phone={formData.phone}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="mono-label text-secondary">Your business</p>
                <h2
                  className={cn(
                    "mt-4 text-balance font-medium leading-tight",
                    compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
                  )}
                  ref={headingRef}
                  tabIndex={-1}
                >
                  Give us the shape of your business.
                </h2>
                <p
                  className={cn(
                    "mt-4 max-w-xl text-muted-foreground",
                    compact ? "text-sm leading-6" : "leading-7",
                  )}
                >
                  A quick profile helps us bring the right tax, accounting, or payroll context to the call.
                </p>

                <div className={cn("grid", compact ? "mt-6 gap-5" : "mt-8 gap-7")}>
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

                  <div className="grid items-start gap-6 sm:grid-cols-2">
                    <label className={fieldLabelClassName} htmlFor="industry">
                      Industry
                      <select
                        aria-invalid={Boolean(errors.industry)}
                        className={cn(
                          "mt-2 h-12 w-full appearance-none px-4 text-left outline-none",
                          choiceControlClassName
                        )}
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
                      columns="grid-cols-2"
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
          </motion.div>
        </AnimatePresence>

        {step < 2 && (
          <div className={cn("flex items-center justify-between gap-4 border-t border-primary/14", compact ? "mt-7 pt-5" : "mt-9 pt-6")}>
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
              className="inline-flex h-12 min-w-36 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px"
              type="submit"
            >
              Continue
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </form>
      )}

      {step === 2 && (
        <div className={compact ? "mt-6" : "mt-8"}>
          <p className="mono-label text-secondary">Pick a time</p>
          <h2
            className={cn(
              "mt-4 text-balance font-medium leading-tight",
              compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
            )}
            ref={headingRef}
            tabIndex={-1}
          >
            When should we talk?
          </h2>
          <p
            className={cn(
              "mt-4 max-w-xl text-muted-foreground",
              compact ? "text-sm leading-6" : "leading-7",
            )}
          >
            Choose a time on the calendar. The call is booked immediately, and you will get a confirmation invite.
          </p>

          <div
            className={cn(
              "mt-6 w-full border border-primary/12",
              compact ? "h-[min(78vh,800px)] min-h-[640px]" : "h-[min(82vh,900px)] min-h-[720px]",
            )}
          >
            <iframe
              allow="storage-access *; clipboard-write; fullscreen"
              height="100%"
              scrolling="yes"
              src={bookingsPageUrl}
              style={{ border: 0 }}
              title="Book a consultation with KRS"
              width="100%"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            If the calendar stays blank,{" "}
            <a
              className="font-semibold text-primary underline-offset-4 transition hover:text-secondary hover:underline"
              href={bookingsPageUrl}
              rel="noreferrer"
              target="_blank"
            >
              open it in a new tab
            </a>
            .
          </p>

          <div className={cn("border-t border-primary/14", compact ? "mt-7 pt-5" : "mt-9 pt-6")}>
            <button
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-primary transition hover:bg-primary/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:translate-y-px sm:px-4"
              onClick={moveBack}
              type="button"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              Back
            </button>
          </div>
        </div>
      )}
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
    <label className={fieldLabelClassName} htmlFor={name}>
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
    <label className={fieldLabelClassName} htmlFor={name}>
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
  phone,
  error,
  onPhoneChange,
}: {
  phone: string;
  error?: string;
  onPhoneChange: (value: string) => void;
}) {
  const errorId = "phone-error";

  return (
    <label className={fieldLabelClassName}>
      Phone
      <div className="mt-2 flex">
        <span
          aria-hidden="true"
          className="flex h-12 shrink-0 items-center border border-r-0 border-primary/20 px-3 text-sm font-semibold text-foreground"
        >
          +30
        </span>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          aria-required
          autoComplete="tel-national"
          className="h-12 w-full min-w-0 border border-primary/20 bg-transparent px-4 text-base font-normal text-foreground outline-none transition placeholder:font-normal placeholder:text-muted-foreground/55 hover:border-primary/38 focus-visible:border-secondary focus-visible:ring-3 focus-visible:ring-secondary/18"
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
    </label>
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
    <fieldset className={fieldsetClassName}>
      <legend className={cn(fieldLabelClassName, "w-full max-w-full px-0 ps-0")}>{label}</legend>
      <div className={cn("mt-2 grid gap-2", columns)}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-left active:translate-y-px",
                choiceControlClassName,
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
    <fieldset className={fieldsetClassName}>
      <legend className={cn(fieldLabelClassName, "w-full max-w-full px-0 ps-0")}>{label}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-left active:translate-y-px",
                choiceControlClassName,
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
