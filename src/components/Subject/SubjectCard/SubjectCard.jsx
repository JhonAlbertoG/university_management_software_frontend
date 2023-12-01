// TODO: Change the style of the card when is going to be used to represent groups of people, not subjects
import { BiSolidCircle } from "react-icons/bi"
import { IoIosInformationCircleOutline } from "react-icons/io"
import PropTypes from "prop-types"
import "./SubjectCard.css"
import { toggleBakcgroundColor } from "../../../utils/functions"
export default function SubjectCard({ handleShow, cardType, group, subject, clickedGroup }) {

    if (cardType === "groups") {
        return (
            <div id={`group-container-${group.group_index_in_list}`} className="group-container d-flex align-items-center mx-auto" onClick={(event) => {
                event.preventDefault();
                toggleBakcgroundColor(`group-container-${group.group_index_in_list}`);
                clickedGroup(group.group_index_in_list)
            }}
            >
                <div className="ps-2">
                    <BiSolidCircle size="40px" />
                </div>
                <div className="flex-grow-1">
                    <h6 className="m-0">GRRUPO {group.group_index_in_list}</h6>
                </div>
            </div>
        )

    } else if (cardType === "subjects") {
        return (
            <div id={`subject-container-${subject.id}`} className="subject-container d-flex align-items-center" onClick={() => {
                handleShow({ show: true, subjectId: subject.id })
            }}>
                <div className="ps-2">
                    <BiSolidCircle size="40px" />
                </div>
                <div className="flex-grow-1" >
                    <h6 className="m-0">{subject.code}</h6>
                    <div className="text-overflow-ellipsis p-0 text-muted">{subject.name}</div>
                </div>
                <div className="px-2">
                    <IoIosInformationCircleOutline size="18px" color="#616161" />
                </div>
            </div>
        )
    }
}

SubjectCard.propTypes = {
    handleShow: PropTypes.func,
    cardType: PropTypes.string.isRequired,
    group: PropTypes.object,
    subject: PropTypes.object,
    clickedGroup: PropTypes.func

}

