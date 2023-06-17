
import "./BookCard.css"


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { basketProductCount, isAddProductReducer } from "../../redux_toolkit/slices/functionSlices";
import Lodar from "../lodar/Lodar";
import Tostyfy from "../tostyfy/Tostyfy";






function BookCard({ book, basketQty }) {
    const [productQty, setProductQty] = useState(1);
   // const [itemNumber, setItemNumber] = useState(product.qty);
    const [isBtnDisabled, setIsBtnDisabled] = useState({addBtn: false, removeBtn: false});
    const [isLodar, setIsLodar] = useState(false);
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message:"",
        severity:""
    });

  

    //if  basketQty present then  productQty set as basketQty value
    //------------------------------------------------------------------------------
    useEffect(() => {
        if (basketQty) {
            setProductQty(basketQty);
        }
    }, [basketQty]);

    //creat link and product id
    //---------------------------------------------------------------------------------
    const id = book._id;
    const link = `/aboutbook/${id}`;







   

    //---------------------------------------------------------------------------------
if(isLodar){
    return(
        <Lodar />
    )
}

    return (
        <>
        {isShowTostyfy?<Tostyfy satingTostyfy={satingTostyfy} />:""}
            <Card className="card">

                <Link to={link} >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        // height="100%"
                        width="100%"
                        height="auto"
                        image={book.imgLink}
                    />
                </Link>
                <Typography sx={{ fontSize: 11, color: "#888888", }} component="div">
                    {book.category}
                </Typography>
                <CardContent sx={{ pb: "0px", pt: "1px" }}>

                    <Link to={link} >
                        <Typography sx={{ fontSize: 12 }} variant="h6" component="div">
                            {book.titel}
                        </Typography>
                    </Link>
                    <Typography sx={{ display: 'flex', color: "green", fontSize: 12, bgcolor: "#E3EBDA" }} variant="h6" className="rating" component="div">
                        <p>{book.rating}</p>
                        <StarIcon sx={{ fontSize: 12 }} />
                    </Typography>
                    <Typography sx={{ display: 'flex', color: "#888888", bgcolor: "#F4F3F2" }} className="delhiver-detals" component="div">
                        <LocalShippingIcon sx={{ fontSize: 40 }} />
                        <p >Standard Delivery: Tomorrow Morning</p>
                    </Typography>
                </CardContent>
                <CardActions sx={{ pt: "0px", bgcolor: "#F4F3F2" }}>
                    {basketQty ?
                        <div className="item-count">
                            <button disabled={isBtnDisabled.removeBtn} onClick={() => setProductQty(productQty - 1)}><RemoveIcon /></button>
                            <div id="quantity_input_box">{productQty}</div>
                            <button disabled={isBtnDisabled.addBtn} onClick={() => setProductQty(productQty + 1)}><AddIcon /></button>
                        </div> :
                        <>
                            <div className="nav_searchbaar">
                                <div className="search_icon">
                                    <p>Qty</p>
                                </div>
                                <input type="text" name="qty" value={productQty} onChange={(event) => setProductQty(event.target.value)} />

                            </div>

                            <button className="add-to-card-button" >
                                <p>ADD</p>
                                <ShoppingBasketIcon />
                            </button>
                        </>}
                </CardActions>
            </Card>
        </>
    );
}

export default BookCard;
