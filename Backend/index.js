import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

const connectDB = async() => {
    if (!URI) {
        console.log("MongoDBURI is not set. Running API without database connection.");
        return;
    }
    try {
        await mongoose.connect(URI);
    } catch (error) {
        console.log("Initial MongoDB connection failed:", error.message);
        console.log("API is still running. Database-backed routes will return 503 until DB is available.");
    }
};

app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: "Database unavailable. Please try again shortly." });
    }
    next();
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, async() => {
    await connectDB();
    console.log(`Server is listening on port ${PORT}`);
});