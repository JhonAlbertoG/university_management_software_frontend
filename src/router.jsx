import { createBrowserRouter } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { requireAuth } from './utils/requireAuth';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Landing from './pages/Home/home'
import ErrorPage from './pages/Errors/error_page'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />, //TODO: Create landing page
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login", // TODO: Create login page
                element: <Login />,
            }
        ]
    },
    {
        path: "/post/:id", // TODO: Create post page
        element: <>Review of university uploaded posts</>,
    },
    {
        path: "/signup", // TODO: Create signup page
        element: <Signup />,
    },
    {
        path: "/about", // TODO: Create about page
        element: <>Route for signing up</>,
    },
    // We will ise this withut auth until the API and some basics views are set.
    {
        path: "student/dashboard",
        element: <>Display dashboard based on user </>,
        children: [
            {
                path: "schedule",
                element: <>Display the element that renders the schedule and subjects</>
            },
            {
                path: "grades",
                element: <>Display the element that renders the student grades</>
            },
            {
                path: "settings",
                element: <>Display the element that renders the settings (like personal info management)</>
            }

        ],
        // loader: requireAuth(['student', 'professor', 'admin', 'superadmin']),
    },
    {
        path: "professor/dashboard",
        element: <>Display dashboard based on user </>,
        children: [
            {
                path: "schedule",
                element: <>Display the element that renders the schedule and subjects</>
            },
            {
                path: "evaluation",
                element: <>Display the element that renders the evaluation process</>
            },
            {
                path: "settings",
                element: <>Display the element that renders the settings (like personal info management)</>
            }
        ],
        // loader: requireAuth(['student', 'professor', 'admin', 'superadmin']),
    }
])