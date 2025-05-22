import { useDispatch } from "react-redux";
import { useMenuContext } from "../../../../contexts/menuContext";
import Categories from "./category/category";
import MealSlider from "./dishes/meal";
import { close } from "../../features/modal";

function MenuAndMeal() {
  
  const dispatch = useDispatch();

  const { category, findComboGroup } = useMenuContext()
  
  return (
    <div>
      <Categories category={category} />
      <MealSlider findComboGroup={findComboGroup} onClick={() => dispatch(close())} category={category} />
    </div>
  );
}

export default MenuAndMeal;