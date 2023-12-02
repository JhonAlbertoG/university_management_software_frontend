import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import GroupNotes from "./Tables/GroupNote/GroupNote";
import Notes from "./Tables/Note/Note";
import "./EvaluationPlan.css"
import CreateGroupNote from './CreateGroupNote';

export default function EvaluationPlan({ notes, notesGroupToSubmit }) {
    const [show, setShow] = useState(false);
    const [notesDefinition, setNotesDefinitions] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleNotesDefinitionToShow=(notesDefinition)=>{
    //     console.log("notes defs to sow: ", notesDefinition);
    //     setNotesDefinitions(notesDefinition);
    // } 

    return (
        <div className="p-2">
            {/* #TODO: Change Materia-Codigo por un prop */}
            <h4 className="text-break pt-4"><strong>Plan de evaluación - Materia - Código</strong></h4>
            <Row className='pt-2'>
                <Col xs={12} md={7} lg={7}>
                    <GroupNotes notes={notes} notesDefinitionToShow={setNotesDefinitions} />
                </Col>
                <Col xs={12} md={5} lg={5}>
                    <Notes notesDef={notesDefinition} />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button variant="primary" className="mt-2" onClick={handleShow}>Agregar Grupo de notas</Button>
                </Col>
            </Row>
            <CreateGroupNote show={show} handleClose={handleClose} notesGroupToSubmit={notesGroupToSubmit} />
        </div>
    )
}

EvaluationPlan.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    notesGroupToSubmit: PropTypes.func
}