import "./Menu.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton} from '@mui/material';

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



export default function Menu({ isLogIn }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    //handel model close or open
    //-------------------------------------------------------------------------
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
 



    //signout 
    //-------------------------------------------------------------------------
    const handelSignOut = () => {
        localStorage.removeItem("token");
        handleClose();
        navigate("/");
        window.location.reload();
    }



    //console.log(cookieValue);
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={handleOpen}
            >
                <MenuIcon style={{ fontSize: 50 }} />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className='menu-modal' >
                    <Link to="/" onClick={handleClose}>
                        <div>Home</div>
                    </Link>
                    {isLogIn ? <div onClick={handelSignOut}>SignOut</div> : <div>SignIn</div>}
                    <div>User</div>
                </Box>

            </Modal>
        </div >
    );
}
