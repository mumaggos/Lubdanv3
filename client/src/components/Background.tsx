export default function Background() {
  return (
    <>
      {/* Background container with fixed positioning */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-background to-background" />
        
        {/* Radial gradient glow (center) */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        }} />
        
        {/* Top glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 opacity-20" style={{
          backgroundImage: 'radial-gradient(ellipse 1000px 400px at 50% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 80%)',
        }} />
        
        {/* Subtle grid pattern using SVG */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-5"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Floating blob 1 (top-left) */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        
        {/* Floating blob 2 (bottom-right) */}
        <div 
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        
        {/* Accent line (top) */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
