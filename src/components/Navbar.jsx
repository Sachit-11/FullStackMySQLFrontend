// import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BiBookAdd } from "react-icons/bi";
import { FcSearch } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { setEntry } from "../redux/entry";
import { useSelector, useDispatch } from "react-redux";

import Entry from "./Entry";

const Navbar = () => {
  // const [icon, setIcon] = useState(true);
  const isUser = useSelector((state) => state.isUser.value);
  const entry = useSelector((state) => state.entry.value);
  const dispatch = useDispatch();

  const handleClick = (type) => {
    dispatch(setEntry([true, type]));
  }

  return (
    <div className = "flex justify-between items-center">
      <Link to = "/">
        <h1 className = "font-bold cursor-pointer">SG Book Shop</h1>
      </Link>
      <div className = "flex justify-between items-center gap-5">
        <Link to = "/">
          <IoHome className = "hover:scale-125" />
        </Link>
        <Link to = "/add">
          <BiBookAdd className = "hover:scale-125" />
        </Link>
        <Link to = "/search">
          <FcSearch className = "hover:scale-125" />
        </Link>
        {isUser ? 
          <button>
            <FaUserCircle />
          </button> : 
          <>
            <button className = "px-3 py-2 bg-black text-white font-semi-bold rounded-md" onClick = {() => {handleClick("Sign In")}}>Sign In</button>
            <button className = "px-3 py-2 bg-black text-white font-semi-bold rounded-md" onClick = {() => {handleClick("Sign Up")}}>Sign Up</button>
          </>
        }
      </div>
      {entry[0] && <Entry />}
      {/* <button onClick = { () => {setIcon(!icon)} }>
        {icon ? <GiHamburgerMenu/> : <ImCross/>}
      </button> */}
    </div>
  )
}

export default Navbar;
