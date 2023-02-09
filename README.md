# storefrontBackend
## Installation
First you need to have node and postgres installed on your machine

then clone the repo and in the repo directory open terminal and type

```bash
  npm i -g db-migrate
  npm install
```

## Project Configurations
### ***Database config***

We will now start by creating our dev database and creating our super user.

open terminal and type the following to create the databases

```bash
  psql postgres
  CREATE USER storefront_user WITH PASSWORD 'password123';
  CREATE DATABASE storefront;
  \c storefront
  GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
```
Now you successfully created the necessary databases to start the project.

### ***Environment Variables Config***
in terminal type
```bash
  touch .env
```
then add the following in your .env file
```bash
POSTGRES_HOST = '127.0.0.1'
POSTGRES_PORT = 5432
POSTGRES_DB = 'storefront'
POSTGRES_TEST_DB = 'storefront_test' 
POSTGRES_USER = 'shrief'
POSTGRES_PASSWORD = 'Sh00000000'
ENV = 'dev'
TOKEN_SECRET= your-secret-token
BCRYPT_PASSWORD= your-password
SALT_ROUNDS= 10
PORT=3030
```

## Building

```bash
  db-migrate up
  npm run dev
```
***Now Express Server should be running on port 3030 and PostgreSQL Server is running on port 5432***

## Testing 

```bash 
  npm run test
```