import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateFormDish } from "../../types/dishlist";

function UpdateDislist() {
  const [value, setValue] = useState<UpdateFormDish>({
    title: "",
    content: "",
    price: "",
  });

  const { id } = useParams();

  const getDishAll = async () => {
    const { data } = await axios.get<UpdateFormDish>(`http://localhost:7777/dishlist/${id}`);
    const isData = data.data !== undefined ? setValue(data.data) : undefined;
    return isData;
  };

  useEffect(() => {
    getDishAll();
  }, []);

  const [image, setImage] = useState<string | File>("");

  const navigator = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", image);

    formData.append("title", value.title);

    formData.append("content", value.content);

    formData.append("price", value.price);

    const result = await axios.put<UpdateFormDish>(`http://localhost:7777/dishlist/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result);
    navigator("/dishlist");
  };

  const onChangeInputForm = (e: { target: { name: string; value: string } }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeFileDish = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setImage(target.files[0]);
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
                Title
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  onChange={onChangeInputForm}
                  value={value.title}
                  name="title"
                  placeholder="title"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
                  sm:text-sm sm:leading-5"
                />
                <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                Content
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <textarea
                  value={value.content}
                  onChange={onChangeInputForm}
                  name="content"
                  placeholder="content"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
                  sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  value={value.price}
                  onChange={onChangeInputForm}
                  name="price"
                  placeholder="price"
                  type="number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300
                  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                  transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                Image
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  onChange={onChangeFileDish}
                  type="file"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  placeholder-gray-400 focus:outline-none
                  focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Update
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDislist;
