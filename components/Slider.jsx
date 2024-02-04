// Import necessary hooks from React
import { useState } from 'react';

const Slider = () => {
  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState(1); // Default to 1 or your preferred default option

  // Handler for when the slider value changes
  const handleSliderChange = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  const optionMap = {
    1: '$0-$100',
    2: '$100-$200',
    3: '$200+'
  };

  return (
<div className="flex flex-col items-center w-full pt-[40px]">
    <div className="w-[250px] relative">
    <input
        type="range"
        min="1"
        max="3"
        value={selectedOption}
        onChange={handleSliderChange}
        step="1"
        className="w-full"
    />
    </div>
    <div className="flex our-font text-white w-[292px] mt-2 text-[12px]">
        <span>$0-$100</span>
        <span className="pl-[64px]">$100-$200</span>
        <span className="pl-[73px]">$200+</span>
    </div>
  <p className="pt-[40px]">Selected Option: {optionMap[selectedOption]}</p>
</div>
  );
};

export default Slider;
