import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const getBook = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/book?page=${page}&limit=12&query=${query}`);
      // Based on our new backend, it returns an object with books array
      if (res.data && res.data.books) {
        setBook(res.data.books);
        setTotalPages(res.data.totalPages);
      } else {
        // Fallback for old API shape temporarily
        setBook(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    setPage(1); // Reset to first page on new search
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Search Bar */}
        <div className="mt-28 flex justify-center">
            <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md px-4">
                <input 
                    type="text" 
                    placeholder="Search by title or author..." 
                    className="input input-bordered w-full"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary bg-blue-500 border-none text-white hover:bg-blue-700">Search</button>
            </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.map((item) => (
            <Cards key={item._id || item.id} item={item} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 mb-12 flex justify-center gap-4 items-center">
            <button 
                className="btn btn-outline" 
                disabled={page <= 1} 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
                Previous
            </button>
            <span className="font-semibold">
                Page {page} of {totalPages || 1}
            </span>
            <button 
                className="btn btn-outline" 
                disabled={page >= totalPages} 
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
                Next
            </button>
        </div>
      </div>
    </>
  );
}

export default Course;
