import React, { useRef, useState } from 'react';
import './stylescss/loginpage.css';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Leftpanel from '../component/loginleftpanel';
import '../FontStyle/fontstyle.css'
const LoginPage = () => {
    const pinRefs = useRef([]);
    const [pin, setPin] = useState(['', '', '', '']);
    const [userId, setUserId] = useState('');

    const handlePinChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '');

        if (!/^\d?$/.test(value)) return;

        const updatedPin = [...pin];
        updatedPin[index] = value;
        setPin(updatedPin);

        if (value && index < pinRefs.current.length - 1) {
            pinRefs.current[index + 1].focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            pinRefs.current[index - 1].focus();
        }
    };
    const isUserIdValid = userId.trim() !== '';
    const isPinComplete = pin.every((digit) => digit !== '');
    const isFormValid = isUserIdValid && isPinComplete;

    return (
        <Box className="loginpgpage-container">
            <Box className="loginpgcontent-box">
                {/* Left Panel */}
                <Leftpanel />
                {/* Right Panel */}
                <Box className="loginpgright-panel" sx={{ gap: "20px" }}>
                    <img src={logo} alt="Logo" />
                    <h2 style={{ fontFamily: "Manrope", fontWeight: "400" }}>
                        Login <span style={{ color: "#09101D" }}> to continue</span>
                    </h2>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px', width: "100%" }}>
                        {/* User ID */}
                        <input
                            id="userid"
                            name="userid"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User ID"
                            style={{
                                fontSize: "16px",
                                width: "200px",
                                height: "10px",
                                textAlign: "left",
                                border: "1px solid #ccc",
                                padding: "15px", marginBottom: "5px"
                            }}
                        />
                        {/* PIN */}
                        <p style={{ margin: '0px', paddingLeft: "7px", marginBottom: "5px", fontFamily: "Manrope", fontWeight: "300" }}>Enter your 4-Digit PIN</p>
                        <Box style={{ display: 'flex', gap: '0px', marginBottom: "5px" }}>
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    id={`pin-${i}`}
                                    name={`pin-${i}`}
                                    type="password"
                                    maxLength="1"
                                    value={pin[i]}
                                    ref={(el) => (pinRefs.current[i] = el)}
                                    onChange={(e) => handlePinChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        fontSize: '24px',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                        border: "1px solid #ccc",
                                        padding: "0px"
                                    }}
                                />
                            ))}
                        </Box>
                        {/* Forgot PIN Link */}
                        <p style={{ paddingLeft: "7px", marginTop: "0px", marginBottom: "0px" }}>
                            <NavLink to="/Forgotpinpage" style={{ color: '#C7222A', textDecoration: 'none', fontFamily: "Manrope", fontWeight: "400" }}>
                                Forgot PIN?
                            </NavLink>
                        </p>
                        {/* Login Button */}
                        <NavLink
                            to={isFormValid ? "/setpin" : "#"}
                            style={{ width: "100%", pointerEvents: isFormValid ? "auto" : "none" }}
                        >
                            <Button
                                disabled={!isFormValid}
                                sx={{
                                    backgroundColor: isFormValid ? "#3A2B65" : "#ccc",
                                    width: "100%",
                                    padding: "10px",
                                    height: "50px",
                                    borderRadius: "30px",
                                    color: "white",
                                    cursor: isFormValid ? "pointer" : "not-allowed",
                                    fontSize: "16px",
                                    border: "none",
                                    textTransform: "none",
                                    fontFamily: "Manrope", fontWeight: "400"
                                }}
                            >
                                Login
                            </Button>
                        </NavLink>
                    </Box>
                    {/* Register Button */}
                    <span className='loginregbutdiv' style={{ fontFamily: "Manrope", fontWeight: "400" }}>
                        New to Insta Credit?{' '}
                        <Button variant="contained"
                            className="loginpgregister-btn"
                            sx={{ cursor: "pointer", background: "#3A2B65", padding: "10px 25px", borderRadius: "10px", fontFamily: "Manrope", fontWeight: "bold" }}
                            onClick={() => {
                                window.location.href = "/register";
                            }}
                        >
                            REGISTER NOW
                        </Button>
                    </span>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
