import { useQueryClient } from "@tanstack/react-query";
import queriesCategories from "../../queries/categories";
import { updateCategoryId } from "../../services/categories";
import { ValueCategory } from "../../types/categories";

interface DetailTs {
  item: ValueCategory;
}
const DetailStatusCategory = ({ item }: DetailTs) => {
  const queryClient = useQueryClient();

  const handleDeactivate = async (id: number | undefined | null) => {
    /* lấy dữ liệu  */
    const findActive = queryClient.getQueryData<ValueCategory[]>(queriesCategories.list.queryKey)?.find((item) => item.id === id);
    if (!findActive) return;
    try {
      const updated = { ...findActive, status: !findActive.status };

      const updateCategory = await updateCategoryId(id, updated);

      if (updateCategory) queryClient.invalidateQueries({ queryKey: queriesCategories.list.queryKey });
    } catch (error) {
      console.error("Error deactivating category:", error);
    }
  };
  return (
    <>
      <button
        className="status"
        disabled={item.status === false}
        onClick={() => handleDeactivate(item.id)}
        style={{
          backgroundColor: item.status ? "#dc3545" : "#6c757d",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: item.status ? "pointer" : "not-allowed",
        }}
      >
        {item.status ? "Deactivated" : "Deactivate"}
      </button>
    </>
  );
};

export default DetailStatusCategory;
