import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

export default function Login() {
    // const { show, handleClose } = props;
    const [show, setShow] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const isLogIn = location.pathname.split("/")[1]
        if (isLogIn == "login") {
            setShow(true)
        }
    }, [location.pathname])

    const handleClose = () => {
        navigate("/")
        setShow(false)
    }
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title><strong>Sistema de información</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Ingrese sus credenciales y rol en la siguiente sección:</span>
                <br />
                <LoginForm />
            </Modal.Body>
        </Modal>
    )
}

Login.propTypes = {
    show: PropTypes.any,
    handleClose: PropTypes.any

}