#  School Management System 

 **School Management System** built with **Node.js**, **Express**, and **MongoDB**, featuring user/admin authentication, CRUD operations on courses, teachers, and roles, and integrated API documentation using **Swagger**.

##  Features

- **Teacher Registration & Login**
- **Admin Login with Privileged Access**
- **JWT Authentication & Role-Based Authorization**
- **CRUD for Courses and Roles**
- **Swagger UI** for API documentation
- **Debug** module for environment-based debugging
- **Populate** used for relational references

##  Authentication & Authorization

- Users receive a **JWT token** upon login and register.
- Token is required in the `Authorization` header to access protected routes.
- Admin-specific routes are protected using `admin` middleware.

##  Routes Overview

###  Courses


 `POST /api/courses/` | Admin | Create a course |
`GET /api/courses/` | Authenticated | View all courses |
 `GET /api/courses/:id` | Authenticated | View a specific course |
 `PUT /api/courses/:id` | Authenticated | Update a course |
 `DELETE /api/courses/:id` | Admin | Delete a course |

###  Teachers



 `POST /api/teachers/register` | Public | Register a new teacher |
 `POST /api/teachers/login` | Public | Login as teacher |
 `GET /api/teachers/` | Authenticated | View all teachers |
 `DELETE /api/teachers/:id` | Admin | Delete a teacher |

### Roles



 `POST /api/roles/` | Admin | Create a new role |
 `GET /api/roles/` | Authenticated | View roles |

##  Technologies Used

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **bcryptjs** – password hashing
- **config** – environment-based configuration
- **debug** – for development logging
- **Swagger UI** – API documentation
- **Joi** (if used in validation)

##  API Documentation

Interactive API documentation is available via Swagger:

