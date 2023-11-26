// TODO: Is this really neccesary, i mean, do we need to have it as a separate file?
import { useContext } from 'react';
import { AuthContext } from './authContext';

export const useAuth = () => useContext(AuthContext);