import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategoryMutation } from "../../hooks/useCategoryMutation";
import type { ValueCategory } from "../../types/categories";
import queriesCategories from "../../queries/categories";
import Button from "$/common/button/button";

interface DetailTs {
  onHideModal: () => void;
  isDetail: number | null | undefined;
}

const DetailCategory = ({ isDetail, onHideModal }: DetailTs) => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<ValueCategory>({
    name: "",
    handle: "",
    image: "",
    status: true,
  });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { isPending, mutate, isEdit } = useCategoryMutation(isDetail, value, () => {
    setValue({ name: "", handle: "", image: "", status: true });
    onHideModal();
  });

  useEffect(() => {
    if (isEdit && isDetail != null) {
      const list = queryClient.getQueryData<ValueCategory[]>(queriesCategories.list.queryKey);
      const foundCategory = list?.find((item) => item.id === isDetail);
      if (foundCategory) {
        setValue({
          name: foundCategory.name,
          handle: foundCategory.handle,
          image: foundCategory.image,
          status: foundCategory.status,
        });
      }
    } else {
      setValue({
        name: "",
        handle: "",
        image: "",
        status: true,
      });
    }
  }, [isEdit, queryClient, isDetail]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="create-dish-form-overlay fixed top-0 left-0 w-full h-full flex bg-black/50 justify-center items-center z-[1000]  ">
      <div className="create-dish-form bg-white p-[30px] rounded-[8px] shadow-md w-[80%] max-w-[600px] ">
        <h1 className="text-center text-2xl">{isEdit ? "Edit Category" : "Create New Category"}</h1>
        {isPending && <p className="text-center text-blue-400">Saving...</p>}

        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-group mb-3.5">
            <label className="block mb-1.5 mt-1.5 font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full p-1.5 rounded-[4px] text-[16px] border border-solid border-gray-300 "
              type="text"
              name="name"
              placeholder="...Name"
              id="name"
              onChange={handleOnChangeInput}
              value={value.name}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-1.5 mt-1.5 font-bold" htmlFor="handle">
              Handle:
            </label>
            <input
              className="w-full p-1.5 border border-solid border-gray-300  rounded-[4px] text-[16px]"
              type="text"
              name="handle"
              placeholder="...Handle"
              id="handle"
              onChange={handleOnChangeInput}
              value={value.handle}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block mb-1.5 mt-1.5 font-bold">
              Image:
            </label>
            <input
              className="w-full p-1.5 rounded-[4px] text-[16px] border border-solid border-gray-300 "
              type="text"
              name="image"
              placeholder="...URL"
              id="image"
              onChange={handleOnChangeInput}
              value={value.image}
              required
            />
          </div>
          <div className="form-actions flex justify-end gap-2.5 mt-5">
            <button
              type="submit"
              className="save-button bg-[#4caf50] p-2.5 rounded-[4px] text-[#fff] cursor-pointer"
              disabled={isPending}
            >
              {isEdit ? "Update" : "Save"}
              {isPending && <span className="spinner-border spinner-border-sm"></span>}
            </button>
            <Button
              className="px-[8px] cursor-pointer py-[10px] rounded-[4px] text-white bg-[#f44336] cursor-pointer"
              text="cancel"
              onClick={onHideModal}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailCategory;
