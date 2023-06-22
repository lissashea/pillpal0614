# Medication Tracker Frontend

This is the frontend application for the Medication Tracker project. It provides a user interface for managing medication data, including adding, editing, and deleting medications.

## Features

- User authentication: Sign up, sign in, and sign out functionalities.
- Profile page: View and manage medication data for the authenticated user.
- Add medication: Add new medications with dosage, description, and taken status.
- Edit medication: Modify existing medication details.
- Delete medication: Remove medications from the profile.
- Responsive design: The application is designed to work well on different screen sizes.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Router: Handles routing and navigation within the application.
- Axios: A promise-based HTTP client for making API requests.
- React Icons: Provides a collection of popular icons as React components.
- HTML and CSS: Markup and styling for the application.
- Testing Library: A testing framework for testing React components.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd react-auth-client`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open the application in your browser: `http://localhost:3000`

Make sure to also set up and run the backend server for full functionality.

`http://localhost:8000`

## Configuration

The frontend application requires the backend server to be running and accessible. By default, it assumes the backend server is running at `http://localhost:8000/api`. If your backend server is running on a different URL or port, you can update the `BASE_URL` constant in `src/services/apiConfig.js`.

Additionally, the application uses token-based authentication. The authentication token is stored in the browser's local storage. Please ensure that your browser supports local storage.

## Deployment

To deploy the application, you can follow the deployment instructions specific to your hosting platform. Here are some general steps:

1. Build the production-ready optimized bundle: `npm run build`
2. Deploy the contents of the `build` directory to your hosting environment.

## Contributing

Contributions are welcome! If you find any issues or would like to suggest enhancements, please submit an issue or a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
