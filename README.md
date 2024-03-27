# Siallure E-Commerce Platform

Welcome to Siallure, your destination for handmade earrings! Siallure is an e-commerce platform built with React.js and Express.js, designed to offer users a seamless shopping experience for unique and stylish earrings crafted with care.

## Screenshots

![App Screenshot](src/assets/webpage-screenshot.jpg)

## Live Site

Check out the live site: [Siallure E-Commerce](https://e-commerce-tu1r.onrender.com/)

## Features

- **Persistent Shopping Cart**: Automatically generates a unique cart ID for users and stores it in a cookie, ensuring that cart contents persist across sessions.
- **Quantity Management**: Fetches product quantities on initial product fetch to prevent users from adding more items to the cart than available in stock.
- **Real-time Inventory Updates**: During checkout, makes backend requests to ensure that the quantities in the cart do not exceed the available stock, updating users accordingly.
- **Product Pages**: Provides detailed product pages with comprehensive information about each product, allowing users to make informed purchase decisions.
- **Product Filtering and Sorting**: Enables users to filter and sort products based on various criteria, enhancing the shopping experience.
- **Integrated Stripe Payment**: Supports secure payment processing via Stripe in test mode, providing a seamless checkout experience for users.
- **Contact Form with Validations**: Includes a contact form with validations powered by Nodemailer, allowing users to get in touch easily while ensuring data integrity.
- **FAQ Page**: Offers a dedicated FAQ page to address common questions and concerns, providing clarity and assistance to users.
- **Responsive Design**: Built with responsive design principles, ensuring optimal performance across devices of all sizes.

## Tech Stack

### Frontend Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Provides routing capabilities for single-page applications in React.
- **React Multi Carousel**: Component library for creating responsive carousels in React applications.
- **React Social Media Embed**: Allows embedding social media content into React applications.
- **Sass**: Preprocessor scripting language that is interpreted or compiled into CSS.

### Backend Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL2**: MySQL client for Node.js, enabling interaction with MySQL databases.
- **Nodemailer**: Module for Node.js applications to allow email sending.
- **Stripe**: Payment processing platform for online businesses, integrated into the backend for secure transactions.
- **Cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing) in Express applications.
- **Dotenv**: Module for loading environment variables from a .env file into process.env.
- **Nodemon**: Utility that monitors changes in the source code and automatically restarts the server.
