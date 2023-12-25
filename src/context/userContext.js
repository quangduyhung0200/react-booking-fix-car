import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";


const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const location = window.location.pathname
    const userdefault = {
        isAuthenticated: false,
        isLoading: true,
        token: "",
        account: {},
        id: ''
    }
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(
        userdefault
    );

    // Login updates the user data with a name parameter
    const loginContext = (userdata) => {
        setUser({ ...userdata, isLoading: false })
    };

    // Logout updates the user data to default
    const logout = () => {

        setUser({ ...userdefault, isLoading: false })
    };
    const feactUser = async () => {
        let data = await getUserAccount()
        console.log('data user: d', data)
        if (data && data.EC === 0) {
            let token = data.DT.access_token
            let email = data.DT.email
            let userName = data.DT.userName
            let role = data.DT.role
            let id = data.DT.id
            setUser({
                isAuthenticated: true,
                token: token,
                account: { role, email, userName, id },
                isLoading: false,

            })




        }
        else {

            setUser({ ...userdefault, isLoading: false })
        }

    }

    useEffect(() => {

        feactUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export { UserProvider, UserContext } 