import { Link, useParams } from "react-router-dom";
import '../../styles/content.scss';
import axios from "axios";
import { useEffect, useState } from "react";

type Edit = {
  id?: number
  title: string
  content: string
  price: string
}

function EditDishList() {
  const [valueEdit, setValueEdit] = useState<Edit>({
    title: "",
    content: "",
    price: ""
  });
  const { id } = useParams();
  const handleSubmitEdit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

  }

  const getEditId = () => {
    axios.get('http://localhost:7777/dishlist/' + id)
      .then(res => {
        setValueEdit(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getEditId();
  }, [])
  console.log(id);
  const submit = () => {
    axios.put('http://localhost:7777/dishlist/' + id, {
      title: valueEdit.title,
      content: valueEdit.content,
      price: valueEdit.price,
    })
      .then(res => {
        setValueEdit({
          ...valueEdit,
          title: res.data.title,
          content: res.data.content,
          price: res.data.price
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div onSubmit={handleSubmitEdit} className="cardEdit">
      <h1 className='titleEdit'>Dish List</h1>
      <div className="card-bodyEdit" >
        <div className="formEdit">
          <label className="labelEdit" htmlFor="">Title :</label>
          <input className="inputEdit" onChange={(e) => setValueEdit({ ...valueEdit, title: e.target.value })} value={valueEdit.title} type="text" name="title" />
        </div>
        <div className="formEdit">
          <label htmlFor="">Content :</label>
          <input className="inputEdit" onChange={(e) => setValueEdit({ ...valueEdit, content: e.target.value })} value={valueEdit.content} type="text" name="content" />
        </div>
        <div className="formEdit">
          <label htmlFor="">Price :</label>
          <input className="inputEdit" onChange={(e) => setValueEdit({ ...valueEdit, price: e.target.value })} value={valueEdit.price} type="text" name="price" placeholder="0.00" />
        </div>
        <div className="incre" >
          {/* <p>-</p> */}
          <span></span>
        </div>
        <div className="buttonEdit">
          <Link onClick={submit} className="submitEdit" to="/dishlist">
            Submit
          </Link>
          <Link className="backEdit" to="/dishlist">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditDishList;