import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import Filter from "../components/Filter";
import { getFilterValues } from "../utils/filters";
import Pagination from "../components/Pagination";
import AutoSuggest from "../components/AutoSuggest.jsx";

import { BsFilter } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const navigate = useNavigate();

    // books is books after filteration
    const [books, setBooks] = useState([]);
    // Filters values
    const searchQuery = useSelector((state) => state.searchQuery.value);

    // reload when a book is deleted
    const [reload, setReload] = useState(true);

    // When to show filters
    const [showSearch, setShowSearch] = useState(false);
    
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(1);

    // ref for form
    const Ref = useRef();

    useEffect(() => {
        // Fetching all the books initially
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
    }, [reload]);

    // Delete a book
    const handleDelete = async (id) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_SERVER}/${id}`);
            setReload(!reload);
        }
        catch(err){
            console.log(err);
        }
    } 

    // For fetching the books according to the filter
    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = getFilterValues(searchQuery);
        if (e.target.title.value != ''){
            values['title'] = e.target.title.value;
        }
        if (e.target.author && e.target.author.value != ''){
            values['author'] = e.target.author.value;
        }
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/search`, {params: values});
        setBooks(res.data);
        // resetting the current page
        setCurrentPage(1);
    }
    
    // Get currentBooks
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const maxPageNumber = Math.ceil(books.length / booksPerPage);

    // For the Pagination Component (child)
    const setCurrentPageHandler = (pageNo) => {
        setCurrentPage(pageNo);
    }

    return (
    <div className = "flex flex-col gap-2 justify-start mt-6">
        
        <form ref = {Ref} className = "flex flex-col gap-2" onSubmit = {handleSubmit}>
            {/* Auto Suggest on Typing Book Name */}
            <div className = "flex">
                <AutoSuggest Ref = {Ref} by = "title" />
                <button className = "w-1/12 px-4 self-start pt-3 flex justify-center"><FcSearch className = "h-5 w-5" /></button>
            </div>

            <div className = "bg-[#EDF2F7] rounded-md p-2 pb-0 justify-self-start max-h-44 mb-3 w-11/12">
                {/* Search Bar */}
                <div className = "flex justify-center items-center gap-4 text-black text-lg font-extrabold cursor-pointer pb-2 border-[#E2E8F0] border-b-[1px]" onClick = { () => {setShowSearch(!showSearch)} }>
                    <h1>Filters</h1>
                    <BsFilter />
                </div>

                {/* Filter Options */}
                {showSearch && <Filter /> }
            </div>
        </form>
  
        {/* Display book */}
        <div className = "w-4/5 grid grid-cols-3 px-20 py-6">
            {currBooks?.map((currBook) => {
            return(
                <div key = {currBook.id} className = "flex flex-col gap-3 w-60">      
                    <img src = {currBook.cover ? currBook.cover : "https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg"} alt = "" className = "h-60 cursor-pointer" onClick = {() => {navigate("/book", {state: currBook.id})}} />

                    <h2>Title: {currBook.title}</h2>
                    <h2>Author: {currBook.author}</h2>

                    <p className = "overflow-hidden text-ellipsis whitespace-nowrap">Desc: {currBook.desc ? currBook.desc : "No description available"}</p>
                    <p>Rs. {currBook.price}</p>

                    <button onClick = {() => { navigate("/update", {state: currBook.id})}} className = "bg-orange-500 p-2 rounded-md">
                        Update
                    </button>

                    <button onClick = {() => handleDelete(currBook.id)} className = "bg-red-600 p-2 rounded-md">
                        Delete
                    </button>
                </div>
            )
            })} 
        </div>
        
        {/* Pagination Box */}
        <Pagination currentPage = {currentPage} maxPageNumber = {maxPageNumber} setCurrentPageHandler = {setCurrentPageHandler} />
    </div>
    )
}

export default Search;