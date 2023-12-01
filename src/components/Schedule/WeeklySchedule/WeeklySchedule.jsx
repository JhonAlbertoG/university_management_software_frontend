import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import "./WeeklySchedule.css";
import { daysMapping } from '../../../utils/constants';
import { hoursMapping } from '../../../utils/constants';


export default function WeeklySchedule({ classes }) {
    const [activities, setActivities] = useState([]);

    // Función para agregar actividades
    const addActivity = (group_id, day, startHour, endHour, subjectName) => {
        setActivities(prevActivities => [...prevActivities, { group_id, day, startHour, endHour, subjectName }]);
    };

    // Efecto para inicializar actividades de ejemplo
    useEffect(() => {
        if (typeof classes !== "undefined" && classes.length > 0) {
            classes.forEach((classInfo) => {
                classInfo.classes.forEach((date) => {
                    addActivity(parseInt(classInfo.group_id), daysMapping[date.date], //Why did i ame this as dat in the model?? 
                        hoursMapping[date.start_time], hoursMapping[date.end_time], classInfo.subjectName);
                });

            });
        }
        // addActivity(1, 7, 9); // Lunes de 7 AM a 9 AM
        // addActivity(3, 10, 12); // Miércoles de 10 AM a 12 PM
    }, [classes]);

    // Renderizar celdas del calendario
    const renderCells = () => {
        const cells = [];
        for (let hour = 6; hour <= 22; hour++) {
            const row = [];
            for (let day = 0; day <= 6; day++) {
                if (day === 0) {
                    row.push(<td key={`hour-${hour}`}>{`${hour}:00`}</td>);
                } else {
                    const activity = activities.find(a => a.day === day && a.startHour <= hour && a.endHour > hour);
                    row.push(
                        <td key={`day-${day}-hour-${hour}`} className={activity ? 'activity' : ''}>
                            {activity ? `${activity.subjectName}\nGRUPO ${activity.group_id}` : ''}
                        </td>
                    );
                }
            }
            cells.push(<tr key={`row-${hour}`}>{row}</tr>);
        }
        return cells;
    };

    // classes.forEach((classInfo) => {
    //     const { day, start_hour, end_hour } = classInfo;
    //     addActivity(day, start_hour, end_hour);
    // });
    return (
        <div id="table-container" className='flex-grow-1 border border-2'>
            <Table striped bordered hover id="calendar">
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Sábado</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCells()}
                </tbody>
            </Table>
        </div>
    )
}

WeeklySchedule.propTypes = {
    classes: PropTypes.array.isRequired
}
