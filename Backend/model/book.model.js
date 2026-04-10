import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    summary: String,
    genre: String,
    author: String,
    keyTakeaways: [String],
});
const Book = mongoose.model("Book", bookSchema);

export default Book;