import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [currentLogin, setCurrentLogin] = useState("");
    const [users, setUser] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    const login = (input) => {
        const user = users.find(
            (user) => user.email.toLowerCase() === input.toLowerCase()
        );
        if (user) {
            setCurrentLogin(user.fname);
            setIsAuth(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            toast({ description: "some text", status: "warning" });
        }
    };

    const logout = () => {
        setIsAuth(false);
        navigate("/");
    };

    const signup = (userData) => {
        setUser((prev) => [...prev, userData]);
    };

    const value = {
        isAuth,
        setIsAuth,
        login,
        logout,
        users,
        signup,
        currentLogin,
    };

    useEffect(() => {
        axios
            .get("https://lenskart-backend-ia3u.onrender.com/users")
            .then((res) => setUser(res.data))
            .catch((err) => alert(err));
    }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
