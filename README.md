# 👥 Employee Management System

A full-stack **Employee Management System** web application with an automated **CI/CD pipeline** using Jenkins. Built with Node.js, Express, MySQL, and a premium dark-themed admin panel.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [Database Configuration](#-database-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Jenkins CI/CD Pipeline](#-jenkins-cicd-pipeline)
- [Version Control Setup](#-version-control-setup)
- [Default Credentials](#-default-credentials)

---

## ✨ Features

- **CRUD Operations** – Create, Read, Update, Delete employee records
- **Admin Authentication** – Secure login with session management
- **Responsive Design** – Works on desktop, tablet, and mobile
- **Premium Dark UI** – Glassmorphism theme with micro-animations
- **Search & Filter** – Real-time employee search
- **CI/CD Pipeline** – Automated build and deploy with Jenkins
- **RESTful API** – Clean API architecture

---

## 🛠 Tech Stack

| Layer           | Technology                |
| --------------- | ------------------------- |
| Frontend        | HTML, CSS, JavaScript     |
| Backend         | Node.js, Express.js       |
| Database        | MySQL                     |
| Auth            | bcryptjs, express-session |
| CI/CD           | Jenkins                   |
| Version Control | Git, GitHub               |

---

## 📁 Project Structure

```
employee-management-system/
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── login.html
│   ├── dashboard.html
│   ├── employees.html
│   ├── add-employee.html
│   └── edit-employee.html
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── database/
│   │   └── db.js
│   └── server.js
├── database/
│   └── schema.sql
├── Jenkinsfile
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## 📌 Prerequisites

Before running this application, ensure you have the following installed:

1. **Node.js** (v16 or higher) – [Download](https://nodejs.org/)
2. **MySQL** (v8 or higher) – [Download](https://dev.mysql.com/downloads/)
3. **Git** – [Download](https://git-scm.com/)
4. **Jenkins** (for CI/CD) – [Download](https://www.jenkins.io/download/)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Edit the `.env` file in the project root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_management
DB_PORT=3306
SESSION_SECRET=your-secret-key
```

---

## 🗄 Database Configuration

### 1. Start MySQL Server

Make sure MySQL is running on your system.

### 2. Run the Schema Script

```bash
mysql -u root -p < database/schema.sql
```

This will:

- Create the `employee_management` database
- Create the `admins` and `employees` tables
- Insert a default admin user (`admin` / `admin123`)
- Insert 5 sample employee records

---

## ▶ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will start at: **http://localhost:3000**

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/login`  | Admin login       |
| POST   | `/api/auth/logout` | Admin logout      |
| GET    | `/api/auth/check`  | Check auth status |

### Employees (Protected – requires login)

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/employees`        | Get all employees   |
| GET    | `/api/employees/:id`    | Get single employee |
| POST   | `/api/employees`        | Create new employee |
| PUT    | `/api/employees/:id`    | Update employee     |
| DELETE | `/api/employees/:id`    | Delete employee     |
| GET    | `/api/employees/count`  | Get total count     |
| GET    | `/api/employees/search` | Search employees    |

---

## 🔄 Jenkins CI/CD Pipeline

### Pipeline Stages

1. **Clone Repository** – Pulls latest code from GitHub
2. **Install Dependencies** – Runs `npm install`
3. **Build Application** – Build step (extensible)
4. **Run Tests** – Executes `npm test`
5. **Deploy Application** – Stops old server and starts new one

### Setting Up Jenkins

1. **Install Jenkins** and start the service
2. **Install required plugins**: Git plugin, NodeJS plugin, Pipeline plugin
3. **Create a new Pipeline job**:
   - Go to **New Item** → **Pipeline**
   - Under **Pipeline**, select **Pipeline script from SCM**
   - Set SCM to **Git** and enter your repository URL
   - Set **Script Path** to `Jenkinsfile`
4. **Configure GitHub Webhook** (optional):
   - In your GitHub repo, go to **Settings** → **Webhooks**
   - Add webhook URL: `http://your-jenkins-url/github-webhook/`
   - Content type: `application/json`
   - Trigger: **Just the push event**
5. **Run the pipeline** – Click **Build Now**

---

## 📝 Version Control Setup

### Initialize and Push to GitHub

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Employee Management System"

# Add remote repository
git remote add origin https://github.com/your-username/employee-management-system.git

# Push to GitHub
git push -u origin main
```

---

## 🔑 Default Credentials

| Username | Password |
| -------- | -------- |
| admin    | admin123 |

> ⚠️ **Important**: Change the default password in production by updating the `admins` table in MySQL.

---

## 📄 License

This project is licensed under the MIT License.

dsjcsjkdcnjslkdcn
