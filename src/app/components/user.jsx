import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ handleDelete, handleToggleBookmark, ...user }) => {
    return (
        <tr>
            <td>{user.name} </td>
            <td>
                {user.qualities.map((item) => (
                    <Quality
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        color={item.color}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>
                <Bookmark
                    key={user._id}
                    id={user._id}
                    {...user}
                    status={user.bookmark}
                    onClick={handleToggleBookmark}
                />
            </td>
            <td>
                <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookmark: PropTypes.func.isRequired
};

export default User;
