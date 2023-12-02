// TODO: Set the height of this area beacuse whenever the recrods are less than the page size, the div heigh are decreases visually 

import { useState, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from "react-bootstrap/Table";

import Pagination from '../../../Pagination/Pagination';
import "./StudentsNotes.css";


const PAGESIZE = 8;

export default function StudentsNotes({ students, notes, gradesDef, showStudent }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [currentPage, setCurrentPage] = useState(1);
    const listedStudents = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGESIZE;
        const lastPageIndex = firstPageIndex + PAGESIZE;
        if (students.length > 0) {
            if (firstPageIndex > students.length) {
                setCurrentPage(1);
            }
            return students.slice(firstPageIndex, lastPageIndex);
        } else {
            return []
        }
    }, [currentPage, students]);

    return (
        <div id="student-notes" className='h-100 bg-white px-4 py-3'>
            <div className="d-flex justify-content-between pb-4">
                <div className='d-flex align-items-center'>
                    <h4 className="text-start text-break m-0"><strong>Notas de estudiantes</strong></h4>
                    <span className="text-muted d-block text-end py-0 ps-3"> {students.length} estudiantes</span>
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={students.length}
                    pageSize={PAGESIZE}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

            <div id="students-info-table-container">
                <Table id="students-info-table" striped="columns" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Programa</th>
                            {/* The colspan would be the total notes inside a note group. for
                        example, parcial 1 could be made of quizzes, activities, homework, etc */}
                            {/* TODO: Add the logic to determine total of notes using prop.notes */}
                            {(() => {
                                if (gradesDef.length > 0 && students.length > 0) {
                                    return gradesDef.map((grade, index) => {
                                        return <th key={index} colSpan={grade.notes.length}>{grade.group.name}</th>
                                    })
                                } else {
                                    forceUpdate;
                                }
                            })()}

                            {/* <th colSpan={2}>Grupo Nota 1</th>
                            <th colSpan={2}>Grupo Nota 2</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {listedStudents.map((student, index) => <tr key={index} onClick={showStudent}>
                            <td>{student.userInfo.id}</td>
                            <td>{student.userInfo.identification_number}</td>
                            <td>{student.userInfo.first_name} {student.userInfo.last_name} {student.userInfo.middle_name} {student.userInfo.second_last_name}</td>
                            {/* TODO: Search for the right name */}
                            <td>{student.userInfo.academic_program_id}</td>
                            {
                                (() => {
                                    if (notes.length > 0) {
                                        let currentStudent = notes.find((userId) => userId.id == student.userInfo.id)
                                        if (currentStudent && typeof currentStudent.grades !== 'undefined') {
                                            return currentStudent.grades.map((studentNote, index) => {
                                                return <td key={index}>{studentNote.grade_score}</td>
                                            })
                                        }
                                    }
                                })()
                            }
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

StudentsNotes.propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    showStudent: PropTypes.func.isRequired,
    gradesDef: PropTypes.arrayOf(PropTypes.object).isRequired
}