# UanLog

UanLog es una plataforma de blogs donde los usuarios pueden crear, editar y comentar publicaciones. La aplicación está construida con Vue.js y Firebase, proporcionando una experiencia de usuario fluida y en tiempo real.

## Enlace
https://uanlog.vercel.app (Actualmente desactivado)

## Características

- **Autenticación de Usuarios**: Registro, inicio y cierre de sesión utilizando Firebase Authentication.
- **Gestión de Blogs**: Crear, editar y eliminar publicaciones de blog.
- **Comentarios**: Los usuarios pueden agregar, editar y eliminar comentarios en las publicaciones.
- **Filtrado y Búsqueda**: Filtrar publicaciones por categorías y buscar por título, contenido o autor.
- **Responsive Design**: Diseño adaptable para una experiencia óptima en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**: Vue.js 3, Vue Router
- **Backend**: Firebase (Authentication, Firestore)
- **Herramientas de Desarrollo**: Vite, ESLint, Prettier

## Estructura del Proyecto

```plaintext
.
├── .editorconfig
├── .gitignore
├── .prettierrc.json
├── .vercel/
│   ├── project.json
│   └── README.txt
├── .vscode/
│   └── extensions.json
├── env.d.ts
├── eslint.config.js
├── index.html
├── package.json
├── public/
├── README.md
├── src/
│   ├── App.vue
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   ├── layouts/
│   ├── main.ts
│   ├── pages/
│   ├── router/
│   ├── services/
│   └── assets/
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
