import { useState } from "react";

function ImageCarousel({ selectedListing }) {
  const images = selectedListing?.ImageURL || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
   <div className="relative w-full flex justify-center items-center overflow-hidden">
  <img
    src={images[currentIndex]?.replace(
      "/upload/",
      "/upload/f_auto,q_auto,h_350/"
    )}
    alt={`Painting ${currentIndex + 1}`}
    className="w-auto h-auto max-w-full object-contain"
  />

  {images.length > 1 && (
    <>
      <button
        onClick={handlePrev}
        className="absolute left-2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
      >
        ←
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
      >
        →
      </button>
    </>
  )}
</div>
  );
}

export default ImageCarousel;