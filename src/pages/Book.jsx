import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import axios from "axios";

const Book = () => {
    const location = useLocation();
    const bookId = location.state;
    const [book, setBook] = useState({});

    useEffect(() => {
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
    }, [])

    return (
        <div className = "bg-red-700 p-4 mt-6 grid grid-cols-[3fr_2fr]">

            <div className = "flex flex-col justify-between gap-1">
                <div className = "flex flex-col gap-3 text-orange-300">
                    <h1 className = "text-5xl font-bold">{book.title}</h1> 
                    <div className = "flex gap-2 items-center">
                        <FaPenNib />
                        <p className = "text-white font-bold">By</p>
                        <p className = "font-semibold">{book.author}</p>
                    </div>
                </div>

                <p className = "whitespace-pre-line text-orange-300">{book.desc}</p>

                <p className = " text-orange-300">Rs. {book.price}/-</p>

                <div className = "flex justify-between">
                    <button className = "bg-yellow-400 rounded-md w-40 h-10">
                        Add to Cart
                    </button>

                    <button className = "bg-orange-500 rounded-md w-40 h-10">
                        Buy Now
                    </button>
                </div>
            </div>

            {/* To give padding we have to use an extra div */}
            <div className = "grid p-10">
                <img src = {book.cover ? book.cover : "https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg"} alt = "" className = "justify-self-end self-start max-h-[50%] max-w-[50%] rounded-lg" />
            </div>

        </div>
    )
}

export default Book;