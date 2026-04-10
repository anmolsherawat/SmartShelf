import React, { useState } from "react";
import axios from "axios";
import banner from "../../public/Banner.png";

function Banner() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedBook, setGeneratedBook] = useState(null);

  const handleSearch = async (e) => {
      e.preventDefault();
      if (!title) return;
      
      try {
          setLoading(true);
          setGeneratedBook(null);
          const res = await axios.post("http://localhost:4001/book/generate", { title });
          if (res.data) {
              setGeneratedBook(res.data);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };
  return (
    <>
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative pt-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="max-w-screen-2xl container mx-auto px-4 z-10 text-white relative h-full pb-20 mt-10">
            <div className="max-w-2xl mx-auto text-center space-y-8 mt-10">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Hello, welcome. Learn something{" "}
                  <span className="text-blue-500">new every day.</span>
                </h1>
                <p className="text-lg md:text-2xl text-gray-200">
                  Discover a world of books at your fingertips. Explore a wide
                  collection of novels, bestsellers, and timeless classics.
                </p>
                <form onSubmit={handleSearch} className="flex flex-col gap-4 mt-8 bg-base-100 p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-10 border border-blue-500/30">
                  <label className="input input-bordered flex items-center gap-2 border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 text-black dark:text-white bg-base-100 relative z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Ask AI for any book summary or details..." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                  </label>
                  <div>
                      <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-600 border-none w-full text-lg shadow-lg text-white" disabled={loading}>
                         {loading ? <span className="loading loading-spinner"></span> : "Generate AI Insights"}
                      </button>
                  </div>
                </form>

                {generatedBook && (
                   <div className="mt-8 p-6 bg-base-100 rounded-xl shadow-2xl border-l-4 border-blue-500 text-left text-black dark:text-white transition-all duration-300">
                       <h3 className="text-2xl font-bold">{generatedBook.title}</h3>
                       <p className="text-sm font-semibold text-gray-500 mt-1">
                          By <span className="text-base-content">{generatedBook.author}</span> • <span className="badge badge-sm badge-outline">{generatedBook.genre}</span>
                       </p>
                       <p className="text-sm mt-4 leading-relaxed opacity-90">{generatedBook.summary}</p>
                       
                       {generatedBook.keyTakeaways && generatedBook.keyTakeaways.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-base-300">
                             <strong className="text-xs uppercase tracking-wider text-blue-500">Key Takeaways</strong>
                             <ul className="list-disc list-inside text-sm mt-2 opacity-80 space-y-1">
                                 {generatedBook.keyTakeaways.map((item, index) => <li key={index}>{item}</li>)}
                             </ul>
                          </div>
                       )}
                   </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
