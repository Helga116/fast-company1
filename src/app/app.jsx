import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";
import Loading from "./components/loading";
// import UsersList from "./components/usersList";
import User from "./components/user";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/users/:userId" component={User} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/404" component={Loading} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;
