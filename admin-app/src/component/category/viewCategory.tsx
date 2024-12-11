import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
interface Form {
  id?: number;
  image?: string;
  name: string;
  handle: string;
  data?: undefined;
}

function Views() {
  const [get, setGet] = useState<Form | undefined>({ name: "", handle: "" });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get<Form>(`http://localhost:7777/category/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setGet(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="views" style={{ position: "absolute", width: "500px", left: "40%", marginLeft: "-50px" }}>
      <h1 className="text-center text-lg font-bold p-2 bg-blue-800 text-white border-rounded-ld">List Category View</h1>
      {
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">This is some information about the user.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Id</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{get?.id}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{get?.name}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Handle</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{get?.handle}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img width={100} height={100} src={`http://localhost:7777/${get?.image}`} alt="image" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      }
      <Link to="/category">
        <button className="py-2 px-6 hover:bg-blue-800 text-white rounded-lg mt-2 bg-blue-600">Back</button>
      </Link>
    </div>
  );
}

export default Views;
