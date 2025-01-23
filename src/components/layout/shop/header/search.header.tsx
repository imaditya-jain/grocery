import { SearchOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"

const Search = () => {
    return (
        <>
            <div className="search-box w-100 h-[50px] bg-[#e5e5e5] rounded-[5px] flex items-center p-2">
                <input type="text" placeholder="Seach product here..." className="w-full h-[35] bg-inherit focus:outline-none p-2 text-[15px] placeholder:text-[#1f1f1f]" />
                <Button className="h-[35px] w-[35px] !min-w-[35px] !rounded-full"><SearchOutlined className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" /></Button>
            </div>
        </>
    )
}

export default Search