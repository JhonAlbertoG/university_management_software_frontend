import { BiSolidCircle } from "react-icons/bi"
import PropTypes from 'prop-types';
import "./StudentCard.css"

export default function StudentCard({ student }) {
    return (
        <div id="student-container" className="d-flex align-items-center">
            <div className="pe-2">
                {/* Random image */}
                <BiSolidCircle size="40px" />
            </div>
            <div className="flex-grow-1">
                <h6 className="m-0"><strong>{student.userInfo.first_name} {student.userInfo.last_name} {student.userInfo.middle_name} {student.userInfo.second_last_name}</strong></h6>
            </div>
            <div className="flex-grow-1">
                {/* TODO: Set the email mailto: */}
                <a className="d-block text-end text-decoration-none" href="mailto:">{student.userInfo.user}</a>
            </div>
        </div>
    )
}

StudentCard.propTypes = {
    student: PropTypes.object.isRequired,
}