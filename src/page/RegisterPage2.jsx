import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    Avatar,
} from '@mui/material';
import './stylescss/RegisterPage.css';
import FormInput from '../component/FormInput';
import logo from '../assets/images/reg-logo.png';
import cancel from '../assets/images/cancel-reg.png';
import step2 from '../assets/images/step-2-img.png';
import addressinfoimg from '../assets/images/address.svg';
import flag from "../assets/images/india-flag.png";
import ConfirmRegistrationModal from '../component/ConfirmRegistrationModal';
import OtpVerificationModal from '../component/OtpVerificationModal';
import RegistrationSuccessDialog from '../component/RegistrationSuccessDialog ';
import { useRegistration } from '../context/RegistrationContext';

const RegisterPage = () => {

    const { formData, setFormData } = useRegistration({
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        location: "",
        city: "",
        state: "",
        commAddressLine1: "",
        commAddressLine2: "",
        commPincode: "",
        commLocation: "",
        commCity: "",
        commState: "",
        invAddressLine1: "",
        invAddressLine2: "",
        invPincode: "",
        invLocation: "",
        invCity: "",
        invState: ""
    });

    const [sameAsPrimary, setSameAsPrimary] = useState(false);
    const [sameAsPrimary2, setSameAsPrimary2] = useState(false);
    const [sameAsCommunication, setSameAsCommunication] = useState(false);

    const handleSameAsPrimaryToggle = (e) => {
        const checked = e.target.checked;
        setSameAsPrimary(checked);

        if (checked) {
            setFormData((prev) => ({
                ...prev,
                commAddressLine1: prev.addressLine1,
                commAddressLine2: prev.addressLine2,
                commPincode: prev.pincode,
                commLocation: prev.location,
                commCity: prev.city,
                commState: prev.state,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                commAddressLine1: "",
                commAddressLine2: "",
                commPincode: "",
                commLocation: "",
                commCity: "",
                commState: "",
            }));
        }
    };

    const handleSameAsPrimaryToggle2 = (e) => {
        const checked = e.target.checked;
        setSameAsPrimary2(checked);

        if (checked) {
            setSameAsCommunication(false);
            setFormData((prev) => ({
                ...prev,
                invAddressLine1: prev.addressLine1,
                invAddressLine2: prev.addressLine2,
                invPincode: prev.pincode,
                invLocation: prev.location,
                invCity: prev.city,
                invState: prev.state
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                invAddressLine1: "",
                invAddressLine2: "",
                invPincode: "",
                invLocation: "",
                invCity: "",
                invState: "",
            }));
        }
    };

    const handleSameAsCommunicationToggle = (e) => {
        const checked = e.target.checked;
        setSameAsCommunication(checked);

        if (checked) {
            setSameAsPrimary2(false);
            setFormData((prev) => ({
                ...prev,
                invAddressLine1: prev.commAddressLine1,
                invAddressLine2: prev.commAddressLine2,
                invPincode: prev.commPincode,
                invLocation: prev.commLocation,
                invCity: prev.commCity,
                invState: prev.commState
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                invAddressLine1: "",
                invAddressLine2: "",
                invPincode: "",
                invLocation: "",
                invCity: "",
                invState: "",
            }));
        }
    };

    const [pincodeErrors, setPincodeErrors] = useState({
        pincode: false,
        commPincode: false,
        invPincode: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.toLowerCase().includes("pincode")) {
            const numericValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData((prev) => ({
                ...prev,
                [name]: numericValue
            }));

            setPincodeErrors((prev) => ({
                ...prev,
                [name]: numericValue.length !== 6
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const requiredFields = [
        'addressLine1', 'addressLine2', 'pincode', 'location', 'city', 'state',
        'commAddressLine1', 'commAddressLine2', 'commPincode', 'commLocation', 'commCity', 'commState',
        'invAddressLine1', 'invAddressLine2', 'invPincode', 'invLocation', 'invCity', 'invState'
    ];

    const isFormValid = requiredFields.every(field => {
        const value = formData[field];
        const isFilled = typeof value === 'string'
            ? value.trim() !== ''
            : value !== undefined && value !== null && String(value).trim() !== '';

        if (field.toLowerCase().includes("pincode")) {
            return isFilled && /^\d{6}$/.test(value);
        }

        return isFilled;
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showsuccessModal, setShowsuccessModal] = useState(false);
    const navigate = useNavigate();

    console.log("Form Data:", formData);
    console.log("Form Valid:", isFormValid);

    return (
        <Box sx={{ backgroundColor: '#3A2B65', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', py: 4, paddingTop: "0px" }}>
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
                })}>
                    <Box display="flex" alignItems="center" sx={{ padding: " 0px", gap: "5px" }}>
                        <Avatar src={cancel} alt="cancel-icon" sx={{ width: 36, height: 36 }} />
                        <Box mt={3} mb={2} sx={{ color: "white" }}>
                            <Typography variant="h6" sx={{ fontFamily: "Manrope", fontWeight: "normal" }} >Registration</Typography>
                            <Typography variant="body2" sx={{ fontFamily: "Manrope", fontWeight: "normal" }} >Enter the registration details</Typography>
                        </Box>
                    </Box>
                    <Grid >
                        <Avatar src={addressinfoimg} alt="step1" sx={{ width: 300, height: 50, borderRadius: 0, objectFit: "contain", marginTop: "5px" }} />
                    </Grid>
                </Grid>
                <Box sx={(theme) => ({
                    width: "88%", margin: 'auto', backgroundColor: 'white', borderRadius: 3, overflow: 'hidden', px: 4, py: 3, marginBottom: "50px",
                    [theme.breakpoints.down('md')]: { width: '80%', },
                })}>
                    <Box display="flex" alignItems="center" sx={{ background: 'white', padding: "10px 0px", gap: "15px", borderBottom: "1px solid #B2BBCE" }}>
                        <Avatar src={step2} alt="step2" sx={{ width: 50, height: 50 }} />
                        <Box>
                            <Typography variant="body1" fontWeight="bold" sx={{ color: '#E05D00', fontFamily: "Manrope", fontWeight: "500", paddingTop: "2px" }}>Step 2</Typography>
                            <Typography variant="h6" sx={{ color: "#3A2B65", fontFamily: "Manrope", fontWeight: "normal" }}>Address  & Reference Details</Typography>
                        </Box>
                    </Box>
                    {/* Primary Address */}
                    <div className="business-form-container">
                        <p style={{ width: "100%", marginBottom: "0px", fontFamily: "Manrope", fontWeight: "400" }}>Primary Address</p>
                        <form className="address-form-grid">
                            {/* Row 1 */}
                            <FormInput
                                label="Address Line 1"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                placeholder="Ex : No 12, Prestige Flats, Second street"
                                required
                            />
                            <FormInput
                                label="Address Line 2"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                placeholder="Ex : Sri Krishna Nagar"
                                required
                            />
                            <FormInput
                                label="Pincode"
                                type="tel"
                                name="pincode"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                }}
                                value={formData.pincode}
                                onChange={handleInputChange}
                                placeholder="Ex : 600 987"
                                required
                                style={{
                                    border: pincodeErrors.pincode ? "1px solid red" : "1px solid #ccc",
                                    color: pincodeErrors.pincode ? 'red' : 'black'
                                }}
                                validationMessage={pincodeErrors.pincode ? "Invalid pincode format (must be 6 digits)" : ""}
                                validationType="invalid"
                            />
                            <FormInput
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Ex : Porur"
                                required
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    City <span>*</span>
                                </label>
                                <select name="city"
                                    value={formData.city}
                                    onChange={handleInputChange} >
                                    <option value="">Select</option>
                                    <option >chennai</option>
                                    <option >mumbai</option>
                                    <option >banglore</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    State <span>*</span>
                                </label>
                                <select name="state" value={formData.state}
                                    onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option >Tamilnadu</option>
                                    <option >Telangana</option>
                                    <option >Kerala</option>
                                    <option >Karnataka</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    {/* Communication Address */}
                    <div className="business-form-container">
                        <div className="addresstitle" style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                            <p style={{ marginBottom: "0px", fontFamily: "Manrope", fontWeight: "400" }}>Communication Address  </p>
                            <p style={{ color: "#E05D00", padding: "5px", borderRadius: "5px", fontSize: "12px", backgroundColor: "#80808029", fontFamily: "Manrope", fontWeight: "400" }}>Address prefer for all official correspondence</p>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                                type="checkbox"
                                id="sameAsPrimary"
                                checked={sameAsPrimary}
                                onChange={handleSameAsPrimaryToggle}
                            />
                            <label htmlFor="sameAsPrimary">
                                Same as Primary Address
                            </label>
                        </div>
                        <form className="address-form-grid">
                            <FormInput
                                label="Address Line 1"
                                name="commAddressLine1"
                                value={formData.commAddressLine1}
                                onChange={handleInputChange}
                                placeholder="Ex : No 12, Prestige Flats, Second street"
                                required
                            />
                            <FormInput
                                label="Address Line 2"
                                name="commAddressLine2"
                                value={formData.commAddressLine2}
                                onChange={handleInputChange}
                                placeholder="Ex : Sri Krishna Nagar"
                                required
                            />
                            <FormInput
                                label="Pincode"
                                name="commPincode"
                                type="tel"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                }}
                                value={formData.commPincode}
                                onChange={handleInputChange}
                                placeholder="Ex : 600 987"
                                required
                                style={{
                                    border: pincodeErrors.commPincode ? "1px solid red" : "1px solid #ccc",
                                    color: pincodeErrors.commPincode ? 'red' : 'black'
                                }}
                                validationMessage={pincodeErrors.commPincode ? "Invalid pincode format (must be 6 digits)" : ""}
                                validationType="invalid"
                            />
                            <FormInput
                                label="Location"
                                name="commLocation"
                                value={formData.commLocation}
                                onChange={handleInputChange}
                                placeholder="Ex : Porur"
                                required
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    City <span>*</span>
                                </label>
                                <select name="commCity" value={formData.commCity}
                                    onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option >chennai</option>
                                    <option >mumbai</option>
                                    <option >banglore</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    State <span>*</span>
                                </label>
                                <select name="commState" value={formData.commState}
                                    onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option>Tamilnadu</option>
                                    <option >Telangana</option>
                                    <option >Kerala</option>
                                    <option >Karnataka</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    {/* Invoice Address  */}
                    <div className="business-form-container">
                        <div className="addresstitle" style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                            <p style={{ marginBottom: "0px", fontFamily: "Manrope", fontWeight: "400" }}>Invoice Address </p>
                            <p style={{ color: "#E05D00", padding: "5px", borderRadius: "5px", fontSize: "12px", backgroundColor: "#80808029", fontFamily: "Manrope", fontWeight: "400" }}>Address for invoicing and billing purposes</p>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                                type="checkbox"
                                checked={sameAsPrimary2}
                                onChange={handleSameAsPrimaryToggle2}
                                id="sameAsPrimary2"
                            />
                            <label htmlFor="sameAsPrimary2">
                                Same as Primary Address
                            </label>
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                                type="checkbox"
                                id="sameAsCommunication"
                                checked={sameAsCommunication}
                                onChange={handleSameAsCommunicationToggle}
                            />
                            <label htmlFor="sameAsCommunication">
                                Same as Communication Address
                            </label>
                        </div>

                        <form className="address-form-grid">
                            <FormInput
                                label="Address Line 1"
                                name="invAddressLine1"
                                value={formData.invAddressLine1}
                                onChange={handleInputChange}
                                placeholder="Ex : No 12, Prestige Flats, Second street"
                                required
                            />
                            <FormInput
                                label="Address Line 2"
                                name="invAddressLine2"
                                value={formData.invAddressLine2}
                                onChange={handleInputChange}
                                placeholder="Ex : Sri Krishna Nagar"
                                required
                            />
                            <FormInput
                                label="Pincode"
                                name="invPincode"
                                type="tel"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                }}
                                value={formData.invPincode}
                                onChange={handleInputChange}
                                placeholder="Ex : 600 987"
                                required
                                style={{
                                    border: pincodeErrors.invPincode ? "1px solid red" : "1px solid #ccc",
                                    color: pincodeErrors.invPincode ? 'red' : 'black'
                                }}
                                validationMessage={pincodeErrors.invPincode ? "Invalid pincode format (must be 6 digits)" : ""}
                                validationType="invalid"
                            />
                            <FormInput
                                label="Location"
                                name="invLocation"
                                value={formData.invLocation}
                                onChange={handleInputChange}
                                placeholder="Ex : Porur"
                                required
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    City <span>*</span>
                                </label>
                                <select name="invCity" value={formData.invCity}
                                    onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option >chennai</option>
                                    <option >mumbai</option>
                                    <option >banglore</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                                    State <span>*</span>
                                </label>
                                <select name="invState" value={formData.invState}
                                    onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option>Tamilnadu</option>
                                    <option >Telangana</option>
                                    <option >Kerala</option>
                                    <option >Karnataka</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    {/* Reffered by */}
                    <div className="business-form-container" >
                        <p style={{ width: "100%", marginBottom: "0px", fontFamily: "Manrope", fontWeight: "400" }}>Who Helped You Find Us / Radiant Reffered by</p>
                        <form className="address-form-grid" style={{ borderBottom: "none" }}>
                            {/* Row 1 */}
                            <FormInput
                                label="Radiant Employee ID (Optional)"
                                name="Radiant Employee ID "
                                placeholder="Ex : RAD9639 "
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                                    e.target.value = value;
                                }}
                            />
                            <FormInput
                                label="Employee Name (Optional)"
                                name="Employee Name  "
                                placeholder="Ex : Naveen"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                    e.target.value = value;
                                }}
                            />
                            <div className="form-group">
                                <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}> Mobile Number (Optional)</label>
                                <div className="phone-wrapper">
                                    <div className="prefix">
                                        <img src={flag} alt="India" />
                                        +91
                                    </div>
                                    <input
                                        type="tel"
                                        pattern="[0-9]*"
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        }}
                                        placeholder="Ex: 98765 43210"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Box>
            <Box
                sx={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: "white", height: "70px",
                    display: 'flex', alignItems: 'center', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', zIndex: 1000
                }}
            >
                <Box sx={{ width: "92%", margin: "auto", justifyContent: "right", display: "flex", gap: "30px" }}>

                    <Button style={{ color: "#3A2B65", border: "1px solid #3A2B65", background: "white", fontFamily: "Manrope", fontWeight: "400" }} variant="contained" sx={{ borderRadius: 2, padding: "10px 35px", cursor: "pointer", textTransform: "none" }}
                        onClick={() => { navigate("/register"); }}>
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!isFormValid}
                        onClick={() => setShowConfirm(true)}
                        sx={{
                            borderRadius: 2,
                            padding: "10px 35px",
                            cursor: isFormValid ? "pointer" : "not-allowed",
                            backgroundColor: isFormValid ? "#3A2B65" : "rgba(0,0,0,0.12)",
                            color: isFormValid ? "white" : "rgba(0,0,0,0.26)",
                            textTransform: "none", fontFamily: "Manrope", fontWeight: "400"
                        }}
                    >
                        Submit
                    </Button>
                    <ConfirmRegistrationModal
                        open={showConfirm}
                        onClose={() => setShowConfirm(false)}
                        onConfirm={() => {
                            setShowConfirm(false);
                            setShowOtpModal(true);
                        }}
                    />
                    <OtpVerificationModal
                        open={showOtpModal}
                        onClose={() => setShowOtpModal(false)}
                        onVerify={(otp) => {
                            console.log('Entered OTP:', otp);
                            setShowOtpModal(false);
                            setShowsuccessModal(true)
                        }}
                    />
                    <RegistrationSuccessDialog
                        open={showsuccessModal}
                        onClose={() => setShowsuccessModal(false)}
                        onConfirm={() => {
                            setShowsuccessModal(false);

                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;