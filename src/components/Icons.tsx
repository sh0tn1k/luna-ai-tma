export function GemIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l4.5 6.5L12 22 7.5 8.5 12 2zm0 3.2L9.6 8.5h4.8L12 5.2zM9.2 10l1.8 8.4L8.1 10H9.2zm5.6 0h1.1l-2.9 8.4L14.8 10z" fill="#FFD700" />
      <path d="M6 9.5h12l-6 12.5L6 9.5z" fill="#FFD700" opacity=".95" />
      <path d="M8.2 3.5h7.6L18 8H6l2.2-4.5z" fill="#FFE566" />
      <path d="M9 3.5l-1 4.5h8l-1-4.5H9z" fill="#FFF3A0" opacity=".7" />
    </svg>
  );
}

export function StarIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#F5C518" />
      <path
        d="M12 5.5l1.6 3.4 3.7.5-2.7 2.6.7 3.7L12 14.4 8.7 15.7l.7-3.7-2.7-2.6 3.7-.5L12 5.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function LunaLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2c2.2 4.5 1.2 8.8-1.5 11.4C14.8 12.2 18 8.5 17 3.5 20.5 6.8 21 12 17.5 16.2 13.5 21 7.5 21.5 4 18.2 8.5 18.8 13 15.5 14 10.8 12.8 6.5 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
