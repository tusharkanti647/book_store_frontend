

import "./HomeMain.css"

import img1 from "../../image/book_offer/img1.jpg"
import img2 from "../../image/book_offer/img2.jpg"
import img3 from "../../image/book_offer/img3.jpg"
import img4 from "../../image/book_offer/img4.jpg"
import img5 from "../../image/book_offer/img.5.jpg"

import { Box} from "@mui/system"



import BannerSlid from "./BannerSlid"
import BookCard from "../card/BookCard"
import { useFetch } from "../../survices/getapi"
import { useEffect, useState } from "react"


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

            <div className="top-bar">
                <img src={img1} alt="newPass" />
                <img src={img2} alt="eggs Meat" />
                <img src={img3} alt="deals Of The Day" />
                <img src={img4} alt="combo Store" />
                <img src={img5} alt="bye More Save More" />

            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={bannerImg} alt="meet Offer" id="topMeetBaner" />
            </div>


            <Box mt={5} sx={{ fontSize: 25 }}>Bank Offers</Box>
            <Box className="home-card-contener">
                {newBookData.map((book, ind) => {
                    return (findCartProduct(book) ? <BookCard key={ind} basketQty={findCartProduct(book).qty} book={book} /> : <BookCard key={ind} book={book} />)
                })}

            </Box>
        </Box>


    </>)
}
export default HomeMain;