// Ikon inline dashboard (dari aset Figma). Warna memakai currentColor agar nilainya
// berasal dari token brand yang diatur lewat CSS di DashboardPage.css.
type IconProps = { className?: string };

export function LogoIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M7.33333 13.3333C4.90617 13.3407 2.87859 11.4863 2.66982 9.06807C2.46106 6.64989 4.14082 4.4754 6.53333 4.06667C10.3333 3.33333 11.3333 2.98667 12.6667 1.33333C13.3333 2.66667 14 4.12 14 6.66667C14 10.3333 10.8133 13.3333 7.33333 13.3333V13.3333"
        fill="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M1.33333 14C1.33333 12 2.56667 10.4267 4.72 10C6.33333 9.68 8 8.66667 8.66667 8L1.33333 14"
        fill="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export function AvatarIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M12.6667 14V12.6667C12.6667 11.1949 11.4718 10 10 10H6C4.52823 10 3.33333 11.1949 3.33333 12.6667V14"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M5.33333 4.66667C5.33333 6.13844 6.52823 7.33333 8 7.33333C9.47177 7.33333 10.6667 6.13844 10.6667 4.66667C10.6667 3.19489 9.47177 2 8 2C6.52823 2 5.33333 3.19489 5.33333 4.66667V4.66667"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export function TrendIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M9.33333 9.91667H12.8333V6.41667"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M12.8333 9.91667L7.875 4.95833L4.95833 7.875L1.16667 4.08333"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <g clipPath="url(#dash-sparkle-clip)">
        <path
          d="M7.34467 1.876C7.4036 1.56047 7.67902 1.33174 8 1.33174C8.32098 1.33174 8.5964 1.56047 8.65533 1.876L9.356 5.58133C9.45784 6.12046 9.87954 6.54216 10.4187 6.644L14.124 7.34467C14.4395 7.4036 14.6683 7.67902 14.6683 8C14.6683 8.32098 14.4395 8.5964 14.124 8.65533L10.4187 9.356C9.87954 9.45784 9.45784 9.87954 9.356 10.4187L8.65533 14.124C8.5964 14.4395 8.32098 14.6683 8 14.6683C7.67902 14.6683 7.4036 14.4395 7.34467 14.124L6.644 10.4187C6.54216 9.87954 6.12046 9.45784 5.58133 9.356L1.876 8.65533C1.56047 8.5964 1.33174 8.32098 1.33174 8C1.33174 7.67902 1.56047 7.4036 1.876 7.34467L5.58133 6.644C6.12046 6.54216 6.54216 6.12046 6.644 5.58133L7.34467 1.876"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
        <path
          d="M13.3333 1.33333V4"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
        <path
          d="M14.6667 2.66667H12"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
        <path
          d="M1.33333 13.3333C1.33333 14.0692 1.93078 14.6667 2.66667 14.6667C3.40255 14.6667 4 14.0692 4 13.3333C4 12.5974 3.40255 12 2.66667 12C1.93078 12 1.33333 12.5974 1.33333 13.3333H1.33333"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        />
      </g>
      <defs>
        <clipPath id="dash-sparkle-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
