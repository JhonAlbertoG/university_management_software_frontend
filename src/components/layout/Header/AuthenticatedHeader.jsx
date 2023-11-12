// import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "react-bootstrap/Image";
// import NavDropdown from 'react-bootstrap/NavDropdown';

import "./AuthenticatedHeader.css"

export default function AuthenticatedHeader() {
    return (
        <Navbar expand="lg" id="homeNavBar" className="p-3">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <div className='px-5'>
                    <Navbar.Text>
                        <h2><strong>Bienvenido de vuelta, Miguel</strong></h2>
                    </Navbar.Text>
                    <Navbar.Text>
                        <span className='text-muted'>Aquí encontrarás un resumen de tu horario, clases y demás</span>
                    </Navbar.Text>
                </div>

                {/* TODO: Redesign this if possible */}
                <div className='px-5'>
                    <a href="" className='text-decoration-none text-black'>
                        <Image src="https://api.dicebear.com/7.x/pixel-art/svg" width="35px" height="35px" roundedCircle />
                        <span className='px-1'>Miguel Lopez</span>
                    </a>
                </div>
            </Container>
        </Navbar >
    )
}
