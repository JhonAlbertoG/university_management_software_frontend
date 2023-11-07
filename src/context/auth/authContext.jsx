// TODO: (MAIN) Once the basic views are set, and the API is correctly configured with authentication and basic information
//        We will pass on to this file to implement the authentication process

import { createContext, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useLocalStorage } from "./useLocalStorage";
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // TODO: Use this when the authentication process is more clear
    // const [user, setUser] = useLocalStorage("user", null);
    // const navigate = useNavigate();


    // const login = (newUser) => {
    //     // Lógica de inicio de sesión (por ejemplo, establecer el usuario basado en una respuesta de la API)
    //     setUser(newUser);
    //     navigate("/dashboard"); // TODO: more optionsto distinguish roles
    // };

    // const logout = () => {
    //     // Lógica de cierre de sesión
    //     setUser(null);
    //     navigate("/");
    // };
    const [user, setUser] = useState(null);

    const login = (newUser) => {
        // Lógica de inicio de sesión (por ejemplo, establecer el usuario basado en una respuesta de la API)
        setUser(newUser);
    };

    const logout = () => {
        // Lógica de cierre de sesión
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
