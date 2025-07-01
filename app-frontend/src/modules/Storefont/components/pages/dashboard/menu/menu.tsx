import { useMenuContext } from "$/modules/Storefont/contexts/menuContext";
import { useDispatch } from "react-redux";
import { close } from "../../features/modal";
import Categories from "./category/category";
import MealSlider from "./dishes/meal";

function MenuAndMeal() {
  const dispatch = useDispatch();

  const { category, findComboGroup } = useMenuContext();

  return (
    <div>
      <Categories category={category} />
      <MealSlider findComboGroup={findComboGroup} onClick={() => dispatch(close())} category={category} />
    </div>
  );
}

export default MenuAndMeal;
