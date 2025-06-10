import CategoryPage from "../category";
import DishShesPage from "../dishshes";
import { useHomePages } from "../../../../../hooks/menu_page/useHomePages";

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
