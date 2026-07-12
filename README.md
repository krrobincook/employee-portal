# Employee Management System (EMS) Portal

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</div>

<br />

A comprehensive Employee Management System designed to streamline administrative and employee workflows. Built with a modern tech stack, this application handles everything from secure authentication to complex attendance tracking and automated leave management.

## 🌟 Key Features

- **Role-Based Access Control**: Secure segregation of operations between Administrators and Standard Employees.
- **Attendance Tracking**: Real-time clock-in/clock-out functionality with historical data viewing.
- **Leave Management**: Employees can apply for leaves; Admins can easily review, approve, or reject them.
- **Payslip Generation**: Seamless financial record viewing showcasing monthly salary disbursements.
- **Profile Management**: Maintain and update accurate employee records natively.

## 🛠️ Technology Stack

### Frontend
- **React 19**
- **Vite** (Next generation frontend tooling)
- **Tailwind CSS v4** (Utility-first styling framework)
- **Axios** (Robust API communication)
- **React Router DOM** (Dynamic client-side routing)

### Backend
- **Node.js & Express.js**
- **MongoDB** (Mongoose ODM)
- **JSON Web Tokens (JWT)** (Secure Session Authentication)
- **Multer** (Multipart form-data and file uploads)
- **Inngest** (Reliable Background Jobs/Queues)

### DevOps & Deployment
- **Docker & Docker Compose** (Full application containerization)
- **Nginx** (High-performance web server/proxy for the frontend UI)
- **Render** (Production environment hosting platform)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Docker](https://www.docker.com/) 
- [MongoDB Atlas Account](https://www.mongodb.com/) (Or a local MongoDB instance)

### Running with Docker (Recommended) 🐳

You can spin up both the frontend and backend instantly using Docker Compose. Ensure Docker Desktop is running on your machine.

```bash
docker-compose up --build
```
- The **Frontend** will be accessible at: `http://localhost:5174`
- The **Backend API** will run on: `http://localhost:4000`

### Running Locally (Without Docker)

**1. Clone the repository**
```bash
git clone https://github.com/krrobincook/employee-portal.git
cd employee-portal
```

**2. Setup Backend Environment**
```bash
cd backend
npm install
```
*Create a `.env` file in the `backend/` directory and configure:*
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
```
```bash
# Start backend server
npm run server
```

**3. Setup Frontend Environment**
```bash
cd ../frontend
npm install
# Start frontend React application
npm run dev
```

## 🌐 Deployment Details

The application is configured to run flawlessly on container orchestration platforms like Render.
- Frontend resolves dynamic URLs natively to decouple build-time environment constraints.
- Nginx provides static site caching and fallbacks required for Single Page Applications (SPAs).
- Dockerfiles utilize multi-stage builds (`node:alpine` -> `nginx:alpine`) to keep production image sizes impressively minimal.
