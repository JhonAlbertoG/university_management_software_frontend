// TODO: Once the user is registered, we can redirect it to the dashboard (authenticated) page, according to its role
// TODO: Create academic programas in backend and then fetch those in here.
// TODO: Create the checkbox validation to accept the user dara once its checked.
import { useForm } from "react-hook-form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import PropTypes from "prop-types";

export default function Credential({ registration }) {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        if (Object.keys(data).length > 0) {
            const allFieldsFilled = Object.values(data).every(x => (x !== null && typeof x !== "undefined"));
            if (allFieldsFilled && data.accept_data_treatment) {
                console.log("CREDENTIAL - Data ready to submit");
                delete data.accept_data_treatment
                registration(data);
            }
            else {
                alert("Debe proporcionar toda la información, así como aceptar el tratamiento de sus datos personales.")
            }
        }
    }
    const onError = (errors, e) => console.log("CREDENTIALS - Error while trying to register: ", errors, e);
    return (
        <>
            <Form className='form-container' onSubmit={handleSubmit(onSubmit, onError)}>
                <Row className='py-5'>
                    <Col xs={12} md={12} lg={12}>
                        <h4><strong>Información academíca</strong></h4>
                        <Form.Group className='py-2'>
                            <Form.Label>Rol</Form.Label>
                            <Form.Select defaultValue="1" {...register("role_id")} required>
                                <option>Tipo</option>
                                <option value="1">ESTUDIANTE</option>
                                <option value="2">DOCENTE</option>
                                <option value="3">SUPERADMINISTRADOR</option>
                                <option value="4">ADMINISTRADOR</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='py-2'>
                            <Form.Label>Programa académico</Form.Label>
                            <Form.Select {...register("academic_program_id")} required>
                                <option>Tipo</option>
                                <option value="1">Programa academico de prueba</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <h4><strong>información de seguridad</strong></h4>
                        <Form.Group className='py-2'>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" {...register("password")} required />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" placeholder="test@example.com" {...register("email", { required: true })} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='py-3'>
                    <Col>
                        <Form.Check // prettier-ignore
                            type="checkbox"
                            label="Acepto el tratamiento de mis datos personales"
                            {...register("accept_data_treatment")}
                            required
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

Credential.propTypes = {
    registration: PropTypes.func.isRequired
}
