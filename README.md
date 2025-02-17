# ERP System

## Overview
This is an **Enterprise Resource Planning (ERP)** system designed for managing **inventory, sales, and finance**. The system is built using **Java, Spring Boot, and MySQL**, providing a scalable and efficient solution for business resource management.

## Features
* **Inventory Management**: Track stock levels, purchases, and suppliers.
* **Sales Management**: Manage customer orders, invoices, and transactions.
* **Finance Module**: Handle accounts, payments, and financial reports.
* **Role-Based Access**: Admin, Manager, and Employee access control.
* **RESTful APIs**: Built using **Spring Boot** for seamless integration.
* **Database Integration**: Uses **MySQL** for storing business data.

## Tech Stack
* **Backend**: Java, Spring Boot
* **Frontend**: Next.js
* **Database**: MySQL
* **Version Control**: Git, GitHub
* **Build Tool**: Maven
* **Security**: JWT-based authentication

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
* **Java JDK (17 or later)**
* **Maven**
* **MySQL Server**
* **Postman (for API testing, optional)**
* **Docker(or any other software for easier use)**

### Clone the Repository
```bash
git clone https://github.com/Ron1005/ERP.git
cd ERP
```

### Database Setup
1. Create a MySQL database:
```sql
CREATE DATABASE erp_system;
```

2. Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/erp_system
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### Build and Run the Application
1. **Compile the project** using Maven:
```bash
mvn clean install
```

2. **Run the application**:
```bash
mvn spring-boot:run
```

3. The application should now be running at `http://localhost:8080`.

## API Documentation
* The API endpoints are available at:
```
http://localhost:8080/api/{module}
```

* Swagger UI (if enabled) can be accessed at:
```
http://localhost:8080/swagger-ui.html
```

## Usage
* **Admin**: Can manage users, inventory, and finances.
* **Manager**: Can handle orders and sales.
* **Employee**: Can view and process transactions.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to your fork: `git push origin feature-name`
5. Open a Pull Request.
