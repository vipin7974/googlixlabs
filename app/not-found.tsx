import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-soft-radial px-6 py-20 text-center">
      <div className="blob-bg left-[10%] top-[10%] h-80 w-80 bg-brand-blue/25" />
      <div className="blob-bg right-[10%] bottom-[10%] h-80 w-80 bg-brand-red/20" />

      <div className="relative">
        <div className="mx-auto inline-block animate-float">
          <Logo size={80} variant="mark" href={null} />
        </div>

        <h1 className="mt-8 font-display text-7xl font-extrabold tracking-tight text-ink sm:text-8xl dark:text-white">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl dark:text-white">
          Page Not Found
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-sec dark:text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back home.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary group">
            <Home size={16} />
            Back to Home
          </Link>
          <Link href="/#contact" className="btn-ghost group">
            <ArrowLeft size={16} />
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
