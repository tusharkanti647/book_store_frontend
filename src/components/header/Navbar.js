
import { Box, IconButton, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import "./Navbar.css"
import logo from "../../image/logo.png";

import Menu from "./model/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {searchNameReducer, isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";



function Navbar() {
    const [badgeCount, setBadgeCount] = useState(0);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [isLogIn, setIsLogIn] = useState(false);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);
    const navigate = useNavigate();


    const basketProductArr = useSelector((state) => state.basketProductArr);
    let basketBadgeCount;


    basketBadgeCount = basketProductArr.length;


    //despatch sarch data to the redux toolkit
    //-------------------------------------------------------------------------
    const handelSearchData = () => {
        dispatch(searchNameReducer(searchInputValue));
        navigate("/products")
    }

    //fetch badge count
    //-------------------------------------------------------------------------
    const fetchBadge = async () => {
        //setIsLodar(true);
        const response = await fetch("http://localhost:8000/basket_badge/count", {
            method: "GET",
            headers: {
                Authorization: token,
            }
        });
        if (response.statusText !== "Unauthorized") {
            const data = await response.json();
            dispatch(isAddProductReducer(false));
            setBadgeCount(data.badgeContent);
            setIsLogIn(true);
        }
    }

    useEffect(() => {
        fetchBadge();
    }, [ischeck]);



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <header>
                <nav>
                    <div className="left">
                        <div className="navlogo" >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { sm: 'block' } }}
                            >
                                <img src={logo} alt='logo' />
                            </Typography>
                        </div>

                        <div className="nav_searchbaar">

                            <input type="text" name=""
                                onChange={(e) => setSearchInputValue(e.target.value)}
                                placeholder="Search Your Products" />

                            <IconButton sx={{ m: "0", p: "0" }}>
                                <SearchIcon onClick={handelSearchData} id="search_icon" />
                            </IconButton>
                        </div>

                    </div>

                    <div className="right">

                        <Menu isLogIn={isLogIn} />

                        <Link to="/basket" >
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                //onClick={handleProfileMenuOpen}
                                color="black"
                            >
                                <Badge badgeContent={badgeCount > 0 ? badgeCount : null} color="error">
                                    <ShoppingCartIcon style={{ fontSize: 50 }} />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </nav>

                <div className="nav_searchbaar nav_searchbaar_down">

                    <input type="text" name=""
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        placeholder="Search Your Products" />

                    <IconButton sx={{ m: "0", p: "0" }}>
                        <SearchIcon onClick={handelSearchData} id="search_icon" />
                    </IconButton>
                </div>

            </header>
        </div>
    )
}

export default Navbar;