import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId.toString()).then((user) => setUser(user));
    }, []);
    const history = useHistory();
    const goToList = () => {
        user ? history.push("/users") : history.replace("/users");
    };
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                {<QualitiesList qualities={user.qualities} />}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Завершенные встречи: {user.completedMeetings}</h2>
                <h3>Рейтинг: {user.rate} /5</h3>

                <button onClick={goToList} type="button">
                    В список записей
                </button>
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
