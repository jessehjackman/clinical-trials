# TODO: shortlist #
- Postgresql full text search (TODO: indexing)
- load testing - autocannon/clinic
- performance - clinic
- security - snyk


## NodeJS Skill-up / Clinical Trials Search API
A little info about your project and/ or overview that explains **what** the project is about.

## Motivation
Skill up project 

## Build status
Build status - wire into circle ci

## Architecture
CLEAN Architecture
[![Uncle Bob clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Tech/framework
1) Async primitives:  async-await
2) Test framework: Jest / Supertest
3) HTTP server framework: Express (e.g. routers, middleware)
4) HTTP client: Axios
5) ~~HTTP Request GUI:  Paw (Postman is an option too but server devs are all on Paw now)~~
6) Docker
7) Data Formats: YAML, JSON
8) PostgreSQL
9) ~~Redis~~
10) Swagger / JSON Schema
11) CI/CD: CircleCI, Harness
12) ElasticSearch
13) ~~Infrastructure as code:  Terraform~~

## Features

## Installation

#DOCKER - postgresql
Docker file is checked into the root of the project and contains everything you need to get started
- From the root of the project
- docker build -t covid-trials-postgres-image .
- docker run -d --name covid-trials-postgres-container -p 5555:5432 covid-trials-postgres-image

## API Reference
Swagger docs available at the /api-docs endpoint upon installation

i.e. http://localhost:3000/api-docs/#/covid/find-covid-trials

## Tests


## License
MIT © [Jesse Jackman]()