# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  - HTTP verb `GET`
  - Endpoint:- `/products/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of products`
    ```json
    [
      {
        "id": 1,
        "name": "example1",
        "price": 235,
        "category": "electronics"
      },
      {
        "id": 2,
        "name": "example2",
        "price": 900,
        "category": "electronics"
      }
    ]
    ```
- Show
  - HTTP verb `GET`
  - Endpoint:- `/products/:id/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `A single Product`
    ```json
      {
        "id": 1,
        "name": "example1",
        "price": 235,
        "category": "electronics"
      },
    ```
- Create [token required]
  - HTTP verb `POST`
  - Endpoint:- `/products/`
  - Request Body
    ```json
      "name":"name",
      "price":20,
      "category":"category",
    ```
  - Response Body -- `The Created Product`
    ```json
      {
        "id": 1,
        "name": "name",
        "price": 20,
        "category": "category"
      },
    ```
- [OPTIONAL] Top 5 most popular products

  - HTTP verb `GET`
  - Endpoint:- `/products/top/five/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Top five products`
    ```json
    [
      {
        "id": 1,
        "name": "example1",
        "price": 235,
        "category": "electronics"
      },
      {
        "id": 2,
        "name": "example2",
        "price": 900,
        "category": "electronics"
      },
      {
        "id": 1,
        "name": "example3",
        "price": 235,
        "category": "electronics"
      },
      {
        "id": 2,
        "name": "example4",
        "price": 900,
        "category": "electronics"
      },
      {
        "id": 1,
        "name": "example5",
        "price": 235,
        "category": "electronics"
      }
    ]
    ```

- [OPTIONAL] Products by category (args: product category)
  - HTTP verb `GET`
  - Endpoint:- `/products/category/:category/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of products`
    ```json
    [
      {
        "id": 1,
        "name": "example1",
        "price": 235,
        "category": "electronics"
      },
      {
        "id": 2,
        "name": "example2",
        "price": 900,
        "category": "electronics"
      }
    ]
    ```

#### Users

- Index [token required]

  - HTTP verb `GET`
  - Endpoint:- `/users/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of users`
    ```json
    [
      {
        "id": 1,
        "email": "example1@gmail.com",
        "first_name": "name1",
        "last_name": "name2"
      },
      {
        "id": 2,
        "email": "example2@gmail.com",
        "first_name": "name3",
        "last_name": "name4"
      }
    ]
    ```

- Show [token required]
  - HTTP verb `GET`
  - Endpoint:- `/users/:id/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `A single user`
    ```json
        {
        "id": 1,
        "email": "example1@gmail.com",
        "first_name": "name1",
        "last_name": "name2"
      },
    ```
- Create N[token required]
  - HTTP verb `POST`
  - Endpoint:- `/users/`
  - Request Body
    ```json
      "email":"example@example.com",
      "first_name":"john",
      "last_name":"smith",
      "password":"password123"
    ```
  - Response Body -- `The Created user`
    ```json
      {
        "id": 1,
        "email":"example@example.com",
        "first_name":"john",
        "last_name":"smith",
        "password":"password123"
      },
    ```
- authentiacate
  - HTTP verb `POST`
  - Endpoint:- `/users/authentiacate`
  - Request Body
    ```json
      "email":"example@example.com",
      "password":"password123"
    ```
  - Response Body -- `The Created token`
    ```json
      {
        "<JWT TOKEN>"
      }
    ```

#### Orders

- Index [token required]
  - HTTP verb `GET`
  - Endpoint:- `/orders/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of orders`
    ```json
    [
      {
        "id": 1,
        "status": "open",
        "user_id": "3"
      },
      {
        "id": 2,
        "status": "close",
        "user_id": "2"
      }
    ]
    ```

- ShowProducts [token required]
  - HTTP verb `GET`
  - Endpoint:- `/orders/:id/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of products `
    ```json
    [
      {
        "name": "product1",
        "quantity": 5,
        "price": 235
      },
      {
        "name": "product2",
        "quantity": 3,
        "price": 615
      }
    ]
    ```
- Create N[token required]
  - HTTP verb `POST`
  - Endpoint:- `/orders/`
  - Request Body
    ```json
      "user_id": 1
    ```
  - Response Body -- `The Created order`
    ```json
      {
          "id": 1,
          "status": "open",
          "user_id": "1"
      },
    ```


- Current Order by user (args: user id)[token required]
  - HTTP verb `GET`
  - Endpoint:- `/orders/active/:userID/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of orders`
    ```json
    [
      {
        "id": 1,
        "status": "open",
        "user_id": "userID"
      },
      {
        "id": 2,
        "status": "open",
        "user_id": "userID"
      }
    ]
    ```
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
  - HTTP verb `GET`
  - Endpoint:- `/orders/close/:userID/`
  - Request Body
    ```json
      N/A
    ```
  - Response Body -- `Array of orders`
    ```json
    [
      {
        "id": 1,
        "status": "close",
        "user_id": "userID",
      },
      {
        "id": 2,
        "status": "close",
        "user_id": "userID"
      }
    ]
    ```
- addProduct: 
  - HTTP verb `POST`
  - Endpoint:- `/orders/:orderID/products/`
  - Request Body 
    ```json
      "productId" : 1
      "quantity" : 5
    ```
    - Response Body -- `The added products `
    ```json
    {
      "id": 1,
      "quantity": 5,
      "order_id": "orderID",
      "product_id": "1"
    }
    ```

## Data Shapes

### Product Schema

```sql
  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT(10) NOT NULL,
    category VARCHAR(100) NOT NULL
 );
```
### User Schema
```sql
  CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE,
      first_Name VARCHAR(100) NOT NULL,
      last_Name VARCHAR(100) NOT NULL,
      password text NOT NULL
  );
```
### Orders Schema
```sql
  CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(100) NOT NULL,
      user_id bigint REFERENCES users(id)
  );
```
### Ordered_products Schema 
```sql
  CREATE TABLE ordered_products(
      id SERIAL PRIMARY KEY,
      quantity INTEGER NOT NULL,
      order_id bigint REFERENCES orders(id),
      product_id bigint REFERENCES products(id)
  );
```