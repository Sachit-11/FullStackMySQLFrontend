import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { setSearchQuery } from "../redux/searchQuery";
import { filters } from "../utils/filters.js";
import AutoSuggest from "./AutoSuggest";

const Filter = () => {
    const [showOptions, setShowOptions] = useState(false);
    const searchQuery = useSelector((state) => state.searchQuery.value);
    const dispatch = useDispatch();

    const handleClick = () => {
        setShowOptions(!showOptions);
    }

    const handleChange = (e) => {
        if (e.target.value != ''){
            // shallow copy
            const newQuery = {...searchQuery, [e.target.name] : e.target.value};
            dispatch(setSearchQuery(newQuery));
        }
        else{
            // shallow copy
            const newQuery = {...searchQuery};
            delete newQuery[e.target.name];
            dispatch(setSearchQuery(newQuery));
        }
    }

    return (
        <div className = "flex flex-wrap items-start gap-4 pt-4 pb-2">
            {filters.map((filter) => {
                return(
                    <select name = {filter.name} className = "outline-none min-w-[130px] bg-transparent border-[#d9dfe7] border-[1px] rounded-md p-2 hover:border-[#cacfd5] focus:border-2 focus:border-gray-400" key = {filter.name} onClick = {handleClick} onChange = {handleChange}>
                        {filter.items.map((item) => {
                            return(
                                <option value = {item.value} key = {item.name}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                )
            })}
            <AutoSuggest by = "author" />
        </div>
    )
}

export default Filter;