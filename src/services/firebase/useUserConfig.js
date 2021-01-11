import { useState } from "react";

function useUserConfig(fStore) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeUserEntry, setActiveUserEntry] = useState({});

    const ref = fStore().collection('users');
    const createUserEntry = user => ref.add(user);
    const readUserEntry = id => ref.doc(id).get();
    const readUserEntries = () => ref.get();
    const updateUserEntry = (id, user) => ref.doc(id).update(user);
    const deleteUserEntry = (id) => ref.doc(id).delete();

    const userIsAdmin = async id => {
        let users = await ref.get();
        users.forEach(u => {
            if (u.data().uid == id) {
                if (u.data().role == 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                setActiveUserEntry(u);
            }
        });
    };

    return { isAdmin, activeUserEntry, createUserEntry, readUserEntries, updateUserEntry, deleteUserEntry, userIsAdmin }
}
export default useUserConfig;
