import React from "react";
import { Route, Switch } from "react-router-dom";
import UserPage from "../components/common/page/userPage/userPage";
import UsersListPage from "../components/common/page/userListPage";
import EditUserPage from "../components/common/page/userPage/editUserPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
    return (
        <>
            <UserProvider>
                <Switch>
                    <Route path="/users" exact component={UsersListPage} />
                    <Route path="/users/:userId" exact component={UserPage} />
                    <Route
                        path="/users/:userId/:edit"
                        exact
                        component={EditUserPage}
                    />
                </Switch>
            </UserProvider>
        </>
    );
};

export default Users;
