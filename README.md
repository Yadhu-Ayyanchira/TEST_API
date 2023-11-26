# Node.js  API
This is a simple RESTful API built with Node.js, Express, and MongoDB for managing users and items.

## User Management:  
* **User Registration:** Allows new users to sign up by providing a unique username and a secure password. Passwords are hashed before storage.  
* **User Login:** Existing users can log in by submitting their username and password. A JWT is issued upon successful authentication.

## Item Management:  
* **Add Item:** Authenticated users can add new items, associating them with their user account. Authorization is enforced through JWT.  
* **Get All Items:** Retrieves a list of items, optionally filtered by a search term, and paginated for ease of navigation.
* **Get One Item:** Fetches detailed information about a specific item based on its unique identifier.
* **Edit Item:** Allows users to modify the details of a specific item, ensuring proper authentication and authorization.
* **Delete Item:** Authenticated users with the appropriate authorization can delete a specific item.

## Security
* **Authentication Middleware:** The API employs a middleware for user authentication, verifying JWTs before granting access to certain endpoints.
* **Password Hashing:** User passwords are securely hashed using bcrypt before being stored in the database.
## Dependencies
* **Express**
* **jsonwebtoken**
* **dotenv**
* **bcrypt**
* **mongoose**
* **nodemon**(dev dependency)
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yadhu-Ayyanchira/TEST_API.git

2. Install dependencies:

   ```bash
   npm Install

2. Create a .env file in the root directory with the following content:

   ```bash
   MONGO_URL="mongodb://localhost:27017/testapi"
   SECRET_KEY=your-secret-key
   PORT=3001

## USAGE

1. Start the server:

   ```bash
   npm start

## ENDPOINTS

**USER REGISTERATION**  
Register a user by providing  username and a secure password. For security, the password is hashed before it is stored in the database.  

METHOD:POST   
ENDPOINT:[http://localhost:3001/api/Users/register]()  
AUTHENTICATION:FALSE  
CONTROLLER FUNCTION: UsersController.register  
PAYLOAD: { "name": "username", "password": "userpassword" } 

   

**USER LOGIN**  
Authenticates the user with the registered name and password, and returns the JWT token for subsequent authenticated requests.

METHOD:POST   
ENDPOINT:[http://localhost:3001/api/Users/login]()  
AUTHENTICATION:FALSE  
CONTROLLER FUNCTION: UsersController.login  
PAYLOAD: { "name": "username", "password": "userpassword" }  

**ADD AN ITEM**  
Adds a new item to the database. Authentication must be done with a JWT token. The object is associated with the user whose token was issued.

METHOD:POST   
ENDPOINT:[http://localhost:3001/api/Items]()  
AUTHENTICATION:TRUE (Bearer token)  
CONTROLLER FUNCTION: ItemsController.addItem  
PAYLOAD: { "name": "itemname", "description": "itemdescription" }   


**GET ALL ITEM**  
Retrieves a list of items from the database. The optional search parameter allows users to filter items by name. The page parameter facilitates paginated results, with a default page size of 10 items.

METHOD:GET   
ENDPOINT:[http://localhost:3001/api/Items]()  
AUTHENTICATION:FALSE  
CONTROLLER FUNCTION: ItemsController.getAllItems  
QUERY PARAMETERS: `search`  (optional) and `page` (Page should start from 1)

**GET ONE ITEM**  
Retrieves detailed information about a specific item based on its unique id

METHOD:GET   
ENDPOINT:[http://localhost:3001/api/Items/:id]()  
AUTHENTICATION:FALSE  
PATH PARAMETERS: Id of an item

**DELETE AN ITEM**  
Deletes a specific item based on its unique identifier Id.Requires authentication through a JWT token

METHOD:DELETE   
ENDPOINT:[http://localhost:3001/api/Items/:id]()  
AUTHENTICATION:TRUE (Bearer token)  
CONTROLLER FUNCTION: ItemsController.deleteItem  
PATH PARAMETERS: Id of an item

**EDIT AN ITEM**  
Modifies the details of a specific item based on its unique identifier Id. Requires authentication through a JWT token.

METHOD:PUT   
ENDPOINT:[http://localhost:3001/api/Items/:id]()  
AUTHENTICATION:TRUE (Bearer token)  
CONTROLLER FUNCTION: ItemsController.editItem  
PATH PARAMETERS: Id of an item