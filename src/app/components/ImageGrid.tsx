 export default function ImageGrid() {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150'
  ];

  return (
    <section className="image-grid">
      <h2>This is the Image Grid Block</h2>
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`Grid ${idx + 1}`} />
      ))}
    </section>
  );
}
