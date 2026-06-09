"use client";

import { useState } from "react";
import {
  Mail,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Twitter,
  Linkedin,
  Github,
  Dribbble,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Reveal from "../Reveal";

/* ─────────────────────────────────────────────────────────────
   GOOGLE FORM CONFIG — replace with your real form URL + entry IDs.
   How to get them: open your Google Form → ⋮ → "Get pre-filled link"
   → fill any text in every field → Get Link → Copy. The URL contains
   entry.XXXXXXXXX=... pairs. Paste each entry ID below next to its
   matching field name.
   ───────────────────────────────────────────────────────────── */

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1uxrLSM7b3J0r1WU14N7FgEkAuFsGHJimpMI7ogv2_uY/formResponse";

const ENTRY = {
  name:    "entry.1954267797",   // Your Name
  email:   "entry.870796795",  // Email Address
  phone:   "entry.1934269761",   // Phone Number
  company: "entry.1890266914",   // Company / Startup
  service: "entry.953611615",   // Service Required           ← REPLACE
  budget:  "entry.385223008",   // Budget Range               ← REPLACE
  message: "entry.1933068636",   // Project Description
};

const SERVICES = [
  "Full Stack Development",
  "UI/UX Design",
  "AI Tools & Automation",
  "SaaS Platforms",
  "Mobile App Development",
  "Branding & Identity",
  "Inventory Management Software",
  "Real Estate / Builder Apps",
  "Multiple Services",
];

const BUDGETS = [
  "Under ₹50K",
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹5L",
  "₹5L – ₹10L",
  "₹10L+",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.consent) {
      setErrorMsg("Please accept the privacy policy to continue.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Build the Google Form payload — keys are entry.XXX IDs
    const formBody = new FormData();
    formBody.append(ENTRY.name,    form.name.trim());
    formBody.append(ENTRY.email,   form.email.trim());
    formBody.append(ENTRY.phone,   form.phone.trim());
    formBody.append(ENTRY.company, form.company.trim());
    formBody.append(ENTRY.service, form.service);
    formBody.append(ENTRY.budget,  form.budget);
    formBody.append(ENTRY.message, form.message.trim());

    try {
      // mode: 'no-cors' — Google Forms doesn't return CORS headers, so the
      // browser hides the actual response. The submission still succeeds and
      // the row lands in the linked Google Sheet (downloadable as Excel).
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formBody,
      });

      setStatus("success");
      toast.success(
        "Your message has been sent successfully! We will get back to you shortly.",
        { duration: 3500, position: "top-center", richColors: true }
      );
      setForm({
        name: "", email: "", phone: "", company: "",
        service: "", budget: "", message: "", consent: false,
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to send your message. Please try again later.");
      toast.error("Failed to send your message. Please try again later.", {
        duration: 3500,
        position: "top-center",
        richColors: true,
      });
    }
  };

  const reset = () => {
    setForm({
      name: "", email: "", phone: "", company: "",
      service: "", budget: "", message: "", consent: false,
    });
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-white dark:bg-[#08091A]">
      <div className="blob-bg left-[-10%] top-[10%] h-80 w-80 bg-brand-blue/25" />
      <div className="blob-bg right-[-10%] bottom-[10%] h-80 w-80 bg-brand-red/20" />

      <div className="container-x grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* Left info */}
        <Reveal>
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title mt-4 sm:mt-5">
            Let&apos;s Talk About <span className="gradient-text">Your Project</span>
          </h2>
          <p className="section-sub">
            Ready to build something great? Fill out the form and we&apos;ll
            get back to you within 24 hours with a tailored proposal.
          </p>

          <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            <a href="mailto:googlixlabs@gmail.com" className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:gap-4 sm:p-5">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-blue-lt text-brand-blue sm:h-12 sm:w-12">
                <Mail size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500 sm:text-xs">Email Us</span>
                <span className="mt-0.5 block truncate font-display text-sm font-bold text-ink dark:text-white sm:text-base">googlixlabs@gmail.com</span>
              </span>
              <ArrowUpRight size={16} className="text-ink-muted dark:text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
            </a>

            <a href="https://calendly.com/googlixlabs" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:gap-4 sm:p-5">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-red-lt text-brand-red sm:h-12 sm:w-12">
                <Calendar size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500 sm:text-xs">Book a Call</span>
                <span className="mt-0.5 block truncate font-display text-sm font-bold text-ink dark:text-white sm:text-base">calendly.com/googlixlabs</span>
              </span>
              <ArrowUpRight size={16} className="text-ink-muted dark:text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-red" />
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-4 shadow-soft sm:gap-4 sm:p-5">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-grn-lt text-emerald-600 sm:h-12 sm:w-12">
                <MapPin size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-slate-500 sm:text-xs">Location</span>
                <span className="mt-0.5 block truncate font-display text-sm font-bold text-ink dark:text-white sm:text-base">Raipur, Chhattisgarh, India</span>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted dark:text-slate-500">Find us on social</div>
            <div className="mt-4 flex items-center gap-2">
              {[
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-ink-sec transition hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue hover:shadow-soft dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-blue-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: form card */}
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.04] p-5 shadow-card sm:p-7 md:p-8">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-brand-blue/15 to-brand-purple/15 blur-2xl" />

            <div className="relative">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-card">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-ink dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-sec dark:text-slate-300">
                    Thanks for reaching out! We&apos;ve received your project
                    details and will get back to you within 24 hours with a
                    personalized proposal.
                  </p>
                  <button onClick={reset} className="btn-ghost mt-7">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink dark:text-white sm:text-2xl">
                    Start Your Project
                    <Sparkles size={18} className="text-brand-yellow" />
                  </h3>
                  <p className="mt-1.5 text-[13px] text-ink-sec dark:text-slate-300 sm:text-sm">
                    We&apos;ll respond within 24 hours with a custom proposal.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 space-y-4 sm:mt-7 sm:space-y-5" noValidate>
                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="field-label">Your Name *</label>
                        <input
                          id="name" required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Rahul Sharma"
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="field-label">Email Address *</label>
                        <input
                          id="email" type="email" required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className="field"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="field-label">Phone Number</label>
                        <input
                          id="phone" type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="field-label">Company / Startup</label>
                        <input
                          id="company"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Your Company Name"
                          className="field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="field-label">Service Required *</label>
                      <select
                        id="service" required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2394A3B8%22><path d=%22M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%22/></svg>')] bg-[right_14px_center] bg-[length:18px_18px] bg-no-repeat pr-10"
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="field-label">Budget Range</label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => {
                          const active = form.budget === b;
                          return (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setForm({ ...form, budget: active ? "" : b })}
                              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                                active
                                  ? "border-brand-blue bg-brand-blue text-white shadow-brand-blue"
                                  : "border-black/10 bg-white text-ink-sec hover:border-brand-blue hover:text-brand-blue dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:text-blue-300"
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="field-label">Project Description *</label>
                      <textarea
                        id="message" rows={5} required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your project — what are you building, who are your users, what does success look like for you?"
                        className="field resize-y"
                      />
                    </div>

                    <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-sec dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-1 h-4 w-4 flex-shrink-0 rounded border-black/20 text-brand-blue focus:ring-brand-blue"
                      />
                      <span>
                        I agree to GooglixLabs&apos; Privacy Policy and Terms of
                        Service. We&apos;ll never share your information.
                      </span>
                    </label>

                    {errorMsg && (
                      <div className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-700 ring-1 ring-red-200">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary group w-full justify-center disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-ink-muted dark:text-slate-500">
                      Submissions are stored to Google Sheets (Excel) and emailed
                      directly to <span className="font-semibold text-ink dark:text-white">googlixlabs@gmail.com</span>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
