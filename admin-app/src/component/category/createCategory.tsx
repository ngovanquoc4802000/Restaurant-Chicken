import * as service from "../../services/categories";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCategoriesType } from "../../types/categories";

function CreateCategory() {
  const [values, setValues] = useState<CreateCategoriesType>({ name: "", handle: "" });

  const [image, setImage] = useState<File | string>("");

  const navigator = useNavigate();

  const handlefiels = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("file", image);

      formData.append("name", values.name);

      formData.append("handle", values.handle);

      await service.postApiCreateCate(formData);

      navigator("/category");
    } catch (_error) {
      console.log("Error onSubmit Create Category ");
    }
  };

  const onChangeInput = (e: { target: { name: string; value: string } }) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    console.log(target.files[0]);

    setImage(target.files[0]);
  };

  return (
    <div className="createCategory">
      <h4 className="font-bold text-lg text-center">Add New Category</h4>
      <form onSubmit={handlefiels} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="
            block text-gray-700
            text-sm
            font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            onChange={onChangeInput}
            className="
            shadow appearance-none
            border rounded w-full
            py-2 px-3 text-gray-700
            leading-tight 
            focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="name"
            placeholder="Inter Name"
          />
        </div>
        <div className="mb-6">
          <label
            className="
           block text-gray-700 text-sm 
           font-bold mb-2"
            htmlFor="handle"
          >
            Handle
          </label>
          <input
            type="text"
            onChange={onChangeInput}
            name="handle"
            className="
           hover:rounded-lg
           shadow appearance-none border   
           rounded w-full py-2 px-3 
           text-gray-700 mb-3 
           leading-tight focus:outline-none 
           focus:shadow-outline"
            placeholder="Enter Handle"
          />
        </div>
        <div className="mb-6">
          <label
            className="
           block text-gray-700 text-sm 
           font-bold mb-2"
            htmlFor="handle"
          >
            Handle
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple={false}
            onChange={onChangeFile}
            className="
            hover:rounded-lg
            shadow appearance-none border   
            rounded w-full py-2 px-3 
            text-gray-700 mb-3 
            leading-tight focus:outline-none 
            focus:shadow-outline"
            placeholder="Enter Handle"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold   
            py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-1">Add New</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
