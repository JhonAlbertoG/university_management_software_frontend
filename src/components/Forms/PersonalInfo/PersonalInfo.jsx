
// TODO: the first click on the send button, once the fields are filled, does not send the data. The second click does.
// Maybe we could validate verityfing if the object has the neccesary fields to send. Make this as an external function
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./PersonalInfo.css"

// import { newUserToSignUp } from "../../../utils/constants";
import { getDepartments, getCitiesByDepartmentId } from "../../../api/utils";
import { getUserByIdentificationNumber, partialUpdateUser } from "../../../api/users";
import { useAuth } from "../../../context/auth/useAuth";
import { getTokenKeyName, compareTwoObjects } from "../../../utils/functions"

export default function PersonalInfo({ personalInfoToSubmit, type }) {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        second_last_name: "",
        identification_type: "",
        identification_number: "",
        home_phone_number: "",
        personal_phone_number: "",
        address: ["", "", ""], // [department, city, address]
        role_id: "",
        academic_program_id: "",
        career_average: "",
        status: "",
        semester: "",
    });

    useEffect(() => {
        const loadDeapartments = async () => {
            const departments = await getDepartments();
            setDepartments(departments);
        }
        const fetchPersonalInfo = async () => {
            const personalInfo = await getUserByIdentificationNumber(
                { user_identification_number: user.identification_number, access_token: user[getTokenKeyName(Object.keys(user), "access")] });
            if (typeof personalInfo !== "undefined") {
                personalInfo.address = personalInfo.address.split("-");
                setPersonalInfo(personalInfo);
            }
        }

        if (type === "settings") {
            fetchPersonalInfo();
        }
        loadDeapartments();
    },
        []);

    const handleCitiesBasedOnDepartment = (e) => {
        getCitiesByDepartmentId(e.target.value).then((cities) => {
            if (cities.length > 0) {
                setCities(cities);
            }
        });
    }

    const onSubmit = async (data) => {
        if (type === "signup") {
            if (Object.keys(data).length > 0) {
                if (!Object.keys(data).includes("home_phone_number")) data.home_phone_number = "";
                const allFieldsFilled = Object.values(data).every(x => (x !== null && typeof x !== "undefined"));
                if (allFieldsFilled) {
                    data.address = departments.find(department => department.id === parseInt(data.location.department)).name.toUpperCase() + "-" + cities.find(city => city.id === parseInt(data.location.city)).name.toUpperCase() + "-" + data.location.address;
                    delete data.location;
                    console.log("PERSONALINFO - Data ready to submit");
                    alert("Información personal guardada exitosamente!");
                    personalInfoToSubmit(data);
                }
            }
        } else if (type === "settings") {
            // partialUpdateUser
            if (compareTwoObjects(data, personalInfo)) {
                console.log("PERSONALINFO - Data to partial update: ", data);
                if (data.location.department !== ""
                    && data.location.city !== "" && data.location.city !== "Ciudad"
                    && data.location.address !== "") {
                    data.address = departments.find(department => department.id === parseInt(data.location.department)).name.toUpperCase() + "-" + cities.find(city => city.id === parseInt(data.location.city)).name.toUpperCase() + "-" + data.location.address;
                    delete data.location;
                }
                console.log("PERSONALINFO - Data ready to partial update");
                data.id = personalInfo.id;
                console.log(data.id)
                const resPartialUpdate = await partialUpdateUser(data, user[getTokenKeyName(Object.keys(user), "access")])
                if (typeof resPartialUpdate !== "undefined") {
                    alert("Información personal guardada exitosamente!");
                    navigate(0);
                }

            }
        }
    };
    const onError = (errors, e) => console.log("PERSONLANFO - Error while trying to register: ", errors, e);

    return (
        <Form className='form-container' onSubmit={handleSubmit(onSubmit, onError)}>
            <Row className='py-4'>
                <Col xs={12} md={6} lg={6}>
                    <h4><strong>Información personal</strong></h4>
                    <Form.Group>
                        <Form.Label>Cedula/identificación</Form.Label>
                        <div className='d-flex'>
                            <Form.Control type="number" placeholder='Ej: 1004718953' defaultValue={personalInfo.identification_number} className='flex-grow-1' {...register("identification_number", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                            <Form.Select className="w-25 text-center" defaultValue={personalInfo.identification_type} {...register("identification_type", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false}>
                                <option>Tipo</option>
                                <option value="1">CC</option>
                                <option value="2">TI</option>
                            </Form.Select>
                        </div>
                        <label className='text-muted'>Sin puntos, comas. Solo números</label>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4><strong>Nombres y apellidos</strong></h4>
                    <hr />
                    <Row className='py-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Primer nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Miguel" defaultValue={personalInfo.first_name}{...register("first_name", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                                <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Segundo nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Angel" defaultValue={personalInfo.middle_name}{...register("middle_name", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                                <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='py-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Primer apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Lopez" defaultValue={personalInfo.last_name}{...register("last_name", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                                <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Segundo apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ej: Fernandez" defaultValue={personalInfo.second_last_name}{...register("second_last_name", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                                <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4><strong>Ubicación de residencia</strong></h4>
                    <hr />
                    <Row className='py-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Departamento</Form.Label>
                                <Form.Select defaultValue={personalInfo.address[0]} {...register("location.department", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} onChange={handleCitiesBasedOnDepartment}>
                                    <option value=""></option>
                                    {departments.map((department) => {
                                        return <option key={department.id} value={department.id}>{department.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Select defaultValue={personalInfo.address[1]}{...register("location.city", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false}>
                                    <option value=""></option>
                                    {cities.map((city) => {
                                        return <option key={city.id} value={city.id}>{city.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='py-2'>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Descripción de dirección de domicilio</Form.Label>
                                <Form.Control as="textarea" defaultValue={personalInfo.address[2]}{...register("location.address", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4><strong>Datos de contacto</strong></h4>
                    <hr />
                    <Row className='py-2'>
                        <Col>
                            <Form.Group>
                                <div className='d-flex'>
                                    <Form.Label>Telefono</Form.Label>
                                    <label className='text-muted'>&emsp;(opcional)</label>
                                </div>
                                <Form.Control type="text" placeholder="Ej: 346 2047" defaultValue={personalInfo.home_phone_number}{...register("home_phone_number")} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Celular</Form.Label>
                                <Form.Control type="text" placeholder="Ej: 3218484132" defaultValue={personalInfo.personal_phone_number} {...register("personal_phone_number", { required: type === "signup" ? true : false })} required={type === "signup" ? true : false} />
                                <label className='text-muted'>Evite el uso de tildes u otros símbolos de puntuación</label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='pt-3 justify-content-center'>
                <Col md={3} lg={3}><Button type="submit" variant='dark'>Guardar</Button></Col>
            </Row>
        </Form>
    )
}

PersonalInfo.propTypes = {
    personalInfoToSubmit: PropTypes.func,
    type: PropTypes.string.isRequired

}
