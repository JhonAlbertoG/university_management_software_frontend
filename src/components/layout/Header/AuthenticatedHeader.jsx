import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "react-bootstrap/Image";
import PropTypes from 'prop-types';
import { rolesMappping } from '../../../utils/constants';
import "./AuthenticatedHeader.css"

export default function AuthenticatedHeader({ user }) {
    if (Object.keys(user).every((key) => user[key] !== null && user[key] !== undefined && user[key] !== '')) {
        return (
            <Navbar expand="lg" id="homeNavBar" className="p-3">
                <Container>
                    <div className='px-5'>
                        <Navbar.Text>
                            <h2><strong>Bienvenido de vuelta, {rolesMappping[user.role]} {user.identification_number} </strong></h2>
                        </Navbar.Text>
                        <Navbar.Text>
                            <span className='text-muted'>Aquí encontrarás un resumen de tu horario, clases y demás</span>
                        </Navbar.Text>
                    </div>
                    <div className='px-5'>
                        <Image src="https://api.dicebear.com/7.x/pixel-art/svg" width="35px" height="35px" roundedCircle />
                        <span className='px-1'>{user.identification_number}</span>
                    </div>
                </Container>
            </Navbar >
        )
    }
}
AuthenticatedHeader.propTypes = {
    user: PropTypes.object.isRequired
}