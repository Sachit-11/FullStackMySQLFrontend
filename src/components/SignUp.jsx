import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {BiShow, BiHide} from "react-icons/bi";
import "./sign.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validate = (e) => {
    const errors = {};

    if (e.target.email.value === ""){
      errors.email = "E-mail is Required!";
    }

    else if (!e.target.email.validity.valid){
      errors.email = "E-mail is Invalid";
    }

    if (e.target.username.value === ""){
      errors.username = "Username is Required!";
    }

    if (e.target.password.value === ""){
      errors.password = "Password is Required!";
    }

    else if (e.target.password.value.length < 5){
      errors.password = "Password should be minimum 5 characters!";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length != 0){
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(e)){
      
    }
  }

  return (
    <form className = "px-8 p-6 flex flex-col gap-3" onSubmit = {handleSubmit} noValidate>
      
        <div className = "flex justify-start items-center border-[1px] gap-2 field focus-within:border-blue-300 rounded-md">
            <label htmlFor = "email" className = "fieldLabel pl-2 py-3">
            <FaUser />
            </label>
            <input type = "email" id = "email" name = "email" placeholder = "E-mail" autoComplete = "off" className = " w-full rounded-md outline-none focus:placeholder:text-gray-600"/>
        </div>
        {formErrors.email && <div className = "text-red-600 -mt-1" > {formErrors.email} </div>}

        <div className = "flex justify-start items-center border-[1px] gap-2 field focus-within:border-blue-300 rounded-md">
            <label htmlFor = "username" className = "fieldLabel pl-2 py-3">
            <FaUser />
            </label>
            <input type = "text" id = "username" name = "username" placeholder = "Username" autoComplete = "off" className = " w-full rounded-md outline-none focus:placeholder:text-gray-600 "/>
        </div>
        {formErrors.username && <div className = "text-red-600 -mt-1" > {formErrors.username} </div>}

        <div className = "flex justify-between items-center border-[1px] gap-2 field focus-within:border-blue-300 rounded-md">
            <label htmlFor = "password" className = "fieldLabel pl-2 py-3">
            <RiLockPasswordFill className = "w-5 h-5" />
            </label>
            <input type = {showPassword ? "text" : "password"} id = "password" name = "password" placeholder = "Password" autoComplete = "off" className = " w-full rounded-md outline-none focus:placeholder:text-gray-600 "/>
            <button type = "button" onClick = {() => setShowPassword(!showPassword)} className = "pr-2 py-3">
            {showPassword ? <BiShow /> : < BiHide/>}
            </button>
        </div>
        {formErrors.password && <div className = "text-red-600 -mt-1" > {formErrors.password} </div>}

        <button className = "text-white font-bold bg-green-600 p-2 w-full rounded-md">
            Sign Up
        </button>
    </form>
  )
}

export default SignIn;