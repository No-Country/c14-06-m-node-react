<center>

# 🚀 c14-06-m-node-react

![Aquí la descripción de la imagen por si no carga](frontend/src/assets/logo/logo.png).


# 🏠 Servicios Club
</center>

Servicios Club is a web application designed to assist people with their home maintenance. It provides the opportunity to find professionals who can help, and also allows users to rate the professionals' work, providing recommendations for others based on previous jobs.

You can visit the web application at https://www.serviciosclub.com.

## 👥 Project members:

- Carolina Saggio    (Project Manager, QA)  
- Federico Lucero    (UX/UI Designer)  
- Andrés Boni        (Frontend Developer)  
- Ruben Gonzalez     (Frontend Developer)  
- Juan Nebbia        (Backend Developer)  
- Gabriel Althaparro (Backend Developer)

## 🛠️ Stacks/Technologies:

### ✔ Project Manager/QA

[![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)](https://www.atlassian.com/es/software/jira)


| <img src="docs/CarolinaSaggio.png" width=50>
|:-:|
| **Carolina Saggio**|
[![Linkedin](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carolina-saggio-78338923)

<br>

### ✔ UX/UI
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)](https://www.figma.com/)
[![Behance](https://img.shields.io/badge/Behance-100000?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net)

| <img src="docs/FedericoLucero.png" width=50>
|:-:|
| **Federico Lucero**|
[![Linkedin](https://img.shields.io/badge/linkedin%20-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.behance.net/federicolucero1)|
[![Behance](https://img.shields.io/badge/Behance-100000?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/federicolucero1)|

<br>

### ✔ Frontend:

[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://es.react.dev)
[![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)

| <img src="docs/RubenGonzalez.jpeg" width=50>| <img src="docs/AndresBoni.jpeg" width=50>|
|:-:|:-:|
| **Ruben Gonzalez**| **Andrés Boni**|
<a href="https://github.com/Ruben0x"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="#"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>|<a href="https://github.com/AndresBoni"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/andresboni"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> |

<br>

### ✔ Backend:
[![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-gray?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io)
[![JSON-Schema](https://img.shields.io/badge/JSON%20Schema-000000?style=for-the-badge&logo=json&logoColor=yellow)](https://json-schema.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/es)

| <img src="docs/GabrielAlthaparro.jpeg" width=50>| <img src="docs/JuanNebbia.jpeg" width=50>|
|:-:|:-:|
| **Gabriel Althaparro**| **Juan Nebbia**|
<a href="https://github.com/GabrielAlthaparro"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/gabriel-althaparro-simoni-b59b1a1b5"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>| <a href="https://github.com/JuanNebbia"><img src="https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/></a> <a href="https://www.linkedin.com/in/juan-nebbia"><img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> |

<br>

## 📐 Project layout

The applicaction is separated in two parts, the frontend code, and the backend code.

```
        
│   package.json        Root project metadata.
│   pnpm-lock.yaml      Dependencies lockfile.
│   pnpm-workspace.yaml Pnpm workspace configuration.
│
├───backend             The backend API code with express and mongodb.
│   ├───src                    Source code.
│   └───package.json           Backend project configurations.
└───frontend            The frontend code with react and styled-components.
    ├───src                    Source code.
    └───package.json           Frontend project configurations.

```

<br>
To run the web application locally you can clone the project from github following the next steps:

## 🚀 Setup

Install and configure dependencies:

```bash
git clone https://github.com/No-Country/c14-06-m-node-react
cd c14-06-m-node-react
cat backend/example.env > backend/.env
pnpm install
```

Then, complete the key-value pairs in the `backend/.env` file:

##### _backend/.env_

```bash
PORT=#port where you want to run the api (default 3001).
MONGO_URI=#The MongoDB uri in atlas or localhost
SECRET_KEY=#The secret key used for passport session.
SESSION_KEY=#The secret key used for JWT.
GMAIL_ACCOUNT=#The email to use in Nodemailer.
GMAIL_PASS=#The password of the email used in Nodemailer.
CLOUDINARY_URL=#Your cloudinary url config.
```

## 🌐 Run in production

Run the application in production mode:

```bash
pnpm start
```

## 💻 Run in development

Run the application in development mode (with live reload enabled):

```bash
pnpm run dev
```

Point your browser at http://localhost:3000 to see the frontend, or http://localhost:3001 to access the backend API.