import { useState, useEffect } from "react";
import { useNavigate } from 'react-router'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SubjectsGroups from "../../../components/Grades/SubjectsGroups/SubjectsGroups";
import EvaluationPlan from "../../../components/Grades/EvaluationPlan/EvaluationPlan";
import StudentsNotes from "../../../components/Grades/StudentsNotesHandler/Tables/StudentsNotes";
import StudentsNotesStudent from "../../../components/Grades/StudentsNotesHandler/Tables/StudentsNotesStudent";
import NotesHandlerModal from "../../../components/Grades/StudentsNotesHandler/NotesHandlerModal";
// import Pagination from "../../../components/Pagination/pagination";
import "./Grades.css";

import { getGroupsByIdentificationNumber } from "../../../api/usersInGroups";
import { getSubjectByGroupId } from "../../../api/groups";
import { getUserById } from "../../../api/users";
import { useAuth } from "../../../context/auth/useAuth";
import { rolesMappping } from "../../../utils/constants";
import { formatGroupsRes } from "../../../utils/functions";
import { setAllResInOneElement } from "../../../utils/functions";
import { getTokenKeyName, deleteHeaders, cleanTable } from "../../../utils/functions";
import { createGradeGroup } from "../../../api/group_grades";
import { getGradeGroupsByGroup } from "../../../api/groupsWithGradeGroups";
import { getGradesByUser, createGrade } from "../../../api/grades";
import { getGradesDefinitionsByGradeGroup, createGradeDefinition } from "../../../api/gradeDefinition";

export default function Grades() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [subjecAndGroup, setSubjectAndGroup] = useState({}); // {subject: 0, group: 0}
    const [groupsWithSubjectAndUsers, setGroupsWithSubjectAndUsers] = useState([]);
    const [groupsBySubject, setGroupsBySubject] = useState([]);
    const [gradesDefinitions, setGradesDefinitions] = useState([]); // group notes and notes
    const [studentsGrades, setStudentGrades] = useState([]); // group notes and notes
    const [students, setStudents] = useState([]);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Fetch groups and users ids
        const fetchGroups = async () => {
            // console.log("GRADES - user ", user);
            const groupsRes = await getGroupsByIdentificationNumber(user.identification_number, user[getTokenKeyName(Object.keys(user), "access")]);
            // Fetch subject by group id
            if (typeof groupsRes !== "undefined") {
                let formattedGroups = formatGroupsRes(groupsRes.groups);
                // console.log("GRADES - formattedGroups ", formattedGroups);

                let usersByGroupId = {};

                for (let group of Object.keys(formattedGroups)) {
                    const fetchUsers = formattedGroups[group].map(async (userInGroup) => {
                        const userInfo = await getUserById(userInGroup.user_id, user[getTokenKeyName(Object.keys(user), "access")]);
                        return { userInfo };
                    });

                    usersByGroupId[group] = await Promise.all(fetchUsers);
                }

                const subjectsByGroupsId = Object.keys(formattedGroups).map(async (group_id) => {
                    const subject = await getSubjectByGroupId(group_id, user[getTokenKeyName(Object.keys(user), "access")]);
                    return { group_id, subject };
                });
                const groupsWithSubjects = await Promise.all(subjectsByGroupsId);
                // console.log("GRADES - groups with subects: ", groupsWithSubjects);

                let groupsWithSubjectAndUsersOnLoad = setAllResInOneElement(formattedGroups, groupsWithSubjects, usersByGroupId);
                setGroupsWithSubjectAndUsers(groupsWithSubjectAndUsersOnLoad);

                // Send only groups with subject
                let auxGroupBySubject = [];
                let groups, currentGroup;

                for (let element = 0; element < groupsWithSubjectAndUsersOnLoad.length; element++) {
                    currentGroup = groupsWithSubjectAndUsersOnLoad[element];
                    groups = currentGroup.groups.map((group, index) => { return { group_id: Object.keys(group)[0], group_index_in_list: index } });
                    auxGroupBySubject.push({ subject: currentGroup.subject, groups: groups, subject_index_in_list: element });
                }
                setGroupsBySubject(auxGroupBySubject);
                // console.log("GRADES - groupsBySubject: ", groupsBySubject);
            }
        }

        // Fetch gradeGroups and notes to display in evaluation plan
        // const fetchGradeGroupsAndNotes = async () => {
        //     const gradeGroups = await getGradeGroups(user[getTokenKeyName(Object.keys(user), "access")]);
        //     if (gradeGroups && typeof gradeGroups !== "undefined") {
        //         console.log("GRADES - gradeGroups: ", gradeGroups);
        //         let gradesDefinitionsByGroupRes = gradeGroups.map(async (group) => {
        //             const notesRes = await getGradesDefinitionsByGradeGroup(group.id, user[getTokenKeyName(Object.keys(user), "access")]);
        //             return { group, notes: notesRes };
        //         });
        //         const gradesDefinitionsByGroup = await Promise.all(gradesDefinitionsByGroupRes);
        //         console.log("GRADES - notesByGroup: ", gradesDefinitionsByGroup);
        //         setGradesDefinitions(gradesDefinitionsByGroup);
        //     }
        // }

        fetchGroups();
        // fetchGradeGroupsAndNotes();
    }, [])

    const handleStudentsGroup = async (subjectAndGroup) => {
        // deleteHeaders("students-info-table", ["ID", "Cedula", "Nombre", "# notas", "Programa"]);
        // cleanTable("notes-def-table");
        // cleanTable("right-notes-def-table");
        if (subjectAndGroup && typeof subjectAndGroup !== "undefined" && Object.keys(subjectAndGroup).length > 0) {
            let group = groupsWithSubjectAndUsers[subjectAndGroup.subject].groups[subjectAndGroup.group];
            let fetchedStudents = group[Object.keys(group)[0]];
            setStudents(fetchedStudents);
            // Fetch the students Notes
            const studentsGradesRes = fetchedStudents.map(async (student) => {
                const gradesRes = await getGradesByUser(student.userInfo.id, user[getTokenKeyName(Object.keys(user), "access")]);
                return { id: student.userInfo.id, grades: gradesRes };
            });
            const studentsGrades = await Promise.all(studentsGradesRes);
            if (studentsGrades.length > 0) {
                // console.log("GRADES - studentsGrades - gradesDef: ", studentsGrades);
                setStudentGrades(studentsGrades);
            }
            setSubjectAndGroup(subjectAndGroup);
            //Fethc the grade groups and notes based on the group selected
            const fetchGradeGroupsAndNotes = async () => {
                let clickedGroupId = typeof groupsBySubject[subjecAndGroup.subject].groups !== "undefined" ? groupsBySubject[subjecAndGroup.subject].groups[subjecAndGroup.group].group_id : null;
                if (groupsBySubject.length > 0 && clickedGroupId) {
                    const gradeGroups = await getGradeGroupsByGroup(clickedGroupId, user[getTokenKeyName(Object.keys(user), "access")]);
                    if (gradeGroups && typeof gradeGroups !== "undefined") {
                        // console.log("GRADES - gradeGroups: ", gradeGroups);
                        let gradesDefinitionsByGroupRes = gradeGroups.map(async (group) => {
                            const notesRes = await getGradesDefinitionsByGradeGroup(group.id, user[getTokenKeyName(Object.keys(user), "access")]);
                            return { group, notes: notesRes };
                        });
                        const gradesDefinitionsByGroup = await Promise.all(gradesDefinitionsByGroupRes);
                        // console.log("GRADES - notesByGroup: ", gradesDefinitionsByGroup);
                        setGradesDefinitions(gradesDefinitionsByGroup);
                    }
                }
            }

            fetchGradeGroupsAndNotes();

        }
    }

    const handleNewGroupNote = async (newGroupNote) => {
        if (newGroupNote && typeof newGroupNote !== "undefined" && Object.keys(newGroupNote).length > 0) {
            // console.log("GRADES - group of notes and notes to create: ", newGroupNote,);
            // Send to API

            // First we create the groups of notes
            // console.log("subjectAndGroup: ", groupsBySubject[subjecAndGroup.subject].groups[subjecAndGroup.group].group_id);
            const createdGradeGroup = await createGradeGroup({
                "name": newGroupNote.name,
                "percentage_in_subject": newGroupNote.percentage_in_subject,
                "group_id": groupsBySubject[subjecAndGroup.subject].groups[subjecAndGroup.group].group_id
            }, user[getTokenKeyName(Object.keys(user), "access")]);
            if (createdGradeGroup && typeof createdGradeGroup !== "undefined") {
                // console.log("GRADES - created group of notes ID: ", createdGradeGroup.id);
                alert("Ha creado el grupo de notas ", newGroupNote.name, " con éxito");

                // Then we create the notes definitions, we need to send the group id
                const notesDefinitionsRes = Object.keys(newGroupNote.notes).map(async (noteKey) => {
                    // We need to have in the res.json the id of the gradeDefinition
                    const createdNotes = await createGradeDefinition({ grade_group_id: createdGradeGroup.id, ...newGroupNote.notes[noteKey] }, user[getTokenKeyName(Object.keys(user), "access")]);
                    return { grade_group_id: createdGradeGroup.id, createdNotes };
                });
                const notesDefinitions = await Promise.all(notesDefinitionsRes);
                if (notesDefinitions && typeof notesDefinitions !== "undefined" && notesDefinitions.length > 0) {
                    // console.log("GRADES - created definition notes ", notesDefinitions, "in group: ", createdGradeGroup.id);
                    alert("Ha creado las definciones de notas con éxito");

                    let studentsGrades = {};

                    for (let student of students) {
                        notesDefinitions.map(async (noteDefinition) => {
                            const createdGrade = await createGrade({
                                grade_definition_id: noteDefinition.createdNotes.id,
                                user_id: student.userInfo.id,
                                grade_score: "0.0",      //TODO: Check if it is neccesary to send this fields, even though the have default value
                                grade_state: "REPROBADO", //TODO: Check if it is neccesary to send this fields, even though the have default value
                            }, user[getTokenKeyName(Object.keys(user), "access")]);
                            return { grade_group_id: createdGradeGroup.id, createdGrade };
                        });
                        studentsGrades[student.userInfo.id] = await Promise.all(notesDefinitions);
                    }
                    // console.log("GRADES - created grades: ", studentsGrades);
                    if (Object.keys(studentsGrades).length > 0) {
                        alert("Ha creado las notas de los estudiantes con éxito");
                        setStudentGrades(studentsGrades);
                        navigate(0);
                    } else {
                        alert("Ha ocurrido un error al crear las notas de los estudiantes");
                    }

                } else {
                    alert("Ha ocurrido un error al crear las definciones de notas");
                }

            } else {
                alert("Ha ocurrido un error al crear el grupo de notas");
            }
        }

    }

    if (rolesMappping[user.role] === "professor") {
        return (
            <div id="professor-grades-container" className="mt-4">
                <Row className="justify-content-center mb-4">
                    {/* Subjects and groups */}
                    <Col xs={12} md={3} lg={3} className="px-3 py-2">
                        <div id="subjects-groups" className="bg-white w-100 h-100 px-4 py-3">
                            <SubjectsGroups groups={groupsBySubject} clickedSubjectAndGroup={handleStudentsGroup} askedBy="evaluation" />
                        </div>
                    </Col>
                    {/* Subject evaluation plan */}
                    <Col xs={12} md={8} lg={8} className="px-3 py-2">
                        <div id="evaluation-plan" className="bg-white w-100 h-100 px-4 py-2">
                            {Object.keys(subjecAndGroup).length > 0 ? <EvaluationPlan notes={gradesDefinitions} notesGroupToSubmit={handleNewGroupNote} /> :
                                <div className="text-center mt-5">
                                    <h3>Seleccione un grupo para ver el plan de evaluación</h3>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="h-50 justify-content-around mt-4">
                    {/* Students Notes */}
                    <Col className="h-100" xs={12} md={11} lg={11}>
                        {/* TODO: Make the clickeds student functionality */}
                        <StudentsNotes students={students ? students : []} notes={studentsGrades ? studentsGrades : []} gradesDef={gradesDefinitions} showStudent={handleShow} />
                    </Col>
                </Row>
                <NotesHandlerModal show={show} handleClose={handleClose} />
            </div>
        )
    } else {
        return (
            <div id="student-grades-container" className="mt-4">
                <div id="professor-grades-container" className="mt-4">
                
                <Row className="h-50 justify-content-around mt-4">
                    {/* Students Notes */}
                    <Col className="h-100" xs={12} md={11} lg={11}>
                        {/* TODO: Make the clickeds student functionality */}
                        <StudentsNotesStudent students={students ? students : []} notes={studentsGrades ? studentsGrades : []} gradesDef={gradesDefinitions} showStudent={handleShow} />
                    </Col>
                </Row>
                <NotesHandlerModal show={show} handleClose={handleClose} />
            </div>
            </div>
        )
    }
}
