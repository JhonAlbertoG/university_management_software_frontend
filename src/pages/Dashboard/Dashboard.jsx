// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"


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
        <div id="page-container" className="d-flex">
            <SideMenu />
            <div className="d-flex flex-column flex-grow-1">
                <AuthenticatedHeader user={user} />
                <div className="dashboard-main-container flex-grow-1">
                    <div id="dashboard-main-subcontainer">
                        <Outlet context={user.role} />
                    </div>
                </div>
            </div>
        </div>
    )

}
