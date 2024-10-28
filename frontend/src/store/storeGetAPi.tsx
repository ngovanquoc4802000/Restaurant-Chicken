import { useEffect, useState } from "react"
import axios from "axios"
interface Category {
  id: number,
  name: string,
  email: string,
  handle: string,
  address: string
}
function StoreGetApi() {
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
  return (<ul>
    {/*  {show.map(item => (
      <li key={item.id}> 
        <strong>{item.name}</strong>
        <p>{item.email}</p>
        <p>{item.address}</p>
        <p>{item.handle}</p>
      </li>
    ))} */}
  </ul>);
}

export default StoreGetApi;