import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function Field({
  error,
  hint,
  id,
  label,
  className = "",
  ...props
}: FieldProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-graphite" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={`min-h-12 w-full border bg-white px-4 py-3 text-base text-graphite placeholder:text-steel/75 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-signal-red-strong disabled:cursor-not-allowed disabled:bg-technical-white disabled:text-steel ${error ? "border-signal-red-strong" : "border-line hover:border-steel"} ${className}`}
        id={id}
        {...props}
      />
      {error ? (
        <p className="text-sm font-medium text-signal-red-strong" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-steel" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
