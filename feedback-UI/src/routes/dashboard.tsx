import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/NavBar";
import { LemonArt } from "@/components/LemonArt";
import { Mail, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from 'react';

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Feedback Dashboard — UniCredit" },
      { name: "description", content: "Review customer feedback submissions across UniCredit branches — compliments, complaints, and enquiries at a glance." },
      { property: "og:title", content: "Feedback Dashboard — UniCredit" },
      { property: "og:description", content: "Review customer feedback submissions across UniCredit branches." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DashboardPage,
});
type Entry = {
  id: string;
  name: string;
  email: string;
  branch: string;
  type: "Compliment" | "Complaint" | "Enquiry" | "Suggestion";
  message: string;
  date: string;
};

const entries: Entry[] = [
  { id: "FB-1042", name: "Giulia Rossi", email: "giulia.rossi@mail.com", branch: "Positano", type: "Compliment", message: "Marco was incredibly patient helping me set up my new savings account.", date: "12 Jul" },
  { id: "FB-1041", name: "Thomas Beckett", email: "t.beckett@mail.com", branch: "Amalfi Central", type: "Complaint", message: "The ATM near the piazza has been out of service for three days.", date: "11 Jul" },
  { id: "FB-1040", name: "Sofia Marino", email: "sofia.m@mail.com", branch: "Sorrento", type: "Enquiry", message: "Can I open a joint account online, or do I need to visit a branch?", date: "10 Jul" },
  { id: "FB-1039", name: "Luca Bianchi", email: "luca.b@mail.com", branch: "Ravello", type: "Compliment", message: "Beautiful branch, warm staff — felt like sitting in my nonna's kitchen.", date: "09 Jul" },
  { id: "FB-1038", name: "Elena Conti", email: "elena.conti@mail.com", branch: "Positano", type: "Complaint", message: "Long queues on Saturday mornings — please add more tellers.", date: "08 Jul" },
  { id: "FB-1037", name: "Marcus Vale", email: "m.vale@mail.com", branch: "Amalfi Central", type: "Suggestion", message: "A dark mode for the mobile app would be lovely on late nights.", date: "07 Jul" },
  { id: "FB-1036", name: "Anita Greco", email: "anita.g@mail.com", branch: "Sorrento", type: "Enquiry", message: "What documents do I need to update my address?", date: "06 Jul" },
];

const stats = [
  { label: "Total", value: entries.length, tone: "lemon" as const },
  { label: "Compliments", value: entries.filter((e) => e.type === "Compliment").length, tone: "lemon" as const },
  { label: "Complaints", value: entries.filter((e) => e.type === "Complaint").length, tone: "navy" as const },
];

const typeStyles: Record<Entry["type"], string> = {
  Compliment: "bg-lemon text-navy-deep",
  Complaint: "bg-terracotta/15 text-terracotta ring-1 ring-terracotta/30",
  Enquiry: "bg-navy/10 text-navy-deep ring-1 ring-navy/15",
  Suggestion: "bg-leaf/15 text-leaf ring-1 ring-leaf/30",
};

function DashboardPage() {
  const [apiMessage, setApiMessage] = useState('Loading backend connection...');

  useEffect(() => {
    fetch('https://feedbackbank-api.onrender.com/test')
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => setApiMessage('Failed to connect to backend'));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <NavBar />
      {/* <LemonArt className="pointer-events-none absolute -right-24 top-24 h-[28rem] w-[28rem] text-lemon/30" />
      <LemonArt className="pointer-events-none absolute -left-32 bottom-10 h-[26rem] w-[26rem] rotate-180 text-leaf/20" /> */}

      <main className="relative mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-terracotta">
            UniCredit · Dashboard
          </p>
          <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">
            Customer Feedback
          </h1>
          <p className="text-sm text-navy/60">
            A sun-lit view of what your customers are telling you this week.
          </p>
        </div>

        {/* 3. TEST STATUS BAR LINKED HERE */}
        <div className="mt-4 rounded-xl bg-navy-deep/5 border border-navy-deep/10 p-4 text-sm font-medium text-navy-deep">
          🔌 Backend Test Status: <span className="italic text-terracotta">{apiMessage}</span>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={
                "relative overflow-hidden rounded-2xl px-4 py-5 shadow-md " +
                (s.tone === "lemon"
                  ? "bg-lemon text-navy-deep"
                  : "bg-navy-deep text-lemon")
              }
            >
              <div className="font-display text-4xl font-bold leading-none sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Entries */}
        <section className="mt-8 space-y-3 sm:space-y-4">
          {/* ... keeping the rest of the layout mapping entries entirely unchanged */}
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl text-navy-deep sm:text-2xl">
              Recent Submissions
            </h2>
            <span className="text-xs text-navy/50">{entries.length} total</span>
          </div>

          {entries.map((e) => (
            <article
              key={e.id}
              className="linen-card group relative rounded-xl border border-navy/10 p-4 transition-transform hover:-translate-y-0.5 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-navy/40">
                      {e.id}
                    </span>
                    <span className="text-[10px] text-navy/40">· {e.date}</span>
                  </div>
                  <h3 className="mt-0.5 font-display text-xl font-semibold text-navy-deep">
                    {e.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail size={12} className="text-terracotta" />
                      <span className="truncate">{e.email}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} className="text-terracotta" />
                      {e.branch}
                    </span>
                  </div>
                </div>
                <span
                  className={
                    "inline-flex shrink-0 items-center gap-1 self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider " +
                    typeStyles[e.type]
                  }
                >
                  <Tag size={11} />
                  {e.type}
                </span>
              </div>
              <p className="mt-3 border-t border-dashed border-navy/15 pt-3 text-sm italic text-navy/80">
                “{e.message}”
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}