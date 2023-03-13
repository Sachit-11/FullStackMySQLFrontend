import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { ImCross } from "react-icons/im";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState({
    title: "",
    author: "",
    desc: "",
    price: "",
    cover: "",
  });
  
  const bookId = location.state;
  const [formErrors, setFormErrors] = useState({});
  const [newImageChosen, setNewImageChosen] = useState(false);

  useEffect(() => {
    if (bookId){
      const fetchBook = async () => {
        try{
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/${bookId}`);
          setBook(res.data[0]);
        }
        catch(err){ 
          console.log(err);
        }
      }
      fetchBook();
    }
  }, [bookId])

  const validate = (e) => {
    const errors = {};

    if (e.target.title.value === ""){
      errors.title = "Title is Required!";
    }

    if (e.target.author.value === ""){
      errors.author = "Author is Required!";
    }

    if (e.target.price.value === ""){
      errors.price = "Price is Required!";
    }

    if (Number(e.target.price.value) < 0){
      errors.price = "Price can't be negative";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length != 0){
      return false;
    }

    return true;
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        // e.target is same as reader (it is a better practice to use e.target) reason: closures (outer function has returned), see in Notebook
        setBook(curr => ({...curr, coversrc : e.target.result}))
      };
  
      // after the file has been read it calls onload handler
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleChange = (e) => {
    setBook(curr => ({...curr, [e.target.name]: e.target.value}));
  }

  const uploadFile = (e) => {
    setNewImageChosen(true);
    readURL(e.target);
    setBook(curr => ({...curr, cover : e.target.files[0]}))
  }
  
  const handleRemoveImage = (e) => {
    // To stop form from reopening
    e.preventDefault();
    // removing the book's cover
    setBook(curr => ({...curr, cover : ""}))
    setNewImageChosen(false);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (validate(e)){
      // FormData is used when we have input type = file
      const formData = new FormData();
      // We need to include parameters seperately as file will not get passed if already exists
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('desc', book.desc);
      formData.append('price', book.price);
      formData.append('cover', book.cover);
      // console.log([...formData])

      try{
        await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/${bookId}`, formData);
        navigate("/");
      }
      catch(err){
        setFormErrors(curr => ({...curr, file : err.response.data.message}))
      }
    }
  }
  
  return (
    <form onSubmit = {handleClick} className = "justify-self-center self-start flex flex-col pt-10 gap-10">

      <h1 className = "bold text-3xl self-center">Update New Book</h1>
      
      <input type = "text" placeholder = "title" name = "title" onChange = {handleChange} className = "border-b-2" value = {book.title} />  
      {formErrors.title && <div className = "text-red-600" > {formErrors.title} </div>}

      <input type = "text" placeholder = "author" name = "author" onChange = {handleChange} className = "border-b-2" value = {book.author} />  
      {formErrors.author && <div className = "text-red-600" > {formErrors.author} </div>}

      <textarea type = "text" placeholder = "desc" name = "desc" onChange = {handleChange} className = "border-b-2 resize overflow-hidden" value = {book.desc} />

      <input type = "number" placeholder = "price" name = "price" onChange = {handleChange} className = "border-b-2" value = {book.price} />
      {formErrors.price && <div className = "text-red-600" > {formErrors.price} </div>}

      <input type = "file" id = "cover" name = "cover" onChange = {uploadFile} className = "border-b-2 hidden" accept = "image/*"/>

      <label htmlFor = "cover" className = "flex gap-4 items-center">
        <p>Choose Image:</p> 

        {book.cover ?
          <div className = "relative">
            <img src = { newImageChosen ? book.coversrc : book.cover} alt = "" className = "h-16 b-16" /> 
            <button type = "button" className = "absolute -top-[6px] -right-[6px] text-red-700" onClick = {handleRemoveImage}>
              <ImCross /> 
            </button>
          </div>
          :
          <span className = "border-2 p-2 cursor-pointer">Upload Image</span>
        }
      </label>

      {formErrors.file && <div className = "text-red-600" > {formErrors.file} </div>}

      <button className = "bg-green-500 rounded-md p-2">
        Update
      </button>

    </form>
  )
}
  
export default Update;