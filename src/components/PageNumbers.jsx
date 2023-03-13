const PageNumbers = ({currentPage, setCurrentPageHandler, maxPageNumber}) => {

    const PageNumber = ({i}) => {
        return(
            <button className = {`px-4 ${i == currentPage ? "border-[1px] border-black -my-[1px] cursor-auto" : "hover:bg-gray-200"}`} onClick = {() => {setCurrentPageHandler(i)}}>
            {i}
            </button>
        )
    }

    // currentPage = 1, 2, 3
    if (currentPage < 4){
        const arr = [];
        for (let j = 1; j <= 4 && j < maxPageNumber; j++){
            arr.push(j);
        }
        return(
            <>
                {arr.map((i) => {
                    return(
                        <PageNumber i = {i} key = {i}/>
                    )
                })}
                {maxPageNumber > 5 && <div className = "px-4 cursor-auto pt-[3px]">...</div>}
                <PageNumber i = {maxPageNumber}/>
            </>
        )
    }

    // currentPage = maxPageNumber - 2, maxPageNumber - 1, maxPageNumber
    else if (currentPage + 3 > maxPageNumber){
        const arr = [];
        for (let j = maxPageNumber - 3; j <= maxPageNumber; j++){
            arr.push(j);
        }
        return(
            <>
                {maxPageNumber != 4 && <PageNumber i = {1}/>}
                {maxPageNumber > 5 && <div className = "px-4 cursor-auto pt-[3px]">...</div>}
                {arr.map((i) => {
                    return(
                        <PageNumber i = {i} key = {i}/>
                    )
                })}
            </>
        )
    }
    
    // currentPage = rest
    else{
        const arr = [currentPage - 1, currentPage, currentPage + 1];
        return(
            <>
                <PageNumber i = {1}/>
                <div className = "px-4 cursor-auto pt-[3px]">...</div>
                {arr.map((i) => {
                    return(
                        <PageNumber i = {i} key = {i}/>
                    )
                })}
                <div className = "px-4 cursor-auto pt-[3px]">...</div>
                <PageNumber i = {maxPageNumber} />
            </>
        )
    }
}

export default PageNumbers;
