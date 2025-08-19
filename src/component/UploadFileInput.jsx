import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { CloudUpload, Delete, AttachFile, InfoOutlined } from "@mui/icons-material";
import "./UploadFileInput.css";
const UploadFileInput = ({ label = "Upload PAN Card", required = true, file, setFile }) => {
    const handleFileChange = (e) => {
        const uploaded = e.target.files[0];
        if (uploaded && uploaded.size <= 2 * 1024 * 1024) {
            setFile(uploaded);
        } else {
            alert("File must be less than 2MB.");
        }
    };

    const handleRemove = () => setFile(null);

    return (
        <Box className="file-upload-wrapper">
            <Typography className="upload-label" sx={{ fontSize: "14px", color: "#666666", fontWeight: "normal", fontFamily: "Manrope" }}>
                {label} {required && <span className="required">*</span>}
            </Typography>

            {file ? (
                <Box className="uploaded-box">
                    <AttachFile className="attach-icon" />
                    <Typography className="file-name">{file.name}</Typography>
                    <IconButton onClick={handleRemove} className="delete-btn">
                        <Delete color="error" />
                    </IconButton>
                </Box>
            ) : (
                <Box className="upload-box">
                    <label className="browse-label"  >
                        <CloudUpload className="upload-icon" />
                        <span>Browse File</span>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            hidden
                        />
                    </label>
                    <Box className="file-info">
                        <InfoOutlined fontSize="small" />
                        <Typography variant="caption" className="info-text">
                            <strong>Supported Format:</strong> Png, Jpg, Jpeg. Maximum Size 2 MB
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};


export default UploadFileInput;
