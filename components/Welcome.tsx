import { useRef } from 'react';
import LOGO from "../public/Logo.png";
import Image from 'next/image';

const Welcome: React.FC = () => {
  const nextPageRef = useRef<HTMLDivElement>(null); // Specify the type for useRef

  const scrollToNextPage = () => {
    nextPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="h-[100vh] flex flex-col align-center justify-center">
        <div className="flex justify-center">
          <Image
            src={LOGO}
            alt="Logo" // 'alt' attribute for accessibility
            width={300}
            height={300} // Specify height to avoid layout shift
          />
        </div>

        <div className="flex justify-center">
          <button onClick={scrollToNextPage} className="pt-[50px] our-font flex justify-center">
            <div className="links">
              Next
            </div>
          </button>
        </div>
      </div>
      {/* This div acts as the anchor for scrolling */}
      <div ref={nextPageRef}></div> 
    </div>
  );
};

export default Welcome;
