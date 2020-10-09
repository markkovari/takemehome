# takemehome
ELTE IK full stack assignment

For the project description look at the [wiki](https://github.com/markkovari/takemehome/wiki).


![example workflow name](https://github.com/markkovari/takemehome/workflows/CI/badge.svg)

# Project description

DL: 2020.10.04

This project's ideam came from the observation, that there is no central place, webpage or whatever to collect the adopters and the adoptee animals for every-day users. This site is ment to be just a case study, what kind of user requirements can be implemented easily and which ones will tottally missed.

## Functional requirements (raw user-functions)

As a *User* (<b>U</b>) I am able:
 - without registration or logging in to:
    - see all the shelters based on my filters
    - see all the adoptees (animals) based on my filters
    - see the details of an adoptee

 - when I am logged in to:
    - see the details of a particular shelter or adoptee details
    - mark and unmark an adoptee as "interested"
    - browse the "interested" adoptees
    - send an adopt request to the given shelter where the selected adoptee is
    - delete my account

As a *Shelter Administrator* (<b>SA</b>) I am able to:
  - register my (animal) shelters
  - update the details of my shelter
  - delete my shelter
  - add new adoptee(s)
  - update already existing adoptees
  - remove (hopefully with an adoption) adoptees
  - transfer adoptees to other shelters
  - adopt adoptees

> Please note that <b>SA</b> *extends* the functions/requirements of <b>U</b>. In lower absrtaction that means the <b>SA</b> has other user privileges.

As a *Moderator* (<b>M</b>) I am able to:
  - delete Users (<b>U</b>) and Shelter Administrators (<b>SA</b>)
  - update Users (<b>U</b>) and Shelter Administrators (<b>SA</b>)
  - update, delete adoptees in shelters

## Non-functional requirements

 - As much accessible as possible (for the front end keeping W3C WAI principles in mind)
 - Well documented and accessible API, being open for further clients like mobile and other applications
 - Safe from the user perspective (required authentication for specific user-related functions)
 - Reasonably automated, scalable and sustainable deployed application (for a pretty low budget)

## Glossary

 - Shelter: an open place to adopt animals from
 - Adoptee: the animals in the shelters
 - Adopter: the User who'll adopt Adoptees
 - Shelter Administrator: the admin of the given Shelter
 - Moderator: service/website content moderator

## User types

User types:

 1. Guest
 2. (Registered) User
 3. (Shelter) Admin
 4. Moderator


# How to start the application in local development enviromnent

To load the credentials in development phase copy/create an environment file.

Like `cp /.env.copy /.env`.


The docker-compose requires installed `docker` and `docker-compose` on the targeted computer.

To run the application in cointainerized mode:
```sh
docker-compose up # for compose start
docker-compose up -d # for compose start in detached mode (background)
docker-compose down # for graceful shutdown
```

Beside that, you can build and run the docker containers individually.
