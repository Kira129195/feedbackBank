import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { NavBar } from "@/components/NavBar";
import { LemonArt } from "@/components/LemonArt";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Staff Login — UniCredit Dashboard" },
      {
        name: "description",
        content: "Sign in to the UniCredit feedback dashboard to review customer submissions.",
      },
    ],
  }),
  component: LoginPage,
});

const inputCls =
  "w-full rounded-lg border border-navy/15 bg-slate-50/70 px-3.5 py-2.75 text-sm text-navy-deep placeholder:text-navy/35 outline-none transition-all focus:border-navy/40 focus:ring-2 focus:ring-lemon/60";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(false);

    try {
      const res = await fetch("http://localhost:1337/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // THIS IS KEY: allows cookies to pass between frontend and backend
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await res.json();

      // Successfully authenticated! Navigate to dashboard
      navigate({ to: "/dashboard" });

    } catch (err) {
      alert("Login failed! Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />

      <main className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
        <div className="w-full overflow-hidden rounded-[1.75rem] border border-navy/10 bg-cream-soft shadow-[0_24px_80px_-32px_rgba(5,16,38,0.35)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <section className="relative overflow-hidden bg-navy-deep px-6 py-8 text-cream-soft sm:px-8 lg:px-10 lg:py-10">
              <LemonArt className="pointer-events-none absolute inset-0 h-full w-full text-lemon/15" />
              <div className="relative space-y-5">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-lemon">
                  UniCredit · Staff Access
                </span>
                <div className="space-y-3">
                  <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                    Welcome back to the dashboard
                  </h1>
                  <p className="max-w-md text-sm leading-6 text-cream-soft/80 sm:text-[15px]">
                    Sign in to review customer feedback, spot trends, and keep every branch experience moving smoothly.
                  </p>
                </div>

              </div>
            </section>

            <section className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                    Login
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-navy-deep">
                    Access your inbox
                  </h2>
                </div>
                <div className="rounded-full bg-lemon/70 p-2 text-navy-deep">
                  <Lock size={18} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-terracotta" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@unicredit.com"
                      className={inputCls + " pl-10"}
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
                    Password
                  </span>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-terracotta" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={inputCls + " pl-10 pr-10"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 transition-colors hover:text-navy-deep"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-navy/70">
                    <input type="checkbox" className="rounded border-navy/15 text-terracotta focus:ring-lemon" />
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-deep px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-navy"
                >
                  {isSubmitting ? "Signing in..." : "Sign in to dashboard"}
                  <ArrowRight size={16} />
                </button>
              </form>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
