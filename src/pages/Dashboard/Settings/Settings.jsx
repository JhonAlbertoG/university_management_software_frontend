import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PersonalInfo from "../../../components/Forms/PersonalInfo/PersonalInfo";
import "./Settings.css";

export default function Settings() {
    return (
        <Row id="settings-container" className="px-5 justify-content-center border border-1">
            <Col md={10} lg={10} className="personal-info-container pe-4 border border-1 h-100" >
                <PersonalInfo />
            </Col>
        </Row>
    )
}
