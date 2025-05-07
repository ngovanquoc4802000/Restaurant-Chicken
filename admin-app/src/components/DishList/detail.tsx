import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import queriesCategories from "../../queries/categories";
import queriesDishlist from "../../queries/dishlist";
import { postApiDishlist, updateApiDishList } from "../../services/dishlist";
import { DishTs } from "../../types/dishlist";
import Button from "../button/button";
import "./Dishlist.scss";

interface DetailsTs {
  onHideModal: () => void;
  idDetail: number | undefined | null;
}

const initialState: DishTs = {
  name: "",
  title: "",
  currency: "VND",
  price: "",
  description: "",
  images: [{ alt_text: "", image: "" }],
  category_id: "",
};

const DetailDishlist = ({ onHideModal, idDetail }: DetailsTs) => {
  const [value, setValue] = useState<DishTs>(initialState);

  const queryClient = useQueryClient();

  const { data: stateCategory } = useQuery({ ...queriesCategories.list });

  const { data: details } = useQuery(queriesDishlist.detail(idDetail));

  const isEdit = idDetail !== null && idDetail !== undefined;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    createOrUpdateDishList();
  };

  const createOrUpdate = useCallback(async () => {
    return isEdit && typeof idDetail === "number" ? await updateApiDishList(idDetail, value) : await postApiDishlist(value);
  }, [isEdit, value, idDetail]);

  const { isPending, mutate: createOrUpdateDishList } = useMutation({
    mutationFn: createOrUpdate,

    onSuccess: (data: DishTs) => {
      queryClient.invalidateQueries({ queryKey: queriesDishlist.list.queryKey });

      queryClient.setQueryData(queriesDishlist.list.queryKey, (update: DishTs[] | undefined | null) => {
        /* nếu không update được thì trả về [] */

        if (!update) return [];

        /* trả về dữ liệu mới */
        return update.map((item) => (item.id === idDetail ? { ...item, ...data } : item));
      });

      // Cập nhật detail món mới nhé đẩu
      if (idDetail) {
        queryClient.setQueryData(queriesDishlist.detail(idDetail).queryKey, data);
      }
      setValue(initialState);

      onHideModal();
    },
    onError: (error) => {
      console.error("Error during create/update", error);
    },
  });

  useEffect(() => {
    return isEdit && details ? setValue(details) : setValue(initialState);
  }, [details, idDetail, isEdit, queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (id: number, newValue: string) => {
    setValue((prev) => {
      const updateImages = [...prev.images];

      updateImages[id] = { alt_text: "", image: newValue };

      return { ...prev, images: updateImages };
    });
  };

  const addImageField = () => {
    setValue((prev) => ({
      ...prev,
      images: [...prev.images, { alt_text: "", image: "" }],
    }));
  };

  return (
    <div className="create-dish-form-overlay">
      <div className="create-dish-form">
        <h1>Create New Dish</h1>
        {isPending && <h1>Save...</h1>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category_id">Category:</label>
            <select id="category_id" name="category_id" value={value.category_id} onChange={handleInputChange} required>
              <option value={""}>Select Category</option>
              {stateCategory?.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={value.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" title="title" value={value.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" name="currency" value={value.currency} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={value.price} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={value.description} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image Link:</label>
            {value.images.map((item, index) => (
              <div className="imageUrl" key={index}>
                <input
                  type="text"
                  name="image"
                  placeholder="...URL"
                  className="image"
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  value={item.image || ""}
                  required
                />
                {item.image && <img src={item.image} alt={`Preview ${index}`} />}
              </div>
            ))}
            <button type="button" className="addImage" onClick={addImageField}>
              + Add Image
            </button>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button" disabled={isPending}>
              {idDetail ? "Update" : "Save"}
              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            <Button action="cancel" onClick={onHideModal} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default DetailDishlist;
