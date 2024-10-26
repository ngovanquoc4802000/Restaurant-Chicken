import axios from 'axios';
import '../styles/defaultUI.scss'
import { useEffect, useState } from "react";
interface Category {
  map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: number,
  name: string,
  email: string,
  handle: string,
  address: string
}
function Category() {
  const [show, setShow] = useState<Category[]>([])
  useEffect(() => {
    axios.get('http://localhost:7777/category')
      .then(res => {
        setShow(res.data.data)
      }).catch(error => {
        console.log(error)
      })
      return () => {
        console.log("xoas bor")
      }
  }, [])
  return (
    <div className="category">
      <ul>
        {show.map(item => (
          <li key={item.id}>  {/* Add key prop for better performance */}
            <strong>{item.name}</strong>
            <p>{item.email}</p>
            <p>{item.address}</p>
            <p>{item.handle}</p>
          </li>
        ))}
      </ul>
      <form action="">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Handle
            </th>
            <th>
              Email
            </th>
            <th>
              Address
            </th>
          </tr>
        </thead>
      </form>
    </div>
  );
}

export default Category;