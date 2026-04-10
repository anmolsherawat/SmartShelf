import Book from "../model/book.model.js";
import { GoogleGenAI } from "@google/genai";

export const getBook = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const query = req.query.query || "";
        
        const searchCriteria = query 
            ? { 
                $or: [
                    { title: { $regex: query, $options: "i" } }, 
                    { author: { $regex: query, $options: "i" } }
                ] 
              } 
            : {};

        const totalBooks = await Book.countDocuments(searchCriteria);
        const books = await Book.find(searchCriteria)
                                .skip((page - 1) * limit)
                                .limit(limit);
                                
        res.status(200).json({
            books,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            totalItems: totalBooks
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const getBookSummary = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        // Check if summary from AI generation already exists (and is substantial)
        if (book.summary && book.summary.length > 50 && book.summary !== "No description available for this book.") {
            return res.status(200).json({ summary: book.summary });
        }
        
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Write a concise 3-4 sentence engaging summary for the book "${book.title || book.name}" by ${book.author || 'unknown author'}. Do not include markdown tags.`;
        
        const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: prompt,
        });
        
        const summaryText = response.text;
        
        // Update DB so we don't fetch it again
        book.summary = summaryText;
        await book.save();
        
        res.status(200).json({ summary: summaryText });
    } catch (error) {
         console.log("Error generating summary: ", error);
         res.status(500).json({ message: "Error generating summary", error: error.message });
    }
};

export const generateAndAddBook = async (req, res) => {
    try {
        const { title, name, price, category, image } = req.body;
        const bookTitle = title || name;

        if (!bookTitle) {
            return res.status(400).json({ message: "Book title is required" });
        }

        // Initialize Gemini API
        // Fallback to a placeholder API key if missing (in real app, must use process.env.GEMINI_API_KEY)
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "PLACEHOLDER_KEY" });

        const prompt = `Provide the following details for the book titled "${bookTitle}" in JSON format strictly.
{
  "summary": "A brief summary of the book.",
  "genre": "The main genre of the book.",
  "author": "The author of the book.",
  "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3"]
}
Do not return any markdown tags like \`\`\`json. Return only the raw JSON.`;

        let generatedData = { summary: "", genre: "", author: "", keyTakeaways: [] };

        if (!process.env.GEMINI_API_KEY) {
             console.log("GEMINI_API_KEY missing, using mock data for " + bookTitle);
             generatedData = {
                 summary: "This is a mock summary because Gemini API key is missing.",
                 genre: "Mock Genre",
                 author: "Mock Author",
                 keyTakeaways: ["Mock takeaway 1", "Mock takeaway 2"]
             }
        } else {
             const response = await ai.models.generateContent({
                 model: 'gemini-2.5-flash',
                 contents: prompt,
                 config: {
                    responseMimeType: "application/json"
                 }
             });
             const textResponse = response.text;
             try {
                generatedData = JSON.parse(textResponse);
             } catch (err) {
                console.log("Failed to parse Gemini response as JSON", textResponse);
             }
        }

        const newBook = new Book({
            name: name || bookTitle,
            title: bookTitle,
            price: price || 0,
            category: category || generatedData.genre || "Unknown",
            image: image || "https://picsum.photos/200/300", // placeholder image
            summary: generatedData.summary,
            genre: generatedData.genre,
            author: generatedData.author,
            keyTakeaways: generatedData.keyTakeaways
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to generate book data", error: error.message });
    }
};