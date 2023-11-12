## TODOs:
(Miguel)
```
├─ university_management_software_backend
   │  ├─ university_project_core
   │  │  ├─ academicPrograms
   │  │  │  ├─ academicProgram.py
   │  │  │  │  └─ line 9: TODO : Make the neccesary validation of the field
   │  │  │  ├─ academicProgramWithSubjects.py
   │  │  │  │  └─ line 8: TODO : Left to implement this model
   │  │  │  └─ changesInSubject.py
   │  │  │     └─ line 9: TODO : Set the path of media in project university_project_core
   │  │  ├─ groups
   │  │  │  ├─ classModel.py
   │  │  │  │  └─ line 5: TODO : We really need these fields, what aattributes or default alues could they have?
   │  │  │  └─ group.py
   │  │  │     └─ line 8: TODO : We will left both attributes as null-blank to be able to create either records with subject_id or extension_course_id.
   │  │  ├─ subjects
   │  │  │  ├─ grade.py
   │  │  │  │  ├─ line 15: TODO : Add this validation '1.0 <= puntaje <= 5.0']
   │  │  │  │  ├─ line 17: TODO : Add this validation 'si puntaje >= 3.0 -> APROBADO, demás REPROBADO ']
   │  │  │  │  └─ line 20: TODO : Add this validation '0.0 <= porcentaje_en_grupo <= 1.0'
   │  │  │  ├─ gradeGroup.py
   │  │  │  │  ├─ line 13: TODO : Add this validation '1.0 <= puntaje <= 5.0']
   │  │  │  │  ├─ line 15: TODO : Add this validation  'si puntaje >= 3.0 -> APROBADO, demás REPROBADO ']
   │  │  │  │  └─ line 18: TODO : Add this validation '0.0 <= porcentaje_en_asignatura <= 1.0' ]
   │  │  │  └─ subject.py
   │  │  │     ├─ line 13: TODO : Add this validation -> "It must always be less than or equal to the number of semesters of the program to which it belongs."
   │  │  │     └─ line 15: TODO : the values would be only the codes of the subjects, how can we do these?
   │  │  ├─ university_project_core
   │  │  │  └─ urls.py
   │  │  │     └─ line 27: TODO : Why i in the holy fuck this isn showing in the swagger-ui?
   │  │  └─ users
   │  │     └─ user.py
   │  │        └─ line 28: TODO : Check this
   │  └─ important_dev_decisions.md
   │     ├─ line 2: TODO #1 - When deleting records, we need to ensure that the delete process is also being performed in DB.
   │     └─ line 3: TODO #2 - I quit (05-10 at 3:27 am) in gradeGroup model definition. Left subject and subjectWithGroupsOfGrades models, all serializer and viewspkgs for this models, and the last app, groups.
   └─ university_management_software_frontend
      ├─ components
      │  ├─ Forms
      │  │  ├─ Credentials
      │  │  │  └─ Credential.jsx
      │  │  │     ├─ line 1: TODO : Once the user is registered, we can redirect it to the dashboad (authenticated) page, according to its role
      │  │  │     └─ line 59: TODO : Change this
      │  │  └─ PersonalInfo
      │  │     └─ PersonalInfo.jsx
      │  │        ├─ line 1: TODO : Determine controlIDs for each form field, and then configure react-form
      │  │        ├─ line 2: TODO : Determine the required files, and activate validation
      │  │        └─ line 3: TODO : What do we think if we install this -> https://www.npmjs.com/package/react-phone-number-input ?
      │  ├─ Menu
      │  │  └─ SideMenu.jsx
      │  │     └─ line 48: TODO : Change this url to match the one for students (grades) */}
      │  ├─ Student
      │  │  └─ StudentCard.jsx
      │  │     └─ line 15: TODO : Set the email mailto: */}
      │  ├─ Subject
      │  │  └─ SubjectModal.jsx
      │  │     ├─ line 43: TODO : Make this scrollable once we have data to fetch */}
      │  │     └─ line 72: TODO Change this  and pagination when we have data to fetch */}
      │  └─ layout
      │     └─ AuthenticatedHeader.jsx
      │        └─ line 24: TODO : Redesign this if possible */}
      ├─ context
      │  ├─ authContext.jsx
      │  │  ├─ line 1: TODO : (MAIN) Once the basic views are set, and the API is correctly configured with authentication and basic information
      │  │  ├─ line 12: TODO : Use this when the authentication process is more clear
      │  │  └─ line 20: TODO : more optionsto distinguish roles
      │  └─ useAuth.jsx
      │     └─ line 1: TODO : Is this really neccesary, i mean, do we need to have it as a separate file?
      ├─ pages
      │  ├─ Auth
      │  │  ├─ LoginForm.jsx
      │  │  │  ├─ line 16: TODO : Añadir tipos de roles */}
      │  │  │  └─ line 41: TODO : Install form handling module (react-form i think it was) */}
      │  │  └─ Signup.jsx
      │  │     └─ line 14: TODO : Can we make this hook as a module, in order to not repeat it between multiple files?
      │  └─ Home
      │     ├─ styles
      │     │  └─ home.css
      │     │     └─ line 11: TODO : Think about the style of this
      │     └─ Home.jsx
      │        └─ line 15: TODO : Add pagination
      ├─ utils
      │  └─ requireAuth.jsx
      │     └─ line 5: TODO : Tu lógica para obtener el usuario actual y su rol, posiblemente del token en la sesión o cookie */;
      └─ router.jsx
         ├─ line 8: TODO : implement the evaluation and grade pages
         ├─ line 18: TODO : Create landing page
         ├─ line 22: TODO : Create login page
         ├─ line 28: TODO : Create post page
         ├─ line 32: TODO : Create signup page
         └─ line 36: TODO : Create about page

```

## NOTAS IMPORTANTES

1. Con respecto a la organización del proyecto y la manera de crear nuevos archivos, respetar la estructura propuesta.
2. Hasta que no se implemente autenticación desde el backend, deberemos manejar rutas dedicadas para cada coonjunto de funcionalidades, por ejemplo, para ver las funciones del profesor. 

<hr>

## 1. Project's folder structure
    
Basado en el siguiente articulo (https://www.taniarascia.com/react-architecture-directory-structure/)[React Architecture: How to Structure and Organize a React Application], vamos a definir la estructura de archivos de la siguiente manera:

        .
        └── /src
            ├── /api - Fetch API data
            ├── /assets -  global static assets such as images, svgs, company logo, etc.
            ├── /components - global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
            ├── /utils - Utilities, helpers, constants, JS modules and the like 
            ├── /pages - Contains every defined view-interface
            ├── main.jsx - Renders the app
            ├── App.jsx - Routes call
            └── routes.jsx - Routes definition


## 2. Definición de rutas en el lado del cliente

    Basandome en chatgpt, una buena opción de rutas son las sguientes:

> Para un software de gestión universitaria, las rutas del lado del cliente (frontend) deben reflejar las distintas funcionalidades y áreas de la aplicación que serán utilizadas por los usuarios, como estudiantes, profesores, personal administrativo y gestores. Aquí te propongo un esquema básico de rutas que podrías implementar, asumiendo que estás usando React con un enrutador como React Router:
> 
> ### Para Todos los Usuarios
> - `/`: Página de inicio que incluye información general, noticias y anuncios.
> - `/login`: Página de autenticación para que los usuarios ingresen al sistema.
> - `/register`: Página de registro para nuevos usuarios.
> - `/about`: Información sobre la universidad y el software.
> - `/contact`: Información de contacto o formulario de contacto.
> - `/faq`: Preguntas frecuentes.
> 
> ### Para Estudiantes
> - `/dashboard`: Vista principal del estudiante después de iniciar sesión.
> - `/courses`: Lista de cursos en los que el estudiante está inscrito o puede inscribirse.
> - `/courses/:courseId`: Detalles de un curso específico, como horarios, materiales, etc.
> - `/grades`: Registro académico del estudiante con calificaciones actuales.
> - `/schedule`: Horario de clases del estudiante.
> - `/profile`: Perfil del estudiante con opciones para editar su información personal.
> - `/financial`: Información sobre matrícula, becas y ayudas financieras.
> - `/library`: Acceso a recursos de la biblioteca o catálogo en línea.
> 
> ### Para Profesores
> - `/dashboard`: Página de inicio del profesor con acceso rápido a cursos y herramientas.
> - `/courses`: Lista de cursos que el profesor está enseñando.
> - `/courses/:courseId`: Gestión de un curso específico, incluyendo materiales, asignaciones y calificaciones.
> - `/schedule`: Horario de clases y horas de oficina del profesor.
> - `/students`: Lista de estudiantes y posibilidad de buscar por estudiante.
> - `/grades/submit`: Página para introducir o actualizar las calificaciones de los estudiantes.
> - `/research`: Información relacionada con proyectos de investigación, publicaciones, etc.
> 
> ### Para Personal Administrativo
> - `/dashboard`: Panel de control para el acceso a diversas funciones administrativas.
> - `/student-records`: Acceso a los registros académicos y personales de los estudiantes.
> - `/course-management`: Herramientas para crear y modificar información de cursos.
> - `/faculty`: Gestión de perfiles y cargas laborales del profesorado.
> - `/admissions`: Procesos relacionados con admisiones y registro de nuevos estudiantes.
> - `/financials`: Gestión de matrículas, becas y otras finanzas estudiantiles.
> 
> ### Para Gestores
> - `/dashboard`: Información de alto nivel y estadísticas para la toma de decisiones.
> - `/reports`: Generación y visualización de informes académicos y administrativos.
> - `/user-management`: Administración de cuentas de usuario y permisos.
> - `/system-settings`: Configuraciones del software, incluyendo parámetros y preferencias.
> 
> ### Rutas Comunes (Componentes Compartidos)
> - `/settings`: Preferencias y configuraciones del usuario.
> - `/support`: Asistencia técnica o ayuda para el usuario.
> - `/notifications`: Centro de notificaciones para mensajes y alertas del sistema.
> 
> Estas rutas son solo un punto de partida y pueden personalizarse según las necesidades específicas de la universidad y los usuarios. Además, podrías querer implementar rutas dinámicas y proteger ciertas rutas con autenticación y autorización para asegurar que los usuarios solo puedan acceder a la información que les corresponde.
> 

Se utilizará también acceso basado en roles (autenticación), pero sigo definiendo como se haría est con react-router-v6.