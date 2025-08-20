import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Dialog,
    DialogActions,
    Typography,
    Box,
    Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegistrationSuccessDialog = ({ open, onClose, onLogin }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: { borderRadius: 16, padding: 24, textAlign: 'center' }
            }}
        >
            <Box>
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto 16px auto',
                        borderRadius: '50%',
                        backgroundColor: '#E6F4EA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: 50, color: '#4CAF50' }} />
                </Box>

                {/* Title */}
                <Typography sx={{ fontFamily: "Manrope", fontWeight: "400" }} variant="h6" fontWeight="bold" gutterBottom>
                    Registration Successful!
                </Typography>

                {/* Subtext */}
                <Typography sx={{ mb: 3, fontFamily: "Manrope", fontWeight: "normal" }}>
                    Registration completed. Welcome aboard! <br />
                    We’re excited to have you with us
                </Typography>

                {/* Note */}
                <Box
                    sx={{
                        backgroundColor: '#FFF5CC',
                        borderRadius: 2,
                        padding: 2,
                        mb: 3,
                        textAlign: 'left'
                    }}
                >
                    <Typography sx={{ fontSize: 14, fontFamily: "Manrope", fontWeight: "normal" }}>
                        You’ll receive a 4-digit PIN via SMS to log in. After your first login, you can set your own PIN.
                    </Typography>
                </Box>

                {/*  Login button */}
                <DialogActions sx={{ justifyContent: 'center', borderTop: "1px solid #E4E4E4", paddingTop: "15px" }}>
                    <NavLink to="/" style={{ width: "100%" }}>  <Button
                        variant="contained"
                        onClick={onLogin}
                        sx={{
                            backgroundColor: '#3A2B65',
                            fontFamily: "Manrope", fontWeight: "400",
                            px: 5,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: 'none',
                            width: "100%"
                        }}
                    >
                        Go to Login
                    </Button> </NavLink>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default RegistrationSuccessDialog;
