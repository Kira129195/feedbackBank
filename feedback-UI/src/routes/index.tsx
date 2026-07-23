import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { LemonArt } from "@/components/LemonArt";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank Customer Feedback — UniCredit" },
      {
        name: "description",
        content:
          "Share compliments, complaints, or enquiries with UniCredit. A calm Mediterranean form for honest, thoughtful feedback.",
      },
      { property: "og:title", content: "Bank Customer Feedback — UniCredit" },
      {
        property: "og:description",
        content: "Share compliments, complaints, or enquiries with UniCredit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeedbackFormPage,
});

const feedbackTypes = ["Compliment", "Complaint", "Enquiry", "Suggestion"];
const feedbackOn = [
  "Branch Service",
  "Online Banking",
  "Mobile App",
  "Customer Support",
  "ATM Experience",
  "Other",
];
const titles = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx"];

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={"block " + className}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-navy/15 bg-slate-50/50 px-3.5 py-2.5 text-sm text-navy-deep placeholder:text-navy/35 outline-none transition-all focus:border-navy/40 focus:ring-2 focus:ring-lemon/60";

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls + " appearance-none pr-10"}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-terracotta"
        size={16}
        strokeWidth={2.5}
      />
    </div>
  );
}

function FeedbackFormPage() {
  const [form, setForm] = useState({
    type: "",
    on: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    staffName: "",
    branch: "",
    feedback: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = {
      feedbackType: form.type,
      feedbackField: form.on,
      title: form.title,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      contactNumber: form.contact,
      staff: form.staffName,
      branch: form.branch,
      feedbackPayload: form.feedback,
    };

    try {
      const response = await fetch("http://localhost:1337/sendFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error submitting feedback:", response.status, errorData);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      setSubmitted(true);
      setForm({
        type: "",
        on: "",
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        staffName: "",
        branch: "",
        feedback: "",
      });
      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      console.error("Network error submitting feedback:", err);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        {/* Header banner */}
        <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-5 py-8 text-center shadow-lg sm:px-10 sm:py-10">
          <LemonArt className="pointer-events-none absolute inset-0 h-full w-full text-lemon/15" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.32em] text-lemon">
            UniCredit
          </p>
          <h1 className="relative mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Bank Customer Feedback Form
          </h1>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-cream-soft/75">
            Your voice shapes the way we serve you. Share a note, a concern, or a
            compliment — we read every one.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="relative mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-cream-soft p-5 shadow-xl sm:mt-8 sm:p-8"
          style={{
            backgroundImage: "url('/images/lemonFormPic.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "700px 1200px", // Adjust this number to scale the lemons up or down!
          }}
        >

          {/* <LemonArt className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-leaf/25" />
          <LemonArt className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rotate-180 text-terracotta/15" /> */}

          <div className="relative space-y-5">
            <Field label="Type of Feedback">
              <Select
                value={form.type}
                onChange={set("type")}
                placeholder="Select a type…"
                options={feedbackTypes}
              />
            </Field>

            <Field label="Feedback / Enquiry On">
              <Select
                value={form.on}
                onChange={set("on")}
                placeholder="Select an area…"
                options={feedbackOn}
              />
            </Field>

            <div>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
                Name
              </span>
              <div className="grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] gap-2 sm:grid-cols-[100px_minmax(0,1fr)_minmax(0,1fr)] sm:gap-3">
                <div className="relative">
                  <select
                    value={form.title}
                    onChange={(e) => set("title")(e.target.value)}
                    className={inputCls + " appearance-none pr-7"}
                  >
                    <option value="" disabled>
                      Title
                    </option>
                    {titles.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-terracotta"
                    size={14}
                    strokeWidth={2.5}
                  />
                </div>
                <input
                  type="text"
                  placeholder="First"
                  value={form.firstName}
                  onChange={(e) => set("firstName")(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Last"
                  value={form.lastName}
                  onChange={(e) => set("lastName")(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <Field label="Email Address">
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Contact Number">
              <input
                type="tel"
                placeholder="### ### ####"
                value={form.contact}
                onChange={(e) => set("contact")(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Staff Name">
                <input
                  type="text"
                  placeholder="Optional"
                  value={form.staffName}
                  onChange={(e) => set("staffName")(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Branch">
                <input
                  type="text"
                  placeholder="e.g. Positano"
                  value={form.branch}
                  onChange={(e) => set("branch")(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Feedback">
              <textarea
                rows={5}
                placeholder="Tell us what happened…"
                value={form.feedback}
                onChange={(e) => set("feedback")(e.target.value)}
                className={inputCls + " resize-none"}
              />
              <span className="mt-1.5 block text-[11px] italic text-navy/50">
                Please do not include sensitive information such as account numbers,
                PINs, or passwords in your feedback.
              </span>
            </Field>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-navy-deep py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-lemon shadow-lg transition-all hover:bg-navy hover:shadow-xl active:scale-[0.99]"
            >
              Send Feedback
            </button>

{submitted && (
  /* Backdrop Overlay */
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 backdrop-blur-sm p-4 transition-all animate-in fade-in duration-300">
    
    {/* Card Container: Compact width, sleek rounded corners, subtle navy border */}
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-navy-deep/5 animate-in zoom-in-95 duration-300">
      
      {/* Optional Top Accent Bar in Lemon/Gold */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lemon via-lemon/80 to-lemon" />

      {/* Close button */}
      <button
        onClick={() => setSubmitted(false)}
        className="absolute right-5 top-5 z-30 rounded-full p-1 text-navy/40 transition-colors hover:bg-slate-100 hover:text-navy-deep"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content Layout */}
      <div className="text-center pt-2">
        
        {/* Subtitle / Tagline Badge */}
        <span className="inline-block text-[11px] font-bold tracking-widest text-navy/50 uppercase mb-2">
          Feedback Received
        </span>

        {/* Primary Heading */}
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-deep">
          Grazie Mille!
        </h3>
        
        {/* Copy */}
        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-navy/75 max-w-xs mx-auto">
          Your feedback has been recorded successfully. Our team will review your comments, and if you requested a follow-up, we will reach out within 24 hours. 
        </p>
        
        {/* CTA Button */}
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 w-full sm:w-auto rounded-full bg-navy-deep px-8 py-3.5 text-xs font-semibold tracking-widest text-lemon uppercase shadow-md transition-all hover:bg-navy hover:shadow-lg active:scale-[0.98]"
        >
          Buona Giornata!
        </button>

      </div>

    </div>
  </div>
)}
          </div>
        </form>
      </main>
    </div>
  );
}
