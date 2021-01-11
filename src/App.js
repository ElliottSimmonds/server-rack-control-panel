import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import theme, { MuiTheme } from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import { Switch, Route, useLocation, Redirect, useHistory } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GlobalStyles from "./config/GlobalStyles";
import Header from "./components/Header";
import Loading from './components/Loading';

import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import User from "./views/User";
import CreateUser from "./views/CreateUser";
import Login from "./views/Login";
import Uac from "./views/Uac";
import Help from "./views/Help";
import SystemConfig from "./views/SystemConfig";

import firebase from "firebase/app"; // the firbase core lib
import 'firebase/auth'; // specific products
import 'firebase/firestore';
import firebaseConfig from "./config/firebase"; // the firebase config
import useAuth from "./services/firebase/useAuth";
import useSystemConfig from "./services/firebase/useSystemConfig";
import useUserConfig from "./services/firebase/useUserConfig";

let previouslyVisited = "/"; // stores page visited before being redirected

function Protected({ authenticated, children, ...rest }) {

    previouslyVisited = useLocation().pathname;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authenticated ? (children) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function ProtectedAdmin({ authenticated, admin, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (authenticated && admin) ? (children) : (
                    <Redirect
                        to={{
                        pathname: previouslyVisited,
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function RedirectAuthenticated({ authenticated, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !authenticated ? (children) : (
                    <Redirect
                        to={{
                        pathname: previouslyVisited,
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function App() {

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const location = useLocation();
    const history = useHistory();
    const { 
        isAuthenticated, 
        activeUser,
        loading, 
        createEmailUser, 
        signInEmailUser, 
        deleteUser,
        updatePassword,
        changeEmail,
        signOut
    } = useAuth(firebase.auth);
    const {
        createSystem,
        readSystem,
        readSystems,
        updateSystem,
        deleteSystem
    } = useSystemConfig(firebase.firestore)
    const {
        isAdmin,
        activeUserEntry,
        createUserEntry,
        readUserEntries,
        updateUserEntry,
        deleteUserEntry,
        userIsAdmin,
    } = useUserConfig(firebase.firestore)

    useEffect(() => { // updates history of user
        if (isAuthenticated) {
            history.push(previouslyVisited); 
        }
        return;
    }, [isAuthenticated])

    useEffect(() => { // checks if user is an admin
        if (activeUser.uid) {
            try {
                const verifyRole = async () => {
                    console.log("User",activeUser.email, activeUser.uid);
                    await userIsAdmin(activeUser.uid);
                }
                verifyRole()
            } catch(e) {
                console.log("error", e)
            }
        }
    }, [activeUser])

    useEffect(() => { // updates last active time in user entry
        if (activeUserEntry && activeUser.uid) {
            try {
                let editedEntry = {...activeUserEntry.data()}
                editedEntry.lastActive = new Date();
                updateUserEntry(activeUserEntry.id, editedEntry);
            } catch(e) {
                console.log("error", e)
            }
        }
    }, [activeUserEntry])

    useEffect(() => { // if no user entries exist, create one since there's going to be no sign up page. not a permanent solution!
        const getUserEntries =  async () => {
            const aUserEntries =  await readUserEntries();
            let userEntries = [];
            aUserEntries.forEach(u => userEntries.push({...u.data()}));
            if (userEntries.length == 0) {
                console.log("No users exist, creating default account.")
                await createEmailUser("admin@telesoft.com", "password").then((adminuser) => {
                    createUserEntry({
                        uid: adminuser.user.uid,
                        email: adminuser.user.email,
                        role: 'admin',
                        lastActive: new Date()
                    }).then(() => {signOut()}); // have to sign out because creating a new user reauthenticates
                });
            }
        }
        getUserEntries()
    }, [])

    if (loading) {
        return  (<Loading />); // loading screen
    }

    return (
        <div>
            <MuiThemeProvider theme={MuiTheme}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles/>

                    {location.pathname !== "/login" && (
                        <Header isAdmin={isAdmin} signOut={signOut}/>
                    )}
                    
                    <Switch>
                        <RedirectAuthenticated authenticated={ isAuthenticated } path="/login">
                            <Login signIn={signInEmailUser}/>
                        </RedirectAuthenticated>
                        
                        <Protected authenticated={isAuthenticated} exact path="/">
                            <Dashboard readSystems={readSystems} deleteSystem={deleteSystem} updateSystem={updateSystem}/>
                        </Protected>
                        <Protected authenticated={isAuthenticated} path="/settings">
                            <Settings user={activeUser}/>
                        </Protected>
                        <Protected authenticated={isAuthenticated} path="/user">
                            <User user={activeUser} userEntry={activeUserEntry} deleteUser={deleteUser} deleteUserEntry={deleteUserEntry} changeEmail={changeEmail} updatePassword={updatePassword} updateUserEntry={updateUserEntry} signOut={signOut}/>
                        </Protected>
                        <ProtectedAdmin authenticated={isAuthenticated} admin={isAdmin} path="/uac">
                            <Uac user={activeUser} readUserEntries={readUserEntries} updateUserEntry={updateUserEntry}/>
                        </ProtectedAdmin>
                        <Protected authenticated={isAuthenticated} path="/help">
                            <Help/>
                        </Protected>
                        <Protected authenticated={isAuthenticated} path="/config-system">
                            <SystemConfig createSystem={createSystem} readSystem={readSystem} updateSystem={updateSystem}/>
                        </Protected>
                        <Protected authenticated={isAuthenticated} path="/create-user">
                            <CreateUser createEmailUser={createEmailUser} createUserEntry={createUserEntry} signOut={signOut}/>
                        </Protected>
                    </Switch>

                </ThemeProvider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
