import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import api from "../../../../api";
import Qualities from "../../../ui/qualities";

const UserPage = ({ props }) => {
    const params = useParams(props);
    const { userId } = params;

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                {<Qualities qualities={user.qualities} />}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Завершенные встречи: {user.completedMeetings}</h2>
                <h3>Рейтинг: {user.rate} /5</h3>

                <Link to={`/users/${userId}/edit`}>Изменить</Link>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    props: PropTypes.object
};

export default UserPage;
