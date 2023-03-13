import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Books from "./pages/Books";
import Book from "./pages/Book";
import Search from "./pages/Search";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Update from "./pages/Update";

function App() {
  
  const Layout = () => {
    return(
      <div className = "grid grid-rows-[30px_1fr] p-4 gap-6">
        <Navbar />
        <Outlet />
      </div>
    )
  }

  // we have to use % as for managing image max-h max-w inside Book component
  const FullPageLayout = ({children}) => {
    return(
      <div className = "h-screen grid grid-rows-[4%_96%] p-4">
        <Navbar />
        {children}
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Books />
        },
        {
          path: "add",
          element: <Add />
        },
        {
          path: "update",
          element: <Update />
        },
      ]
    },
    {
      path: "/book",
      element: <FullPageLayout> <Book /> </FullPageLayout>
    },
    {
      path: "/search",
      element: <FullPageLayout> <Search /> </FullPageLayout>
    },
    {
      path: "*",
      element: <Error />
    }
  ])

  return(
    <RouterProvider router = {router} />
  );
}

export default App;
