## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [App requirements](#app-requirements)
* [Setup](#setup)
* 
## General info
Basic backend application in JavaScript for my Interpreted language applications subject.
## App requirements:

* Create a database that allows you to store data about goods and orders in the store. The database is to store the following data about individual entities in the system (all of them should be identifiable - identifier of any type):

** Product: name, description (both fields are text), unit price, unit weight (numbers with a comma), item category (one mandatory reference to the Category entity)
** Category: name (text type) - Categories can be considered predefined, i.e. no API is needed for adding / removing them, but the set of allowed categories should be in the database. Categories have a flat structure, so there are no "subcategories"
** Order: approval date (date, null allowed), order status (one obligatory reference to the Order Status entity) user name, email (both text types), telephone number (text type), list of ordered goods with the number of items of each item (number positive integers). You must add the appropriate tables in the database.
** Order status: name (text type) - predefined in the database statuses: NOT APPROVED, APPROVED, CANCELED, COMPLETED (names can be translated into English)

*In the server application, provide methods to enable the following database operations:

** Product: displaying a complete list, displaying one item (by identifier), adding an item, changing an item (any property except the identifier)
** Category: download the complete list
** Order: displaying a list of orders, displaying orders for a specific user name, displaying one item (by identifier), changing the order status (with validation of the correctness of the change, e.g. the canceled order cannot be processed), displaying orders according to the status
** Order Status: download a complete list

* In the server application, provide methods that enable all business logic methods to be executed over HTTP.

* Recommended API structure:
```
* Product:
GET app_url / products - returns all products
GET app_url / products / id - returns product data with a specific identifier
POST app_url / products - adds a product to the database (parameters in the request body)
PUT app_url / products / id - updates the product with a specific identifier, other product parameters in the request body. Or you can PUT app_url / products with all parameters in the body of the request.
* Category:
GET app_url / categories - returns all categories
Orders:
GET app_url / orders - returns all orders
POST app_url / orders - adds an order (parameters in the request body)
PUT app_url / orders / id / state - change of order status with the given identifier. Other variants are allowed, eg PUT app_url / orders / id with a new state in the request body.
GET app_url / orders / status / id - retrieve orders with a specific status
* Order Status:
GET app_url / status - returns all possible order statuses
```
* Implement error handling on the server side, in particular, handle the situations (it is recommended to send a response in the form of JSON + appropriate HTTP code):

** Product:
Attempted to add with negative price or weight, zero weight and price, blank description or name.
Attempting to change field values ​​to incorrect
Attempt to change field values ​​for a non-existent identifier
** Order:
Attempting to add an order with empty user fields
Attempting to add an order with incorrectly filled user fields (e.g. phone number contains letters)
Change of status after canceling an order
Attempting to add an order with items which IDs are not in the database
Attempt to add an order with negative, zero, or numbered item quantities
Changing the "back" status, e.g. from "COMPLETED" to "NOT APPROVED"
Attempting to update order status with a non-existent ID

* The messages should be informative, i.e. they should contain detailed information for the user about the reason for the problem with the operation.
