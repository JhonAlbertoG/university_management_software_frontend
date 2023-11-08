// TODO: Determine controlIDs for each form field, and then configure react-form
// TODO: Determine the required files, and activate validation
// TODO: What do we think if we install this -> https://www.npmjs.com/package/react-phone-number-input ?
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import "./PersonalInfo.css"

export default function PersonalInfo() {
    return (
        <>
            <Form className='form-container'>
                <Row className='py-5'>
                    <Col xs={12} md={8} lg={8}>
                        <h4><strong>Información personal</strong></h4>
                        <Form.Group>
                            <Form.Label><strong>Cedula/identificación</strong></Form.Label>
                            <div className='d-flex'>
                                <Form.Control type="number" placeholder='Ej: 1004718953' className='flex-grow-1' />
                                <Form.Select aria-label="Default select example" className="w-25">
                                    <option>Tipo</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                            <label className='text-muted'>Sin puntos, comas. Solo números</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4><strong>Nombres y apellidos</strong></h4>
                        <hr />
                        <Row className='py-2'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Primer nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: Miguel" />
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Segundo nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: Angel" />
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='py-2'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Primer apellido</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: Lopez" />
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Segundo apellido</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: Fernandez" />
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4><strong>Ubicación de residencia</strong></h4>
                        <hr />
                        <Row className='py-2'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Departamento</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Tipo</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Select aria-label="Default select example" >
                                        <option>Tipo</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='py-2'>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Descripción de dirección de domicilio</Form.Label>
                                    <Form.Control as="textarea" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4><strong>Datos de contacto</strong></h4>
                        <hr />
                        <Row className='py-2'>
                            <Col>
                                <Form.Group>
                                    <div className='d-flex'>
                                        <Form.Label>Telefono</Form.Label>
                                        <label className='text-muted'>&emsp;(opcional)</label>
                                    </div>
                                    <Form.Control type="text" placeholder="Ej: 346 2047" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: 3218484132" />
                                    <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>



        </>
    )
}
