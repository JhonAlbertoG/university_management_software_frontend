export const newUserToSignUp = {
    "first_name": "John",
    "middle_name": "William",
    "last_name": "Doe",
    "second_last_name": "Smith",
    "identification_type": 1,
    "identification_number": "123456",
    "phone_number": "+1234567890",
    "address": "123 Main St, City",
    "role_id": 1,// 1: "ESTUDIANTE", 2: "DOCENTE", 3: "SUPERADMINISTRADOR", 4:"ADMINISTRADOR"    
    "academic_program_id": 1, // TODO: Definir programas academicos. 1 is the one for testing
    "user": {
        "email": "test@example.com",
        "password": "test123"
    }
    //The rest of the fields are handled server-side.
}

export const rolesMappping = {
    "1": "student",
    "2": "professor",
    "3": "superadmin",
    "4": "admin"
}

