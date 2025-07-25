import type { ValueCategory } from "$/modules/Storefont/mockup/categories";
import type { DishTs } from "$/modules/Storefont/mockup/dishlist";
import { useState } from "react";
import Button from "$/common/button/button";
import { useSelector } from "react-redux";
import type { RootState } from "$/modules/Storefont/store/store";
interface MealSliderTs {
  findComboGroup: DishTs[];
  onClick?: () => void;
  category: ValueCategory[];
}

function MealSlider({ findComboGroup, category }: MealSliderTs) {
  const [startIndex, setStartIndex] = useState(0);

  const next = () => {
    if (startIndex + visibleItems < category.length) {
      setStartIndex((prev) => prev + visibleItems);
    }
  };
  const rule = useSelector((state: RootState) => state.userLogin.rule);
  const previous = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - visibleItems);
    }
  };
  const visibleItems = 1;

  const translateX = `translateX(-${(80 / visibleItems) * startIndex}%)`;

  return (
    <div className="xl:max-w-[1200px] xl:m-auto ">
      <div className="md:ml-6 ml-2 mt-4 flex">
        <img src="/src/assets/onggia.png" className="" alt="" />
        <h2 className=" ml-0 p-3 md:ml-6 text-[18px] md:text-[30px] lg:text-[25px] mt-[10px] lg:m-[10 px]  font-bold">
          We Think You’ll Love These
        </h2>
      </div>
      <div className="meal-suggestion-section__container flex items-center relative overflow-hidden">
        <Button
          className="meal-suggestion-section__button cursor-pointer z-[1] meal-suggestion-section__button--prevabsolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
          onClick={previous}
          text="&lt;"
        />
        <div className="meal-suggestion-section__viewport w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out flex-nowrap"
            style={{ transform: translateX }}
          >
            {findComboGroup?.map((meal) => (
              <div
                key={meal.id}
                className="meal-suggestion-card ml-[0.5rem] w-[180px] shadow-lg rounded-[3px] p-4 transition-all duration-300 box-border flex-shrink-0 sm:w-[50%] md:w-1/3 lg:w-1/4"
              >
                <div className="meal-suggestion-card__image">
                  <img className="meal__image w-full" src={meal.images[0]?.image || ""} alt={meal.title} />
                </div>
                <div className="meal-suggestion-card__info min-h-[250px] lg:min-h-[160px]">
                  <h3 className="font-semibold text-base">{meal.title}</h3>
                  <p className="text-sm">
                    {meal.price}
                    <strong className="ml-1">{meal.currency}</strong>
                  </p>
                  <p className="text-sm">{meal.description}</p>
                </div>
                {rule === "customer" ? (
                  <Button text="Add" className="w-full p-2 bg-red-600 shadow-md text-white font-bold rounded-[50px]" />
                ) : (
                  <Button text="Add" className="w-full p-2 bg-gray-300 shadow-md text-white font-bold rounded-[50px]" />
                )}
              </div>
            ))}
          </div>
        </div>
        <Button
          className="meal-suggestion-section__button cursor-pointer top-[193px] meal-suggestion-section__button--next  z-[1] absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white text-black font-bold rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
          onClick={next}
          text="&gt;"
        />
      </div>
    </div>
  );
}

export default MealSlider;
