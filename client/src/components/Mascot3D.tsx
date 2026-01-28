export default function Mascot3D() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[600px] aspect-[4/5] flex items-center justify-center mx-auto">
      {/* Mascot Image - no animation for faster loading */}
      <picture>
        <source srcSet="/leprechaun-lubdan.avif" type="image/avif" />
        <img 
          src="/leprechaun-lubdan.png" 
          alt="Lubdan Mascot" 
          className="relative w-full h-full object-contain z-20"
          loading="lazy"
        />
      </picture>
    </div>
  );
}
