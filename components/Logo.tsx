import Link from "next/link";

interface LogoProps {
  size?: number;
  variant?: "full" | "mark";
  className?: string;
  href?: string | null;
}

let _uid = 0;

export default function Logo({
  size = 36,
  variant = "full",
  className = "",
  href = "/",
}: LogoProps) {
  // unique ids per render so multiple Logo instances on a page don't clash
  const uid = `lg${++_uid}`;

  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <defs>
        <filter id={`${uid}-goo`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <radialGradient id={`${uid}-b`} cx="0.35" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#8FB8FF" />
          <stop offset="50%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#1A56D8" />
        </radialGradient>
        <radialGradient id={`${uid}-r`} cx="0.35" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#FF9088" />
          <stop offset="50%" stopColor="#EA4335" />
          <stop offset="100%" stopColor="#B92517" />
        </radialGradient>
        <radialGradient id={`${uid}-g`} cx="0.35" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#7CE6A4" />
          <stop offset="50%" stopColor="#34A853" />
          <stop offset="100%" stopColor="#187A39" />
        </radialGradient>
        <radialGradient id={`${uid}-y`} cx="0.35" cy="0.3" r="0.78">
          <stop offset="0%" stopColor="#FFE680" />
          <stop offset="50%" stopColor="#FBBC04" />
          <stop offset="100%" stopColor="#D49C00" />
        </radialGradient>
      </defs>

      <g transform="rotate(-10 100 102)">
        {/* blobs (merged by goo filter) */}
        <g filter={`url(#${uid}-goo)`}>
          <circle cx="100" cy="50" r="32" fill="#4285F4" />
          <rect x="70" y="60" width="20" height="46" rx="10" transform="rotate(-32 80 83)" fill="#4285F4" />
          <rect x="110" y="60" width="20" height="46" rx="10" transform="rotate(32 120 83)" fill="#4285F4" />
          <circle cx="58" cy="112" r="26" fill="#EA4335" />
          <rect x="65" y="118" width="20" height="44" rx="10" transform="rotate(-38 75 140)" fill="#EA4335" />
          <circle cx="142" cy="112" r="26" fill="#34A853" />
          <rect x="115" y="118" width="20" height="44" rx="10" transform="rotate(38 125 140)" fill="#34A853" />
          <circle cx="100" cy="158" r="26" fill="#FBBC04" />
        </g>

        {/* glossy 3D balls on top */}
        <circle cx="100" cy="50" r="32" fill={`url(#${uid}-b)`} />
        <circle cx="58" cy="112" r="26" fill={`url(#${uid}-r)`} />
        <circle cx="142" cy="112" r="26" fill={`url(#${uid}-g)`} />
        <circle cx="100" cy="158" r="26" fill={`url(#${uid}-y)`} />

        {/* warm blend at the molecular center */}
        <ellipse cx="100" cy="118" rx="22" ry="14" fill="#F2A040" opacity="0.45" />

        {/* highlights */}
        <ellipse cx="90" cy="38" rx="11" ry="7" fill="#ffffff" opacity="0.65" />
        <ellipse cx="50" cy="103" rx="8" ry="5" fill="#ffffff" opacity="0.6" />
        <ellipse cx="134" cy="103" rx="8" ry="5" fill="#ffffff" opacity="0.6" />
        <ellipse cx="92" cy="149" rx="8" ry="5" fill="#ffffff" opacity="0.6" />
      </g>
    </svg>
  );

  const inner = (
    <span className={`inline-flex items-center gap-1.5 sm:gap-2 ${className}`}>
      {mark}
      {variant === "full" && (
        <span className="font-display text-[18px] font-extrabold leading-none tracking-tight sm:text-[22px]">
          <span className="text-ink dark:text-white">Googlix</span>
          <span className="text-[#4285F4]">Labs</span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="GooglixLabs — Home">
      {inner}
    </Link>
  );
}
