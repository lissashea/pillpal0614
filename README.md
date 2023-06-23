# Medication Tracker Backend

This is the backend component of the Medication Tracker application. It provides the necessary API endpoints for user authentication, medication management, and profile data retrieval.

## Technologies Used

- Django: a high-level Python web framework used for backend development
- Django REST framework: a powerful and flexible toolkit for building Web APIs
- JWT (JSON Web Tokens): a standard for securely transmitting information between parties as a JSON object
- PostgreSQL: a powerful, open-source relational database system

## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/lissashea/pillpal0614.git

2. Create a virtual environment and activate it:

3. pip install -r requirements.txt

4. Update the database configuration in the settings.py file. 

5. Apply the database migrations:

  ```python manage.py migrate

6. Start development server
    ```python manage.py runserver


The backend server should now be running at http://localhost:8000/api/.

API Endpoints
The backend provides the following API endpoints:

POST /api/register/: Register a new user.
POST /api/login/: Log in an existing user and receive an access token.
GET /api/profile/: Retrieve the user's profile data and associated medications.
POST /api/profile/: Add a new medication to the user's profile.
PATCH /api/profile/<medication_id>/: Update a medication's information.
DELETE /api/medications/<medication_id>/: Delete a medication.
Authentication
User authentication is implemented using JWT (JSON Web Tokens). When a user logs in, they receive an access token that must be included in the request headers for authenticated endpoints.

To include the access token in the request headers:

Include the Authorization header with the value Bearer <access_token>.

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...




