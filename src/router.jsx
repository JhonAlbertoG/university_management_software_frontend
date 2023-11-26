import { createBrowserRouter } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { requireAuth } from './utils/requireAuth';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
// Dashboard options
// #TODO: implement the evaluation and grade pages 
import Schedule from './components/Schedule/Schedule';
import Settings from "./pages/Dashboard/Settings/Settings";

import Landing from './pages/Home/home';
import ErrorPage from './pages/Errors/error_page';

import { rolesMappping } from "./utils/constants";

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
    {
        path: "/dashboard",
        element: <Dashboard />,
        loader: requireAuth([rolesMappping.student, rolesMappping.professor]), // TODO: Add the rest of the roles, the ones that handle the chat administration
        children: [
            {
                path: ":role/schedule",
                element: <Schedule />
            },
            {
                path: ":role/grades", // Need to add a main component that handles conditional component rendirization based on roles
                element: <>Display the element that renders the student grades/Evaluation</>
            },
            {
                // TODO: Add the data corrresponding to the user. This wil be shared among all the users.
                path: ":role/settings",
                element: <Settings />
            }

        ],

    },
    {
        path: "/unauthorized",
        // element: <Unauthorized />,
        element: <>Unauthorized</>,
    },
    // We will ise this withut auth until the API and some basics views are set.
    // {
    //     path: "/student/dashboard",
    //     element: <Dashboard />,
    //     children: [
    //         {
    //             path: "schedule",
    //             element: <Schedule />
    //         },
    //         {
    //             path: "grades",
    //             element: <>Display the element that renders the student grades</>
    //         },
    //         {
    //             // TODO: Add the data corrresponding to the user. This wil be shared among all the users.
    //             path: "settings",
    //             element: <Settings />
    //         }

    //     ],
    //     // loader: requireAuth(['student', 'professor', 'admin', 'superadmin']),
    // },
    {
        path: "/professor/dashboard",
        element: <Dashboard />,
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