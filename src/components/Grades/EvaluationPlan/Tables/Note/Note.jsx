import { AiOutlinePercentage } from "react-icons/ai";
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import "./Note.css";

export default function Note({ notesDef }) {
    return (
        <div id="notes-container">
            <Table id="right-notes-def-table" striped="columns" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>
                            <AiOutlinePercentage />
                            en grupo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notesDef.map((note, index) => {
                        return (
                            <tr key={index}>
                                <td>{note.id}</td>
                                <td>{note.name}</td>
                                <td>{note.percentage_in_group}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>

    )
}
Note.propTypes = {
    notesDef: PropTypes.arrayOf(PropTypes.any)
}