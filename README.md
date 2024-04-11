# Groupe de douri_m 1020900

## for use the project you have need to install 
run
npm install 

 ### for hash the password
 npm i bcryptjs
 npm i cors
 ### for connect with database
 npm i dotenv
 ### for create a server
 npm i express
 ## for jwt 
 npm i jsonwebtoken
 ### for make request in database
 npm i mongodb
 ### for handle error and response
 npm i mongoose
 ### for Validator
 npm i validator
 ### for create exceptions for email and password
 npm i

### You can run this commande for installe all this package
npm install bcryptjs cors dotenv express jsonwebtoken mongodb mongoose validator

## connexion to mangoDB 
you must first create an account, in mariadb then create a Database Access, to have an access link and a password, then in the Api folder you must create an .env file in this file you must declare the variable next :
MONGO_URL = "connection url"/myApi
In this url you must replace the "password" with the password created when creating Database Access and end the url with /myApi to specify that you must create a database with the name myApi.

# for run the server
node app.js

