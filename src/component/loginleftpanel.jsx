import React from 'react'
import '../page/stylescss/loginpage.css';
import { Box } from '@mui/material';
import backgroundImg from '../assets/images/backgroundwelcome.png';
// import '../FontStyle/fontstyle.css';

const loginleftpanel = () => {
    return (
        <Box
            className="loginpgleft-panel"
            sx={{
                backgroundImage: `url(${backgroundImg})`
            }}
        >
            <p style={{ fontSize: "21px", fontFamily: "Manrope", fontWeight: "300" }}>
                Welcome to <br />
                <span style={{ fontSize: "32px", fontWeight: "500" }}>Radiant Insta Credit!</span>
            </p>
            <p style={{ fontSize: "16px", fontFamily: "Manrope", fontWeight: "300" }}>
                Get cash picked up right from your doorstep and enjoy instant credit to your bank account.
                A seamless, secure, and hassle-free experience designed for your convenience!
            </p>
        </Box>
    )
}

export default loginleftpanel