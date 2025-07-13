 export default function TwoColumnRow({ leftContent, rightContent }: { leftContent: React.ReactNode; rightContent: React.ReactNode }) {
  return (
    <section className="two-column-row">
      <div className="column left">{leftContent}</div>
      <div className="column right">{rightContent}</div>
    </section>
  );
}
