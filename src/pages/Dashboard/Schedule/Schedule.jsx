import { useState, useEffect } from 'react';
// import { useOutletContext } from "react-router-dom";
import SubjectModal from '../../../components/Subject/SubjectModal/SubjectModal';
import WeeklySchedule from '../../../components/Schedule/WeeklySchedule/WeeklySchedule';
import SubjectsGroups from '../../../components/Grades/SubjectsGroups/SubjectsGroups';
import "./Schedule.css"

import { useAuth } from '../../../context/auth/useAuth';
import { getGroupsByIdentificationNumber } from "../../../api/usersInGroups";
import { getClassesInGroup } from '../../../api/classes_in_groups';
import { getSubjectByGroupId } from "../../../api/groups";
import { getUserById } from "../../../api/users";
import { getTokenKeyName, formatGroupsRes, setAllResInOneElement } from '../../../utils/functions';
// import { rolesMappping } from '../../../utils/constants';

export default function Schedule() {
    // const role = useOutletContext();
    const { user } = useAuth();
    const [groupsWithSubjectAndUsers, setGroupsWithSubjectAndUsers] = useState([]);
    const [classesInGroups, setClassesInGroups] = useState([]);
    const [clickedSubject, setClickedSubject] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (clickedSubject) => {
        let subjectToShow = groupsWithSubjectAndUsers.find((specifiedGroup) =>
            specifiedGroup.subject.id == clickedSubject.subjectId
        )
        let classesForSubject = [];
        for (let group of subjectToShow.groups) {
            for (let classes of classesInGroups) {
                if (classes.group_id == Object.keys(group)[0]) {
                    classesForSubject.push(classes);
                }
            }
        }
        subjectToShow.classes = classesForSubject;
        setClickedSubject(subjectToShow);
        setShow(clickedSubject.show);
    };


    useEffect(() => {
        const fetchGroups = async () => {
            // console.log("GRADES - user ", user);
            // TODO: Add the logic for students. The actual is for professors.
            const groupsRes = await getGroupsByIdentificationNumber(user.identification_number, user[getTokenKeyName(Object.keys(user), "access")]);
            // Fetch subject by group id
            if (typeof groupsRes !== "undefined") {
                let formattedGroups = formatGroupsRes(groupsRes.groups);
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

                let groupsWithSubjectAndUsersOnLoad = setAllResInOneElement(formattedGroups, groupsWithSubjects, usersByGroupId);
                setGroupsWithSubjectAndUsers(groupsWithSubjectAndUsersOnLoad);
                console.log("SCHEDULE - groupsWithSubjectAndUsersOnLoad: ", groupsWithSubjectAndUsersOnLoad);

                const classesInGroupsRes = Object.keys(formattedGroups).map(async (group_id) => {
                    const classes = await getClassesInGroup(group_id, user[getTokenKeyName(Object.keys(user), "access")]);
                    return { group_id, classes };
                });
                const classesInGroups = await Promise.all(classesInGroupsRes);
                classesInGroups.forEach((classInGroup) => {
                    classInGroup.subjectName = groupsWithSubjects.find((groupWithSubject) => groupWithSubject.group_id === classInGroup.group_id).subject.name;
                })

                console.log("SCHEDULE - classesInGroups: ", classesInGroups);
                console.log("SCHEDULE - groupsWithSubject: ", groupsWithSubjects);
                setClassesInGroups(classesInGroups);
            }
        }
        fetchGroups();
    }, [])
    // TODO: When fetching professor and student info, make the condition to pass either the student or professor info to the component
    return (
        <div id="schedule-container" className="d-flex flex-column my-5 mx-1 px-5 py-3">
            <h3 className="align-items-end"><strong>Horario de clases</strong></h3>
            <div className="p-2 d-flex justify-content-between">
                <WeeklySchedule classes={classesInGroups} />
                <div className='d-flex flex-column ps-3 py-2'>
                    <SubjectsGroups groups={groupsWithSubjectAndUsers} askedBy='schedule' showSubject={handleShow} />
                </div>
            </div>
            <SubjectModal show={show} handleClose={handleClose} subject={clickedSubject ? clickedSubject : null} />
        </div>
    )
}
