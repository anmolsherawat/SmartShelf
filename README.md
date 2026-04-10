# SmartShelf

SmartShelf is a beautifully designed, AI-powered bookstore application built on the MERN stack. It features a seamless and deeply engaging digital experience that helps users discover books, bestsellers, and timeless classics.

## Features
- **AI-Powered Insights**: Instantly generate deep-dive book summaries and key takeaways using the Google Gemini API.
- **Dynamic Explore Section**: Browse the catalog, filter titles, and view detailed cards.
- **Authentication**: Secure local session state and route protection using JSON Web Tokens (JWT).
- **Beautiful UI**: Built completely with React, TailwindCSS, and DaisyUI. Responsive, smooth, and elegantly styled.

## Project Structure
- `/Frontend`: A React (Vite) single-page application.
- `/Backend`: An Express/Node API Server orchestrating MongoDB models and Google GenAI APIs.

## Environment Variables
Create a `.env` file in the Backend directory:
```
PORT=4001
MongoDBURI=mongodb://localhost:27017/bookStore
GEMINI_API_KEY=YOUR_GEMINI_KEY
JWT_SECRET=YOUR_JWT_SECRET
```

## Running Locally
1. Start the database: Ensure MongoDB is running locally on port 27017.
2. Start the backend: 
   ```bash
   cd Backend
   npm install
   npm start
   ```
3. Start the frontend:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## Design Aesthetics
SmartShelf uses a cohesive signature blue color palette (`blue-500` through `blue-700`) paired with sophisticated dark modes and beautiful frosted glass effects over immersive high-resolution background imagery.
