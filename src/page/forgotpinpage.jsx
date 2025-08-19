import React, { useState } from 'react';
import './stylescss/loginpage.css';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import flag from "../assets/images/india-flag.png";
import Leftpanel from '../component/loginleftpanel';
import '../FontStyle/fontstyle.css'
const Forgotpinpage = () => {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobileNumber(value);
    };

    const isButtonDisabled = mobileNumber.length !== 10;

    return (
        <Box className="loginpgpage-container">
            <Box className="loginpgcontent-box">
                {/* Left Panel */}
                <Leftpanel />
                {/* Right Panel */}
                <Box className="loginpgright-panel">
                    <img src={logo} alt="Logo" />
                    <h2 style={{ fontFamily: "Manrope", fontWeight: "400" }}>Forgot <span style={{ color: "#09101D" }}> PIN</span></h2>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: "100%" }}>
                        <p style={{ margin: '0px', paddingLeft: "7px", fontFamily: "Manrope", fontWeight: "300" }}>Owner’s Mobile Number</p>
                        <Box>
                            <div className="phone-wrapper">
                                <div className="prefix">
                                    <img src={flag} alt="India" />
                                    +91
                                </div>
                                <input
                                    className='forgotpgnum'
                                    style={{
                                        fontFamily: "Manrope", fontWeight: "400",
                                        fontSize: "14px",
                                        height: "16px",
                                        textAlign: "start",
                                        margin: "0px",
                                        border: "1px solid #ccc"
                                    }}
                                    type="tel"
                                    placeholder="Ex: 98765 43210"
                                    value={mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Box>
                    </Box>
                    <NavLink to={isButtonDisabled ? "#" : "/otpverification"} style={{ width: "100%" }}>
                        <Button variant="contained"
                            disabled={isButtonDisabled}
                            style={{
                                backgroundColor: isButtonDisabled ? "#ccc" : "#3A2B65",
                                width: "100%",
                                padding: "13px",
                                borderRadius: "6px",
                                color: "white",
                                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                                fontSize: "16px",
                                border: "none", fontFamily: "Manrope", fontWeight: "400"
                            }}
                        >
                            Send OTP
                        </Button>
                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
};

export default Forgotpinpage;
