import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    return (
        <Form className='p-4'>
            <Form.Group as={Row}>
                <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Rol</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Select className="mb-3" aria-label="Seleccionar">
                        {/* TODO: Añadir tipos de roles */}
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Correro/ID</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Control defaultValue="email@example.com" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
                <Form.Label column xs={12} md={12} lg={12}>
                    <strong>Contraseña</strong>
                </Form.Label>
                <Col xs={12} md={12} lg={12}>
                    <Form.Control type="password" placeholder="Password" />
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
                <Button type="submit" size="md" variant="success">Registrate</Button>
            </Link>

        </Form>
    );
}
