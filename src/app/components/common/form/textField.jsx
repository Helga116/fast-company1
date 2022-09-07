import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <>
            <div className="mb-4">
                <label htmlFor={name}>{label}</label>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : type}
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleChange}
                        className={getInputClasses()}
                    />
                    {type === "password" && (
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowPassword}
                        >
                            <i
                                className={
                                    "bi bi-eye" + (showPassword ? "-slash" : "")
                                }
                            ></i>
                        </button>
                    )}
                </div>
                <div>{error && <p>{error}</p>}</div>
            </div>
        </>
    );
};
TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextField;
