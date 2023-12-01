import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import PropTypes from "prop-types"
import "./NotesHandler.css";

export default function NotesHandlerModal({ show, handleClose }) {
    return (

        <Modal
            show={show} onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <div id="student-note-info" className="notes-handler d-flex flex-column px-4 pb-3">
                    <div className="d-flex py-1">
                        <span><strong>Estudiante:</strong></span>
                        <span className="flex-grow-1">&nbsp;Miguel Angel Lopez Fernandez</span>
                    </div>
                    <div className="d-flex py-1">
                        <span><strong>Programa: </strong></span>
                        <span className="flex-grow-1">&nbsp;Ingenieria de sistemas y computación</span>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                        <div className="w-100">
                            <span><strong>Acumulado:</strong></span>
                            <span>&nbsp;5.0</span>
                        </div>
                        <div className="w-100 border border-1">
                            <div id="note-status" className="w-25 h-100 mx-auto">
                            </div>
                            <span className="d-block text-center border border-1">Aceptable</span>
                        </div>
                    </div>
                </div>
                <div id="notes-by-plan" className="notes-handler px-4 pt-3">
                    <div className="d-flex justify-content-between">
                        <h4><strong>Notas</strong></h4>
                        pagination??
                    </div>

                    {Array.from({ length: 4 }).map((_, index) => {
                        return (
                            <div key={index} className="d-flex flex-column py-2">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5><strong>Parcial 1</strong></h5>
                                    <span className="text-muted"># Acumulado</span>
                                </div>
                                {/* Display notes here */}
                                <div id="note-manage-area" className="px-3">
                                    <Form className="d-flex justify-content-evenly overflow-x-scroll">
                                        {Array.from({ length: 6 }).map((_, index) => {
                                            return (
                                                // <div key={index} className="text-center">
                                                <Form.Group key={index} className="d-flex flex-column align-items-center border border-1">
                                                    <Form.Label id="note-name" className="p-0 m-0 text-center">Nota {index + 1}</Form.Label>
                                                    {/* <Form.Control type="text" {...register("first_name", { required: true })} required /> */}
                                                    <Form.Control type="number" id="note-input" />
                                                    <Form.Label className="p-0 m-0">{index + 1}</Form.Label>
                                                </Form.Group>
                                                // </div>
                                            )
                                        })}
                                    </Form>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

NotesHandlerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}
