# Microservice-architecture

This project does not has any practical use but is built to practice the event driven Microservice architecture. Which breaks down the application into various microservices like one for authorization. All these microservices communicate using Event Bus. **Nats-streaming** was chosen as the event bus here. All the microservices have their respective Dockerfiles in the repository and can be spun up using either docker-compose or a container orchestration tool like kubernetes if you want to scale certain parts of the application.
export the following environment variables before spawing the containers using docker-compose.
`JWT_KEY='safsadglklsjsaglk234'`
To run the project on your local machine use the command `docker-compose up --build`

## Authentication Service

Authentication service is used to authenticate the user into the application. It's error handling used **State Pattern** Design to make the code more scalable and modular. It uses JWT for the authentication purpose over approaches like session id where we need to keep a local storage on the server.
Routes exposed by the service.

1. `localhost:3000/api/users/signup` -> To signup and get the JWT token
2. `localhost:3000/api/users/signin` -> To get the JWT token
3. `localhost:3000/api/users/signout` -> To signout and overwrite the token
4. `localhost:3000/api/users/currentuser` -> to check if the user is logged in

Authentication service is using Postgres as the database to store the User credentials. Any SQL database can be used underhood as the ORM used by the node application is Sequelize which abstracts away the internal workings.
