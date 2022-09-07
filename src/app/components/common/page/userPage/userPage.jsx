import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import api from "../../../../api";
import Qualities from "../../../ui/qualities";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId.toString()).then((user) => setUser(user));
    }, []);
    const history = useHistory();
    const goToEdit = () => {
        user
            ? history.push(`/users/${userId}/edit`)
            : history.replace(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                {<Qualities qualities={user.qualities} />}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Завершенные встречи: {user.completedMeetings}</h2>
                <h3>Рейтинг: {user.rate} /5</h3>

                <button onClick={goToEdit} type="button">
                    <Link to="/users/userId/edit" userId={userId}>
                        Изменить
                    </Link>
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
