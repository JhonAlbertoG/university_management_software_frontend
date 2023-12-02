import { AiOutlinePercentage } from "react-icons/ai";
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import "./GroupNote.css";
// import { cleanTable } from "../../../../../utils/functions";

export default function GroupNote({ notes, notesDefinitionToShow }) {

    return (
        <div id="notes-def-table-container">
            <Table id="notes-def-table" striped="columns" hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th># notas</th>
                        <th>
                            <AiOutlinePercentage />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((groupNote, index) => (
                        <tr key={index} onClick={() => {
                            notesDefinitionToShow(groupNote.notes);
                        }}>
                            <td>{groupNote.group.id}</td>
                            <td>{groupNote.group.name}</td>
                            <td>{groupNote.notes.length}</td>
                            <td>{groupNote.group.percentage_in_subject}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

GroupNote.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    notesDefinitionToShow: PropTypes.func.isRequired
}
