import { createContext, useContext } from "react";
import type { DishTs } from "../mockup/dishlist";
import type { ValueCategory } from "../mockup/categories";

export const MenuContext = createContext<{
  category: ValueCategory[];
  findComboGroup: DishTs[];
} | null>(null);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContext.Provider");
  }
  return context;
};
