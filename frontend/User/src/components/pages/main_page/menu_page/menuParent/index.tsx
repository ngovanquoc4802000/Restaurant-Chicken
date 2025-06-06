import { useHomePages } from "../../../../../hooks/useHomePages";
import CategoryPage from "../category";
import DishShesPage from "../dishshes";

function MenuAndMealPage() {
  const { category, findComboGroup } = useHomePages();
  return (
    <div className="menuAndMeal">
      <div className="menuAndMeal">
        <CategoryPage category={category} />
        <DishShesPage findComboGroup={findComboGroup} category={category} />
      </div>
    </div>
  );
}

export default MenuAndMealPage;
