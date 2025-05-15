import { useState } from "react";
import type { DishTs } from "../../../../../mockup/dishlist";
import type { ValueCategory } from "../../../../../mockup/categories";

interface MealSliderTs {
  findComboGroup: DishTs[];
  onClick: () => void;
  category: ValueCategory[];
}

function MealSlider({ findComboGroup, onClick, category }: MealSliderTs) {
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
    <>
      <h2>CÓ THỂ BẠN SẼ THÍCH MÓN NÀY</h2>
      <div className="meal-suggestion-section__container flex items-center relative ">

        <button className="meal-suggestion-section__button meal-suggestion-section__button--prev" onClick={previous}>
          &lt;
        </button>
        <div className="meal-suggestion-section__viewport overflow-hidden w-full">
          <div
            className="meal-suggestion-section__grid flex transition-transform duration-500 ease-in-out flex-nowrap"
            style={{ transform: translateX }}
          >
            {findComboGroup?.map((meal) => (
              <div key={meal.id} className="meal-suggestion-card p-4 transition-all duration-300 w-1/4 box-border" style={{ flex: "0 0 25%" }}>
                <div className="meal-suggestion-card__image">
                  <img className="meal__image w-full" src={meal.images[0]?.image || ""} alt={meal.title} />
                </div>
                <div className="meal-suggestion-card__info min-h-[215px]">
                  <h3>{meal.title}</h3>
                  <p>{meal.price}
                    <strong style={{ marginLeft: "5px" }}>{meal.currency}</strong>
                  </p>
                  <p>{meal.description}</p>
                </div>
                <button onClick={onClick} className="meal-add py-[12px] px-[12px] border-none w-full text-white rounded-[50px]">Thêm</button>
              </div>
            ))}
          </div>
        </div>
        <button className="meal-suggestion-section__button meal-suggestion-section__button--next" onClick={next}>
          &gt;
        </button>
      </div>
    </>

  );
}

export default MealSlider;