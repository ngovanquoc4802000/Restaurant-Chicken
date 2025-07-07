import { useRef, useState } from "react";
import Button from "$/common/button/button";
const images: string[] = [
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Party.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Combo99k.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GWP.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/BurgergaYo.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/TNAG.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Zestival.webp?v=LZrXEL",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/XotCham.webp?v=gMDK54",
];
function Carousel() {
  const [carousel, setCarousel] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = () => {
    setCarousel((carousel - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCarousel((carousel + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };
  return (
    <div className="cursor-pointer pt-15  md:w-full lg:w-full md:pt-0  relative  overflow-hidden">
      <div
        style={{ transform: `translateX(-${carousel * 100}%)` }}
        className="h-[230px] md:h-full lg:h-full flex transition-transform duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt="" className="w-full  h-auto block flex-shink-0" />
        ))}
      </div>
      <Button
        onClick={prevSlide}
        text="❮"
        className="cursor-pointer top-[66.66667%] absolute md:top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      />
      <Button
        onClick={nextSlide}
        text="❯"
        className="cursor-pointer top-[66.66667%] absolute md:top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      />
    </div>
  );
}

export default Carousel;
