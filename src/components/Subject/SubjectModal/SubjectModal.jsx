import { BiSolidCircle } from "react-icons/bi"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import StudentCard from "../../Student/StudentCard/StudentCard";
import "./SubjectModal.css"

export default function SubjectModal(props) {
    const { show, handleClose } = props;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            <Modal.Header className='border-0 p-4' closeButton>
                <BiSolidCircle size="46px" />
                <div className="ps-2">
                    <h5 className="m-0"><strong>Codigo</strong></h5>
                    <label className="p-0 text-muted">Nombre-grupo</label>
                </div>
            </Modal.Header>
            <Modal.Body id="modal-body-container" className="px-5 py-4">
                <Row>
                    {/* Horarios y ubicación */}
                    <Col xs={12} md={5} lg={5} className="d-flex flex-column h-100">
                        <Form className="w-50">
                            <Form.Select aria-label="Default select example">
                                <option>Escoga un grupo</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form>
                        <div id="schedule-summary" className="my-3 p-4 border border-1 overflow-y-auto">
                            {/* # TODO: Make this scrollable once we have data to fetch */}
                            <h5><strong>Horarios y ubicación</strong></h5>
                            <div >
                                <h6 className="m-0 pb-2">Lunes</h6>
                                <ul>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                </ul>
                            </div>
                            <div >
                                <h6 className="m-0 pb-2">Martes</h6>
                                <ul>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                </ul>
                            </div>
                            <div >
                                <h6 className="m-0 pb-2">Miercoles</h6>
                                <ul>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                    <li>6:00 pm a 8:00 pm - salón 13A-207</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={7} lg={7}>
                        {/* #TODO Change this  and pagination when we have data to fetch */}
                        <div id="students-list-header" className="d-flex pb-1">
                            <h5 className="flex-grow-1"><strong>## Estudiantes - grupo</strong></h5>
                            <span className="text-muted pe-4"># total</span>
                        </div>
                        <div className="d-flex flex-column px-3">
                            <StudentCard />
                            <StudentCard />
                            <StudentCard />
                            <StudentCard />
                            <StudentCard />
                            <StudentCard />
                        </div>
                        <div>
                            Paination
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="dark" className="mx-auto" onClick={handleClose}>Entendido</Button>
            </Modal.Footer>
        </Modal>
    );
}

SubjectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};