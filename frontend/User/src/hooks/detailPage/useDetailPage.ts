import { useQuery } from "@tanstack/react-query";
import { slugify } from "../../components/pages/category/ultils/slugify";
import queriesDishlist from "../../queries/dishlist";

interface DetailsTs {
  slugProduct: string | undefined;
}

export const useProductDetail = ({ slugProduct }: DetailsTs) => {

  const { isLoading, error, data: dishlist } = useQuery({ ...queriesDishlist.list });

  const product = slugProduct && dishlist?.find(
    (item) => slugify(item.title) === slugProduct
  );

  return { isLoading, error, dishlist, product }
}