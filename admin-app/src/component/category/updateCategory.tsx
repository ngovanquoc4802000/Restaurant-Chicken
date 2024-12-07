import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as service from "../../services/categories";
import { UpdateFormFace } from "../../types/categories";

function UpdateCategories() {
  const [value, setValue] = useState<UpdateFormFace>({
    name: "",
    handle: "",
  });

  const { id } = useParams();

  const [image, setImage] = useState<File | string>("");

  const EditCategoryId = async () => {
    const { data } = await service.updateCategoryId(id);
    const newDate = data !== undefined ? setValue(data) : undefined;
    return newDate;
  };

  useEffect(() => {
    EditCategoryId();
  }, []);

  const navigator = useNavigate();

  const handlefiels = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", value?.name);
    formData.append("handle", value?.handle);
    const result = await axios.put<UpdateFormFace>(`http://localhost:7777/category/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigator("/category");
    console.log(result);
  };

  const onChangeInput = (e: { target: { name: string; value: string } }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImage(target.files[0]);
  };

  return (
    <div className="category">
      <div
        onSubmit={handlefiels}
        className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl"
      >
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
            <h2 className="mb-5 text-4xl font-bold text-blue-900">Update Profile</h2>
            <div className="text-center">
              <div>
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Profile Picture"
                  className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                />
                <input type="file" name="profile" id="upload_profile" />

                <label htmlFor="upload_profile" className="inline-flex items-center">
                  <svg
                    data-slot="icon"
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </label>
              </div>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300"></button>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                onChange={onChangeInput}
                name="name"
                type="text"
                className="w-full px-3
                      py-2 border 
                       border-gray-300 rounded-md
                        focus:ring-indigo-500
                         focus:border-indigo-500"
                value={value.name}
              />
            </div>
            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-gray-700">
                Handle
              </label>
              <input
                onChange={onChangeInput}
                name="handle"
                type="text"
                className="w-full px-3
                      py-2 border 
                       border-gray-300 rounded-md
                        focus:ring-indigo-500
                         focus:border-indigo-500"
                value={value.handle}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <form className="FormFields" action="">
          <h2 style={{ marginRight: "4rem" }}>Edit Category</h2>
          <label htmlFor="">
            Name:
            <input value={value.name} onChange={onChangeInput} name="name" type="text" />
          </label>
          <br />
          <label htmlFor="">
            Handle:
            <input value={value.handle} onChange={onChangeInput} name="handle" type="text" />
          </label>
          <br />
          <input onChange={onChangeFile} type="file" name="file" accept="image/*" multiple={false} />
          <button type="submit" className="createPost">
            Submit
          </button>
          <Link to="/category">
            <button className="createBack">Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default UpdateCategories;
