import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import queriesDishlist from "../../queries/dishlist";
import { slugify } from "../../components/pages/dashboard/menu/ultils";

export const useProductDetailsPage = () => {
  const [isActive, setIsActive] = useState(false);

  const { slugProduct } = useParams();

  const {
    isLoading,
    error,
    data: dishlist,
  } = useQuery({ ...queriesDishlist.list });

  const product = dishlist?.find((item) => slugify(item.title) === slugProduct);

const handleOrderClick = () => {
    setIsActive(true);
  };

  return { handleOrderClick  ,isActive, setIsActive, product ,isLoading, error, dishlist, slugProduct };
};
