import { useState } from "react";
import Button from "../../common/button";
const images: string[] = [
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Party.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Combo99k.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GWP.webp?v=g99R2g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/BurgergaYo.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/TNAG.webp?v=4Boe0g",
  "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Zestival.webp?v=LZrXEL"
]
function Carousel() {
  const [carousel, setCarousel] = useState(0);
  
  const prevSlide = () => {
    setCarousel((carousel - 1 + images.length) % images.length);
  }

  const nextSlide = () => {
    setCarousel((carousel + 1) % images.length);
  }
  return (
    <div className="cursor-pointer pt-21 md:pt-0 relative w-full overflow-hidden">
      <div style={{ transform: `translateX(-${carousel * 100}%)` }} className="flex transition-transform duration-500 ease-in-out">
        {images.map((src, index) => (
          <img key={index} src={src} alt="" className="w-full flex-shink-0" />
        ))}
      </div>
      <Button onClick={prevSlide} text="❮" className="cursor-pointer top-[66.66667%] absolute md:top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" />
      <Button onClick={nextSlide} text="❯" className="cursor-pointer top-[66.66667%] absolute md:top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"/>
    </div>
  );
}

export default Carousel;