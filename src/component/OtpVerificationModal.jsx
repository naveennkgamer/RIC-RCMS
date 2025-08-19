import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
    TextField,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const OtpVerificationModal = ({ open, onClose, onVerify, mobile = '******879' }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (open) {
            setOtp(['', '', '', '']);
            setTimer(30);
        }
    }, [open]);

    useEffect(() => {
        let interval;
        if (open && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [open, timer]);

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
        const fullOtp = otp.join('');
        if (fullOtp.length === 4) {
            onVerify(fullOtp);
        }
    };

    const handleClose = () => {
        onClose();
        setOtp(['', '', '', '']);
        setTimer(30);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: { borderRadius: 16, padding: '24px' }
            }}
        >
            <DialogTitle sx={{ mb: 2, padding: "0px" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">OTP Verification</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent
                sx={{
                    padding: "0px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #E4E4E4",
                    borderTop: "1px solid #E4E4E4"
                }}
            >
                <Typography variant="body1" sx={{ mb: 2, paddingTop: "20px" }}>
                    Enter the OTP sent to the mobile number <b>(+91 {mobile})</b>
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
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '8px',
                                }
                            }}
                        />
                    ))}
                </Box>

                <Typography sx={{ textAlign: 'left' }}>
                    Resend OTP in <span style={{ color: '#E97C00', fontWeight: '500' }}>{timer}s</span>
                </Typography>
            </DialogContent>

            <DialogActions sx={{ padding: "0px", paddingTop: "10px" }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#3A2B65',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        mt: 1
                    }}
                    onClick={handleVerify}
                    disabled={otp.some(d => d === '')}
                >
                    Verify OTP
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OtpVerificationModal;
