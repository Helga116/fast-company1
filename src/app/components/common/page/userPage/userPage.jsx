import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../../../../api";
import Qualities from "../../../ui/qualities";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId.toString()).then((user) => setUser(user));
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                {<Qualities qualities={user.qualities} />}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Завершенные встречи: {user.completedMeetings}</h2>
                <h3>Рейтинг: {user.rate} /5</h3>

                <Link to={`${userId}/edit`}>Изменить</Link>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
