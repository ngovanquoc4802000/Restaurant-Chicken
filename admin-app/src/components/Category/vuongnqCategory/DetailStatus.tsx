import { useQueryClient } from "@tanstack/react-query";
import queriesCategories from "../../../queries/categories";
import { updateCategoryId } from "../../../services/categories";

const UpdateStatusDetail = ({ idDetail }: { idDetail: number | null | undefined }) => {
  const queryClient = useQueryClient();

  // Lấy dữ liệu chi tiết của category từ queryClient nếu có idDetail
  const item = queryClient.getQueryData(queriesCategories.list.queryKey)?.find((item) => item.id === idDetail);

  const handleDeactivate = async (id: number | undefined | null) => {
    try {
      if (!item) return;
      const updated = { ...item, status: !item?.status };

      const updatedCategory = await updateCategoryId(id, updated);

      if (updatedCategory) {
        queryClient.invalidateQueries({ queryKey: queriesCategories.list.queryKey });
      }
    } catch (error) {
      console.error("Error deactivating category:", error);
    }
  };

  if (!item) return null;
  return (
    <button
      disabled={item.status === false}
      onClick={() => handleDeactivate(item.id)}
      style={{
        backgroundColor: item.status ? "#dc3545" : "#6c757d",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: item.status ? "pointer" : "not-allowed", // pointer nếu click được
      }}
    >
      {item.status ? "Deactivated" : "Deactivate"}
    </button>
  );
};

export default UpdateStatusDetail;
