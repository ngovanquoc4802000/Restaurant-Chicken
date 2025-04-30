import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { postApiDishlist, updateApiDishList } from "../../services/dishlist";
import { DishTs } from "../../types/dishlist";
import { useQuery } from "@tanstack/react-query";
import queriesDishlist from "../../queries/dishlist";
import Button from "../button/button";
import queriesCategories from "../../queries/categories";
import "./Dishlist.scss";

interface DetailsTs {
  onHideModal: () => void;
  idDetail: number | undefined | null;
}

const DetailDishlist = ({ onHideModal, idDetail }: DetailsTs) => {
  const [value, setValue] = useState<DishTs>({
    name: "",
    title: "",
    currency: "VND",
    price: "",
    description: "",
    images: [{ alt_text: "", image: "" }],
    category_id: "",
  });
  const queryClient = useQueryClient();

  const { data: stateCategory } = useQuery({ ...queriesCategories.list });

  const isEdit = idDetail !== null && idDetail !== undefined;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createOrUpdateDishList();
  };

  const createOrUpdate = useCallback(async () => {
    if (isEdit && typeof idDetail === "number") {
      return await updateApiDishList(idDetail, value);
    }
    return await postApiDishlist(value);
  }, [isEdit, value, idDetail]);

  const { isPending, mutate: createOrUpdateDishList } = useMutation({
    mutationFn: createOrUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queriesDishlist.list.queryKey });
      setValue({
        name: "",
        title: "",
        currency: "VND",
        price: "",
        description: "",
        images: [{ alt_text: "", image: "" }],
        category_id: "",
      });
      onHideModal();
    },
    onError: (error) => {
      console.error("Error during create/update", error);
    },
  });

  useEffect(() => {
    if (isEdit && idDetail !== null) {
      const list = queryClient.getQueryData<DishTs[]>(queriesDishlist.list.queryKey);

      const update = list?.find((item) => item.id === idDetail);

      if (update) {
        console.log("Set category_id to:", String(update.category_id));
        setValue({
          ...update,
          category_id: String(update.category_id),
          price: update.price.toString(),
        });
      }
    } else {
      setValue({
        name: "",
        title: "",
        currency: "VND",
        price: "",
        description: "",
        images: [{ alt_text: "", image: "" }],
        category_id: "",
      });
    }
  }, [idDetail, isEdit, queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      setValue((prev) => ({
        ...prev,
        images: [{ alt_text: "", image: value }],
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
              <option value={""}>Select Category</option> {/* Giá trị mặc định */}
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
            <input
              type="text"
              name="image"
              placeholder="...URL"
              id="image"
              onChange={handleInputChange}
              value={value.images[0]?.image || ""}
              required
            />
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
