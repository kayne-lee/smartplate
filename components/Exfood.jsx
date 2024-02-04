import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Exfood = () => {


  const [items, setItems] = useState([
    { id: 1, text: 'Spaghetti', isChecked: false },
    { id: 2, text: 'Herb Chicken and Potatoes', isChecked: false },
    { id: 3, text: 'Classic Omelette', isChecked: false },
    { id: 4, text: 'Quesadillas', isChecked: false },
    { id: 5, text: 'Fried Rice', isChecked: false },
    { id: 6, text: 'Greek Salad', isChecked: false },
    { id: 7, text: 'Turkey Cheese Sandwhich', isChecked: false },
    { id: 8, text: 'Chicken/Beef Fajitas', isChecked: false },
  ]);

  const handleCheck = (id) => {
    setItems(items.map(item => {
      return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
    }));
  };

  const getSelectedOptions = () => {
    return items
      .filter(item => item.isChecked)
      .map(item => item.text)
      .join(', ');
  };
  

  return (
    <div className="">
      <div className="h-[100vh] flex flex-col  align-center justify-center">
        <div>
          <h1 className="text-center text-[28px]">Food Preferences</h1>
          <p className="text-center">Select at least 3</p>
        </div>
      <div className="flex justify-center align-items flex-wrap -mx-2 pt-[50px]">
      {items.map((item) => (
        <div key={item.id} className={`w-1/2 p-2 `}>
          <label className="flex items-center pl-[20px] h-10 our-font text-white">
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleCheck(item.id)}
              className="mr-2"
              
            />
            {item.text}
          </label>
        </div>
      ))}

        <div className="w-full p-2 pl-[30px]">
            <p className="pt-[40px]">Selected Options: {getSelectedOptions()}</p>
        </div>
        </div>
        <div className="flex pt-[50px] our-font align-center justify-center text-center">
          <Link href="/food">
            <div className="links-one">See Meals!</div>
          </Link>
        </div>
        <div className="flex pt-[50px] our-font align-center justify-center text-center">
          <Link href="/chatbot">
            <div className="links-one">Go to chatbot!</div>
          </Link>
        </div>

      </div>
    </div>
      
  );
};
export default Exfood;