export function LemonArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* lemon top-left */}
      <g transform="translate(30 40) rotate(-18)">
        <ellipse cx="40" cy="40" rx="36" ry="26" />
        <path d="M4 40c6-4 10-4 14 0M76 40c-6 4-10 4-14 0" />
        <path d="M40 14v52M20 22l40 36M20 58l40-36" opacity=".5" />
      </g>
      {/* leaf sprig top-right */}
      <g transform="translate(300 30) rotate(20)">
        <path d="M0 30c20-30 60-30 80 0" />
        <path d="M14 24c8-6 20-6 28 0M46 24c8-6 20-6 28 0" />
        <path d="M10 28l70 4" opacity=".5" />
      </g>
      {/* citrus slice middle */}
      <g transform="translate(170 160)">
        <circle cx="35" cy="35" r="34" />
        <circle cx="35" cy="35" r="26" opacity=".6" />
        <path d="M35 9v52M9 35h52M17 17l36 36M17 53l36-36" opacity=".5" />
      </g>
      {/* lemon bottom-right */}
      <g transform="translate(260 280) rotate(15)">
        <ellipse cx="40" cy="30" rx="42" ry="28" />
        <path d="M-2 30c6-4 10-4 14 0M82 30c-6 4-10 4-14 0" />
      </g>
      {/* leaves bottom-left */}
      <g transform="translate(20 280) rotate(-10)">
        <path d="M0 30c20-24 60-24 80 0c-20 24-60 24-80 0z" />
        <path d="M0 30h80" opacity=".5" />
      </g>
      {/* small sprig center-bottom */}
      <g transform="translate(150 330)">
        <path d="M0 10c15-10 45-10 60 0" />
        <ellipse cx="15" cy="6" rx="6" ry="3" />
        <ellipse cx="45" cy="6" rx="6" ry="3" />
      </g>
    </svg>
  );
}
