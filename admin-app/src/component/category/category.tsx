import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Request } from "../../utils/http";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, _] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(0);
  /* show get All */
  const categoryApiAll = async () => {
    try {
      await Request.get<CategoryType>("").then((res) => {
        setValue(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    categoryApiAll();
  }, []);
  /* handlePage Pagination */
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };
  const pagination = async () => {
    try {
      await Request.get<CategoryType>(`api/v1/product`, {
        params: {
          page: `${currentPage}`,
          limit: `${currentLimit}`,
        },
      }).then((res) => {
        setValue(res.data.data);
        return setTotalPage(res.data.pagination.totalPage);
      });
    } catch (error) {
      console.log("pagination + ", error);
    }
  };
  useEffect(() => {
    pagination();
  }, [currentPage]);
  const handleDelete = async (id: number) => {
    try {
      await Request.delete<CategoryType>(`${id}`);
      categoryApiAll();
    } catch (_) {
      console.log("the fail delete");
    }
  };
  return (
    <div className="category">
      <div className="header">
        <h1 className="ml-2 text-lg font-bold">Category List</h1>
      </div>
      <Link to="/create">
        <button className="ml-2 text-md font-bold border-2 p-2  rounded-lg hover:bg-blue-800 hover:text-white ">
          <FontAwesomeIcon icon={faPlus} className="" />
          <span className="ml-2">Add New Category</span>
        </button>
      </Link>
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
                <td className="border-2 flex justify-center  ">
                  <img className="w-40 h-25 border-1" src={`http://localhost:7777/${item.image}`} alt="image" />
                </td>
                <td className="">
                  <Link to="">
                    <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">view</button>
                  </Link>
                  <Link to="">
                    <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPage > 0 && (
          <ReactPaginate
            containerClassName="pagination fixed top-[90%] right-[7%]  flex justify-center"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            previousLabel="< "
            pageClassName="page-item
               bg-white border border-gray-300
                rounded-md  py-2 m-1"
            previousClassName="  page-item  border border-gray-300 rounded-md  py-2 m-1"
            nextClassName="page-item bg-white border border-gray-300 rounded-md  py-2 m-1"
            breakClassName="page-item bg-white border border-gray-300 rounded-md px-3 py-2 m-1"
            previousLinkClassName="page-item px-3 py-3 text-blue-600 hover:text-blue-800 "
            /* page-link */
            pageLinkClassName="page-link px-3 py-3 m-1 hover:text-white text-blue-600 hover:text-blue-800"
            nextLinkClassName="page-link px-3 py-3 text-blue-600 hover:text-blue-800"
            breakLabel="..."
            breakLinkClassName="page-link px-3 py-3 text-blue-600 hover:text-blue-800"
            activeClassName="bg-blue-500 text-white font-bold rounded-md"
          />
        )}
      </div>
    </div>
  );
}

export default Category;
