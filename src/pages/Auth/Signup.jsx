import NavBar from "../../components/layout/Navigation/Navbar/NavBar"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import Form from "react-bootstrap/Form"

import PersonalInfo from "../../components/Forms/PersonalInfo/PersonalInfo"
import Credential from "../../components/Forms/Credentials/Credential"
import Footer from "../../components/layout/Footer/Footer"
import "./styles/Signup.css"


export default function Signup() {
    //  TODO: Can we make this hook as a module, in order to not repeat it between multiple files?

    return (
        <>
            <NavBar />
            <Row className="p-5 justify-content-center">
                <Col xs={12} sm={12} md={6} lg={6} className="personal-info-container pe-4" >
                    <PersonalInfo />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} className="ps-4" >
                    <Credential />
                </Col>
            </Row>
            <Footer />
        </>
    )
}
