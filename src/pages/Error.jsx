import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className = "h-screen flex flex-col gap-10 justify-center items-center bg-red-100">
      <h1 className = "text-red-500 font-bold"> ERROR 404 </h1>
      <span> Page Not Found </span>
      <p> 
        We can't seem to find the page you are looking for
      </p>
      <Link to = "/">
        <button className = "p-4 bg-green-300 rounded-md">
          Back to Safety
        </button>
      </Link>
    </div>
  )
}

export default Error;
