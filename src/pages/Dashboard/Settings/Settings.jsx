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
        <div id="settings-container" className="mt-4 py-4">
            <Row className="px-4 justify-content-center overflow-y-auto h-100">
                <Col md={10} lg={10} className="overflow-y-auto pe-4" >
                    <PersonalInfo personalInfoToSend={handlePersonalInfo} />
                </Col>
            </Row>
        </div>
    )
}
