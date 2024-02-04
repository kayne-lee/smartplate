import { useRef, useEffect, useState } from 'react';

const Nutrition = () => {
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

  const [items, setItems] = useState([
    { id: 1, text: 'High Protein', isChecked: false },
    { id: 2, text: 'Low Calories', isChecked: false },
    { id: 3, text: 'High Calories', isChecked: false },
    { id: 4, text: 'Diabetic', isChecked: false },
    { id: 5, text: 'Keto', isChecked: false },
    { id: 6, text: 'Low Carbs', isChecked: false },
    { id: 7, text: 'High Carbs', isChecked: false },
    { id: 8, text: 'No Restrictions', isChecked: false },
  ]);

  const handleCheck = (id) => {
    if (id === 8) {
      setItems(items.map(item => {
        if (item.id === 8) {
          // Toggle "No Restrictions" only
          return { ...item, isChecked: !item.isChecked };
        } else {
          // Ensure all other items are unchecked
          return { ...item, isChecked: false };
        }
      }));
    } else {
      setItems(items.map(item => {
        if (item.id === 8) {
          // Uncheck "No Restrictions" if any other item is checked
          return { ...item, isChecked: false };
        } else if (item.id === id) {
          // Toggle the isChecked status of the selected item
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      }));
    }
  };

  const getSelectedOptions = () => {
    return items
      .filter(item => item.isChecked)
      .map(item => item.text)
      .join(', ');
  };

  const handleNone = (id) => {
    setItems(items.map(item => {
      if (id === 8) { // Assuming 'No Restrictions' has id 8
        return id === item.id ? { ...item, isChecked: !item.isChecked } : { ...item, isChecked: false };
      } else {
        return item.id === 8 ? { ...item, isChecked: false } : (item.id === id ? { ...item, isChecked: !item.isChecked } : item);
      }
    }));
  };
  

  return (
    <div className="">
      <div className="h-[100vh] flex flex-col  align-center justify-center">
        <div>
          <h1 className="text-center text-[28px]">What kind of nutrional goals do you have?</h1>
        </div>
      <div className="flex justify-center align-items flex-wrap -mx-2 pt-[50px]">
      {items.map((item) => (
        <div key={item.id} className={`w-1/2 p-2 ${items[7].isChecked && item.id !== 8 ? 'disabled' : ''}`}>
          <label className="flex items-center pl-[20px] h-10 our-font text-white">
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleCheck(item.id)}
              className="mr-2"
              disabled={items[7].isChecked && item.id !== 8} // Disable checkbox if 'No Restrictions' is checked
            />
            {item.text}
          </label>
        </div>
      ))}

        <div className="w-full p-2 pl-[30px]">
            <p className="pt-[40px]">Selected Options: {getSelectedOptions()}</p>
        </div>
        </div>
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
export default Nutrition;