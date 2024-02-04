import { useRef, useEffect, useState } from 'react';

const Diet = () => {
  const nextPageRef = useRef(null);
  const [items, setItems] = useState([
    { id: 1, text: 'Lactose Intolerance', isChecked: false },
    { id: 2, text: 'Gluten-Free', isChecked: false },
    { id: 3, text: 'Vegetarian', isChecked: false },
    { id: 4, text: 'Kosher', isChecked: false },
    { id: 5, text: 'Halal', isChecked: false },
    { id: 6, text: 'Seafood-Free', isChecked: false },
    { id: 7, text: 'Nut-Free', isChecked: false },
    { id: 8, text: 'No Restrictions', isChecked: false },
  ]);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleCheck = (id) => {
    setItems(items.map(item => ({
      ...item,
      isChecked: item.id === id ? !item.isChecked : item.id === 8 ? false : item.isChecked,
    })));
  };

  const getSelectedOptions = () => {
    return items
      .filter(item => item.isChecked)
      .map(item => item.text)
      .join(', ');
  };

  const saveSelectedOptionsToLocalStorage = () => {
    const selectedOptions = items.filter(item => item.isChecked).map(item => item.text);
    localStorage.setItem('dietaryRestrictions', JSON.stringify(selectedOptions));
    scrollToNextPage();
  };

  const scrollToNextPage = () => {
    document.body.classList.remove('no-scroll');
    nextPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="h-[100vh] flex flex-col align-center justify-center">
        <h1 className="text-center text-[28px]">What are your dietary restrictions?</h1>
        <div className="flex justify-center align-items flex-wrap -mx-2 pt-[50px]">
          {items.map((item) => (
            <div key={item.id} className={`w-1/2 p-2 ${item.isChecked ? '' : 'disabled'}`}>
              <label className="flex items-center pl-[20px] h-10 text-white">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheck(item.id)}
                  className="mr-2"
                  disabled={items[7].isChecked && item.id !== 8}
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
      <div ref={nextPageRef}></div>
    </div>
  );
};

export default Diet;
