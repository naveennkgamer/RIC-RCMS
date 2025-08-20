import React, { useState, useEffect } from 'react';
import './stylescss/loginpage.css';
import {
    DialogContent,
    Box,
    DialogActions,
    Typography,
    TextField,
    Button
} from '@mui/material';
import logo from '../assets/images/logo.png';
import Leftpanel from '../component/loginleftpanel';
import { useNavigate } from 'react-router-dom';

const Otpverification = ({ mobile = '******787' }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [showResend, setShowResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setShowResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '');
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 3) {
            const next = document.getElementById(`otp-${index + 1}`);
            if (next) next.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            if (prev) prev.focus();
        }
    };

    const handleVerify = () => {
        if (!otp.some(d => d === '')) {
            navigate("/resetpin");
        }
    };

    const handleResendOtp = () => {
        setOtp(['', '', '', '']);
        setTimer(30);
        setShowResend(false);
    };

    return (
        <Box className="loginpgpage-container">
            <Box className="loginpgcontent-box">
                {/* Left Panel */}
                <Leftpanel />
                {/* Right Panel */}
                <Box className="loginpgright-panel">
                    <img src={logo} alt="Logo" />
                    <h2 style={{ fontFamily: "Manrope", fontWeight: "400" }}>
                        OTP <span style={{ color: "#09101D" }}>Verification</span>
                    </h2>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: "100%" }}>
                        <DialogContent sx={{ padding: "0px", paddingLeft: "7px" }}>
                            <Typography variant="body1" sx={{ mb: 2, fontSize: "15px", fontFamily: "Manrope", fontWeight: "300" }}>
                                Enter the OTP sent to the mobile number <b style={{ fontWeight: "500" }}>(+91 {mobile})</b>
                            </Typography>

                            <Box display="flex" gap="10px" marginBottom="10px">
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        id={`otp-${index}`}
                                        variant="outlined"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: 'center',
                                                fontSize: '24px',
                                                width: '50px',
                                                height: '50px', padding: "0px", margin: "0px",
                                                borderRadius: '8px',
                                                border: "none"
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Timer or Resend OTP */}
                            {!showResend ? (
                                <Typography sx={{ textAlign: 'left', fontFamily: "Manrope", fontWeight: "normal" }}>
                                    Resend OTP in <span style={{ color: '#E97C00', fontWeight: '500' }}>{timer}s</span>
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{ textAlign: 'left', fontFamily: "Manrope", fontWeight: "500", color: "#3A2B65", cursor: "pointer" }}
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </Typography>
                            )}
                        </DialogContent>

                        <DialogActions sx={{ padding: "0px", paddingTop: "10px" }}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: '#3A2B65',
                                    py: 1.2,
                                    borderRadius: 2,
                                    mt: 1, fontFamily: "Manrope", fontWeight: "400"
                                }}
                                disabled={otp.some(d => d === '')}
                                onClick={handleVerify}
                            >
                                Verify OTP
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Otpverification;
