
User Stories -
    Backend - 

        Implement POST API creating User #8
            We need to implement a POST API endpoint to create a new user in our application. This endpoint should accept user details in the request body, hash the user's password.
            Endpoint: POST /users

        Swagger Documentation Integration for Gin Framework #23
            We need to integrate Swagger documentation into our Gin-based API to provide comprehensive and interactive API documentation. This will help developers understand the API endpoints, request/response structures, and expected behaviors without needing to dig into the codebase.

            Key Requirements:
                Swagger UI Integration: Set up Swagger UI to serve interactive API documentation.
                Annotations: Add Swagger annotations to the Gin routes to generate accurate API documentation.
                Automatic Documentation Generation: Ensure that the Swagger documentation is automatically generated and updated based on the codebase.
                Endpoint Details: Each endpoint should include details such as:
                HTTP method (GET, POST, PUT, DELETE, etc.)
                Path parameters
                Query parameters
                Request body (if applicable)
                Response body and status codes
                Example requests and responses
                Error Responses: Document common error responses and their meanings.
                Security Definitions: Include details about authentication and authorization mechanisms if applicable.
            Expected Outcome:
                A fully functional Swagger UI accessible at a specific endpoint (e.g., /swagger/index.html).
                Comprehensive and up-to-date API documentation that reflects the current state of the API.
                Easy-to-understand examples and descriptions for each endpoint.
            Additional Notes:
                Consider using a library like swaggo/swag to simplify the integration process.
                Ensure that the Swagger documentation is only available in development and staging environments, and not in production, if necessary.

        Create Model for User #12
            Created a model with the following fields:
                Username
                Email
                Password
                Volunteer
                Voluntee
                Category

        Build PostgreSQL Database Connection #11
            Implement the database connection setup for the application using PostgreSQL and GORM. Ensure the connection is established and the necessary tables are created if they do not exist.
            Establish a connection to the PostgreSQL database.
            Use environment variables for database credentials and connection details.
        
        Validate already existing User #10
            Implement validation to check if a user with the same username or email already exists before creating a new user. Also, to check at the login if the user exists or not.
            Endpoint: POST /users/read/:username

        Implement DELETE API for Deleting User #9
            We need to implement a DELETE API endpoint to delete an existing user from our application. This endpoint should accept the username as a URL parameter. Log the data that needs to be removed on the console screen.

            Acceptance Criteria:

                Endpoint: DELETE /users/:username
                URL Parameter: username(string, required)
        
        Implement POST API creating User #8
            We need to implement a POST API endpoint to create a new user in our application. This endpoint should accept user details in the request body, hash the user's password.
            Endpoint: POST /users

    FrontEnd:

        Configure TypeScript with Material UI in Existing Vite Project #1
            Migrate the codebase from JavaScript to TypeScript.

            Set up Material UI with a custom theme and global styling.

            Establish a structured folder system for TypeScript and Material UI components.

            Configure linting (ESLint) and formatting (Prettier) for TypeScript compatibility.
        
        Implement Basic Routing #2
            Install React Router DOM
            Create routes for:
            Homepage
            Volunteer Dashboard
            Organization Listings
            Profile Pages (placeholder)
            Add navigation guards for future authentication
        

        Build Basic Profile Page Layout #6
            Volunteer profile:
            Personal info section
            Skills showcase
            Participation history
            Organization profile:
            Mission statement
            Ongoing opportunities
            Contact info
        
        Implement User Login Page for Frontend #20
            Develop a login page to allow registered users to securely access their accounts.
            Requirements:

                UI Components:

                    Email input field.
                    Password input field (masked).
                    "Login" button.
                    "Forgot Password?" link (optional but recommended).
                    Link to the registration page for new users.

                Functionality:

                    Validate email format (e.g., user@domain.com).
                    Redirect to a dashboard/homepage on successful login.
                    Display generic error messages for invalid credentials (e.g., "Invalid email or password").

        Develop User Registration Page with Validation #21
            Build a registration page to allow new users to create accounts.

            Requirements:

                UI Components:

                    Email input field.
                    Password and Confirm Password fields (both masked).
                    "Sign Up" button.
                    Link to the login page for existing users.
                Functionality:

                    Validate email format and check for duplicates.
                    Enforce password strength rules (e.g., 8+ characters, 1 number, 1 symbol).
                    Ensure "Password" and "Confirm Password" fields match.
                On success:
                    Redirect to login page or auto-login the user.

        Feat: Implemented NavBar with search and togglebar(Fixes #3)
            Implemented a NavBar with placeholder for search and a toggleBar for theme. Need to implement the wrapper for themes
        
        Fix the padding/margin Issues on home page #48
            Currently the home page has extra margin around the body element.

What issues your team planned to address and the ones were successfully complete ?

    Below are the issue are team planned to address and completed successfully -

        Fix the padding/margin Issues on home page

        Add Hero Section to Landing page

        Implement User Profile Management Pages for Updating and Deleting Account Information

        Add Swagger Annotations to Document API Endpoints

        Add go.mod, go.sum, and README.md Files to Initialize the Project

        Implement User Updating Endpoint API

        As a User, I Want to Update or Delete My Account Details So I Can Maintain Control Over My Information

        As a Developer, I want to establish the project’s technical foundation so the team can build features efficiently and maintain consistency.

        Develop User Registration Page with Validation

        Implement User Login Page for Frontend

        As a Guest User, I want to register for an account or log in to an existing one so I can securely access personalized features.

        Update CODEOWNERS to Properly Assign Ownership for Entire backend Directory

        Create Model for User

        Build PostgreSQL Database Connection

        Validate already existing User

        Implement DELETE API for Deleting User

        Implement POST API creating User

        Build Basic Profile Page Layout

        Create Filter Bar for Opportunities

        Implement Opportunity Card Component

        Navigation Bar Component

        Implement Basic Routing

        Configure TypeScript with Material UI in Existing Vite Project


Which ones didn't and why?


<video src="/assets/backend.mp4" controls title="Backend Demo">
  Your browser does not support the video tag.
</video>
    
