import { BiSolidCircle } from "react-icons/bi"
import { IoIosInformationCircleOutline } from "react-icons/io"
import PropTypes from "prop-types"
import "./SubjectCard.css"

export default function SubjectCard({ handleShow }) {
    return (
        <div id="subject-container" className="d-flex align-items-center" onClick={handleShow}>
            <div className="ps-2">
                <BiSolidCircle size="40px" />
            </div>
            <div className="flex-grow-1">
                <h6 className="m-0">Código</h6>
                <label className="p-0 text-muted">Nombre</label>
            </div>
            <div className="px-2">
                <IoIosInformationCircleOutline size="18px" color="#616161" />
            </div>
        </div>
    )
}

SubjectCard.propTypes = {
    handleShow: PropTypes.func.isRequired,
}

