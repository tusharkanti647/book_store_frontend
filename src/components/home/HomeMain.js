

import "./HomeMain.css"

import img1 from "../../image/book_offer/img1.jpg"
import img2 from "../../image/book_offer/img2.jpg"
import img3 from "../../image/book_offer/img3.jpg"
import img4 from "../../image/book_offer/img4.jpg"
import img5 from "../../image/book_offer/img.5.jpg"

import { Box } from "@mui/system"



import BannerSlid from "./BannerSlid"
import BookCard from "../card/BookCard"
import { useFetch } from "../../survices/getapi"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Margin } from "@mui/icons-material"


function HomeMain() {
    const [basketProductArr, setBasketProductArr] = useState([]);


    const bannerImg = "https://cdn.shopify.com/s/files/1/0622/2374/5251/files/grab_the_deal_now.jpg?v=1671789762";


    const { isLoading, serverError, apiData } = useFetch("http://localhost:8000/addbook");

    let newBookData = [];
    if (apiData) {
        newBookData = [...apiData];
        newBookData.splice(5);
    }



    //cart product present or not
    //-----------------------------------------------------------------
    const findCartProduct = (product) => {
        return basketProductArr.find((ele) => ele._id === product._id);
    }

    return (<>
        <BannerSlid />

        <Box className="home-main">
            <Box mt={5} sx={{ color: "#0E7460", fontWeight: "600", fontSize: 25 }}>to shop books click bellow image</Box>
            <div className="top-bar">
                <Link to="/books">
                    <img src={img1} alt="newPass" />
                </Link>
                <Link to="/books">
                    <img src={img2} alt="eggs Meat" />
                </Link>
                <Link to="/books">
                    <img src={img3} alt="deals Of The Day" />
                </Link>
                <Link to="/books">
                    <img src={img4} alt="combo Store" />
                </Link>
                <Link to="/books">
                    <img src={img5} alt="bye More Save More" />
                </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Link to="/books">
                    <img src={bannerImg} alt="meet Offer" id="topMeetBaner" />
                </Link>
            </div>


            <Box mt={5} sx={{ color: "#0E7460", fontWeight: "600", marginBottom: 10, fontSize: 25 }}>Popular Books</Box>
            <Box className="home-card-contener">
                {newBookData.map((book, ind) => {
                    return (findCartProduct(book) ? <BookCard key={ind} basketQty={findCartProduct(book).qty} book={book} /> : <BookCard key={ind} book={book} />)
                })}

            </Box>
        </Box>


    </>)
}
export default HomeMain;