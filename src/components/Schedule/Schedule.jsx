import { useState } from 'react';
import SubjectCard from '../Subject/SubjectCard/SubjectCard';
import SubjectModal from '../Subject/SubjectModal/SubjectModal';
import "./Schedule.css"

export default function Schedule() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div id="title-container" className="d-flex flex-column p-5">
            <h3 className="align-items-end"><strong>Horario de clases</strong></h3>
            <h2>Aquí irá el componente del horario</h2>
            <div className="py-3 d-flex flex-wrap justify-content-center">
                {/* Listado de materias */}
                <SubjectCard handleShow={handleShow} />
                <SubjectCard handleShow={handleShow} />
                <SubjectCard handleShow={handleShow} />
                <SubjectCard handleShow={handleShow} />
                <SubjectCard handleShow={handleShow} />
                <SubjectCard handleShow={handleShow} />
            </div>
            <SubjectModal show={show} handleClose={handleClose} />
        </div>
    )
}
