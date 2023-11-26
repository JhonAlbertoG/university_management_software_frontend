import { useLocation, useNavigate, Link } from "react-router-dom"
import { BiSolidDashboard } from "react-icons/bi"
import { PiExamFill } from "react-icons/pi"
import { BiSolidUserCircle } from "react-icons/bi"
import { RiLogoutBoxLine } from "react-icons/ri"
import Image from "react-bootstrap/Image"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import "./SideMenu.css"
import { logout } from "../../../api/users";
import { useAuth } from "../../../context/auth/useAuth";
import { changeSideMenuIconsColorOnMouseEnterLeave } from "../../../utils/Styles";

function getURLPathname(currentPatName, redirectionPathname) {
    let newPathname = currentPatName.split("/").slice(0, 3).join("/") + redirectionPathname;
    return newPathname;
}

export default function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logoutContext, user } = useAuth();
    const handleLogout = () => {
        console.log("Logging out...: ", user);
        // The user.refresh and user.access fields are used here because they are passed in the login process, once the user logs in and the tokens are created
        // Do not confuse with the tokens stored in local storage. Remember that user is the prop that is updated to be used globally
        logout({ refresh: user.refresh, access: user.access });
        logoutContext();
        navigate("/");
    }

    return (
        <div id="menu-container" className="d-flex flex-column">
            {/* Logo img */}
            <div className="p-4">
                <Image src="https://picsum.photos/250/150" fluid rounded />
            </div>
            {/* Options */}
            <div id="menu-options" className="d-flex flex-column flex-grow-1 justify-content-between">
                {/* <div> */}
                <ListGroup id="options" className="pt-4">
                    <ListGroup.Item className="d-block border-0" >
                        <div className="d-flex align-items-center"
                            onMouseEnter={() => changeSideMenuIconsColorOnMouseEnterLeave(["schedule-icon", "schedule-link"], "white")}
                            onMouseLeave={() => changeSideMenuIconsColorOnMouseEnterLeave(["schedule-icon", "schedule-link"], "#8c8c8d")}>
                            <BiSolidDashboard id="schedule-icon" size="1.8em" />
                            <Link to={getURLPathname(location.pathname, "/schedule")}
                                id="schedule-link"
                                className="ps-3">
                                <strong>Horario de clases/<br />Asignaturas</strong>
                            </Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-block border-0">
                        <div className="d-flex align-items-center"
                            onMouseEnter={() => changeSideMenuIconsColorOnMouseEnterLeave(["evaluation-icon", "evaluation-link"], "white")}
                            onMouseLeave={() => changeSideMenuIconsColorOnMouseEnterLeave(["evaluation-icon", "evaluation-link"], "#8c8c8d")}>
                            <PiExamFill id="evaluation-icon" size="1.8em" />
                            {/* TODO: Change this url to match the one for students (grades) */}
                            <Link to={getURLPathname(location.pathname, "/grades")}
                                id="evaluation-link"
                                className="ps-3">
                                <strong>Evaluación</strong>
                            </Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-block border-0">
                        <div className="d-flex align-items-center"
                            onMouseEnter={() => changeSideMenuIconsColorOnMouseEnterLeave(["user-icon", "user-link"], "white")}
                            onMouseLeave={() => changeSideMenuIconsColorOnMouseEnterLeave(["user-icon", "user-link"], "#8c8c8d")} >
                            <BiSolidUserCircle id="user-icon" size="1.8em" />
                            <Link to={getURLPathname(location.pathname, "/settings")}
                                id="user-link"
                                className="ps-3">
                                <strong>Mi perfil</strong>
                            </Link>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                {/* </div> */}
                <div id="logout-option-container" className="d-flex">
                    <div id="logout-option" className="w-100 mx-4 d-flex align-items-center"
                        onMouseEnter={() => changeSideMenuIconsColorOnMouseEnterLeave(["logout-icon", "logout-btn"], "white")}
                        onMouseLeave={() => changeSideMenuIconsColorOnMouseEnterLeave(["logout-icon", "logout-btn"], "#8c8c8d")}>
                        <RiLogoutBoxLine id="logout-icon" size="1.8em" />
                        {/* <Link to="/"
                            id="logout-link">
                            <strong>Cerrar sesión </strong>
                        </Link> */}
                        <Button variant="link" className="text-decoration-none text-white"
                            id="logout-btn"
                            onClick={handleLogout}>
                            <strong>Cerrar sesión </strong>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
