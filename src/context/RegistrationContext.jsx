import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        mobileNumber: "",
        secondaryMobileNumber: "",
        typeOfBusiness: "",   // important → start as empty string
        natureOfBusiness: "", // important → start as empty string
        GSTINNumber: "",
        email: "",
        panNumber: "",
        aadharNumber: "",
        panFile: null,
        aadharFile: null,
    });


    return (
        <RegistrationContext.Provider value={{ formData, setFormData }}>
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistration = () => useContext(RegistrationContext);
