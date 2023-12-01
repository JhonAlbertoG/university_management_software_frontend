import Table from 'react-bootstrap/Table';
import "./Note.css";

export default function Note() {
    return (
        <Table striped="columns" responsive>
            <thead>
                <tr>
                    <th>#</th>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <th key={index}>heading</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>2</td>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>3</td>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>cell {index}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    )
}
