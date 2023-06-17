import { memo, useEffect, useState } from "react";
import "./Sidebar.css";
import { Box, createTheme, Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { filterArrReducer } from "../../../redux_toolkit/slices/functionSlices";

function Sidebar() {
    const [filterDataArr, setFilterDataArr] = useState([{ name: "Education", isChecked: false }, { name: "Science", isChecked: false }, { name: "Commerce", isChecked: false }, { name: "Engineering", isChecked: false }]);
    const dispatch = useDispatch();


    const handelChekBox = (event) => {
        const { checked, name } = event.target;
        console.log(filterDataArr);
        let newArr = filterDataArr.map((ele) => ele.name === name ? { ...ele, isChecked: checked } : ele)
        console.log(newArr);
        let arr = newArr.filter((ele) => ele.isChecked === true).map((ele) => ele.name);

        console.log(arr);
        setFilterDataArr([...newArr]);
        dispatch(filterArrReducer(arr));

    }
    console.log(filterDataArr);


    return (
        <Box sx={{ width: "25%", borderRight: "solid 0.5px #888888", color: "#888888" }} className="sidebar-category">

            <Box>
                <h4> Category</h4>
                {filterDataArr.map((ele, ind) => (
                    <p key={ind}>
                        <label className="label">
                            <input type="checkbox" name={ele.name} checked={filterDataArr.isChecked} value={ele.name} onChange={handelChekBox} /> {ele.name}
                        </label><br />
                    </p>
                ))}
                <p>

                </p>
            </Box>

            <Box>
                <h4>publisher</h4>
                <p>
                    <label className="label">
                        <input type="checkbox" name="checkbox" value="text" /> Text
                    </label><br />
                    Oriental Publisher<br />
                    OUP India<br />
                    Dreamtech Press<br />
                </p>
            </Box>
        </Box>
    )
}

export default memo(Sidebar);