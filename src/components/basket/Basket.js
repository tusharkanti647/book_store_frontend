

import "./Basket.css";


import { Box, Button } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ItemList from "./ItemList";
import Lodar from "../lodar/Lodar";
import { isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";


function Basket() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [basketProductArr, setBasketProductArr] = useState([]);
    const [isLodar, setIsLodar] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message: "",
        severity: ""
    });


    //fetch the basket data
    //--------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            setIsLodar(true);
            const response = await fetch("https://book-store-api-xn99.onrender.com/basket", {
                method: "GET",
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.statusText === "Unauthorized") {
                console.log("hello");
                navigate("./");
                return;
            } else {
                const data = await response.json();
                setBasketProductArr([...data])
            }
            setIsLodar(false);
        }
        fetchFun();
    }, [])


    //calculate total savings and total prices
    //------------------------------------------------------------------------------
    useEffect(() => {
        let totalPriceArr = 0;
        let totalSavingsArr = 0;

        for (let i = 0; i < basketProductArr.length; i++) {
            let product = basketProductArr[i];
            let price = product.discountPrice * product.qty;
            let subtotal = product.originalPrice * product.qty;
            let savings = subtotal - price;

            totalPriceArr += price;
            totalSavingsArr += savings;
        }

        setTotalPrice(totalPriceArr);
        setTotalSavings(totalSavingsArr);
    }, [basketProductArr])

    //remove all the items from basket
    //----------------------------------------------------------------------------------------
    const removeAllItem = async () => {
        setIsLodar(true);
        const respons = await fetch("https://book-store-api-xn99.onrender.com/empty-basket", {
            method: "PUT",
            headers: { "Authorization": localStorage.getItem("token") }
        });
        setBasketProductArr([]);
        dispatch((isAddProductReducer(true)))
        const data = await respons.json();
        setIsLodar(false);
    }

    //checkout the items from basket
    //----------------------------------------------------------------------------------------
    const checkout = async () => {
        await removeAllItem();
        setSatingTostyfy({ ...satingTostyfy, message: "You are successfully buy books.", severity: "info" });
        setShowTostyfy(true);
    }


    if (isLodar) {
        return (
            <Lodar />
        )
    }

    if (basketProductArr.length <= 0) {
        return (
            <Box sx={{ color: "#0E7460" }} className="cart-buttom-part-botton-wrapper">
                <h2>OOPS......</h2>
                <h3>Your Basket is empty.</h3>
                <h3>Please continue to shopping.</h3>
                <Link to="/products">
                    <Button sx={{ border: "solid 1px black" }}>CONTINUE SHOPPING</Button>
                </Link>
            </Box>
        )
    }

    return (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box className="your-item">
            <h2>Your Basket ({basketProductArr.length} items)</h2>
        </Box>
        <Box className="cart-table-heder">
            <Box sx={{ width: "52%" }} className="cart-table-heder-left">
                <div >
                    <h3>ITEM DESCRIPTION</h3>
                </div>
            </Box>
            <Box className="cart-table-heder-right">
                <h3>UNIT PRICE</h3>
                <h3>QUANTITY</h3>
                <h3>SUBTOTAL</h3>
                <h3>SAVINGS</h3>
            </Box>
        </Box>

        {basketProductArr.map((product, ind) => <ItemList key={ind} setBasketProductArr={setBasketProductArr} product={product} />)}

        <Box className="cart-bottom-part">
            <Box className="cart-buttom-part-botton-wrapper">
                <Button onClick={removeAllItem}> <ShoppingBasketIcon />EMPTY BASKET</Button>
                <Link to="/books">
                    <Button sx={{ border: "solid 1px black" }}>CONTINUE SHOPPING</Button>
                </Link>
            </Box>

            <Box className="cart-bottom-part-right">
                <Box className="save-bill-charges" >
                    <Box sx={{ width: "60%", mr: "15px", ml: "5%" }} className="bill-charges">
                        <div >
                            <p>Subtotal</p>
                            <p>Rs. {totalPrice}</p>
                        </div>
                        <div>
                            <p>Delivery Charges </p>
                            <p>***</p>
                        </div>
                        <div >
                            <p>TOTAL</p>
                            <p>Rs. {totalPrice}</p>
                        </div>
                    </Box>
                    <Box className="bill-charges-save">
                        <p>You saved! <br /> Rs. {totalSavings}</p>
                    </Box>
                </Box>
                <div>
                    <Button onClick={checkout}>CHECKOUT <ArrowCircleRightIcon /> </Button>
                </div>
            </Box>
        </Box>
    </Box>)
}

export default Basket;
