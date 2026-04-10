import React, { useState } from "react";
import axios from "axios";

function Cards({ item }) {
  const [summary, setSummary] = useState(item.summary && item.summary !== "No description available for this book." ? item.summary : "");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const fetchSummary = async () => {
      // If we already have a real summary, just toggle display
      if (summary) {
          setShowSummary(!showSummary);
          return;
      }
      
      try {
          setLoading(true);
          setShowSummary(true); // Open panel to show loading state
          const res = await axios.get(`http://localhost:4001/book/summarize/${item._id || item.id}`);
          if (res.data && res.data.summary) {
              setSummary(res.data.summary);
          }
      } catch (err) {
          console.error(err);
          const errorMsg = err.response?.data?.error?.toString() || "";
          if (errorMsg.includes("429") || err.response?.status === 429) {
              setSummary("AI Rate limit reached! Please try again in a minute.");
          } else {
              setSummary("Failed to connect to AI server. Please try again.");
          }
      } finally {
          setLoading(false);
      }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3 h-full">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border h-full flex flex-col">
          <figure className="h-64 overflow-hidden shrink-0">
            <img src={item.image} alt={item.name || "Book cover"} className="w-full h-full object-cover" />
          </figure>
          <div className="card-body flex flex-col flex-grow">
            <h2 className="card-title text-lg line-clamp-2" title={item.name}>
              {item.name}
            </h2>
            <p className="text-sm font-medium text-gray-500">By {item.author || "Unknown Author"}</p>
            <div className="card-actions justify-between items-center mt-auto pt-4">
              <div className="badge badge-outline">${item.price}</div>
              <button 
                className="btn btn-sm btn-primary bg-blue-500 border-none hover:bg-blue-600 text-white shadow-sm"
                onClick={fetchSummary}
                disabled={loading}
              >
                AI Summary
              </button>
            </div>
            
            {showSummary && (
                <div className="mt-4 p-3 bg-base-200 rounded-md text-sm border-l-2 border-blue-500">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="loading loading-spinner loading-xs"></span>
                            Generating magically...
                        </div>
                    ) : (
                        <p>{summary}</p>
                    )}
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
