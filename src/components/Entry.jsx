import { ImCross } from "react-icons/im";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { setEntry } from "../redux/entry";
import { useSelector, useDispatch } from "react-redux"; 


const Entry = () => {
  const entry = useSelector((state) => state.entry.value);
  const dispatch = useDispatch();
  
  return (
    <div className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md w-[35vw] h-[80vh] bg-white border-[1px] border-gray-100 grid grid-rows-[4%_1fr] px-4 pb-4 pt-2">
      <ImCross className = "text-gray-300 hover:text-gray-400 w-3 h-3 justify-self-end self-center" onClick = {() => { dispatch(setEntry([false, "Sign In"])) }} />

      <div className = "grid grid-rows-[10%_90%] rounded-md border-gray-300 border-x-[1px] border-b-[1px] overflow-hidden">

        <div className = "grid grid-cols-2">

          <h1 className  = {`flex justify-center items-center font-bold text-xl ${entry[1] == "Sign In" ? "text-gray-600 border-t-2 border-t-green-600 rounded-t-[6px] border-r-gray-300 border-r-[1px]" : "bg-gray-200 text-gray-500"}`} onClick = {() => {dispatch(setEntry([true, "Sign In"]))}}>Sign In</h1>

          <h1 className  = {`flex justify-center items-center font-bold text-xl ${entry[1] == "Sign Up" ? "text-gray-600 border-t-2 border-t-green-600 rounded-t-[6px] border-l-gray-300 border-l-[1px]" : "bg-gray-200 text-gray-500"}`} onClick = {() => {dispatch(setEntry([true, "Sign Up"]))}}>Sign Up</h1>

        </div>

        {entry[1] == "Sign In" ? <SignIn /> : <SignUp />}

      </div>

    </div>
  )
}

export default Entry;