import { createContext, useState, useEffect } from 'react';
import { refreshToken } from '../../api/auth';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token'),
            access_token_expiracy: localStorage.getItem('access_token_expiracy'),
            role: localStorage.getItem('role'),
            identification_number: localStorage.getItem('identification_number')
        };
        setLoading(false);
        if (storedUser) {
            setUser(storedUser);
            // Intervalo para verificar la necesidad de refrescar el token
            const interval = setInterval(() => {
                if (user && new Date(user.access_token_expiracy) - new Date() < 60000) { // 60 segundos antes de la expiración
                    refreshToken();
                }
            }, 60000); // Verificar cada 60 segundos

            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const loginContext = (userData) => {
        localStorage.clear();
        localStorage.setItem('access_token', userData.access);
        localStorage.setItem('refresh_token', userData.refresh);
        localStorage.setItem('access_token_expiracy', userData.access_token_expiracy);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('identification_number', userData.identification_number);
        setUser(userData);
    };

    const logoutContext = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token_expiracy');
        localStorage.removeItem('role');
        localStorage.removeItem('identification_number');
        setUser(null);

    };

    return (
        <AuthContext.Provider value={{ user, isLoading, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
