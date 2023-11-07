import { redirect } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export const requireAuth = (roles) => async ({ request, params }) => {
    const user = null/* TODO: Tu lógica para obtener el usuario actual y su rol, posiblemente del token en la sesión o cookie */;

    if (!user) {
        return redirect('/login');
    }

    if (roles && !roles.includes(user.role)) {
        return redirect('/unauthorized');
    }

    return null; // Si está autenticado y tiene el rol adecuado, continuar.
};
