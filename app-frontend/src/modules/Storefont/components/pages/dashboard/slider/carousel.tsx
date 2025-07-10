import { useRef, useState, useEffect } from "react"; // Import useEffect
import Button from "$/common/button/button";

const images: string[] = [
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Party.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Combo99k.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GWP.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/BurgergaYo.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/TNAG.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Zestival.webp?v=LZrXEL",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/XotCham.webp?v=gMDK54",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/DV07.webp?v=gVryPg",
];

function Carousel() {
  const [carousel, setCarousel] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const prevSlide = () => {
    setCarousel((prevCarousel) => (prevCarousel - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCarousel((prevCarousel) => (prevCarousel + 1) % images.length);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carousel]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const minSwipeDistance = 50;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;

    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <div className="cursor-pointer pt-[3.75rem] md:w-full lg:w-full md:pt-0 relative overflow-hidden">
      <div
        style={{ transform: `translateX(-${carousel * 100}%)` }}
        className="h-[230px] md:h-full lg:h-full flex transition-transform duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full block flex-shrink-0 object-cover"
          />
        ))}
      </div>
      <Button
        onClick={prevSlide}
        text="❮"
        className="cursor-pointer top-[60%] absolute md:top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10" // Thêm z-index
      />
      <Button
        onClick={nextSlide}
        text="❯"
        className="cursor-pointer top-[60%] absolute md:top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10" // Thêm z-index
      />
    </div>
  );
}

export default Carousel;
