import React from "react";
import PropTypes from "prop-types";

const TextAriaField = ({ label, name, rows, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <>
            <div className="mb-4">
                <label htmlFor={name}>{label}</label>
                <div className="input-group">
                    <textarea
                        name={name}
                        id={name}
                        rows={++rows}
                        value={value}
                        onChange={handleChange}
                        className={getInputClasses()}
                    />
                </div>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};
TextAriaField.defaultProps = {
    type: "text"
};

TextAriaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    rows: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAriaField;
