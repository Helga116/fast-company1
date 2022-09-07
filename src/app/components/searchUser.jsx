import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ searchQuery, onChange, onClick }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                value={searchQuery}
                className="form-control"
                placeholder="Search..."
                onChange={onChange}
                aria-describedby="button-addon2"
            ></input>
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={onClick}
            >
                X
            </button>
        </div>
    );
};

SearchUser.propTypes = {
    searchQuery: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

export default SearchUser;
