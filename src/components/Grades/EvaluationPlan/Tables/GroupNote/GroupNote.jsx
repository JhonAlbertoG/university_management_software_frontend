import Table from 'react-bootstrap/Table';
import "./GroupNote.css";

export default function GroupNote() {
    return (
        <Table striped="columns" responsive>
            <thead>
                <tr>
                    <th>#</th>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <th key={index}>heading</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>2</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>3</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    )
}
