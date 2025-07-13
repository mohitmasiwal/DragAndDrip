 export default function ImageGrid({ images }: { images: string[] }) {
  return (
    <section className="image-grid">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`Image ${idx + 1}`} />
      ))}
    </section>
  );
}
