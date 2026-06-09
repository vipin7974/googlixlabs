import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Dribbble, Heart } from "lucide-react";
import Logo from "./Logo";

const services = [
  { label: "Full Stack Development", href: "#services" },
  { label: "UI/UX Design", href: "#services" },
  { label: "AI & Automation", href: "#services" },
  { label: "SaaS Platforms", href: "#services" },
  { label: "Mobile Apps", href: "#services" },
  { label: "Branding", href: "#services" },
];

const company = [
  { label: "About Us", href: "#about" },
  { label: "Our Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-white dark:border-white/10 dark:bg-[#08091A]">
      {/* soft brand glow */}
      <div className="blob-bg -left-32 top-0 h-72 w-72 bg-brand-blue/30" />
      <div className="blob-bg -right-32 bottom-0 h-72 w-72 bg-brand-red/20" />

      <div className="container-x relative grid gap-10 py-12 sm:grid-cols-2 sm:gap-10 md:py-14 lg:grid-cols-4 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-sec sm:mt-5 sm:text-sm">
            Crafting intelligent digital experiences that shape how the world
            interacts with technology. From Raipur, India — for the world.
          </p>
          <div className="mt-5 flex items-center gap-2 sm:mt-6">
            {[
              { href: "https://x.com/googlixlabs", Icon: Twitter, label: "Twitter" },
              { href: "https://www.linkedin.com/company/googlixlabs", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://github.com/googlixlabs", Icon: Github, label: "GitHub" },
              { href: "https://dribbble.com/googlixlabs", Icon: Dribbble, label: "Dribbble" },
            ].map(({ href, Icon, label }) => (
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

        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink sm:mb-5 sm:text-xs dark:text-white">
            Services
          </h4>
          <ul className="space-y-2.5 text-[13px] sm:space-y-3 sm:text-sm">
            {services.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-ink-sec uline hover:text-ink dark:text-slate-300 dark:hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink sm:mb-5 sm:text-xs dark:text-white">
            Company
          </h4>
          <ul className="space-y-2.5 text-[13px] sm:space-y-3 sm:text-sm">
            {company.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-ink-sec uline hover:text-ink dark:text-slate-300 dark:hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink sm:mb-5 sm:text-xs dark:text-white">
            Contact
          </h4>
          <ul className="space-y-2.5 text-[13px] text-ink-sec sm:space-y-3 sm:text-sm">
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 flex-shrink-0 text-brand-blue" />
              <a
                href="mailto:googlixlabs@gmail.com"
                className="break-all uline hover:text-ink dark:hover:text-white"
              >
                googlixlabs@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 flex-shrink-0 text-brand-green" />
              <a href="tel:+917000498574" className="uline hover:text-ink dark:hover:text-white">
                +91 7000498574
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-red" />
              <span>Raipur, Chhattisgarh, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-center text-[11px] text-ink-muted sm:flex-row sm:py-6 sm:text-xs dark:text-slate-400">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            © {new Date().getFullYear()} GooglixLabs. All rights reserved. Made with{" "}
            <Heart size={12} className="text-brand-red" fill="currentColor" /> in
            Raipur, India.
          </p>
          <p className="flex items-center gap-4">
            <a href="#" className="hover:text-ink dark:hover:text-white">Privacy</a>
            <a href="#" className="hover:text-ink dark:hover:text-white">Terms</a>
            <a href="#" className="hover:text-ink dark:hover:text-white">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
