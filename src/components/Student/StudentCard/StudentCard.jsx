import { BiSolidCircle } from "react-icons/bi"
import "./StudentCard.css"

export default function StudentCard() {
    return (
        <div id="student-container" className="d-flex align-items-center">
            <div className="pe-2">
                {/* Random image */}
                <BiSolidCircle size="40px" />
            </div>
            <div className="flex-grow-1">
                <h6 className="m-0"><strong>Miguel Angel Lopez Fernandez</strong></h6>
            </div>
            <div className="flex-grow-1">
                {/* TODO: Set the email mailto: */}
                <a className="d-block text-end text-decoration-none" href="mailto:">miguel.lopez@utp.edu.co</a>
            </div>
        </div>
    )
}
