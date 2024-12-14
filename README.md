# Step One
- Set up MySQL on your machine.
- Create a database named "inventory" in your database
- Put your MySQL credentials in the .env file inside config folder.

# Step Two
- Open PowerShell /Command Line /Terminal and run:
mysqldump -u root -p inventory < inventory_dump.sql

Note: Make sure "inventory_dump.sql" file is in the current directory.

# Step Three
- Open Project root directory and run:
npm install

Note: Make sure you've Node and NPM installed.

# Step Four
- Move to backend folder using:
cd backend

and run:
node server.js

# Step Five
- Move to frontend folder and run index.html on a port.
(If you're using VS Code, you can do so by:
- Installing live server extension
- Right clicking on the current window
- Clicking on Open with live server)

# Step Six
- Open a browser of your choice and type:

localhost:{port_number}/frontend/index.html

And you're done.

