import React, { useState } from 'react';

const GroceryList = ({ isVisible, toggleVisibility, items, totalCost, meals }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isGroceryListVisible, setIsGroceryListVisible] = useState(false);
    const [groceryListItems, setGroceryListItems] = useState([]);
    const averageCost = meals > 0 ? (totalCost / meals).toFixed(2) : 0.00;
  
    const addToGroceryList = (ingredients) => {
      setGroceryListItems((prevItems) => {
        // Combine the new ingredients with the existing items, avoiding duplicates
        return [...new Set([...prevItems, ...ingredients])];
      });
      // Calculate average cost, handling division by zero
    
    }
// Then in your JSX


    return (
      <div
        className={`grocery-list bg-[#0199a1] ${isVisible ? 'visible' : ''}`}
        onClick={toggleVisibility} // Assuming you want to toggle visibility on click
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: isVisible ? '100vh' : '40px',
          backgroundColor: '#ffffff',
          transition: 'height 0.5s ease',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <div className="tab br-[50%] our-font text-[30px]" style={{textAlign: 'center', cursor: 'pointer'}}>
          {/* Tab Content */}
          <h2 className="text-[#0199a1]">
          {isVisible ? 'Grocery List' : 'Grocery List'}
          </h2>
        </div>
        <div className="w-[390px] h-[800px] pt-[40px] bg-[#0199a1] flex justify-center items-start our-font text-white">
  {isVisible && (
    <div className="bg-white w-[300px] rounded-lg p-4" style={{ minWidth: '300px' }}> {/* Adjust minWidth as needed */}
      <ul className="list-disc list-inside pl-[20px]"> {/* Adjust padding as needed */}
        {items.map((item, index) => (
          <li key={index} className="text-black text-[16px]">{item}</li> 
        ))}
      </ul>
      <div className="flex flex-col justify-center text-center mt-[20px] p-[20px] bg-[#0199a1] rounded-lg">
        <div>

        Total Cost: ${totalCost.toFixed(2)}
        </div>
        <div>

        Meals: {meals.toFixed(0)}
        </div>
        <div>Average Cost: ${averageCost}</div>
      </div>
    </div>
  )}

</div>

      </div>
    );
  };
  export default GroceryList;
  