This project is a boilerplate for creating an `express` app which uses `sequelize` to interact with `MYSQL` database.

## Getting Started
Create a new directory on your computer `mkdir 'your folder name'`
```bash
fork the repo
git clone git@github.com:56aint/my_api.git your-project-folder-name
cd your-project-folder-name
npm install
```
## NEXT >>> Set up your database
It is assumed that you have MYSQL running in a docker;
Install docker with: 
```sudo apt install docker.io```
Check  if docker is installed 
```docker --version```

You can set up a MYSQL image in a docker by running the following commands in your terminal:
```bash
docker run -d -p 3306:3306 --name my_api -e MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD> mysql
**keep the password safe**
``` 
Now that you have a container for your my_api,
**wake it up!** run:
```bash
docker start my_api
```
***anytime you shutdown your computer, you have to wake the container up again when your computer is turned on, and to stop your docker container at anytime, run:
```bash
docker stop my_api
```
**We can use MYSQL workbench to connect to our databse directly. To install MYSQL workbench, run:
```bash
sudo apt install mysql-workbench
```
Once you started my_api, run:
```bash
docker exec -it my_api bash
```

```bash
mysql -uroot -p
***Enter the password you kept safe***
show databases;
```
To exit MYSQL workbench run:
```bash
exit
```
To exit my_api container, run:
```bash
exit
```
The container will be running underground until your computer is shutdown or you stopped it. 

***NOTE** The database will be automatically created by ```sequelize``` using  a 'script' in our project folder, which will use nodemon to execute 'index.js' with the environment variables loaded from '.env' file(stay tuned), so at the moment, when you run: `show databases;`, your workbench is empty.

**The command to manually create the database is: `CREATE DATABASE my_api` which is run before `show databases;`**


## NEXT >>> Set up your local environment files and project folder/files
Create a ```scripts``` folder at the project root, containing **```create-database.js``` and ```drop-database.js```** files.
In your terminal, run:
```bash
npm install --save mysql2
```
-Create ```.env``` file.
-Create a folder inside ```src``` folder named ```models```  containing ```index.js``` file.
 -require sequelize at the top of this ```index.js``` file.
 -declare
```bash
  const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,} = process.env;
```
 -declare a function named setupDatabase
 -declare a const and assign a new Sequelize() to it. Pass it the connection infomation from your ```.env```
 -call sequelize.sync({alter: true}), have the function return an empty object for now
 -to export our function, add ```module.exports = setupDatabase()``` a the bottom of the file.


In our package.json file, there is ```prestart``` script that uses node to create database(if not already been created manually as above). Node uses 'create-database.js' file to create the database by loading the variables saved in our **'.env'** file. The variables in ```.env``` file are;
```bash
    DB_NAME=<my_api> 
    DB_PASSWORD=<YOUR_PASSWORD> 
    DB_USER=root
    DB_HOST=localhost
    DB_PORT=3306
```
If everything has been done correctly running ```npm start``` in your terminal should land us on our project root ```index.js```:
 *Now serving your Express app at http://localhost:3000`*

I got the following error message the last time, which was due to my port being busy with the last project
```bash
code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
```
I terminated all the running processes with ```killall node``` and everything was fine.

var assert = require('assert');

## NEXT >>> Set up your Test Environment
-Install these as dependencies;
 -mocha ```npm install --save-dev mocha```
 -chai ```npm install chai```
 -supertest ```npm install supertest --save-dev```

-Create a folder at the project root called ```test-setup.js```
-Add a ```.env.test``` with the same environment variables as your ```.env.``` Make sure to give your test database a different name.
```bash
    DB_NAME=<my_api-test>
    DB_PASSWORD=<PASSWORD> 
    DB_USER=root
    DB_HOST=localhost
    DB_PORT=3306
```
-In our package.json, there is a pretest script with the command: ```node scripts/create-database.js test```. The test option at the end of the command tells the script to load the variables from .env.test instead of .env.
-There is also a posttest script in our package.json with the command: ```node scripts/drop-database.js```. This will use **```drop-database.js```** file in our **scripts** folder to delete our test database after our tests have finished running.

**Reminder** In src folder, create these folders in order listed: Model, Controller, Routes, tests. The first folder will be required in the next, and so on.
Also, associations are made in Sequelize setup file e.g. in /src/models/index.js
