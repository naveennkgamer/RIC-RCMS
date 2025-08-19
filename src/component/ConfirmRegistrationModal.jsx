import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Avatar,
    Box
} from '@mui/material';
import iicon from '../assets/images/i-icon.png';

const ConfirmRegistrationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: { borderRadius: 12, padding: "24px" }
            }}
            BackdropProps={{
                style: { backgroundColor: "rgba(0, 0, 0, 0.6)" }
            }}
        >
            <DialogTitle>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="15px">
                    <Avatar src={iicon} alt='i-icon' sx={{ width: 32, height: 32 }}>
                    </Avatar>
                    <Typography variant="h6" >
                        Confirm Registration
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography>
                    Please confirm your registration details to proceed for the OTP verification.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2, borderTop: "1px solid #E4E4E4", paddingTop: "20px", "@media (max-width: 450px)": { flexDirection: "column", gap: "5px", }, }}>
                <Button onClick={onClose} sx={{ color: "#3A2B65", textTransform: "none" }}>
                    Back to Registration
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#3A2B65", textTransform: "none", padding: "8px 20px", "@media (max-width: 450px)": { width: "80%" }, }} onClick={onConfirm}>
                    Generate OTP
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmRegistrationModal;
