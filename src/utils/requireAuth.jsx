import { redirect } from 'react-router-dom';
import { rolesMappping } from './constants';
// eslint-disable-next-line no-unused-vars
export const requireAuth = (roles) => async ({ request, params }) => {
    const storedUser = {

        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
        access_token_expiracy: localStorage.getItem('access_token_expiracy'),
        user_role: localStorage.getItem('role'),
        user_identification_number: localStorage.getItem('identification_number')
    };

    console.log("storedUser", storedUser);
    const user = Object.keys(storedUser).every(
        key =>
            storedUser[key] !== null &&
            storedUser[key] !== undefined &&
            storedUser[key]) !== '' ? true : false;

    if (!user) {
        return redirect('/login');
    }
    if (roles && typeof rolesMappping[storedUser.user_role] === "undefined") {
        return redirect('/unauthorized');
    }

    return null;
};
