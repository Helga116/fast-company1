import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/users" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                        <Redirect to="/" />
                    </Switch>
                </QualitiesProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
}

export default App;
