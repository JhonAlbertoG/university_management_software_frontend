## Auxiliar TODOs
TODO: Definir campo para email en el formulario de signup.

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