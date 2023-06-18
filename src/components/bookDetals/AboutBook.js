
import "./AboutBook.css"

import { border, Box, display } from "@mui/system";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { colors } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
import Tostyfy from "../tostyfy/Tostyfy";







function AboutBook() {
    const [checked, setChecked] = useState(false);
    const [oneProductData, setOneProductData] = useState({});
    const [productQty, setProductQty] = useState(1);
    const [basketProductArr, setBasketProductArr] = useState([]);
    const [basketOneProduct, setBasketOneProduct] = useState(null);
    const [isLodar, setIsLodar] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState({addBtn: false, removeBtn: false});
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message:"",
        severity:""
    });
    const ischeck = useSelector((state) => state.functionSlices.isAddProduct);
    const dispatch = useDispatch();

    const { id } = useParams();

console.log(localStorage.getItem("token"));
    //get the basket product from server
    //----------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            //setIsLodar(true)
            const response = await fetch("https://book-store-api-xn99.onrender.com/basket", {
                method: "GET",
                headers: { Authorization: localStorage.getItem("token") }
            });
            if (response.statusText === "Unauthorized") {

                
            } else {
                const data = await response.json();
                console.log(data);
                setBasketProductArr([...data])
            }
            
        }
        fetchFun();
    }, [ischeck])

    //get one product from the server
    //----------------------------------------------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLodar(true);
                const response = await fetch(`https://book-store-api-xn99.onrender.com/addbook/${id}`);
                const data = await response.json();
                setOneProductData({ ...data });
                setIsLodar(false);
            } catch (error) {
            setIsLodar(false);
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    //check the product is present in the cart or not and set product qty
    //---------------------------------------------------------------------
    useEffect(() => {
        let basketOneProduct1 = basketProductArr.find((ele) => oneProductData._id === ele._id);
        if (basketOneProduct1) {
            setBasketOneProduct(basketOneProduct1);
            setProductQty(basketOneProduct1.qty);
        }
    }, [ischeck, basketProductArr]);


    //product Quantity updte
    //--------------------------------------------------------------------------------
    useEffect(() => {
        //console.log(product.titel);
        const hndelProductQuantity = async () => {
            //setIsLodar(true);
            setIsBtnDisabled({...isBtnDisabled, addBtn:true, removeBtn:true});
            const response = await fetch("https://book-store-api-xn99.onrender.com/basket-book/quantity-update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ qty: productQty, titel: basketOneProduct.titel })
            });
            //setIsLodar(false);
            if(productQty>1){
            setIsBtnDisabled({...isBtnDisabled, addBtn:false, removeBtn:false});
            }else{
                setIsBtnDisabled({...isBtnDisabled, addBtn:false, removeBtn:true});
            }
        }
        if (basketOneProduct) {
            hndelProductQuantity();
        }
    }, [productQty, basketOneProduct]);

    //product update 
    //------------------------------------------------------------------------------------
    const basketUpdate = async () => {
        setIsLodar(true);
        const response = await fetch("https://book-store-api-xn99.onrender.com/basket/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ qty: productQty })
        });
        console.log(response);
        if ( response.status !==200 ) {
            setIsLodar(false);
            setSatingTostyfy({...satingTostyfy, message:"Please login first.", severity:"info"});
            setShowTostyfy(true);
            return 
        }
        if(response.status ===200){
            dispatch(isAddProductReducer(true));
            setIsLodar(false);
            setSatingTostyfy({...satingTostyfy, message:"product add to basket successfully.", severity:"success"});
            setShowTostyfy(true);
        }
    }

    //add product in basket
    //-------------------------------------------------------------------------
    const handelAdd = () => {
        basketUpdate();
        //dispatch(isAddProductReducer(true));
    }

    //handel the input
    //-------------------------------------------------------------------
    const handleChange = (event) => {
        setProductQty(event.target.value);
    }

    //off calculating
    //------------------------------------------------------------------------------------------------------
    let off = 0;
    if (oneProductData.originalPrice) {
        off = ((oneProductData.originalPrice - oneProductData.discountPrice) / oneProductData.originalPrice) * 100;
        off=off.toFixed(2);
    }


//console.log("hello");

    // if(isLodar){
    //     return(
    //         <Lodar />
    //     )
    // }
    return (

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }} className="About-product-main">
            {isShowTostyfy?<Tostyfy satingTostyfy={satingTostyfy} />:""}
            <Box sx={{ width: "95%", display: "flex" }} className="upperPart">
            


                {/* ---------------------------------------------------------------------------- */}
                <img src={oneProductData.imgLink} alt="" />
                

                {/* ------------------------------+ ", "+ oneProductData.about.weight}---------------------------------------------- */}
                {oneProductData.originalPrice && (
                    <Box className="upperPart-right" sx={{ ml: "20px" }}>
                        <p>{oneProductData.category}</p>
                        <h4>{oneProductData.titel}</h4>

                        <Box>

                            <p><del>MRP:{oneProductData.originalPrice}</del></p>
                            <h4 id="price">Price:Rs {oneProductData.discountPrice} </h4>
                            <p><span>You Save:{off}%</span> <br />
                                (Inclusive of all taxes)
                            </p>
                            <div style={{ margin: "10px" }}>
                                <p className="aboutProduct-rating" style={{ color: "#84c225" }}>{oneProductData.rating}<StarIcon sx={{ fontSize: "15px" }} /> </p>
                            </div>

                            {basketOneProduct ? (<div className="aboutProduct-button-wrapper">

                                <div className="item-count">
                                    <button disabled={isBtnDisabled.removeBtn} onClick={() => setProductQty(productQty - 1)}><RemoveIcon /></button>
                                    <div id="quantity_input_box">{productQty}</div>
                                    <button disabled={isBtnDisabled.addBtn} onClick={() => setProductQty(productQty + 1)}><AddIcon /></button>
                                </div>
                                <button className="aboutProduct-save-button">SAVE</button>
                            </div>) :
                                (<div className="aboutProduct-button-wrapper">

                                    <input type="number" value={productQty} onChange={handleChange} />
                                    <button className="aboutProduct-add-button" onClick={handelAdd}>ADD TO CART</button>
                                    <button className="aboutProduct-save-button">SAVE</button>
                                </div>)}
                        </Box>

                        <p id="delhivery-time">
                            <LocalShippingIcon /> Standard: Today Evening
                        </p>

          
                    </Box>
                )}



            </Box>


            {/* ---------------------------------------------------------------------------- */}
            {oneProductData.originalPrice && (
                <Box sx={{ width: "95%", }} className="lowerPart">
                    <div>
                        <h4>{oneProductData.titel}</h4>
                    </div>
                    <Box className="product-about-section" sx={{ borderBottom: "solid 0.5px #888888", color: "#888888" }}>
                        <h3>About the Book</h3>

                        <div>
                            <p className="book_about_key">Author : &nbsp;</p> <p>{oneProductData.about.author}</p>
                        </div>
                        <div>
                            <p className="book_about_key">Publisher : &nbsp;</p> <p>{oneProductData.about.publisher}</p>
                        </div>
                        <div>
                            <p className="book_about_key">Language : &nbsp;</p> <p>{oneProductData.about.language}</p>
                        </div>
                        <div>
                            <p className="book_about_key">Subject : &nbsp;</p> <p>{oneProductData.about.subject}</p>
                        </div>
                        <div>
                            <p className="book_about_key">Edition : &nbsp;</p> <p>{oneProductData.about.edition}</p>
                        </div>
                        <div>
                            <p className="book_about_key">ISBN : &nbsp;</p> <p>{oneProductData.about.isbn}</p>
                        </div>
                        <div>
                            <p className="book_about_key">SKU : &nbsp;</p> <p>{oneProductData.about.sku}</p>
                        </div>
                    </Box>
                </Box >
            )}

        </Box>
    )
}

export default AboutBook;