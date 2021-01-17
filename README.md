# NodeJS Skill-up Project / Clinical Trials Search API

## Motivation
Skill-up project up on the tech stack described below.

## Tech
1) Async primitives:  async-await
2) Test framework: Jest / Supertest
3) HTTP server framework: Express (e.g. routers, middleware)
   - Leveraged Joi for validation
4) HTTP client: Axios
5) ~~HTTP Request GUI:  Paw (Postman is an option too but server devs are all on Paw now)~~
6) Docker
7) Data Formats: YAML, JSON
8) PostgreSQL
9) ~~Redis~~ - In the early phase of development - disabled caching on purpose
10) Swagger / JSON Schema
11) CI/CD: CircleCI, Harness - work in progress
12) ElasticSearch
13) ~~Infrastructure as code:  Terraform~~


Avoiding ORM as I believe it's a leaky abstraction, but I did decide to add a relation db query builder -> knex.
This is arguable another leaky abstraction, but it's very close to SQL but provides a few security and convenience features.

## Architecture
[![Uncle Bob clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
Leveraging clean architecture to ensure business logic is not coupled to the tech choices.
>"The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle."

To highlight this fact this project adds support for two repositories (PostgreSQL and Elasticsearch) as well as two http 
frameworks (Express and Hapi).

## Installation
```
1) git clone https://github.com/jessehjackman/clinical-trials.git
2) cd clinical-trials
3) rename/move template.env -> .env (update id desired) 
4) configure PostgreSQL
    a) docker build -t covid-trials-postgres-image .
    b) docker run -d --name covid-trials-postgres-container -p 5555:5432 covid-trials-postgres-image
4) npm install
5) npm test
6) npm start

Optional) configure Elasticsearch by following AWS directions
and setting master user name and password in .env
```

#DOCKER - postgresql
Docker file is checked into the root of the project and contains everything you need to get started
- From the root of the project
- docker build -t covid-trials-postgres-image .
- docker run -d --name covid-trials-postgres-container -p 5555:5432 covid-trials-postgres-image

## API Reference
Swagger docs available at the /api-docs endpoint upon installation

i.e. http://localhost:3000/api-docs/#/covid/find-covid-trials

## Tests
todo

## License
MIT © [Jesse Jackman]()