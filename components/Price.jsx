import { useRef, useEffect, useState } from 'react';
import Slider from './Slider';

const Price = () => {
  const nextPageRef = useRef(null);

  // Disable scrolling by adding a CSS class to the body
  useEffect(() => {
    document.body.classList.add('no-scroll');

    // Cleanup function to re-enable scrolling when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const scrollToNextPage = () => {
    // Remove the class that prevents scrolling
    document.body.classList.remove('no-scroll');

    if (nextPageRef.current) {
      nextPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  
  return (
    <div className="">
      <div className="h-[100vh] flex flex-col  align-center justify-center">
        <h1 className="text-center text-[28px] font-renogare">What is your budget?</h1>
        <p className="text-center pt-[50px]">Select your budget on a scale of 1 to 3, 1 being super strict and 3 being lenient</p>
        <Slider />
        <div className="flex justify-center">
        <button onClick={scrollToNextPage} className="pt-[50px] our-font flex justicy-center">
          <div className="links">
            Next
          </div>
          </button>
          </div>
      </div>
      {/* Ensure this div is at the top of the next page/content */}
      <div ref={nextPageRef}></div> 
    </div>
      
  );
};
export default Price;