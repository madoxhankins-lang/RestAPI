# Assignment: Develop and Test a REST API

## Introduction

In this assignment, we will create a CRUD (Create, Read, Update, Delete) API using TypeScript, Express, Zod, and Swagger. This application demonstrates how to interact with an in-memory data store while leveraging validation, structured error handling, and automated documentation with Swagger. By the end of this assignment, you’ll have a fully functional API that supports CRUD operations, is developer-friendly, and can be tested using Postman.

----

## **Working with Dev Container**

To complete this assignment in a reliable and fully configured environment, please refer to the instructions in the file: **`README-devcontainer.md`**. This guide walks you through opening the assignment in **Visual Studio Code** using a **Dev Container**, which automatically installs all necessary Python libraries and tools. Following that setup ensures that the notebook runs smoothly without manual configuration or missing dependencies. Make sure to open the **main assignment folder** in VS Code and follow the steps outlined in the Dev Container guide before starting the notebook.

----

## Starter Files

The initial code is available inside the `start` folder under the `code` folder associated with this assignment.

---

## Requirements

We'll be working with TypeScript, Express, Zod, and Swagger to develop our CRUD API. Here's what we need to accomplish:

### Set Up the Development Environment

We need to:

- Install **Node.js** (v18 or later) and **npm** (v9 or later) or **yarn**.  
- Install **Postman** for testing API endpoints.  

### Build the Core Features

We need to implement the following functionalities:

1. **Project Initialization:**  
   
   - Scaffold a new Node.js project with TypeScript support.  
   - Ensure all necessary dependencies are installed, including TypeScript type definitions.  

2. **Validation with Zod:**  
   
   - Define validation schemas for creating and updating products using Zod.  
   - Validate incoming requests and handle errors gracefully.  

3. **CRUD Operations Implementation:**  
   
   - Create API routes (`GET`, `POST`, `PUT`, `DELETE`) in the `src/routes/product.routes.ts` file.  
   - Use an in-memory array to simulate a database for storing products.  

4. **API Documentation with Swagger:**  
   
   - Generate and serve Swagger API documentation.  
   - Annotate API routes with OpenAPI specifications for automated documentation.  

5. **Error Handling:**  
   
   - Implement structured error handling using custom error classes.  
   - Ensure consistent error responses for invalid inputs and missing resources.  

6. **API Testing:**  
   
   - Test the API endpoints using Postman.  
   - Verify that the API handles valid and invalid inputs correctly.  

---

## Deliverables

The deliverable of this assignment is a working CRUD API that meets all the requirements above. We need to submit:

- The public GitHub repository containing the source code.  
- Screenshots showing:  
  - The API responses for each CRUD operation tested in Postman.  
  - The Swagger API documentation running locally.  
- A brief README file explaining how to set up and run the app locally.

---

## Conclusion

This assignment provides a hands-on opportunity to build a fully functional CRUD API using modern technologies like TypeScript, Express, Zod, and Swagger. By following the steps outlined, you will gain practical experience in setting up a development environment, implementing database-driven API endpoints, testing your application, and documenting it effectively. This project not only reinforces your understanding of backend development but also equips you with essential skills for building scalable, real-world applications.
