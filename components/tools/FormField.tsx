import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="gx-field">
      <label htmlFor={htmlFor} className="gx-field-label">
        {label}
      </label>
      {children}
      {error ? (
        <span role="alert" className="gx-field-error">
          {error}
        </span>
      ) : hint ? (
        <span className="gx-field-hint">{hint}</span>
      ) : null}
    </div>
  );
}
