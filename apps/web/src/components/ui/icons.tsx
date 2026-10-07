import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return <Base {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
}

export function ArrowUpRight(props: IconProps) {
  return <Base {...props}><path d="M7 17 17 7M8 7h9v9" /></Base>;
}

export function Search(props: IconProps) {
  return <Base {...props}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Base>;
}

export function Phone(props: IconProps) {
  return <Base {...props}><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" /></Base>;
}

export function WhatsApp(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .8.8-2.95-.2-.3a8.2 8.2 0 1 1 6.9 3.78Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08 4.9 4.9 0 0 0 1.02 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.69 2.23.75 3.03.63.49-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function Catalog(props: IconProps) {
  return <Base {...props}><rect height="7" rx="1" width="7" x="3.5" y="3.5" /><rect height="7" rx="1" width="7" x="13.5" y="3.5" /><rect height="7" rx="1" width="7" x="3.5" y="13.5" /><rect height="7" rx="1" width="7" x="13.5" y="13.5" /></Base>;
}

export function Layers(props: IconProps) {
  return <Base {...props}><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></Base>;
}

export function Headset(props: IconProps) {
  return <Base {...props}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect height="6" rx="1.5" width="4" x="3" y="13" /><rect height="6" rx="1.5" width="4" x="17" y="13" /><path d="M19 19a3 3 0 0 1-3 2.5h-2" /></Base>;
}

export function Tour360(props: IconProps) {
  return <Base {...props}><ellipse cx="12" cy="12" rx="9" ry="4.5" /><path d="M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" opacity=".55" /><path d="m17.5 15.7 1.6-.2-.6 1.6" /></Base>;
}

export function Play(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return <Base {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Base>;
}

export function Check(props: IconProps) {
  return <Base {...props}><path d="m5 12.5 4.5 4.5L19 7.5" /></Base>;
}

export function Ruler(props: IconProps) {
  return <Base {...props}><path d="m3 16 13-13 5 5L8 21l-5-5Z" /><path d="m7 12 2 2M10 9l2 2M13 6l2 2" /></Base>;
}
