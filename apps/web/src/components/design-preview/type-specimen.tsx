interface TypeSpecimenProps {
  label: string;
  meta: string;
  sample: string;
  sampleClassName: string;
}

export function TypeSpecimen({
  label,
  meta,
  sample,
  sampleClassName,
}: TypeSpecimenProps) {
  return (
    <div className="grid gap-6 border-t border-line py-7 md:grid-cols-[10rem_1fr] md:items-start">
      <div>
        <p className="text-sm font-semibold text-graphite">{label}</p>
        <p className="mt-1 text-xs text-steel tabular-nums">{meta}</p>
      </div>
      <p className={`${sampleClassName} max-w-[26ch] text-pretty`}>{sample}</p>
    </div>
  );
}
