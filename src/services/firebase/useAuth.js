import { useState } from "react";

function useAuth(fbAuth) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeUser, setActiveUser] = useState({});
    const [loading, setLoading] = useState(true);

    fbAuth().onAuthStateChanged(user => {
        setLoading(false);
        if (user) {
            setIsAuthenticated(true);
            setActiveUser(user);
            return;
        }
        setIsAuthenticated(false);
    });

    const createEmailUser = (email, password) => fbAuth().createUserWithEmailAndPassword(email, password);
    const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);
    const signOut = () => fbAuth().signOut();
    const deleteUser = () => fbAuth().currentUser.delete();
    const updatePassword = (password) => fbAuth().currentUser.updatePassword(password);
    const changeEmail = (email) => fbAuth().currentUser.updateEmail(email);

    return {isAuthenticated, activeUser, loading, createEmailUser, signInEmailUser, deleteUser, changeEmail, updatePassword, signOut};
}

export default useAuth