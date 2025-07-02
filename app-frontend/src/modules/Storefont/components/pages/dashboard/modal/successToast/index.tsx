import { useEffect, useState } from "react";

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
       fixed bottom-10 md:bottom-10 left-1/2 -translate-x-1/2 z-50
        bg-green-600 text-white 
        w-[92%] max-w-[360px]
        px-3 py-2 sm:px-5 sm:py-3
        rounded-md shadow-md
        flex items-center gap-2
        animate-fade-in-up
        text-sm sm:text-base
     "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="flex-1 break-words">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-1 text-white hover:text-gray-200 focus:outline-none"
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
