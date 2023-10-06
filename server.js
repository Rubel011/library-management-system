const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swaggerConfig');
const { connection } = require('./configs/db');
const { successResponse, errorResponse } = require('./helpers/successAndError');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');
const borrowingRouter = require('./routes/borrowingRouter');
const recommendationRouter = require('./routes/recomandationRouter');

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for cors error
app.use(cors());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Home route
app.get("/", async (req, res) => {
    try {
        res.status(200).json(successResponse(200, "This is the home page running successfully", null));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
});


// all routes are here
app.use("/users",userRouter)

app.use("/books",bookRouter)

app.use("/borrow",borrowingRouter)

// app.use("/recommendations",recommendationRouter)

// Start the server
app.listen(port, async () => {
    try {
        // Establish database connection
        await connection;

        // Server listening message
        console.log({ message: `Server is listening on port ${port}` });
    } catch (error) {
        console.log(error.message);
    }
});
