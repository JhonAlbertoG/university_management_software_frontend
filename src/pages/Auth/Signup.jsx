// TODO #1: More especification in fields with the reister hook, for example, especifcy how much characters are allowed in the password.
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/layout/Navigation/Navbar/NavBar"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PersonalInfo from "../../components/Forms/PersonalInfo/PersonalInfo"
import Credential from "../../components/Forms/Credentials/Credential"
import Footer from "../../components/layout/Footer/Footer"
import "./styles/Signup.css"
import { signup } from "../../api/users"

// import { newUserToSignUp } from "../../utils/constants";


export default function Signup() {
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState({});
    const handleRegistration = (credentials) => {
        // Validate we have all the required data
        // PersonalInfo has 9 keys according to each field defined in <PersonalInfo>, the same happens with <Credentials> which has 4 keys
        console.log(Object.keys(personalInfo).length, Object.keys(credentials).length)
        if (Object.keys(personalInfo).length !== 9 || Object.keys(credentials).length !== 4) {
            alert("No se ha proporcionado la información necesaria para el registro.\nRecuerde guardar la información personal antes de dar click en el botón de registrar!.");
        } else {
            if (Object.keys(personalInfo).every(key => personalInfo[key] !== null && personalInfo[key] !== undefined)
                && Object.keys(credentials).every(key => credentials[key] !== null && credentials[key] !== undefined)) {
                // newUser = {
                //     ...personalInfo,
                //     "user":{
                //         ...credentials
                //     }
                // }
                let userCredentials = {};
                userCredentials.user = {
                    "email": credentials.email,
                    "password": credentials.password,
                }
                userCredentials.role_id = credentials.role_id;
                userCredentials.academic_program_id = credentials.academic_program_id;

                let newUser = Object.assign(personalInfo, userCredentials);
                console.log("SIGNUP - User to signup: ", newUser);

                // Fetch to register user
                signup(newUser).then((response) => {
                    alert("Usuario registrado exitosamente ", response);
                    // Navigate to /login
                    navigate("/login");
                });
                setPersonalInfo({});
            }
        }
    }
    return (
        <>
            <NavBar />
            <Row className="p-5 justify-content-center">
                <Col xs={12} sm={12} md={6} lg={6} className="personal-info-container pe-4" >
                    <PersonalInfo personalInfoToSubmit={setPersonalInfo} />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} className="ps-4" >
                    <Credential registration={handleRegistration} />
                </Col>
            </Row>
            <Footer />
        </>
    )
}
