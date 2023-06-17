

import "./BannerSlid.css"

import { color } from '@mui/system'
import Carousel from 'react-material-ui-carousel'


const slidImg=["https://cdn.shopify.com/s/files/1/0622/2374/5251/files/ocs-general-books_e0a84b39-3570-4233-b91e-a7c5e05388ff_1100x.jpg?v=1645975334",
"https://cdn.shopify.com/s/files/1/0622/2374/5251/files/Bed-books-from-ocs_1100x.jpg?v=1650881478",
"https://cdn.shopify.com/s/files/1/0622/2374/5251/files/stationery-items-for-sale_0bb034b4-9cd8-414a-a385-26df6e0e4ff4_1100x.jpg?v=1671712960"]

function BannerSlid() {
    return (<>

        <Carousel className="banner-carousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        fullHeightHover={false}
        navButtonsProps={{
            style: {
                color:"#999999",
                backgroundColor: 'white',
                width: "30px",
                borderRadius: 0,
            }
        }}
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
                border: "solid #DEDEDE 0.5px",
                width: "30px",
                height: "50px",
                border: "solid #DEDEDE 0.5px"
            }
        }} 
        >
            <img src={slidImg[0]} alt="" className='banner-img-slide'/>
            <img src={slidImg[1]} alt="" className='banner-img-slide'/>
            <img src={slidImg[2]} alt="" className='banner-img-slide' />
        </Carousel>
    </>)
}

export default BannerSlid;