import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI || "mongodb://localhost:27017/bookStore";

const seedBooks = [
    {
        name: "Clean Code",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        price: 29.99,
        category: "Programming",
        image: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
        summary: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
        genre: "Computer Science",
        author: "Robert C. Martin",
        keyTakeaways: ["Write code that is easy to read and understand.", "Name variables purposefully.", "Functions should do one thing."]
    },
    {
        name: "Atomic Habits",
        title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        price: 19.95,
        category: "Self-Help",
        image: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        summary: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
        genre: "Self Development",
        author: "James Clear",
        keyTakeaways: ["Habits are the compound interest of self-improvement.", "Focus on systems instead of goals.", "Make it obvious, attractive, easy, and satisfying."]
    },
    {
        name: "The Pragmatic Programmer",
        title: "The Pragmatic Programmer: Your Journey To Mastery",
        price: 35.00,
        category: "Programming",
        image: "https://m.media-amazon.com/images/I/51yaxPX4BFL._SX396_BO1,204,203,200_.jpg",
        summary: "The Pragmatic Programmer is one of those rare tech books you'll read, re-read, and read again over the years.",
        genre: "Computer Science",
        author: "David Thomas, Andrew Hunt",
        keyTakeaways: ["Care about your craft.", "Think! About your work.", "Provide options, don't make lame excuses."]
    }
];

const run = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
        
        // Clear existing to avoid duplicates if they've run it manually, or just insert new ones
        await Book.deleteMany({});
        console.log("Cleared old books");

        await Book.insertMany(seedBooks);
        console.log("Successfully seeded database with sample books!");
        
        process.exit(0);
    } catch (err) {
        console.error("Failed to seed database:", err);
        process.exit(1);
    }
};

run();
