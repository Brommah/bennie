import React from 'react';

/**
 * CRT Scanline overlay effect for the entire page.
 * Creates a moving scanline and static noise texture.
 */
export const ScanlineOverlay: React.FC = () => {
  return (
    <>
      {/* Moving scanline */}
      <div className="scanline-overlay" aria-hidden="true" />
      
      {/* Static noise texture */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
};

export default ScanlineOverlay;



