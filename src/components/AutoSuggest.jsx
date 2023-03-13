import { useState, useEffect, useRef } from "react";
import axios from "axios";

const AutoSuggest = ({Ref, by}) => {
  // ref for author
  const myRef = useRef();
  // display the suggestions or not
  const [display, setDisplay] = useState(false);
  // search entered by user on basis of which auto complete to be shown
  const [search, setSearch] = useState("");
  // auto complete suggestions
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    // clean up function
    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
    }, []);
    
    const handleClickOutside = (e) => {
      // The contains() method returns true if a node is a descendant of a node.
      // checking if suggest for author or title
      if (!Ref){
        if (!(myRef.current.contains(e.target))){
          setDisplay(false);
        }
      }
      else{
        if (!(Ref.current.contains(e.target))){
          setDisplay(false);
        }
      }
  }

  const handleClick = (e) => {
    setDisplay(true);
    handleChange(e);
  }
  
  const handleChange = (e) => {
    const currSearch = e.target.value;
    setSearch(currSearch);
    setTimeout(async () => {
      if (currSearch){
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/suggest/${by}`, {params: {currSearch: currSearch}});
        setSuggestions(res.data);
      }
      else{
        setSuggestions([]);
      }
    }, 1000);
  }
  
  const chooseSuggestion = (suggestion) => {
    setSearch(suggestion);
    setDisplay(false);
  }

  const handleKeyUp = (e, suggestion) => {
    // User clicks enter on element highlighted by tab
    if (e.key === "Enter"){
      chooseSuggestion(suggestion);
    }
  }

  return (
    <div ref = {myRef} className = {`flex flex-col ${by == "title" ? "w-11/12" : ""} relative`}>
      <input type = "text" placeholder = {by == "author" ? "Search Author Name" : "Search Title Name"} value = {search} 
      name = {by} onClick = {handleClick} onChange = {handleChange} autoComplete = "off" className = "outline-none bg-transparent border-[#d9dfe7] border-[1px] rounded-md p-2 hover:border-[#cacfd5] focus:border-[2px] focus:border-gray-400 z-0" />  

      {display && <div className = "flex flex-col absolute w-full top-11 bg-white z-10">
        {suggestions.map((suggestion, index) => {
          return(
            <div className = "flex justify-center cursor-pointer rounded-md p-2 hover:bg-blue-100" onClick = {() => {chooseSuggestion(suggestion)}} onKeyUp = {(e) => {handleKeyUp(e, suggestion)}} key = {index} tabIndex = "0">
              {suggestion}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default AutoSuggest;