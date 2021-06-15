# ecommerce-server
API yang berisikan endpoint yang akan dihit oleh CMS dan customer web

## RESTful endpoints
### POST /register
> Post/Create an account

_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<your-email>",
  "password": "<your-password>",
  "fullName": "<your-fullName>"
}
```
_Response (201)_
```
{
  "id": "<your-id>",
  "fullName": "<your-fullName>".
  "email": "<your-email>",
  "role": "<your-role>"
}
```
_Response (500)_
```
{
  "message": "<err.message>"
}
```

### POST /logincust
> Post login to an account
_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<your-email>",
  "password": "<your-password>",
}
```
_Response (200)_
```
{
  "access_token": ""<your access token>"",
}
```
_Response (401)_
```
{
  "message": "Invalid email/password"
}
```
_Response (500)_
```
{
  "message": "<err.message>"
}
```
### POST /loginadmin
> Post login to an account
_Request Header_
```
not needed
```
_Request Body_
```
{
  "email": "<your-email>",
  "password": "<your-password>",
}
```
_Response (200)_
```
{
  "access_token": ""<your access token>"",
}
```
_Response (401)_
```
{
  "message": "Invalid email/password"
}
```
_Response (500)_
```
{
  "message": "<err.message>"
}
```

### POST /googlelogin
> Post login to a googleaccount
_Request Header_
```
not needed
```
_Request Body_
```
{
  "id_token": "<your id_token>"
}
```
_Response (200)_
```
{
  "access_token": "<your access token>",
}
```
_Response (500)_
```
{
  "message": "<err.message>"
}
```
### GET /products
> Get all products
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### GET /products/:id
> Get product by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
id=[integer]
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### POST /products
> Post/create product 
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>"
}
```
_Response (200)_
```
{
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Validation Error)_
```
[
  "<returned error message>"
]
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### PUT /products/:id
> Put/replace products by id
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Params_
```
id=[integer]
```
_Request Body_
```
{
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>"
}
```
_Response (200)_
```
{
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Validation Error)_
```
[
  "<returned error message>"
]
```
_Response (404 - not found)_
```
{
  "message": "not found"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### PATCH /product/:id
> Patch/modify product by id
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Params_
```
id=[integer]
```
_Request Body_
```
{
    "stock": "<product's stock>"
}
```
_Response (200)_
```
{
    "id": "<product's-id>",
    "name": "<product's name>",
    "category": "<product's category>",
    "image_url": "<product's image_url>",
    "price": "<product's price>",
    "stock": "<product's stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Validation Error)_
```
[
  "<returned error message>"
]
```
_Response (404 - not found)_
```
{
  "message": "not found"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### DELETE /product/:id
> Delete product by id
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Params_
```
id=[integer]
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
  "message": "product success to delete"
}
```
_Response (404 - not found)_
```
{
  "message": "not found"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### GET /carts
> Get all cart items
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": "<cart's-id>",
    "ProductId": "<cartItem ProductId>",
    "UserId": "<cartItem UserId>",
    "quantity": "<cartItem quantity>",
    "status": "<cartItem status>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": "<cart's-id>",
    "ProductId": "<cartItem ProductId>",
    "UserId": "<cartItem UserId>",
    "quantity": "<cartItem quantity>",
    "status": "<cartItem status>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### POST /carts
> add Carts 
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "ProductId": "<cartItem ProductId>",
    "quantity": "<cartItem quantity>"
}
```
_Response (200)_
```
{
    "message": "successfully added to cart"
}
```
_Response (400 - Validation Error)_
```
[
  "<returned error message>"
]
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### PATCH /carts
> Patch/modify Cart Item
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
not needed
```
_Request Body_
```
{
    "ProductId": "<cartItem ProductId>",
    "quantity": "<cartItem quantity>"
}
```
_Response (200)_
```
{
    "id": "<cart's-id>",
    "ProductId": "<cartItem ProductId>",
    "UserId": "<cartItem UserId>",
    "quantity": "<cartItem quantity>",
    "status": "<cartItem status>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (400 - Validation Error)_
```
[
  "<returned error message>"
]
```
_Response (404 - not found)_
```
{
  "message": "not found"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### PATCH /carts
> Checkout
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
not needed
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "message": "Your carts has been checkedout"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```

### DELETE /carts
> Delete cart item
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
not needed
```
_Request Body_
```
{
  "ProductId": "<cartItem ProductId>"
}
```
_Response (200)_
```
{
  "message": "Item has successfully deleted"
}
```
_Response (404 - not found)_
```
{
  "message": "not found"
}
```
_Response (500 - Kesalahan server)_
```
{
  "message": "<err.message>"
}
```