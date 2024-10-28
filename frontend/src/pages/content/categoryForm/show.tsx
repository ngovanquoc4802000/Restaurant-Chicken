import { useState, useEffect } from "react";
import axios from "axios";
interface Post {
  id:number
  name: string,
  email: string,
  handle: string,
  address: string,
}
function ShowForm() {
  const [list, setList] = useState<Post[]>([])
  const getCategoryAll = async () => {
    await axios.get('http://localhost:7777/category')
      .then(res => {
        setList(res.data.data)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getCategoryAll()
  }, [])
  return (
    <div className="showForm">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Handle</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((lists, id) => (
              <tr key={id}>
                <th>{lists.id}</th>
                <th>{lists.name}</th>
                <th>{lists.handle}</th>
                <th>{lists.email}</th>
                <th>{lists.address}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>);
}

export default ShowForm;