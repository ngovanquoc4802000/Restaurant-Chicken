import { Link } from "react-router-dom";
import { DishListFace } from "../../types/dishlist";
import { useEffect, useState } from "react";
import axios from "axios";

function DishList() {
  const [array, setArray] = useState<DishListFace[] | undefined>([]);

  const getDishAll = async () => {
    const res = await axios.get<DishListFace>(`http://localhost:7777/dishlist`);
    return setArray(res.data.data);
  };

  useEffect(() => {
    getDishAll();
  }, []);

  return (
    <div className="bg-slate-100 p-6 dark:bg-gray-800">
      <div className="relative">
        <div className="absolute -inset-5">
          <div
            className="w-full
           h-full max-w-sm mx-auto
            lg:mx-0 opacity-30 blur-lg 
            bg-gradient-to-r from-yellow-400 
            via-pink-500 to-green-600"
          ></div>
        </div>
        <Link
          to={`/dishlist/create`}
          title=""
          className="relative 
          z-10 inline-flex 
          items-center justify-center w-full px-2 py-2 
          text-md font-bold text-white
           transition-all duration-200 bg-gray-900 border-2 
           border-transparent sm:w-auto rounded-xl font-pj
            hover:bg-gray-600
             focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-gray-900"
          role="button"
        >
          + Add New
        </Link>
        <Link
          to={`/dishlist/showAll`}
          title=""
          className="absolute right-4 z-10 inline-flex items-center
           justify-center w-full px-2 py-2 text-mg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
        >
          Show all
        </Link>
      </div>
      <div className="text-center text-2xl capitalize  font-medium tracking-wider dark:text-white">
        <h2>we sell quality women handbags</h2>
      </div>
      {/* content dishlist product */}
      <div className="w-fit gap-6 mx-auto grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
        {array?.map((item, id) => (
          <div key={id} className="w-64 shadow-md dark:bg-gray-700 hover:scale-105 duration-300 hover:shadow-xl">
            <div className="p-4 ">
              <img
                className="rounded-lg h-32 w-full"
                src="https://images.unsplash.com/photo-1605733513597-a8f8341084e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxiYWd8ZW58MHwwfHx8MTcxODM4NDYwNHww&ixlib=rb-4.0.3&q=80&w=1080"
              />
            </div>
            <div className="p-4 capitalize text-xl dark:text-white">
              <h2 className="font-bold">{item.title}</h2>
              <span className="text-sm">{item.content}</span>
            </div>
            <div className="flex justify-between dark:text-white p-4 capitalize text-xl font-medium">
              <div>
                <h3>Price</h3>
              </div>
              <div>
                <h3>{item.price} VND</h3>
              </div>
            </div>
            <div className="p-2">
              <button className="uppercase text-white text-xl font-bold text-center rounded-lg bg-blue-500 p-2 w-full">buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishList;
