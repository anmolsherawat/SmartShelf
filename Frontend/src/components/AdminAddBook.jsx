import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminAddBook() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedBook, setGeneratedBook] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
        toast.error("Book title is required");
        return;
    }

    try {
      setLoading(true);
      setGeneratedBook(null);
      // Assuming backend is running on localhost:4001 based on .env
      const res = await axios.post("http://localhost:4001/book/generate", {
        title,
      });

      if (res.data) {
        toast.success("Book generated and added successfully!");
        setGeneratedBook(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating book data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto mt-20 px-4 mb-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">
        Admin: Add Book via AI
      </h1>
      
      <div className="bg-base-200 p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="label">
              <span className="label-text text-lg font-semibold">Book Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter a known book title (e.g., '1984', 'Atomic Habits')"
              className="input input-bordered w-full text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary text-white text-lg h-auto py-3"
            disabled={loading}
          >
            {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Generating...
                </>
            ) : "Generate & Save Book"}
          </button>
        </form>

        {generatedBook && (
          <div className="mt-10 p-6 bg-base-100 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-emerald-500">Generation Result</h2>
            <div className="flex gap-4 mb-4">
               {generatedBook.image && (
                   <img src={generatedBook.image} alt={generatedBook.title} className="w-24 h-36 object-cover rounded shadow" />
               )}
               <div>
                   <h3 className="text-xl font-bold">{generatedBook.title}</h3>
                   <p className="text-gray-500 font-semibold">{generatedBook.author}</p>
                   <div className="badge badge-secondary mt-2">{generatedBook.genre}</div>
               </div>
            </div>
            
            <div className="mt-4">
                <h4 className="font-bold text-lg">Summary</h4>
                <p className="text-sm mt-1 mb-4 leading-relaxed">{generatedBook.summary}</p>
                
                <h4 className="font-bold text-lg">Key Takeaways</h4>
                <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    {generatedBook.keyTakeaways?.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                    ))}
                </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAddBook;
