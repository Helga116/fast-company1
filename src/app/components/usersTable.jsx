import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, handleDelete, handleToggleBookmark }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        {...user}
                        handleDelete={handleDelete}
                        handleToggleBookmark={handleToggleBookmark}
                        key={user._id}
                    />
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleToggleBookmark: PropTypes.func,
    handleDelete: PropTypes.func
};

export default UserTable;
