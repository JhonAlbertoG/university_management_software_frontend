import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import './NavBar.css';

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5">
            <Container fluid>
                <Navbar.Brand href="#">
                    Logo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mx-auto align-items-center"
                        navbarScroll
                        id="homeNavBar"
                    >
                        <Nav.Item className='navItem'> <Nav.Link href="#action1">Inicio</Nav.Link> </Nav.Item>

                        <Nav.Item className='navItem'> <Nav.Link href="#action2">Atención al ciudadano</Nav.Link> </Nav.Item>
                        <Nav.Item className='navItem'> <Nav.Link href="#action2">PQRS</Nav.Link> </Nav.Item>
                        <Nav.Item className='px-3'> <Nav.Link href="#action2">Contacto</Nav.Link> </Nav.Item>
                    </Nav>
                    <Nav>
                        <Link to="/login" className='text-decoration-none'>
                            <Button variant='primary'>
                                Portal de información
                            </Button>
                        </Link>
                        <Outlet />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

// NavBar.propTypes = {
//     showLogin: PropTypes.func.isRequired
// }
export default NavBar;
