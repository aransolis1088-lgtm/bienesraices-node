#  Bienes Raíces - Node + Express + Tailwind

Proyecto de practica web de bienes raíces desarrollado con Node.js, Express, MySQL, Sequelize, Pug y Tailwind CSS.  
Incluye sistema de autenticación, protección CSRF y panel de administración de propiedades. 


---

## Tecnologías utilizadas

- Node.js  
- Express  
- MySQL  
- Sequelize ORM  
- Pug (Template Engine)  
- Tailwind CSS  
- PostCSS  
- CSRF Protection  
- JSON Web Tokens (JWT)

---

## Requisitos previos

Antes de iniciar asegúrate de tener instalado:

- Node.js (v18 o superior recomendado)  
- NPM  
- MySQL  

---

## ⚙️ Instalación

Clona el repositorio:

git clone https://github.com/aransolis1088-lgtm/bienesraices-node.git  
cd NOMBRE_DE_TU_REPO  

Instala las dependencias:

npm install  

---

## 🔐 Variables de entorno

Crea tu archivo .env a partir del ejemplo:

cp .env.example .env  

Configura tus datos en el archivo .env:


## Compilar Tailwind CSS

Generar el CSS compilado una sola vez:

npm run build:css  

O en modo desarrollo con watcher:

npm run dev:css  

---

## ▶️ Ejecutar servidor

npm run dev  

El proyecto se abrirá en:

http://localhost:3000

---

## 🔑 Rutas principales

Login: /auth/login  
Registro: /auth/registro  
Panel de propiedades: /mis-propiedades  

---

## 🛠️ Notas importantes

- El archivo public/css/app.css no se incluye en el repositorio.  
- Tailwind genera el CSS automáticamente leyendo las vistas Pug.  
- La base de datos se sincroniza automáticamente al iniciar el servidor.  
- Asegúrate de que MySQL esté corriendo antes de ejecutar el proyecto.  

---

## 👨‍💻 Autor

Aran Uzziel Solis Medina  
GitHub: https://github.com/aransolis1088-lgtm
