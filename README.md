# internia-backend

# To run these files, do the following steps:
1. Install NodeJS on your pc.
2. Install Postman.
3. Download these files, open CMD and navigate to this directory.
4. run "npm install" . This will install all the dependencies in this directory from package.json
5. run "npm install nodemon -g" . This will install nodemon as global.
6. run "nodemon app.js"
If it logs successful messages on the console, it means everything is installed properly and you are ready to go.
If not, call me.

# To check GET and POST requests:
1. Start Postman.
2. for signup, put url as http://localhost:5000/signup and POST. In the header key:Content-Type, value: application/json
In body section, select raw and JSON, enter details in the format given below and hit "Send".
{
	"name": "xyz",
	"email": "xyz@xyz.com",
	"password": "xyz123"
}
3. for signin, put url as http://localhost:5000/signin and POST. In the header key:Content-Type, value: application/json
In body section, select raw and JSON, enter details in the format given below and hit "Send".
{
	"email": "xyz@xyz.com",
	"password": "xyz123"
}

# Itna karo fir aage ka batata hu 
