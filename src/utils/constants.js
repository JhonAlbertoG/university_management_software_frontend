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


export const daysMapping = {
    "LUNES": 1,
    "MARTES": 2,
    "MIERCOLES": 3,
    "JUEVES": 4,
    "VIERNES": 5,
    "SABADO": 6
}

export const hoursMapping = {
    "7:00 AM": 7,
    "8:00 AM": 8,
    "9:00 AM": 9,
    "10:00 AM": 10,
    "11:00 AM": 11,
    "12:00 M": 12,
    "1:00 PM": 13,
    "2:00 PM": 14,
    "3:00 PM": 15,
    "4:00 PM": 16,
    "5:00 PM": 17,
    "6:00 PM": 18,
    "7:00 PM": 19,
    "8:00 PM": 20,
    "9:00 PM": 21,
    "10:00 PM": 22
}
