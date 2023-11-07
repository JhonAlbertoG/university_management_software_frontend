import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './Footer.css';

export default function Footer() {
    return (
        <div id="footer-container">
            <Row className='justify-content-between p-4'>
                <Col xs={12} md={4} className='border border-1'>
                    <div id="footer-img-container" className='text-center'>
                        <Image src="https://picsum.photos/200" fluid />
                    </div>
                    <span className='d-block text-center'>© 2022 Your Company.  All rights reserved.</span>
                    <span className='d-block text-center'>Terms of Service   •   Privacy Policy</span>
                </Col>
                <Col xs={12} md={6}>
                    <p className='text-end'>
                        © 2023 - Universidad Tecnológica de Pereira - Reacreditada institucionalmente en 2021, con vigencia de 10 años - Sujeta a inspección y vigilancia
                        <br />
                        Carrera 27 #10-02 Barrio Alamos - Pereira - Risaralda - Colombia - Código postal: 660003
                        <br />
                        PBX: +57 606 3137300 - Fax: +57 606 3213206 - Línea gratuita de Quejas y Reclamos y Línea anticorrupción: 018000966781 - contactenos@utp.edu.co
                        <br />
                        Directorio telefónico interno - Horario de atención: Lunes a Viernes de 8:00am a 12:00m y de 2:00pm a 6:00pm
                        <br />
                        Educación Superior vigilada por MinEducación
                        <br />
                        Términos y Condiciones CRIE - Políticas de Seguridad de la Información - Notificaciones Judiciales
                        <br />
                        Desarrollado por: JJAM
                    </p>
                </Col>
            </Row>
        </div>
    )
}