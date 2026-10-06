interface TokenSwatchProps {
  color: string;
  hex: string;
  name: string;
  role: string;
  dark?: boolean;
}

export function TokenSwatch({
  color,
  dark = false,
  hex,
  name,
  role,
}: TokenSwatchProps) {
  return (
    <div className="grid min-h-52 grid-rows-[1fr_auto] border border-line bg-white">
      <div
        className={`p-5 ${dark ? "text-white" : "text-graphite"}`}
        style={{ backgroundColor: color }}
      >
        <span className="text-sm font-semibold">{name}</span>
      </div>
      <div className="grid gap-1 border-t border-line p-4">
        <span className="text-sm font-semibold text-graphite tabular-nums">{hex}</span>
        <span className="text-xs leading-5 text-steel">{role}</span>
      </div>
    </div>
  );
}
