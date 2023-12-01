import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SubjectsGroups from "../../../components/Grades/SubjectsGroups/SubjectsGroups";
import EvaluationPlan from "../../../components/Grades/EvaluationPlan/EvaluationPlan";
import StudentsNotes from "../../../components/Grades/StudentsNotesHandler/Tables/StudentsNotes";
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
import { getTokenKeyName } from "../../../utils/functions";

export default function Grades() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [groupsWithSubjectAndUsers, setGroupsWithSubjectAndUsers] = useState([]);
    const [groupsBySubject, setGroupsBySubject] = useState([]);
    const [notes, setNotes] = useState([{}, {}, {}, {}, {}]); // group notes and notes
    const [students, setStudents] = useState([]);

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
                console.log("GRADES - groupsBySubject: ", groupsBySubject);
            }
        }
        fetchGroups();
    }, [])

    const handleStudentsGroup = (subjectAndGroup) => {
        if (subjectAndGroup && typeof subjectAndGroup !== "undefined" && Object.keys(subjectAndGroup).length > 0) {
            console.log(subjectAndGroup);
            let group = groupsWithSubjectAndUsers[subjectAndGroup.subject].groups[subjectAndGroup.group];
            setStudents(group[Object.keys(group)[0]]);
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
                            {/* TODO: Left to fetch-create notes  */}
                            <EvaluationPlan notes={notes} />
                        </div>
                    </Col>
                </Row>
                <Row className="h-50 justify-content-around mt-4">
                    {/* Students Notes */}
                    <Col className="h-100" xs={12} md={11} lg={11}>
                        {/* TODO: Make the clickeds student functionality */}
                        <StudentsNotes students={students} notes={notes} showStudent={handleShow} />
                    </Col>
                </Row>
                <NotesHandlerModal show={show} handleClose={handleClose} />
            </div>
        )
    } else {
        return (
            <div id="student-grades-container" className="mt-4">
                <div>Pending for implementation from Jhon Alberto</div>
            </div>
        )
    }
}
