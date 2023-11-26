import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { login } from "../../api/auth";
import { getUserById } from "../../api/users";
import { useAuth } from "../../context/auth/useAuth";
import { rolesMappping } from "../../utils/constants";


export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    const { loginContext } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("LOGINFORM - data to login", data);
        if (Object.keys(data).length > 0 &&
            ['username', 'password'].every(field => data[field] !== null && data[field] !== undefined && data[field] !== '')) {
            login(data).then((tokens) => {
                if (typeof tokens !== "undefined") {
                    console.log("LOGINFORM - tokens creados");
                    let userCredentialsAndToken = {
                        "access_token": tokens.access,
                        "user_identification_number": data.username,
                    };
                    getUserById(userCredentialsAndToken).then((user) => {
                        let userIndexInfo = {
                            'identification_number': user.identification_number,
                            "role": user.role_id
                        };
                        localStorage.clear();
                        // localStorage.setItem('role', userIndexInfo.role);
                        // localStorage.setItem('identification_number', userIndexInfo.identification_number);
                        // // Add the tokens to the local storage
                        // localStorage.setItem('access_token', tokens.access);
                        // localStorage.setItem('refresh_token', tokens.refresh);
                        // Set the expiration time of the access token to 29 minutes, even tough the token expires in 30 minutes
                        let access_token_expiracy = Date.now() + 1790 * 1000;
                        // localStorage.setItem('access_token_expiracy', access_token_expiracy);
                        tokens.access_token_expiracy = access_token_expiracy;
                        // Update the user context
                        loginContext(Object.assign(tokens, userIndexInfo));
                        // Redirect to the home page
                        // console.log(rolesMappping[userIndexInfo.role]);
                        if (rolesMappping[userIndexInfo.role] === "student" || rolesMappping[userIndexInfo.role] === "professor") {
                            console.log("LOGINFORM - usuario registrado");
                            navigate(`/dashboard/${rolesMappping[userIndexInfo.role]}/schedule`);
                        }
                        // TODO: Add the rest of the roles, the ones that handle the chat administration
                    });
                } else {
                    // TODO: Show a better alert
                    alert("LOGINFORM - usuario no registrado / credenciales incorrectas")
                }
            });
            // // Getting the user role
            // getUserRoleById(data.username).then((role) => {
            //     if (typeof tokens !== "undefined") {}
            // });

        }
    }
    const onError = (errors, e) => console.log("LOGINFORM - error while login", errors, e);

    return (
        <Form className='p-4' onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group as={Row}>
                {/* <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Rol</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Select className="mb-3" require>
                        <option>Selecciona un rol</option>
                        <option value="1">ESTUDIANTE</option>
                        <option value="2">DOCENTE</option>
                        <option value="3">SUPERADMINISTRADOR</option>
                        <option value="4">ADMINISTRADOR</option>
                    </Form.Select>
                </Col> */}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Numero de identificación (CC,TI,...)</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Control placeholder="123456" {...register("username")} required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
                <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Contraseña</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Control type="password" placeholder="Password" {...register("password")} required />
                </Col>
            </Form.Group>
            {/* TODO: Install form handling module (react-form i think it was) */}
            <div className='d-grid py-2'>
                <Button type="submit" size="md">Inicia sesión</Button>
            </div>
            <Button variant='link'>Olvidaste tu contraseña?</Button>
            <hr />
            <span>No tienes cuenta?</span>
            <Link to="/signup" className='d-block d-grid py-2 text-decoration-none'>
                <Button size="md" variant="success">Registrate</Button>
            </Link>

        </Form>
    );
}
