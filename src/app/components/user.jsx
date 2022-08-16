import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import Quality from "./quality";

const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId.toString()).then((user) => setUser(user));
    }, []);
    const history = useHistory();
    const goToList = () => {
        user ? history.push("/users") : history.replace("/users");
    };
    return (
        <>
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <div>{<Quality qualities={user.qualities} />}</div>
                    <h3>{user.profession.name}</h3>
                    <h3>{user.completedMeetings}</h3>
                    <h3>{user.rate} /5</h3>
                </div>
            )}
            <button onClick={goToList} type="button">
                В список записей
            </button>
        </>
    );
};

export default User;
