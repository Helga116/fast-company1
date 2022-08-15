import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";

const User = () => {
    const userId = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users
            .getById(userId.userId.toString())
            .then((user) => setUser(user));
    }, []);
    const history = useHistory();

    const goToList = () => {
        user ? history.push("/users") : history.replace("/users");
    };
    return (
        <>
            <button onClick={goToList} type="button">
                В список записей
            </button>
            <h1>
                {user
                    ? user.name
                    : `user with id: ${userId.userId} is not found`}
            </h1>
        </>
    );
};

export default User;
