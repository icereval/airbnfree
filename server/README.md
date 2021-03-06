# Airbnfree Server

## Requirements

- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)
- [NodeJS (NPM)](https://nodejs.org/en/)
- [Docker Client](https://www.docker.com/community-edition#/download)
- Developed with [Visual Studio Code](https://code.visualstudio.com/) _(optional)_

## Services

- `docker-compose up`
  - postgres

## Server

### Install and Run

- `yarn install`
- `yarn resetdb`
- `yarn start`

### Migrations

- `yarn orm migrations:run`

### API

Local Server: http://localhost:5000/

Endpoint|Method|URI
--- | --- | ---
Login | `POST` | `/login`
Logout | `DELETE` | `/logout`
Sign Up | `POST` | `/signup`
Show User Info | `GET` | `/users/{id}`
Show My User Info | `GET` | `/users/me`
Update My User Info | `PUT` | `/users/me`
