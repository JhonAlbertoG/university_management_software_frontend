# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Instalación
Una vez clonado el repositorio, ingresar a la carpeta `university_management_software_frontend/` y realizar:
```bash
$ npm install 
```
# Ejecutar ambiente de desarrollo
En la misma carpeta ejecute:
```bash
$ npm run dev 
```
<hr/>

# NOTAS
Tenga en cuenta lo siguiente al momento de desarrollar:
- Si realiza alguna acción que considere importante ser tenida en cuenta de manera particular, digitela en el documento `important_decisions.md`
- Cree TODO's en el código para tener un rastreo ded todos los cambios a ejecutar en todo momento. Al crearlos, anexarlos a `important_decisions.md` para tener u vistazo general, y que todos puedan ver el trabajo de los demás
- Al momento de manejar la logica de negocio, comentar el código generado explicando su funcionamiento.
- En cuanto al flujo de trabajo en git:
    - Hacer push a la rama personal, nunca a la main.
    - Hacer pull request desde el github para poder anexar cambios en la rama principal.
    - Intentar realizar commits con pocos cambios, ejemplo, la creación de un nuevo componente con su hoja de estilos o el arreglo de uno o varios componentes. Caso tal de hacer caso omiso a esto, hacer un comentario lo más descriptivo posible en el commit sobre los cambios realizados.