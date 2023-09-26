# Task Tracker

A basic application build by Nodejs, Express and Postgress

## Run Locally

Clone the project

```bash
  git clone https://github.com/piyush-chandak/task-tracker.git
```

Go to the project directory

```bash
  cd task-tracker
```

Install dependencies

```bash
  yarn install
```

Run Database scripts in folder [db/scripts](./db/scripts)

```bash
  create_task_table.sql
```

Start the server

```bash
  yarn run start or yarn run listen
```

Go to swagger url to try apis [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

### Project Structure

```
db\
 |--scripts\        # Database scripts that need to be executed
src\
 |--config\         # Environment variables and configuration related things
 |--constants\      # Constant file
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger related files
 |--middlewares\    # Custom express middlewares
 |--models\         # Database models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--serilizers\     # Serilizer for parsing response
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

### Module Used
1. express
2. body-parser
3. cors
4. xss
5. dotenv
6. joi
7. pg
8. sequelize
9. moment
10. nodemon
11. swagger

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Port on which server will start

`SERVER_URL` - Url on which server will load (Reference for swagger)

`DATABASE_HOST` - Host of database to be connected

`DATABASE_PORT` - Port on which database is running

`DATABASE_NAME` - Name of Database that will have tables

`DATABASE_USER` - If user is set on database level so provide it's name

`DATABASE_PASSWORD` - If user and password is set on database level so provide it's password

`DATABASE_DIALECT` - Type of database that will be connected

`DATABASE_LOGGING` - Boolean value that will do logging of sql query on server


## API Reference

#### Get list of tasks

```http
  GET /api/tasks
```

| Parameter | Type     | Required     |Description                     |
| :-------- | :------- | :------- | :------------------------- |
| `page` | `number` | false | Fetching specific pages |
| `page_size` | `number`| false | Number of records returned in one page |

#### Create new task
```http
  POST /api/tasks
```

| Parameter | Type     | Required     |Description                     |
| :-------- | :------- | :------- | :------------------------- |
| `title` | `string` | true | Title for task |
| `description` | `string` | false | Description for task |

#### Update Task
```http
  PUT /api/tasks/:id
```

| Parameter | Type     | Required     |Description                     |
| :-------- | :------- | :------- | :------------------------- |
| `title` | `string` | true | Title for task |
| `description` | `string` | false | Description for task |
| `status` | `string` | false | Status of task ('open', 'inpocess', 'completed') |

#### Get task metrics

```http
  GET /api/tasks/meterics
```

| Parameter | Type     | Required     |Values                     |
| :-------- | :------- | :------- | :------------------------- |
| `start_date` | `string`| false | Start date of date range |
| `end_date` | `string`| false | End date of date range |
