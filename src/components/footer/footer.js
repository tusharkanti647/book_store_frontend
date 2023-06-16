import "./footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () => {

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Book store</h3>
                    <p>About Us</p>
                    <p>In News</p>
                    <p>Blog</p>
                    <p>Privacy Policy</p>
                    <p>Affiliate</p>
                    <p>Terms and Conditions</p>
                </div>
                <div className="footr_details_one">
                    <h3>Help</h3>
                    <p>FAQs</p>
                    <p>Contact Us</p>
                    <p>Payments</p>
                    <p>Vendor Connect</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Download Our App</h3>
                    <img src="https://www.bbassets.com/static/v2643/custPage/build/content/img/Google-App-store-icon.png" alt="google play store" />
                    <img src="https://www.bbassets.com/static/v2643/custPage/build/content/img/Apple-App-store-icon.png" alt="apple play store" />
                </div>
                <div className="footr_details_one forres">
                    <h3>Get Social With Us</h3>
                    <div className="icon-wrapper">

                    <div id="facbook">
                        <FacebookIcon className="icon"  />
                    </div>
                    <div id="pinterest">
                        <PinterestIcon className="icon"  />
                    </div>
                    <div id="twitter">
                        <TwitterIcon className="icon"  />
                    </div>
                    <div id="instagram">
                        <InstagramIcon className="icon"  />
                    </div>
                    </div>
                </div>
            </div>
            <div className="lastdetails">
                <p>Copyright © 2022-2024 Book Store</p>
            </div>
        </footer>
    )
}

export default Footer;
