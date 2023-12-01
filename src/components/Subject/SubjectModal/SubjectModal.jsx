import { useState, useMemo } from "react";
import { BiSolidCircle } from "react-icons/bi"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import StudentCard from "../../Student/StudentCard/StudentCard";
import Pagination from '../../Pagination/Pagination';
import "./SubjectModal.css"
import { formattGroupClassesToshow } from "../../../utils/functions";

const PAGESIZE = 6;

export default function SubjectModal({ show, handleClose, subject }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [clickedGroup, setClickedGroup] = useState(null);
    const [groupClasses, setGroupClasses] = useState({});
    const [groupStudents, setGroupStudents] = useState([]);

    const handleGroupClassesAndStudents = (clickedGroup) => {
        setClickedGroup(clickedGroup);
        if (clickedGroup !== "undefined") {
            let groupClasses = subject.classes.find((groupClass) => groupClass.group_id == clickedGroup);
            setGroupClasses(formattGroupClassesToshow(groupClasses))
            setGroupStudents(subject.groups.find((group) => Object.keys(group)[0] == clickedGroup)[clickedGroup])
        }
    }
    const cleanUp = () => {
        setClickedGroup(null);
        setGroupClasses({});
        setGroupStudents([]);
    }
    const listedStudents = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGESIZE;
        const lastPageIndex = firstPageIndex + PAGESIZE;
        if (clickedGroup !== null && groupStudents.length > 0) {
            if (firstPageIndex > groupStudents.length) {
                setCurrentPage(1);
            }
            return groupStudents.slice(firstPageIndex, lastPageIndex);
        } else {
            return []
        }
    }, [currentPage, groupStudents, clickedGroup]);


    if (subject) {
        return (
            <Modal
                show={show}
                onHide={() => {
                    cleanUp();
                    handleClose();
                }}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header className='border-0 p-4' closeButton>
                    <BiSolidCircle size="46px" />
                    <div className="ps-2">
                        <h5 className="m-0"><strong>{subject.subject.code}</strong></h5>
                        <label className="p-0 text-muted">{subject.subject.name} - {subject.groups.length} grupos</label>
                    </div>
                </Modal.Header>
                <Modal.Body id="modal-body-container" className="px-5 py-4">
                    <Row>
                        {/* Horarios y ubicación */}
                        <Col xs={12} md={5} lg={5} className="d-flex flex-column h-100">
                            <Form className="w-50">
                                <Form.Group className="px-3 pb-3">
                                    <Form.Select onChange={(e) => {
                                        handleGroupClassesAndStudents(e.target.value)
                                    }}>
                                        <option value="undefined">Seleccione un grupo</option>

                                        {
                                            Object.keys(subject).length > 0 ? subject.groups.map((group, index) => {
                                                return <option key={index} value={Object.keys(group)[0]}>GRUPO {Object.keys(group)[0]}</option>
                                            }) :
                                                <option key="0" value="undefined">No hay grupos disponibles</option> //TODO: Is this really necccesary, even thoug we vlidate at the render of thsi cokmponent?
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <div id="schedule-summary" className="my-3 p-4 border border-1 overflow-y-auto">
                                {/* # TODO: Make this scrollable once we have data to fetch */}
                                <h5><strong>Horarios</strong></h5>
                                {/* {renderClasses()} */}
                                {Object.keys(groupClasses).length > 0 ?
                                    Object.keys(groupClasses).map((groupClassKey, index) => {
                                        return <div key={index}>
                                            <h6 className="m-0 pb-2">{groupClassKey}</h6>
                                            <ul>
                                                {groupClasses[groupClassKey].map((classTime, index) => {
                                                    return <li key={index}>{classTime}</li>
                                                })}
                                            </ul>
                                        </div>
                                    })
                                    :
                                    <div>Selecciona una materia</div>
                                }
                            </div>
                        </Col>
                        <Col xs={12} md={7} lg={7}>
                            <div id="students-list-header" className="d-flex pb-1">
                                <h5 className="flex-grow-1"><strong>{groupStudents.length} Estudiantes - grupo {clickedGroup}</strong></h5>
                            </div>
                            <div className="d-flex flex-column px-3">
                                {listedStudents.length > 0 ?
                                    listedStudents.map((student, index) => {
                                        return <StudentCard key={index} student={student} />
                                    }) :
                                    <div>Seleccione un grupo para ver los estudiantes</div>}
                            </div>
                            <div>
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={groupStudents.length}
                                    pageSize={PAGESIZE}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="dark" className="mx-auto" onClick={() => {
                        cleanUp();
                        handleClose();
                    }}>Entendido</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else {
        console.log("no se muestra")
    }
}

SubjectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired
};