import { useForm } from "react-hook-form"
import { AiOutlinePercentage } from "react-icons/ai";
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";

import "./CreateGroupNote.css";
import { addNote, getAddedNotes } from "../../../utils/functions.js";

export default function CreateGroupNote({ show, handleClose, notesGroupToSubmit }) {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // Verify the data to submit,
        // mostly the added notes becauses they are not linked with register() hook
        // and then send it to the backend
        // let floatNumber = data.percentage_in_subject;
        data.percentage_in_subject = parseFloat(data.percentage_in_subject).toFixed(2);

        let notes = getAddedNotes();
        for (let note in notes) {
            for (let key in notes[note]) {
                if (notes[note][key] === "" || notes[note][key] === null || notes[note][key] === undefined) {
                    alert("Por favor, complete todos los campos para el registro de las notas");
                    return;
                }
            }
        }

        // Reaching here means that everythig is ok
        let notesToSubmit = {
            ...data,
            "notes": { ...notes }
        }

        notesGroupToSubmit(notesToSubmit);
        handleClose();
        // Send to parent component.
    }
    const onError = (errors, e) => alert("errores en el registro de notas: ", errors, e);
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header className='border-0 p-3' closeButton>
                    <Modal.Title>CREAR GRUPO NOTA</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <Form onSubmit={handleSubmit(onSubmit, onError)} className="w-100">
                        <div className="d-flex w-100">
                            <Form.Group className="px-2">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" {...register("name", { required: true })} required />
                            </Form.Group>
                            <Form.Group id="group-note-percentage" className="px-2">
                                <Form.Label className="text-center d-block p-0"><AiOutlinePercentage size="20px" /></Form.Label>
                                <Form.Control type="number" {...register("percentage_in_subject", { required: true })} required />
                            </Form.Group>
                        </div>
                        <div id="notes-def-container" className="d-flex flex-column px-3">
                            <p className="pt-3">A continuación, agregue notas en el grupo #name:</p>
                            <div className="d-flex text-center align-items-center">
                                <h5 className=" bg-secondary text-white rounded-2 w-75 mx-1 p-1">Nombre</h5>
                                <h5 className=" bg-secondary text-white rounded-2 w-25 mx-1 p-1"><AiOutlinePercentage size="20px" /></h5>
                            </div>
                            <Form.Group id="div_2" className="note-specs d-flex my-2">
                                <Form.Control type="text" className="note-name-input mx-2 w-75" />
                                <Form.Control type="number" className="note-percentage-input mx-2 w-25" />
                            </Form.Group>
                            {/* Here weill be added more Form.Group */}
                        </div>
                        <div className="d-flex align-items-center mt-3">
                            <Button onClick={addNote}> Añadir nota</Button>
                            <span className="d-block text-muted flex-grow-1 text-end"> #Vaialble percentage</span>
                        </div>
                        {/* <IoIosAddCircle size="25px" className="m-0" /> */}
                        <div className="w-100 py-3">
                            <Button variant="success" type="submit" className="float-end">
                                Guardar cambios
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

CreateGroupNote.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    notesGroupToSubmit: PropTypes.func
}