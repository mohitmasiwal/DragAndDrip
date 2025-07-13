type Props = {
  heading: string;
  subtitle: string;
  ctaText: string;
  image: { url: string };
};

export default function TwoColumnRow({ heading, subtitle, ctaText, image }: Props) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h3>{heading}</h3>
        <p>{subtitle}</p>
        <button>{ctaText}</button>
      </div>
      <img src={image.url} width="300" />
    </div>
  );
}
