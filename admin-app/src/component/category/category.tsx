import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

type CategoryType = {
  id: number;
  name: string;
  handle: string;
  image: string;
  data: CategoryType[];
};

function Category() {
  const [value, setValue] = useState<CategoryType[]>([]);

  const categoryApi = () => {
    axios
      .get<CategoryType>("http://localhost:7777/category")
      .then((res) => {
        setValue(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    categoryApi();
  }, []);

  return (
    <div
      className="category 
        "
    >
      <div className="header">
        <h1 className="ml-2 text-lg font-bold">Category List</h1>
      </div>
      <button className="ml-2 text-md font-bold border-2 p-2  rounded-lg hover:bg-blue-800 hover:text-white ">
        <FontAwesomeIcon icon={faPlus} className="" />
        <span className="ml-2">Add New Category</span>
      </button>
      <div className="grid p-2">
        <table className="">
          <thead>
            <tr className=" border-neutral-800 text-center ">
              <th className="border-2">ID</th>
              <th className="border-2">NAME</th>
              <th className="border-2">HANDLE</th>
              <th className="border-2">IMAGE</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {value.map((item, id) => (
              <tr className=" text-center border-2" key={id}>
                <td className="border-2">{item.id}</td>
                <td className="border-2">
                  {item.name}
                  <FontAwesomeIcon className="ml-2" icon={faPenToSquare} />
                </td>
                <td className="border-2 ">{item.handle}</td>
                <td className="border-2 text-center ">
                  <img className="w-80 h-80" src={`http://localhost:7777/${item.image}`} alt="image" />
                </td>
                <td className="">
                  <Link to="">
                    <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">view</button>
                  </Link>
                  <Link to="">
                    <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">edit</button>
                  </Link>
                  <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
