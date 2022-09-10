import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/users" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
