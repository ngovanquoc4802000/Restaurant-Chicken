import { useQueryClient } from "@tanstack/react-query";
import { updateCategoryId } from "../../services/categories";
import type { ValueCategory } from "../../types/categories";
import queriesCategories from "../../queries/categories";

interface DetailTs {
  item: ValueCategory;
  handleEditClick: (id: number | undefined) => void;
}
const DetailStatusCategory = ({ item, handleEditClick }: DetailTs) => {
  const queryClient = useQueryClient();

  const handleDeactivate = async (id: number | undefined | null) => {
    const findActive = queryClient
      .getQueryData<ValueCategory[]>(queriesCategories.list.queryKey)
      ?.find((item) => item.id === id);

    if (!findActive) return;

    try {
      const updated = { ...findActive, status: !findActive.status };

      const updateCategory = await updateCategoryId(id, updated);

      if (updateCategory)
        queryClient.invalidateQueries({
          queryKey: queriesCategories.list.queryKey,
        });
    } catch (error) {
      console.error("Error deactivating category:", error);
    }
  };

  return (
    <>
      <button
        className="py-[6px] mr-1 px-[15px] cursor-pointer rounded-[4px] text-white "
        data-id={item.id}
        onClick={() => handleEditClick(item.id)}
          style={{
          backgroundColor: item.status ? "blue" : "#6c757d",
          cursor: item.status ? "pointer" : "not-allowed",
        }}
      >
       {item.status ? "Edit" : "Locked"}
      </button>
      <button
        className={`text-white border-none rounded-[4px] cursor-pointer py-1.5 px-3`}
        disabled={false}
        onClick={() => handleDeactivate(item.id)}
        style={{
          backgroundColor: item.status ? "#dc3545" : "#6c757d",
          cursor: item.status ? "pointer" : "not-allowed",
        }}
      >
        {item.status ? "Deactivated" : "Deactivate"}
      </button>
    </>
  );
};

export default DetailStatusCategory;
