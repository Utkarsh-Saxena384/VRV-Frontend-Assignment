
# VRV Frontend Assignment - Role-Based Access Control

A Quasar-based frontend project for implementing Role-Based Access Control (RBAC) features. This project demonstrates a structured approach to managing user permissions and access levels.

---

## Frontend Overview

### Features

- **Role-Based Access Control (RBAC):** Efficiently manage user permissions and roles.
- **Framework:** Built with Vue.js and Quasar Framework.
- **User-Friendly UI:** Provides intuitive navigation for administrators to manage users, roles, and permissions.
- **API Integration:** Seamlessly communicates with the backend to fetch, create, update, and delete resources.
- **Code Quality:** Includes linting and formatting tools for a consistent codebase.

### API Integration

All API calls are managed using Axios. The configuration file (`axios.js`) in the `boot` folder sets the base URL for the backend, which is deployed on Render. This setup ensures smooth integration and interaction between the frontend and backend.

---

## Backend Overview

The backend is a Node.js application built with Express and PostgreSQL. It provides a robust API to support the frontend functionalities.

### Features

- **Express Framework:** Efficient handling of HTTP requests.
- **Database Integration:** PostgreSQL is used to store and manage data for users, roles, and permissions.
- **RESTful APIs:** Offers a comprehensive set of endpoints to manage users, roles, permissions, and their associations.
- **Secure Configuration:** Environment variables are managed using `dotenv`.

### API Endpoints

#### Users
- `GET /users`: Fetch a paginated list of users with optional filters.
- `GET /get-user-info`: Retrieve detailed information about a specific user.
- `POST /add-user`: Add a new user.
- `POST /update-user`: Update user details.
- `POST /change-user-status`: Enable or disable user accounts.
- `GET /delete-user`: Soft delete a user.

#### Roles
- `GET /roles`: Fetch all roles.
- `GET /get-role`: Retrieve a specific role's details.
- `POST /create-role`: Add a new role.
- `POST /update-role`: Update role details.
- `GET /delete-role`: Remove a role.

#### Permissions
- `GET /permissions`: Fetch permissions, optionally filtered by role.
- `POST /create-permission`: Add a new permission.
- `POST /update-permission`: Update permission details.
- `GET /delete-permission`: Remove a permission.
- `POST /permission-actions`: Assign or unassign a permission to a role.

#### User-Role Management
- `GET /users-in-role`: List users assigned to a specific role.
- `POST /assign-users-role`: Assign a role to users.
- `POST /unassign-user-role`: Remove a role from a user.

### Deployment

The backend is deployed on [Render](https://render.com). The deployed URL is configured in the frontend's `axios.js` file to make API calls.

### Technologies Used

- **Node.js**
- **Express**
- **PostgreSQL**
- **dotenv**
- **cors**
- **body-parser**

### Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd vrv-assignment_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with the following variables:
   ```env
   DB_USER=<your_db_user>
   DB_PASSWORD=<your_db_password>
   DB_HOST=<your_db_host>
   DB=<your_database_name>
   DB_PORT=<your_db_port>
   PORT=<backend_server_port>
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Prerequisites

- **Node.js**: ^20.x, ^18.x, or ^16.x
- **npm**: >= 6.13.4 or **yarn**: >= 1.21.1

---

## License

This project is private and not licensed for public use.
