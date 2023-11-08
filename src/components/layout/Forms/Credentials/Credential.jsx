// TODO: Once the user is registered, we can redirect it to the dashboad (authenticated) page, according to its role
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"

export default function Credential() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        console.log(event.value);
        navigate("/student/dashboard");
        // navigate("/professor/dashboar"); //To test professor dashboard

    }
    return (
        <>
            <Form className='form-container'>
                <Row className='py-5'>
                    <Col xs={12} md={12} lg={12}>
                        <h4><strong>Información academíca</strong></h4>
                        <Form.Group className='py-2'>
                            <Form.Label><strong>Rol</strong></Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Tipo</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='py-2'>
                            <Form.Label><strong>Programa académico</strong></Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Tipo</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <h4><strong>Información academíca</strong></h4>
                        <Form.Group className='py-2'>
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control type="email" placeholder='email@example.com' />
                        </Form.Group>
                        <Form.Group className='py-2'>
                            <Form.Label><strong>Contraseña</strong></Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='py-3'>
                    <Col>
                        <Form.Check // prettier-ignore
                            type="checkbox"
                            id="default-id" // TODO: Change this
                            label="Acepto el tratamiento de mis datos personales"
                        />
                    </Col>
                </Row>
                <Row className='py-4'>
                    <Col className='d-grid'><Button variant='success' type="submit" onClick={handleSubmit}>Registrarme</Button></Col>
                </Row>
            </Form>
        </>
    )
}
