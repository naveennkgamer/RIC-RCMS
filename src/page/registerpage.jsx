import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadFileInput from "../component/UploadFileInput";
import FormInput from '../component/FormInput';
import {
    Box,
    Grid,
    Typography,
    Button,
    Avatar,
} from '@mui/material';
import './stylescss/RegisterPage.css';
import logo from '../assets/images/rad-logo.svg';
import cancel from '../assets/images/cancel-reg.png';
import step1 from '../assets/images/step1-img.png';
import businessinfoimg from '../assets/images/business.svg';
import flag from "../assets/images/india-flag.png";
import lock from '../assets/images/lock-img.png';
import { useRegistration } from '../context/RegistrationContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useRegistration();
    const validatePan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    const validateAadhar = (aadhar) => /^[0-9]{12}$/.test(aadhar);
    const isValidFile = (file) => file instanceof File && file.size > 0;
    const isFormValid = () => {
        return (
            formData.businessName?.trim() !== '' &&
            formData.ownerName?.trim() !== '' &&
            /^[1-9][0-9]{9}$/.test(formData.mobileNumber) &&
            formData.typeOfBusiness !== '' &&
            formData.natureOfBusiness !== '' &&
            validatePan(formData.panNumber) &&
            validateAadhar(formData.aadharNumber) &&
            formData.email?.trim().includes("@") &&
            isValidFile(formData.panFile) &&
            isValidFile(formData.aadharFile)
        );
    };

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Box sx={{ backgroundColor: '#3A2B65', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', py: 4, paddingTop: "0px" }}>
                {/* Topbar */}
                <Grid >
                    <Box display="flex" alignItems="center" sx={{ background: 'white', padding: "5px", gap: "5px" }}>
                        <Avatar src={logo} alt="logo" sx={{ width: 50, height: 50, paddingLeft: '7px' }} />
                        <Box >
                            <Typography fontWeight="bold" variant="subtitle1" sx={{ color: '#3A2C57', paddingTop: "5px", lineHeight: "20px", fontFamily: "Manrope", fontWeight: "bold" }}>RADIANT</Typography>
                            <Typography variant="body2" sx={{ color: 'black', fontFamily: "Manrope", fontWeight: "bold" }}>Insta Credit Application</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid container alignItems="center" justifyContent="space-between" sx={(theme) => ({
                    width: "92%",
                    margin: "auto",
                    [theme.breakpoints.down("md")]: {
                        marginBottom: "20px",
                    },
                })}>                    <Box display="flex" alignItems="center" sx={{ padding: " 0px", gap: "5px" }}>
                        <Avatar src={cancel} alt="cancel-icon" sx={{ width: 36, height: 36, cursor: "pointer" }} onClick={() => { navigate("/"); }} />
                        <Box mt={3} mb={2} sx={{ color: "white" }}>
                            <Typography variant="h6" sx={{ fontFamily: "Manrope", fontWeight: "normal" }} >Registration</Typography>
                            <Typography variant="body2" sx={{ fontFamily: "Manrope", fontWeight: "normal" }} >Enter the registration details</Typography>
                        </Box>
                    </Box>
                    <Grid >
                        <Avatar src={businessinfoimg} alt="step1" sx={{ width: 300, height: 50, borderRadius: 0, objectFit: "contain", marginTop: "5px" }} />
                    </Grid>
                </Grid>

                {/* Main Form */}
                <Box sx={(theme) => ({
                    width: "88%", margin: 'auto', backgroundColor: 'white', borderRadius: 3, overflow: 'hidden', px: 4, py: 3, marginBottom: "50px",
                    [theme.breakpoints.down('md')]: { width: '80%', },
                })}>
                    <Box display="flex" alignItems="center" sx={{ background: 'white', padding: "10px 0px", gap: "15px" }}>
                        <Avatar src={step1} alt="step1" sx={{ width: 50, height: 50 }} />
                        <Box>
                            <Typography variant="body1" sx={{ color: '#E05D00', fontFamily: "Manrope", fontWeight: "500", paddingTop: "2px" }}>Step 1</Typography>
                            <Typography variant="h6" sx={{ color: "#3A2B65", fontFamily: "Manrope", fontWeight: "normal" }}>Your Business Information</Typography>
                        </Box>
                    </Box>

                    <div className="business-form-container">
                        <form className="business-form-grid">
                            <FormInput
                                label="Business Name"
                                name="businessName"
                                value={formData.businessName || ''}
                                onChange={(e) => handleChange('businessName', e.target.value)}
                                placeholder="Ex: Grace Super Market"
                                required
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>Type of Business <span>*</span></label>
                                <select value={formData.typeOfBusiness} onChange={(e) => handleChange('typeOfBusiness', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="proprietor">Proprietor</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                                {formData.typeOfBusiness === '' && (
                                    <p className="hint">Select the sector of your business operation</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>Nature of Business <span>*</span></label>
                                <select value={formData.natureOfBusiness} onChange={(e) => handleChange('natureOfBusiness', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="retail">Retail</option>
                                    <option value="service">Service</option>
                                </select>
                                {formData.natureOfBusiness === '' && (
                                    <p className="hint">Select the primary activity of the business</p>
                                )}
                            </div>
                            <FormInput
                                label="Owner's Full Name"
                                name="ownerName"
                                value={formData.ownerName || ''}
                                onChange={(e) => handleChange('ownerName', e.target.value)}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                }}
                                placeholder="Ex: Joseph George"
                                required
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    Owner's Mobile Number <span>*</span>
                                </label>
                                <div className="phone-wrapper">
                                    <div className="prefix">
                                        <img src={flag} alt="India" />
                                        +91
                                    </div>
                                    <input
                                        type="tel"
                                        pattern="[0-9]*"
                                        placeholder="Ex: 98765 43210"
                                        value={formData.mobileNumber || ''}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        }}
                                        onChange={(e) => handleChange('mobileNumber', e.target.value)}
                                        style={{ color: formData.mobileNumber && !/^[1-9][0-9]{9}$/.test(formData.mobileNumber) ? 'red' : 'black' }}
                                    />
                                </div>
                                {formData.mobileNumber && !/^[1-9][0-9]{9}$/.test(formData.mobileNumber) && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        Invalid mobile number (must be 10 digits).
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>Secondary Mobile Number (Optional)</label>
                                <div className="phone-wrapper">
                                    <div className="prefix">
                                        <img src={flag} alt="India" />
                                        +91
                                    </div>
                                    <input
                                        type="tel"
                                        pattern="[0-9]*"
                                        placeholder="Ex: 98765 43210"
                                        value={formData.secondaryMobileNumber || ''}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        }}
                                        onChange={(e) => handleChange('secondaryMobileNumber', e.target.value)}
                                    />
                                </div>
                            </div>
                            <FormInput
                                label="GSTIN Number (Optional)"
                                name="GSTINNumber"
                                value={formData.GSTINNumber || ''}
                                onChange={(e) => handleChange('GSTINNumber', e.target.value)}
                                placeholder="Ex: 27AAJCRXXXX"
                            />
                            <div className="form-group">
                                <FormInput
                                    label="Email ID"
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="Ex: your@email.com"
                                    required
                                    style={{ color: formData.email && !formData.email.trim().includes("@") ? 'red' : 'black' }}
                                />
                                {formData.email && !formData.email.trim().includes("@") && (
                                    <p style={{ color: "red", fontSize: "12px" }}>
                                        Please enter a valid email address.
                                    </p>
                                )}
                            </div>

                        </form>
                        {/* PAN & AADHAR Section */}
                        <div className="pandetails">
                            <p style={{ color: "#3A2B65", fontSize: "20px", fontFamily: "Manrope", fontWeight: "normal" }}>PAN & Aadhaar Verification</p>
                            <div className="descrpan">
                                <img src={lock} alt="lock" />
                                <p style={{ fontFamily: "Manrope", fontWeight: "normal" }}>*Your PAN and Aadhaar are used only for secure verification and will never be shared with anyone</p>
                            </div>
                            <form className="business-form-grid2">
                                <FormInput
                                    label="PAN Number"
                                    name="panNumber"
                                    value={formData.panNumber || ''}
                                    onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase())}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase();
                                    }}
                                    placeholder="Ex: ABCDE1234F"
                                    required
                                    style={{
                                        color: formData.panNumber && !validatePan(formData.panNumber) ? 'red' : 'black'
                                    }}
                                    validationMessage={
                                        formData.panNumber
                                            ? validatePan(formData.panNumber)
                                                ? "Valid PAN Format"
                                                : "Invalid PAN format (e.g. ABCDE1234F)"
                                            : ""
                                    }
                                    validationType={
                                        formData.panNumber && !validatePan(formData.panNumber)
                                            ? "invalid"
                                            : "valid"
                                    }
                                />
                                <div>
                                    <UploadFileInput
                                        label="Upload PAN Card"
                                        file={formData.panFile || null}
                                        setFile={(file) => handleChange('panFile', file)}
                                    />
                                </div>
                                <br />
                                <FormInput
                                    label="Aadhar Number"
                                    name="aadharNumber"
                                    type="tel"
                                    value={formData.aadharNumber || ''}
                                    onChange={(e) => handleChange('aadharNumber', e.target.value)}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
                                    }}
                                    placeholder="Ex: 123412341234"
                                    required
                                    style={{
                                        color: formData.aadharNumber && !validateAadhar(formData.aadharNumber) ? 'red' : 'black'
                                    }}
                                    validationMessage={
                                        formData.aadharNumber
                                            ? validateAadhar(formData.aadharNumber)
                                                ? "Valid Aadhar Format"
                                                : "Invalid Aadhar format (must be 12 digits)"
                                            : ""
                                    }
                                    validationType={
                                        formData.aadharNumber && !validateAadhar(formData.aadharNumber)
                                            ? "invalid"
                                            : "valid"
                                    }
                                />
                                <div>
                                    <UploadFileInput
                                        label="Upload Aadhar Card"
                                        file={formData.aadharFile || null}
                                        setFile={(file) => handleChange('aadharFile', file)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            </Box>
            {/* Fixed Bottom Button */}
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "white", height: "70px", display: 'flex', alignItems: 'center', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', zIndex: 1000 }}>
                <Box sx={{ width: "92%", margin: "auto", textAlign: "right" }}>
                    <Button
                        variant="contained"
                        disabled={!isFormValid()}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            cursor: isFormValid() ? 'pointer' : 'not-allowed',
                            backgroundColor: isFormValid() ? "#3A2B65" : "#bdbdbd",
                            color: "white", fontFamily: "Manrope", fontWeight: "400"
                        }}
                        onClick={() => {
                            if (isFormValid()) {
                                navigate("/register2");
                            }
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;
