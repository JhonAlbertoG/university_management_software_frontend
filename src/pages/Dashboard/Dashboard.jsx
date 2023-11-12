// import Row from "react-bootstrap/Row"
// import Col from "react-bootstrap/Col"
import SideMenu from "../../components/Menu/SideMenu/SideMenu"

import { Outlet } from "react-router-dom"
import AuthenticatedHeader from "../../components/layout/Header/AuthenticatedHeader"
import "./Dashboard.css"

export default function Dashboard() {
    return (
        <div id="page-container" className="d-flex">
            <SideMenu />
            <div className="d-flex flex-column flex-grow-1">
                <AuthenticatedHeader />
                <div className="dashboard-main-container flex-grow-1">
                    <div id="dashboard-main-subcontainer">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
