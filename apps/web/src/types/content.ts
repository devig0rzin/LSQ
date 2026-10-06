export type SourceStatus =
  | "confirmed"
  | "current-site"
  | "matrix-derived"
  | "pending-review";

export interface NavigationItem {
  label: string;
  href: string;
}
