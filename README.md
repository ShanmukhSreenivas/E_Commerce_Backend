# E-Commerce Backend

Assignment for the course CS 474 – Enterprise Software Architecture.

Tech stack used – MongoDB, Express, and Node.js.

###### Note 
Following versions were used in the development of this demo:
- Node.js 12.18.1.
- Node Package Manager (npm) 6.14.5.

## Instructions to setup locally
### Installing modules
- Run the following commands in the terminal/console window in the project directory:
```bash
$ cd Product_microservice

$ npm install mongoose

$ cd ..

$ cd User_Cart_microservice

$ npm install mongoose
```

- Run the following commands in console window to run Product Microservice:
```bash
$ cd Product_microservice

$ node server.js
```
- Run the following commands in console window to run User Cart Microservice:
```bash
$ cd User_Cart_microservice

$ node server.js
```

### Testing the APIs
You can test the microservices with Postman by importing the provided collections into your Postman client. 

### Product Microservice
#### Create a new product
This part is only for administrative purposes.

- Method – POST
- Route – ```http://localhost:3000/rest/v1/products```

- Example request body:
```bash
{
    "productId": "183514mac1556",
    "category": "PC",
    "productName": "Apple",
    "productModel": "MAC_M1",
    "price": 1575,
    "availableQuantity": 4
}
```

#### Retrieve list of products
This API is exposed to the client.

- Method – GET
- Route – ```http://localhost:3000/rest/v1/products```

This will list all the available products in the database.


#### Update a product
This API will not be exposed to the client. Only for administrative purposes.

- Method – PUT
- Route – ```http://localhost:3000/rest/v1/products/<product-id-here>```

This will find a product by provided id param and will update that product in the database.

- Example request body:
```bash
{
    "productId": "183514mac1556",
    "category": "PC",
    "productName": "Apple",
    "productModel": "MAC_M1",
    "price": 1575,
    "availableQuantity": 4
}
```

#### Delete a product
This API will not be exposed to the client. Only for administrative purposes.

- Method – DELETE
- Route – ```http://localhost:3000/rest/v1/products/<product-id-here>```

This will find a product by provided id param and will delete that product in the database.

### User Cart Microservice
#### Create a new user with empty cart
This API will not be exposed to the client. Only for administrative purposes. Design specified needed hard-coded users by the administrator.

- Method – POST
- Route – ```http://localhost:4000/rest/v1/users/```

This will create a new user with an empty cart returns an error if user already exist.

- Example request body:
```bash
{
    "userId": "user_1"
}
```

#### Create or Update cart item
This API is exposed to the client.

- Method – PUT
- Route – ```http://localhost:4000/rest/v1/users/<userId>/cart```

- Example request body:
```bash
{
    "productId": "183514mac1556",
    "quantity": 2
}
```

#### Retrieve user cart
This API is exposed to the client.

- Method – GET
- Route – ```http://localhost:4000/rest/v1/users/<userId>/cart```

This will retrieve the user cart for a userId provided in the database.

