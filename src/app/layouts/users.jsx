import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import UserPage from "../components/common/page/userPage";
import UsersListPage from "../components/common/page/userListPage";
import EditUserPage from "../components/common/page/userPage/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <>
            <Switch>
                <Route path="/" exact component={UsersListPage} />
                <Route
                    path="/:userId"
                    render={() => <UserPage userId={userId} />}
                />
                <Route path="/userId/:edit" component={EditUserPage} />
            </Switch>
            {/* // {userId ? <UserPage userId={userId} /> : <UsersListPage />} */}
        </>
    );
};

export default Users;
