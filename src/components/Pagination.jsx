import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PageNumbers from "./PageNumbers";

const Pagination = ({currentPage, maxPageNumber, setCurrentPageHandler}) => {
    return (
        <div className = "flex border-gray-300 border-[1px] rounded-md fixed bottom-5 right-20">
            
            {/* Previous */}
            <button className = {`rounded-l-[5px] p-2 ${currentPage == 1 ? "cursor-auto text-gray-600" : "hover:bg-gray-200"}`} onClick = {() => {
                if (currentPage == 1){
                    return;
                }
                else{
                    setCurrentPageHandler(curr => curr - 1)
                }
            }}>
                <div className = "flex justify-center items-center gap-1">
                    <span>{<IoIosArrowBack />}</span>
                    <span>Previous</span>
                </div>
            </button>

            {/* Page Numbers */}
            <PageNumbers currentPage = {currentPage} setCurrentPageHandler = {setCurrentPageHandler} maxPageNumber = {maxPageNumber}/>

            {/* Next */}
            <button className = {`rounded-r-[5px] p-2 ${currentPage == maxPageNumber ? "cursor-auto text-gray-600" : "hover:bg-gray-200"}`} onClick = {() => {
                if (currentPage == maxPageNumber){
                    return;
                }
                else{
                    setCurrentPageHandler(curr => curr + 1)
                }
            }}>
                <div className = "flex justify-center items-center gap-1">
                    <span>Next</span>
                    <span>{<IoIosArrowForward />}</span>
                </div>
            </button>

        </div>
    )
}

export default Pagination;
