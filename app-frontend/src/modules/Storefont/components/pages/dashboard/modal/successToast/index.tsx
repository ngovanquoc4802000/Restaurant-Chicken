import { useEffect, useState } from "react";
import "./styles.scss";
interface SuccessToastTs {
  message: string;
  duration?: number;
  onClose: () => void;
}
function SuccessToast({ message, duration = 4000, onClose }: SuccessToastTs) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  if (!isVisible) return undefined;
  return (
    <div
      className="
    absolute bottom-[15rem] left-1/2 -translate-x-1/2 z-50
    bg-[#00bfa5] text-white
    w-[90%] max-w-[360px]
    px-4 py-3 sm:px-5 sm:py-4
    rounded-lg shadow-xl
    flex items-center gap-3
    animate-fade-in-up
    transition-all duration-300 ease-in-out
  "
    >
      <div className="bg-white text-[#00bfa5] rounded-full p-1 sm:p-1.5 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <span className="flex-1 break-words text-sm sm:text-base font-medium">{message}</span>

      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-1 text-white hover:text-gray-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default SuccessToast;
