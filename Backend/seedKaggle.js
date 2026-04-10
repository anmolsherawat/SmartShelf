import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import csv from "csv-parser";
import Book from "./model/book.model.js";
import path from "path";

dotenv.config();

const URI = process.env.MongoDBURI || "mongodb://localhost:27017/bookStore";
const CSV_PATH = path.join(process.env.HOME || "/Users/anmolsherawat", "Downloads", "BooksDatasetClean.csv");

const runSeed = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB for Kaggle Import");
        
        await Book.deleteMany({});
        console.log("Cleared existing books to prepare for fresh import");

        const booksToInsert = [];
        let count = 0;
        const LIMIT = 500;

        console.log(`Starting parse of ${CSV_PATH}`);
        
        // CSV Headers: Title,Authors,Description,Category,Publisher,Price Starting With ($),Publish Date (Month),Publish Date (Year)
        fs.createReadStream(CSV_PATH)
          .pipe(csv())
          .on("data", (row) => {
              if (count >= LIMIT) return;
              
              if (row.Title) {
                  const priceStr = row['Price Starting With ($)'] || "15.00";
                  let priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
                  if (isNaN(priceNum)) priceNum = 15;

                  booksToInsert.push({
                      name: row.Title,
                      title: row.Title,
                      author: row.Authors ? row.Authors.replace('By ', '') : "Unknown",
                      price: priceNum,
                      category: row.Category ? row.Category.split(',')[0].trim() : "General",
                      genre: row.Category ? row.Category.replace(/,/g, ' -') : "General",
                      summary: row.Description || "No description available for this book.",
                      image: "https://picsum.photos/300/400?random=" + count,
                      keyTakeaways: []
                  });
                  count++;
              }
          })
          .on("end", async () => {
             if (booksToInsert.length > 0) {
                 try {
                     await Book.insertMany(booksToInsert);
                     console.log(`Successfully seeded ${booksToInsert.length} books from Kaggle dataset!`);
                     process.exit(0);
                 } catch (err) {
                     console.error("Insert error:", err);
                     process.exit(1);
                 }
             } else {
                 console.log("No books parsed.");
                 process.exit(0);
             }
          });

    } catch (err) {
        console.error("Failed to seed Kaggle DB:", err);
        process.exit(1);
    }
};

runSeed();
