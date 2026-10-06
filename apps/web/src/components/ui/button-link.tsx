import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-signal-red bg-signal-red text-white hover:border-signal-red-strong hover:bg-signal-red-strong active:translate-y-px",
  secondary:
    "border-graphite bg-transparent text-graphite hover:bg-graphite hover:text-white active:translate-y-px",
  quiet:
    "border-transparent bg-transparent text-graphite hover:border-line hover:bg-white active:translate-y-px",
};

const sharedClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-[color,background-color,border-color,transform] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong disabled:cursor-not-allowed disabled:opacity-45";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`${sharedClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${sharedClasses} ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
