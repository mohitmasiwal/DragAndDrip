type Props = {
  images: { image: { url: string } }[];
};

export default function ImageGrid({ images }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    }}>
      {images.map((item, index) => (
        <img key={index} src={item.image.url} alt={`Grid ${index}`} />
      ))}
    </div>
  );
}
