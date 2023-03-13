import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Books = () => {

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  // reload the page when a book is deleted
  const [reload, setReload] = useState(true);
  
  useEffect(() => {
    const fetchAllBooks = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}`);
        setBooks(res.data);
      }
      catch(err){ 
        console.log(err);
      }
    }
    fetchAllBooks();
  }, [reload])
  
  const handleDelete = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_BACKEND_SERVER}/${id}`);
      setReload(!reload);
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className = "flex flex-wrap gap-10 justify-between pt-4 px-4">
      {books?.map((book) => {
        return(
          <div key = {book.id} className = "flex flex-col gap-5 w-60">
            
            <img src = {book.cover ? book.cover : "https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg"} alt = "" className = "h-72 hover:cursor-pointer" onClick = {() => { navigate("/book", {state: book.id})}} />

            <h2>Title: {book.title}</h2>
            <h2>Author: {book.author}</h2>
            <p className = "overflow-hidden text-ellipsis whitespace-nowrap">Desc: {book.desc ? book.desc : "No description available"}</p>
            <p>Rs. {book.price}</p>

            <button onClick = {() => { navigate("/update", {state: book.id})}} className = "bg-orange-500 p-2 rounded-md">
              Update
            </button>

            <button onClick = {() => handleDelete(book.id)} className = "bg-red-600 p-2 rounded-md">
              Delete
            </button>

          </div>
        )
      })} 
    </div>
  )
}
  
export default Books;