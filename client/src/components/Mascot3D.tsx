export default function Mascot3D() {
  return (
    <div className="relative w-full max-w-[300px] lg:max-w-[450px] h-[350px] lg:h-[500px] flex items-center justify-center mx-auto">
      {/* Static Mascot - optimized AVIF */}
      <picture>
        <source srcSet="/images/leprechaun-lubdan.avif" type="image/avif" />
        <img 
          src="/images/leprechaun-lubdan.png" 
          alt="Lubdan Mascot" 
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          width="450"
          height="500"
        />
      </picture>
    </div>
  );
}
