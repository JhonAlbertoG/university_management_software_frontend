import { useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import SubjectCard from "../../Subject/SubjectCard/SubjectCard";
import Pagination from '../../Pagination/Pagination';
import "./SubjectsGroups.css";

const PAGESIZE_EVALUATION = 3;
const PAGESIZE_SCHEDULE = 4;

export default function SubjectsGroups({ groups, clickedSubjectAndGroup, askedBy, showSubject }) {
    const [currentPage, setCurrentPage] = useState(1);
    // const [groupsInView, setGroupsInView] = useState([]);
    const [clickedSubject, setClickedSubject] = useState(null);
    const [subjectAndGroup, setSubjectAndGroup] = useState({});

    const listedGroups = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGESIZE_EVALUATION;
        const lastPageIndex = firstPageIndex + PAGESIZE_EVALUATION;
        console.log("from use memeo:", groups)
        if (clickedSubject !== null && groups.length > 0) {

            if (groups[clickedSubject].groups.length > 0) {
                if (firstPageIndex > groups.length) {
                    setCurrentPage(1);
                }
                return groups[clickedSubject].groups.slice(firstPageIndex, lastPageIndex);
            }
        } else {
            return []
        }
    }, [currentPage, groups, clickedSubject]);

    const listedSubjects = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PAGESIZE_SCHEDULE;
        const lastPageIndex = firstPageIndex + PAGESIZE_SCHEDULE;
        if (groups.length > 0) {
            if (firstPageIndex > groups.length) {
                setCurrentPage(1);
            }
            return groups.slice(firstPageIndex, lastPageIndex);
        } else {
            return []
        }
    }, [currentPage, groups]);

    const handleClickedSubjectAndGroup = (clickedGroup) => {
        setSubjectAndGroup({
            subject: clickedSubject,
            group: clickedGroup
        });
        clickedSubjectAndGroup(subjectAndGroup);
    }
    const handleClickedSubject = (clickedSubject) => {
        showSubject(clickedSubject)
    }


    if (typeof groups !== "undefined" && Object.keys(groups).length > 0) {
        if (askedBy === "evaluation") {
            return (
                <div className="d-flex align-items-end flex-column h-100">
                    <div className="w-100">
                        <h4><strong>Grupos por materia</strong></h4>
                        <Form>
                            <Form.Group className="px-3 pb-3">
                                <Form.Select onChange={(e) => {
                                    setClickedSubject(e.target.value)
                                }}>
                                    <option>Seleccione una materia</option>
                                    {
                                        // (typeof groups !== "undefined") ?
                                        groups.map((group, index) => {
                                            if (typeof group.subject !== "undefined") return <option key={index} value={group.subject_index_in_list}>{group.subject.name}</option>
                                            else return <option key={index} value={index}>No hay materias disponibles</option> //TODO: Is this really necccesary, even thoug we vlidate at the render of thsi cokmponent?
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="w-100">
                        {listedGroups.map((group, index) =>
                            <SubjectCard key={index} cardType={"groups"} group={group} clickedGroup={handleClickedSubjectAndGroup} />)}
                    </div>
                    <div className="w-100 mt-auto">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={groups.length}
                            pageSize={PAGESIZE_EVALUATION}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                </div >
            )
        } else if (askedBy === "schedule") {
            return (
                <div className="d-flex flex-column h-100 w-100">
                    <div className="w-100">
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={groups.length}
                            pageSize={PAGESIZE_SCHEDULE}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                    <div className="w-100">
                        {listedSubjects.map((subject, index) =>
                            <SubjectCard key={index} cardType="subjects" subject={subject.subject} handleShow={handleClickedSubject} />)}
                    </div>
                </div >
            )
        }
    }
    else {
        // Nothing tho show on either case
        return (
            <div className="d-flex flex-column">
                <div className="w-100">
                    <h4>Nothing to show</h4>
                </div>
                <div className="w-100">
                </div>
            </div >
        )
    }


}

SubjectsGroups.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    clickedSubjectAndGroup: PropTypes.func,
    askedBy: PropTypes.string.isRequired,
    showSubject: PropTypes.func

}