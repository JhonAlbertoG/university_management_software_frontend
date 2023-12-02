import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import GroupNotes from "./Tables/GroupNote/GroupNote";
import Notes from "./Tables/Note/Note";
import "./EvaluationPlan.css"

export default function EvaluationPlan({ notes }) {
    return (
        <div className="border border-1">
            {/* #TODO: Change Materia-Codigo por un prop */}
            <h4 className="text-break"><strong>Plan de evaluación - Materia - Código</strong></h4>
            <Row>
                <Col xs={12} md={7} lg={7}>
                    <GroupNotes />
                    <div>pagination</div>
                    <div className="text-center">
                        <Button variant="primary" className="mt-3">Agregar Grupo de notas</Button>
                    </div>
                </Col>
                <Col xs={12} md={5} lg={5}>
                    <Notes />
                    <div>pagination</div>
                    <div className="text-center">
                        <Button variant="primary" className="mt-3">Agregar notas</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

EvaluationPlan.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired
}