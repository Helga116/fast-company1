import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import api from "../../../../api";
import Comments from "../../../ui/comments";
import UserCard from "../../../ui/userCard";
import QualitiesCard from "../../../ui/qualitiesCard";
import MeetingsCard from "../../../ui/meetingsCard";

const UserPage = ({ props }) => {
    const params = useParams(props);
    const { userId } = params;

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);
    console.log(user);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
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
