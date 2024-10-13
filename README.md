# About 

This eCommerce application is meticulously crafted to deliver an unparalleled online shopping experience for users seeking to purchase products effortlessly. It accommodates two primary user types: regular customers and administrators. Regular customers enjoy the convenience of exploring a diverse array of products, adding items to their shopping carts, and completing transactions securely through two flexible payment options: cash on delivery and credit card payments via Stripe. Administrators, on the other hand, possess the tools to manage product inventories, address customer inquiries, and streamline order processing, ensuring optimal operational efficiency.
The project's objective is to simplify the online shopping journey while providing robust features that enhance user satisfaction. With an intuitive interface, advanced product filtering capabilities, and secure payment processing, this application not only saves valuable time for customers but also empowers businesses to effectively manage their online sales and enhance their market presence.


## Features

 * User-Friendly Interface: Designed with an intuitive layout for easy navigation, enabling users to find products quickly.
 * Product Categories and Subcategories: Organized structure allowing users to browse products by category and subcategory for a more streamlined shopping experience.
 * Brand Listings: Users can explore products from various brands, enhancing their choice and flexibility.
 * Comprehensive Product Management: Admins can add, update, and remove products, ensuring that the inventory is always up-to-date.
 * Flexible Shopping Cart: Add, remove, and update product quantities in the cart.
   Save items for later in a Wishlist, allowing users to easily access products they are interested in without adding them to the cart.
   Order Management: Users can view their order history and track the status of their current orders.
 * Coupon System: Users can apply discount coupons at checkout for additional savings.
 * Sign In and Sign Up: Easy registration and login process for users
 * Email Confirmation: Users receive email verification to confirm their accounts.
 * Change Password: Users can change their passwords securely.
 * JWT Authentication: Ensures secure user authentication and authorization for accessing protected routes based on user roles (user and admin).
 * API Features : such as pagination, search, select fields and sort
 * Advanced Search and Filtering: Users can search for products and apply filters to find specific items based on criteria such as price, brand, and category.
 * File Uploads with Multer: Users can upload product images and other files easily through the application.
 * Payment Integration with Stripe: Secure payment processing for credit card transactions
 * Webhook functionality for handling payment events.
 * User Reviews: Customers can leave reviews and ratings for products, helping others make informed decisions.
 * Address Management: Users can save and manage multiple shipping addresses for a quicker checkout process.
 * Pagination: Efficiently displays products across multiple pages, improving load times and user experience.
 * Apply MergeParams.
 * Admin Dashboard: A comprehensive interface for admins to manage users, orders, products, and view analytics.

 
## Useing  

 * JavaScript.
 * Express.js.
 * DB ( MongoDB ).
 * ORM Mongoose.
 * Stripe: Payment gateway integrated for secure online payments.
 * User Authentication: JWT-based authentication.
 * Authorization: Role-based access control for both users and admins.
 * File Upload: Using Multer.
 * bcrypt.
 * Email Services: Integrated with Nodemailer for sending confirmation emails.
 * Payment Handling: Secure online payment integration with Stripe (supports webhook for payment events).
 * API Validation: Using Joi for validating API inputs.
 * dotenv.
 * Cors: Enabled for secure handling of API requests.
 * Slug Generation: Product slugs generated using Slugify for SEO-friendly URLs.






### Npm Modules 

```
$ npm i bcrypt
$ npm i cors
$ npm i dotenv
$ npm i express
$ npm i joi
$ npm i jsdoc
$ npm i jsonwebtoken
$ npm i mongoose
$ npm i multer
$ npm i nodemon
$ npm i slugify
$ npm i stripe
$ npm i uuid
```

### Collections

* User
* Category
* Subcategory
* Brand
* Product
* Order
* Cart
* Coupon
* Review

### API Endpoints
## User APIs : 

1. `POST /users` : Add a new user. This route includes middleware to check for email duplication and validate the input based on the provided schema.
2. `GET /users` : Retrieve all users.
3. `GET /users/:name : Retrieve a user by their name.
4. `PUT /users/:id` : Update a user's details by their ID.
5. `DELETE /users/:id : Delete a user by their ID.


## Category APIs

1. `POST /categories` : Add a new category. Requires authentication and allows file upload for the category image.
2. `GET /categories` : Retrieve all categories.
3. `GET /categories/` : Retrieve a category by its name.
4. `PUT /categories/` : Update a category's details by its ID. Requires authentication and allows file upload for the category image.
5. `DELETE /categories/` : Delete a category by its ID. Requires authentication.


##  APIs

1. Add Job 
2. Update Job
    - authorized with the role ( Company_HR )
3. Delete Job
    - authorized with the role ( Company_HR )
4. Get all Jobs with their company’s information.
5. Get all Jobs for a specific company.
    - send the company name in the query and get this company jobs.
6. Get all Jobs that match the following filters 
    - filter with workingTime , jobLocation , seniorityLevel and jobTitle,technicalSkills
    - one or more of them should applied   
7. Apply to Job
    - This API will add a new document in the application Collections with the new data
    - authorized with the role ( User )

#### Note: The APIs for subcategories and brands are structured similarly to the categories API, allowing for consistent functionality and streamlined development.


## Additional Documentation and Acknowledgments

* Project folder on server:
* Confluence link:
* etc...
