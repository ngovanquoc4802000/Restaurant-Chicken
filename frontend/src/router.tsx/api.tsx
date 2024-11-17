import axios from "axios";
import { useEffect, useState } from "react";

interface Api {
  image: string
}
function APiExample() {
  const [uploadStatus, setUploadStatus] = useState<Api[]>([])
  const [image, setImage] = useState<Api>()
  const handleFile = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    const result = await axios.post(
      "http://localhost:7777/api/image",formData, 
      {
          headers: {"Content-Type": "multipart/form-data"},
      }
      )
      console.log(result);
  }
  const getApiAll = async() =>  {
    try {
        await axios.get("http://localhost:7777/api")
       .then(res => {
        console.log(res.data.data)
        setUploadStatus(res.data.data)
       })
       .catch(error => console.log(error))
    } catch(error) {
      console.log(error)

    }
   }
  useEffect(() => {
    getApiAll()
  },[])

  const onChangeFile = (e: { target: { files: any }; }) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }
  return (
    <div className="api">
      <form action="" onSubmit={handleFile}>
        {
          uploadStatus.map((item,id) => (
            <div key={id}>
              <img src={`http://localhost:7777/${item.image}`} alt="image"  width={100} height={50}  />
            </div>
          ))
        }
        <input type="file" name="file" accept="image/*" onChange={onChangeFile} multiple={false}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default APiExample;