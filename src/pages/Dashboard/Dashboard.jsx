import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


import { Outlet } from "react-router-dom"
import { useAuth } from "../../context/auth/useAuth";
import AuthenticatedHeader from "../../components/layout/Header/AuthenticatedHeader"
import SideMenu from "../../components/Menu/SideMenu/SideMenu"
import "./Dashboard.css"

export default function Dashboard() {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        // TODO: Add a spinner, or something different
        return <div>Cargando...</div>;
    }
    return (
        <Row id="dashboard-container" className="p-0">
            <Col xs={12} md={2} lg={2} xxl={2} className="p-0">
                <SideMenu />
            </Col>
            <Col xs={12} md={10} lg={10} xxl={10} className="d-flex flex-column p-0">
                <AuthenticatedHeader user={user} />
                <div className="dashboard-main-container d-flex justify-content-center flex-grow-1">
                    <Outlet context={user.role} />
                </div>
            </Col>
        </Row>
    )

}
