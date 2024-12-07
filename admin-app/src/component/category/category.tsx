import "../../App.css";
import * as service from "../../services/categories";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../types/categories";
import { Request } from "../../utils/http";

function Category() {
  const [value, setValue] = useState<CategoryType[] | undefined>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentLimit, _] = useState<number>(5);

  const [totalPage, setTotalPage] = useState<number>(1);
  /* show get All */

  const categoryApiAll = async () => {
    const { data } = await service.getApiCategoriesAll();
    return setValue(data);
  };

  useEffect(() => {
    categoryApiAll();
  }, []);

  /* Pagination  */
  const pagination = async () => {
    await Request.get<CategoryType>(`api/v1/product`, {
      params: {
        page: `${currentPage}`,
        limit: `${currentLimit}`,
      },
    }).then((res) => {
      setValue(res.data.data);
      return setTotalPage(res.data.pagination.totalPage);
    });
  };
  useEffect(() => {
    pagination();
  }, [currentPage]);

  const pageNumbers = [];
  const len = pageNumbers.length;
  const uniqueUrl = new Date().getTime();

  for (let i = 1; i <= Math.ceil((totalPage - 1) * currentLimit); i++) {
    console.log();
    pageNumbers.push(i);
  }

  const renderCenter = pageNumbers.map((id) => {
    return (
      <>
        {totalPage > 1 && (
          <li key={id} onClick={() => handlePagination(id)} className="page-item  border border-gray-300 rounded-md  py-2 m-1 disabled">
            <a className="page-item px-3 py-3 text-blue-600 hover:text-blue-800" rel="prev">
              {id}
            </a>
          </li>
        )}
      </>
    );
  });

  const handlePagination = (id: number) => {
    if (id !== len || id !== 0) {
      setCurrentPage(id);
    } else {
      return setCurrentPage(currentPage);
    }
  };

  const handleDelete = async (id: number) => {
    await service.deleteApiCategoriesId(id);
    categoryApiAll();
  };

  return (
    <div className="category">
      <div className="header">
        <h1 className="ml-2 text-lg font-bold">Category List</h1>
      </div>
      <Link to="/createCategories">
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
            {value?.map((item, id) => (
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
                  <Link to={`/viewsCategories/${item.id}/${item.handle}/${uniqueUrl}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-800 p-2 ml-2 rounded-lg text-white">view</button>
                  </Link>
                  <Link to={`/updateCategories/${item.id}/${item.handle}/${uniqueUrl}`}>
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
        <ul className="pagination fixed top-[90%] right-[7%]  flex justify-center">
          <li onClick={() => setCurrentPage(currentPage - 1)} className="page-item  border border-gray-300 rounded-md  py-2 m-1 disabled">
            <a className="page-item px-3 py-3 text-blue-600 hover:text-blue-800" rel="prev">
              prev
            </a>
          </li>
          {renderCenter}
          <li onClick={() => setCurrentPage(currentPage + 1)} className="page-item  border border-gray-300 rounded-md  py-2 m-1 disabled">
            <a className="page-link px-3 py-3 text-blue-600 hover:text-blue-800" rel="prev">
              next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Category;
