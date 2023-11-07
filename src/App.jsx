import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/auth/AuthContext';
import { router } from './router'
import { Container } from 'react-bootstrap';
import './assets/index.css'

export default function App() {
    return (
        <Container fluid id="container">
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Container>
    )
}