# simple-trade assessment
This project is done in completion of a Technical Assessment for SimpleTrade Ventures and to showcase the author's knowledge and expertise in backend development. This is a simple API that allows users to create and manage their own stores

## Features
* **Users** can *register* and *login* to their accounts. They can also *create*, *read*, *update*, and *delete* their own stores.
* **Admins** can *update* other users to admin. They have access to all the stores which includes *create*, *read*, *update*, and *delete*.
* Password protection includes encryption and strength test to ensure security 

## Getting Started 
### Prerequisites
* [Node.js](https://nodejs.org/en/download)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [MongoDB](https://www.mongodb.com/try/download/community)
* [Postman](https://www.postman.com/downloads/)
### Setup and Installation 
1. Clone the repository [here](https://github.com/mazefernandez/simple-trade.git) 
2. Run the following command to install all the dependencies:
  ```
  npm install
  ```
3. Run the following command to start the server:
  ```
  npm run start 
  ```
4. Connect to the API using Postman on http://localhost:3000

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/auth/register | To register a new user account |
| POST | /api/auth/login | To login to an existing user account |
| PUT* | /api/auth/update | To update a user's role |
| DELETE* | /api/auth/deleteUser | To delete a user account |
| GET | /api/store | To retrieve details of a single store |
| GET | /api/store/getAll | To retrieve details of all stores |
| GET* | /api/store/getUserStores | To retrieve details of all stores of a single user |
| POST | /api/store | To create a new store |
| PUT | /api/store | To update the details of a single store |
| DELETE | /api/store | To delete a single store |

For more in-depth description of API Endpoints click [here](https://docs.google.com/document/d/1wRAWrapUvvRDRRwCm-BdYZ84pZPakU-mk7iQNxZGFvM/edit?usp=sharing) 

### Authentication and Authorization 
* *These API endpoints are only accessible by Admins
* The system uses JWT token-based authentication
* Password is required to have the following:
1. Must be at least 10 characters long
2. Must contain at least one uppercase letter
3. Must contain at least one number
4. Must contain at least one special character


### Testing 
* The system uses Mocha and Chai for testing. Run the following command to run test
  ```
  npm test  
  ```
## Author
[Maze Fernandez](https://www.linkedin.com/in/anna-mae-caitlin-fernandez/) is an aspiring Software Developer who aims to hone her skills in backend development. She is always looking for better coding practices to include in her arsenal. 
Apart from database and API, she has experience in cloud computing as well as mobile development. 
  
