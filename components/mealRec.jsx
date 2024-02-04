import React, { useState } from "react";
import mealsData from "../app/data/mealsData.json";
import Image from 'next/image';
import LOGO from "../public/Logo.png";
import GroceryList from "./GroceryList.jsx";
import Link from "next/link";

const MealRec = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isGroceryListVisible, setIsGroceryListVisible] = useState(false);
  const [groceryListItems, setGroceryListItems] = useState([]);
  const [addedMeals, setAddedMeals] = useState(new Set());
  const [totalCost, setTotalCost] = useState(0);
  const [meals, setMeals] = useState(0);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal.meal_name === selectedMeal?.meal_name ? null : meal); // Toggle visibility on click
  };

  const toggleGroceryListVisibility = () => {
    setIsGroceryListVisible(!isGroceryListVisible);
  };
  
  const addToGroceryList = (ingredients) => {
    setGroceryListItems((prevItems) => {
      // Combine the new ingredients with the existing items, avoiding duplicates
      return [...new Set([...prevItems, ...ingredients])];
    });
    }
    const toggleMealInGroceryList = (mealData) => {
      const newAddedMeals = new Set(addedMeals);
      let newTotalCost = totalCost;
  
      if (addedMeals.has(mealData.meal_name)) {
          // Meal is being removed from grocery list
          newTotalCost -= mealData.average_price; // Subtract meal's price from total cost once
          setMeals(meals - 1);
  
          const updatedGroceryListItems = groceryListItems.filter(item => 
              !mealData.ingredients.some(ingredient => ingredient === item));
          setGroceryListItems(updatedGroceryListItems);
  
          newAddedMeals.delete(mealData.meal_name);
      } else {
          // Meal is being added to grocery list
          newTotalCost += mealData.average_price; // Add meal's price to total cost
          setMeals(meals + 1);
          const updatedGroceryListItems = [...groceryListItems];
          mealData.ingredients.forEach(ingredient => {
              if (!updatedGroceryListItems.includes(ingredient)) {
                  updatedGroceryListItems.push(ingredient);
              }
          });
          setGroceryListItems(updatedGroceryListItems);
  
          newAddedMeals.add(mealData.meal_name);
      }
      setTotalCost(newTotalCost); // Update total cost
      setAddedMeals(newAddedMeals);
  };
  
    

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="p-[20px]">
        <Link href="/" passHref>
            <Image
                src={LOGO}
                alt="Logo" // Remember to provide an alt attribute for accessibility
                width={100}
                height={100} // Specify the height to match the width or as needed
                style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer on hover
            />
        </Link>
        </div>
      {mealsData.college_student_meals.map((mealData, index) => (
        <React.Fragment key={index}>
          <div
            className="p-4 m-4 rounded-lg bg-white cursor-pointer flex justify-between w-[300px]"
            onClick={() => handleMealClick(mealData)}
            style={{
              transition: 'all 0.3s ease', // Smooth transition for background color
              backgroundColor: selectedMeal?.meal_name === mealData.meal_name ? '#f0f0f0' : 'white', // Grey background when selected
              maxWidth: '350px', // Ensure the meal div does not stretch too wide
              width: '100%', // Use full width available
              boxSizing: 'border-box', // Ensure padding is included in the width
            }}
          >
            <div className="our-font text-[15px]">{mealData.meal_name}</div>
            <div className="our-font">${mealData.average_price}</div>
          </div>
          {selectedMeal?.meal_name === mealData.meal_name && (
            <div
              style={{
                maxHeight: '800px', // Maximum height with overflow
                overflowY: 'scroll', // Allow vertical scrolling
                transition: 'max-height 0.5s ease-in-out', // Smooth transition for expanding effect
                backgroundColor: '#f0f0f0', // Match background color
                width: '300px', // Match the width of the meal div
                borderRadius: '0 0 8px 8px', // Rounded corners at the bottom only
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: add shadow for depth
              }}
            >
              <ul className="list-disc list-inside our-font text-[12px] p-4 pl-[50px]">
                {mealData.ingredients.map((ingredient, ingredientIndex) => (
                  <li key={ingredientIndex}>{ingredient}</li>
                  
                  
                ))}
                
              </ul>
              <div className="flex justify-center">

                <button onClick={() => toggleMealInGroceryList(mealData)} className="p-2 bg-blue-500 our-font text-white rounded m-2">
            {addedMeals.has(mealData.meal_name) ? 'Remove from Grocery List' : 'Add to Grocery List'}
          </button>
              </div>
              
            </div>
            
          )}
        </React.Fragment>
      ))}

    <GroceryList 
  isVisible={isGroceryListVisible} 
  toggleVisibility={toggleGroceryListVisibility}
  items={groceryListItems}
  totalCost={totalCost} // Pass the grocery list items as props
  meals={meals}
/>
    
    </div>
  );
};

export default MealRec;
