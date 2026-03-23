export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label-vertical select-none" aria-hidden="true">
      {children}
    </span>
  );
}
