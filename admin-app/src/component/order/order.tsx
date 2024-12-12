import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../services/order";
import { DishListFace, OrderDetails, PayloadOrder } from "../../types/dishlist";

function Order() {
  const [arrayAll, setArrayAll] = useState<DishListFace[]>([]);

  const [payload, setPayload] = useState<PayloadOrder>({
    address: "",
    customer_name: "",
    customer_note: "",
    customer_phone: "",
    list_order: [],
  });

  const navigator = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    order();
    navigator("/dishlist");
  };

  const order = async () => {
    const { data } = await orderApi(payload);
    console.log(data);
    return setPayload({
      ...data,
      address: payload.address,
      customer_name: payload.customer_name,
      customer_note: payload.customer_note,
      customer_phone: payload.customer_phone,
      list_order: payload.list_order.push(data),
    });
  };

  const UploadOrder = (orderDetail: OrderDetails) => {
    const newCheck = payload.list_order.filter((item) => {
      if (item.id_dishlist !== orderDetail.id_dishlist) {
        console.log(orderDetail.id_dishlist);
      } else {
        return false;
      }
    });
    return newCheck;
  };

  const getOrderDish = async () => {
    const { data } = await axios.get<DishListFace>(`http://localhost:7777/dishlist`);
    return setArrayAll(data.data);
  };

  useEffect(() => {
    getOrderDish();
  }, []);

  const onChangeInput = (e: { target: { name: string; value: string } }) => {
    setPayload((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className=" ">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden  border rounded-lg border-gray-300">
            <div className="px-6 py-4">
              <label
                className=" mb-4
            block text-gray-700
            text-sm
            font-bold mb-2"
                htmlFor="name"
              >
                Address
              </label>
              <input
                onChange={onChangeInput}
                className=" mb-4
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
              <label
                className=" mb-4
            block text-gray-700
            text-md
            font-bold mb-2"
                htmlFor="name"
              >
                Customer Name
              </label>
              <input
                onChange={onChangeInput}
                className=" mb-4
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
              <label
                className=" mb-4
            block text-gray-700
            text-md
            font-bold mb-2"
                htmlFor="name"
              >
                Customer Note
              </label>
              <input
                onChange={onChangeInput}
                className=" mb-4
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
              <label
                className="
            block text-gray-700
            text-sm
            font-bold mb-2"
                htmlFor="name"
              >
                Customer Phone
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

            <table className="table-auto min-w-full rounded-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className="">
                    <div className="flex items-center py-5 px-5 ">
                      <input
                        type="checkbox"
                        value=""
                        className="w-5 h-5
                        border border-gray-300
                        rounded-md mr-2 hover:border-indigo-500 
                        hover:bg-indigo-100 checked:bg-no-repeat
                        checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                      />
                    </div>
                  </th>
                  <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                    User ID
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                  >
                    Title
                  </th>
                  <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                    content
                  </th>
                  <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                    Price
                  </th>
                  <th scope="col" className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 ">
                {arrayAll?.map((item, id) => (
                  <tr key={id} className="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td className="">
                      <div className="flex items-center py-5 px-5 ">
                        <input
                          onClick={UploadOrder}
                          type="checkbox"
                          className="w-5 h-5 
                          border border-gray-300
                          rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100
                          checked:bg-no-repeat checked:bg-center
                          checked:border-indigo-500 checked:bg-indigo-100"
                        />
                      </div>
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.id} </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {item.title} </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {item.content}</td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {item.price} VND</td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <input type="number" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  );
}

export default Order;
