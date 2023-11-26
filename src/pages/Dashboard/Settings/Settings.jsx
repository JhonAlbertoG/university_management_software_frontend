import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PersonalInfo from "../../../components/Forms/PersonalInfo/PersonalInfo";
import "./Settings.css";

export default function Settings() {
    const [personalInfo, setPersonalInfo] = useState({});
    const handlePersonalInfo = (data) => {
        setPersonalInfo(data);
        console.log("SETTINGS - updating personal info form a registered user: ", personalInfo);
    }

    return (
        <Row id="settings-container" className="px-5 justify-content-center">
            <Col md={10} lg={10} className="personal-info-container pe-4 h-100" >
                <PersonalInfo personalInfoToSend={handlePersonalInfo} />
            </Col>
        </Row>
    )
}
