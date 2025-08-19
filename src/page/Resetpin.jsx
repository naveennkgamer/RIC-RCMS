import React, { useRef, useState, useEffect } from 'react';
import './stylescss/loginpage.css';
import { Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../assets/images/logo.png';
import Leftpanel from '../component/loginleftpanel';
import { NavLink } from 'react-router-dom';

const Resetpin = () => {
    const newPinRefs = useRef([]);
    const confirmPinRefs = useRef([]);
    const [newPin, setNewPin] = useState(['', '', '', '']);
    const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
    const [showPin, setShowPin] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePinChange = (e, index, pinType, setPin, refs) => {
        const value = e.target.value.replace(/\D/, '');

        if (!/^\d?$/.test(value)) return;

        const updatedPin = [...pinType];
        updatedPin[index] = value;
        setPin(updatedPin);

        if (value && index < refs.current.length - 1) {
            refs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index, refs) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            refs.current[index - 1].focus();
        }
    };

    const toggleShowPin = () => setShowPin(!showPin);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [pinsMismatch, setPinsMismatch] = useState(false);

    useEffect(() => {
        const allFilled = newPin.every(d => d !== '') && confirmPin.every(d => d !== '');
        const matched = newPin.join('') === confirmPin.join('');

        if (allFilled) {
            if (!matched) {
                setErrorMsg("PIN doesn't match. Please check & try again");
                setPinsMismatch(true);
                setIsButtonEnabled(false);
            } else {
                setErrorMsg('');
                setPinsMismatch(false);
                setIsButtonEnabled(true);
            }
        } else {
            setErrorMsg('');
            setPinsMismatch(false);
            setIsButtonEnabled(false);
        }
    }, [newPin, confirmPin]);

    const handleSubmit = () => {
        const newPinStr = newPin.join('');
        const confirmPinStr = confirmPin.join('');
        if (newPinStr !== confirmPinStr) {
            setErrorMsg("PIN doesn't match. Please check & try again");
        } else {
            setErrorMsg('');
            console.log("PIN Set Successfully:", newPinStr);
        }
    };

    return (
        <Box className="loginpgpage-container">
            <Box className="loginpgcontent-box">
                <Leftpanel />
                {/* Right Panel */}
                <Box className="loginpgright-panel" sx={{ gap: "10px" }}>
                    <img src={logo} alt="Logo" />
                    <h2 style={{ fontFamily: "Manrope", fontWeight: "400" }}>Reset <span style={{ color: "#09101D" }}>PIN</span></h2>

                    {/* New PIN */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: "100%" }}>
                        <p style={{ margin: '0px', paddingLeft: "7px", fontFamily: "Manrope", fontWeight: "300" }}>New PIN</p>
                        <Box style={{ display: 'flex', gap: '5px', position: 'relative', alignItems: 'center' }}>
                            {newPin.map((digit, i) => (
                                <input
                                    key={`new-${i}`}
                                    type={showPin ? "text" : "password"}
                                    maxLength="1"
                                    value={digit}
                                    ref={el => newPinRefs.current[i] = el}
                                    onChange={(e) => handlePinChange(e, i, newPin, setNewPin, newPinRefs)}
                                    onKeyDown={(e) => handleKeyDown(e, i, newPinRefs)}
                                    style={{ width: '40px', height: '40px', fontSize: '24px', textAlign: 'center', borderRadius: '8px', border: pinsMismatch ? "1px solid red" : "1px solid #ccc", padding: "5px" }}
                                />
                            ))}
                            <IconButton onClick={toggleShowPin} style={{ right: '-5px' }}>
                                {showPin ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Confirm PIN */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: "100%", marginTop: "20px" }}>
                        <p style={{ margin: '0px', paddingLeft: "7px", fontFamily: "Manrope", fontWeight: "300" }}>Confirm PIN</p>
                        <Box style={{ display: 'flex', gap: '5px', position: 'relative', alignItems: 'center' }}>
                            {confirmPin.map((digit, i) => (
                                <input
                                    key={`confirm-${i}`}
                                    type={showPin ? "text" : "password"}
                                    maxLength="1"
                                    value={digit}
                                    ref={el => confirmPinRefs.current[i] = el}
                                    onChange={(e) => handlePinChange(e, i, confirmPin, setConfirmPin, confirmPinRefs)}
                                    onKeyDown={(e) => handleKeyDown(e, i, confirmPinRefs)}
                                    style={{ width: '40px', height: '40px', fontSize: '24px', textAlign: 'center', borderRadius: '8px', border: pinsMismatch ? "1px solid red" : "1px solid #ccc", padding: "5px" }}
                                />
                            ))}
                            <IconButton onClick={toggleShowPin} style={{ right: '-5px' }}>
                                {showPin ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Error Message */}
                    {errorMsg && (
                        <Box sx={{
                            backgroundColor: '#FFEAEA', color: '#D32F2F', border: '1px solid #D32F2F', borderRadius: '8px', padding: '10px 15px',
                            fontSize: '14px', display: 'flex', alignItems: "baseline", gap: '8px', fontFamily: "Manrope", fontWeight: "400"
                        }} >
                            <span style={{ fontWeight: 600 }}>⚠️</span>
                            <span>{errorMsg}</span>
                        </Box>
                    )}

                    {/* Submit Button */}
                    <NavLink to="/" style={{ width: "100%" }}>
                        <button
                            disabled={!isButtonEnabled}
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: isButtonEnabled ? "#3A2B65" : "#ccc",
                                width: "100%",
                                padding: "13px",
                                borderRadius: "6px",
                                color: "white",
                                cursor: isButtonEnabled ? "pointer" : "not-allowed",
                                fontSize: "16px",
                                border: "none",
                                marginTop: "20px", fontFamily: "Manrope", fontWeight: "400"
                            }}
                        >
                            Reset PIN
                        </button>

                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
};

export default Resetpin;
