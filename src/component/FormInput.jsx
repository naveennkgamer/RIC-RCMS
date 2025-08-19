import React from 'react';

const FormInput = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    onInput,
    hint,
    validationMessage,
    validationType = "valid",
    style = {},
}) => {
    return (
        <div className="form-group">
            <label style={{ fontFamily: "Manrope", fontWeight: "normal" }}>
                {label} {required && <span>*</span>}
            </label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onInput={onInput}
                placeholder={placeholder}
                style={style}
            />
            {hint && <p className="hint">{hint}</p>}
            {validationMessage && (
                <p
                    style={{
                        color: validationType === "invalid" ? "red" : "#007700",
                        fontSize: "13px"
                    }}
                >
                    {validationMessage}
                </p>
            )}
        </div>
    );
};

export default FormInput;
