
# developerNews Application

developerNews is a full-stack application built with Node.js, MySQL, ReactJS, and TypeScript. It manages and interacts with users, posts, comments, and likes.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Frontend Setup](#frontend-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with developerNews, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yw2006/developerNews.git
   cd developerNews
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, install the server-side dependencies:

   ```bash
   cd server
   npm install
   ```

   And the client-side dependencies:

   ```bash
   cd ../client
   npm install
   ```

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory with the following content:

```dotenv
ENV=development
PORT=3000
DB_URL=mysql://user:password@host:port/database
PASSWORD_SALT=your salt
JWT_SECRET=yourJWT
HOST=127.0.0.1
USER=root
PASSWORD=""
DATABASE=developer_news
DB_PORT=your port
```

Replace the placeholders with your actual database connection details.

## Usage

### Starting the Backend Server

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Start the backend server:

   ```bash
   npm start
   ```

The server will start listening on the port specified in the `.env` file.

### Starting the Frontend Client

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

   The React app will be accessible at `http://localhost:3000` by default.


## Frontend Setup

The client-side React application is built with TypeScript. You can develop and build it using the provided scripts:

- **Development**: `npm start`
- **Build**: `npm run build`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
