# Salary Management System

This is a full stack implementation of a salary management system, which helps employers to maintain a database of their employees id, login id, name and salary.

### Features included

1. Able to import employees data into the database through a csv file.
2. A employee dashboard where the user can view the the employee details. Dashboard uses API pagination to avoid excessive network traffic.
3. Able to sort the employees data by id, login, name and salary.
4. Detection of browser language settings of possible UI localization.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

As this project uses PostgreSQL as the database, installation and setting up of PostgreSQL is necessary. PostgreSQL can be downloaded through this link: https://www.postgresql.org/download/. Node.js and npm are also necessary.

### Installing

Clone the repository. 

Using PostgreSQL, setup a database called "salary_management_system". That is the convention I used in my code. Database configuration can be found and adjusted at backend\src\db\config\config.json.

Go to the backend directory and npm install.

```
cd backend
npm run install
```

Run database migration.

```
npx sequelize-cli db:migrate
```

Run the backend application.

```
npm start
```

From the parent directory, go to the frontend directory and npm install and run the frontend application. The port number for frontend is 3000.

```
cd frontend
npm run install
npm start
```

## Running the tests

### Backend

```
cd backend
npm test
```

### Frontend

```
cd frontend
npm test
```

## Built With

* React/Redux
* Express.js
* PostgreSQL



