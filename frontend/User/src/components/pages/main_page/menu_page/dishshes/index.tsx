import { useState } from "react";
import type { ValueCategory } from "../../../../../mockup/categories";
import type { DishTs } from "../../../../../mockup/dishlist";
import Button from "../../../common/button";

interface DishMealPageTs {
  findComboGroup: DishTs[];
  category: ValueCategory[];
}

function DishShesPage({ findComboGroup, category }: DishMealPageTs) {
  const [startIndex, setStartIndex] = useState(0);

  const next = () => {
    if (startIndex + visibleItems < category.length) {
      setStartIndex(prev => prev + visibleItems);
    }
  };

  const previous = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - visibleItems);
    }
  };
  const visibleItems = 1;

  const translateX = `translateX(-${(50 / visibleItems) * startIndex}%)`;
  return (
    <div>
      <h2 className="text-[22px] md:text-2xl lg:text-3xl ml-8 font-black">CÓ THỂ BẠN SẼ THÍCH MÓN NÀY</h2>
      <div className="meal-suggestion-section__container flex items-center relative overflow-hidden">
        <Button text="&lt;" onClick={previous} className="meal-suggestion-section__button meal-suggestion-section__button--prevabsolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center" />
        <div className="meal-suggestion-section__viewport w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out flex-nowrap"
            style={{ transform: translateX }}
          >
            {findComboGroup?.map((meal) => (
              <div
                key={meal.id}
                className="
              meal-suggestion-card cursor-pointer w-[222px] p-4 transition-all duration-300 box-border
              flex-shrink-0 
               sm:w-[50%] md:w-1/3 lg:w-1/4"
              >
                <div className="meal-suggestion-card__image">
                  <img
                    className="meal__image w-full"
                    src={meal.images[0]?.image || ""}
                    alt={meal.title}
                  />
                </div>
                <div className="meal-suggestion-card__info min-h-[143px] md:min-h-[215px] lg:min-h-[215px]">
                  <h3 className="font-semibold text-base">{meal.title}</h3>
                  <p className="text-sm">
                    {meal.price}
                    <strong className="ml-1">{meal.currency}</strong>
                  </p>
                  <p className="text-sm">{meal.description}</p>
                </div>
                <Button text="Thêm" className="meal-add mt-2 py-3 px-4 border-none w-full text-white bg-red-500 rounded-full hover:bg-red-600" />
              </div>
            ))}
          </div>
        </div>
        <Button text="&gt;" onClick={next} className="meal-suggestion-section__button meal-suggestion-section__button--next  z-10 absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center" />
      </div>
    </div>
  );
}

export default DishShesPage;