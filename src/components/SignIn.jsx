import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrFormCheckmark } from "react-icons/gr";
import {BiShow, BiHide} from "react-icons/bi";
import "./sign.css";

const SignIn = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validate = (e) => {
    const errors = {};

    if (e.target.email.value === ""){
      errors.email = "Email is Required!";
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
    <form className = "px-8 p-6 flex flex-col gap-3" onSubmit = {handleSubmit}>

      <div className = "flex justify-start items-center border-[1px] gap-2 field focus-within:border-blue-300 rounded-md">
        <label htmlFor = "email" className = "fieldLabel pl-2 py-3">
          <FaUser />
        </label>
        <input type = "email" id = "email" name = "email" placeholder = "E-mail" autoComplete = "off" className = " w-full rounded-md outline-none focus:placeholder:text-gray-600 "/>
      </div>
      {formErrors.email && <div className = "text-red-600 -mt-1" > {formErrors.email} </div>}

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
   
      <div className = "flex justify-between items-center">
        <div className = "flex justify-start items-center gap-2">
          <input type = "checkbox" id = "rememberMe" name = "rememberMe" value = "yes" className = "appearance-none -ml-[7px]" />
          <label htmlFor = "rememberMe" className = "flex justify-start items-center gap-2 cursor-pointer">
            <div className = "border-[1px] h-4 w-4 rounded-sm flex justify-center items-center" onClick = {() => setChecked(!checked)}>
              {checked && <GrFormCheckmark />}
            </div>
            <span onClick = {() => setChecked(!checked)}>Remember me</span>
          </label>
        </div> 
        <button type = "button" className = "text-gray-400 font-bold text-xs hover:text-green-600 hover:underline">Forgot Password</button>
      </div>

      <button className = "text-white font-bold bg-green-600 p-2 w-full rounded-md">
        Sign In
      </button>
    </form>
  )
}

export default SignIn;