import axios from "axios";
import * as service from "../../services/categories";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateFormFace } from "../../types/categories";

function UpdateCategories() {
  const [value, setValue] = useState<UpdateFormFace>({
    name: "",
    handle: "",
  });

  const { id } = useParams();

  const [image, setImage] = useState<File | string>("");

  /* const [preview, setPreview] = useState<string | File>(""); */

  const EditCategoryId = async () => {
    try {
      const result = await service.updateGetId(id);
      /*  setValue(result?.data); */
      return result?.data;
    } catch (_) {
      console.log("Error Detail Update Id");
    }
  };
  useEffect(() => {
    EditCategoryId();
  }, []);
  const navigator = useNavigate();
  const handlefiels = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", value?.name);
    formData.append("handle", value?.handle);
    const result = await axios.put<UpdateFormFace>(`http://localhost:7777/category/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigator("/category");
    console.log(result);
  };
  const onChangeInput = (e: { target: { name: string; value: string } }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onChangeFile = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImage(target.files[0]);

    /* const images = URL.createObjectURL(image);

    setPreview(images); */
  };
  return (
    <div className="category">
      <form className="FormFields" onSubmit={handlefiels} action="">
        <h2 style={{ marginRight: "4rem" }}>Edit Category</h2>
        <label htmlFor="">
          Name:
          <input value={value.name} onChange={onChangeInput} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle:
          <input value={value?.handle} onChange={onChangeInput} name="handle" type="text" />
        </label>
        <br />
        <input onChange={onChangeFile} type="file" name="file" accept="image/*" multiple={false} />
        <button type="submit" className="createPost">
          Submit
        </button>
        <Link to="/category">
          <button className="createBack">Back</button>
        </Link>
        {/** 
         * 
        {preview ? (
          <figure>
            <img className="w-40 h-40" src={preview} alt="Preview Image" />
          </figure>
        ) : (
          ""
        )}
          */}
      </form>
    </div>
  );
}

export default UpdateCategories;
