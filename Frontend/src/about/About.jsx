import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative pt-32 pb-20 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-20 relative z-10 pt-10">
          <div className="space-y-10 text-center md:text-left">
             
             <h1 className="text-4xl md:text-6xl font-black text-blue-600 dark:text-blue-500 leading-tight">
               Your Smart Gateway to the World of Books.
             </h1>
             <p className="text-xl md:text-2xl text-black dark:text-gray-200 font-medium leading-relaxed pt-2">
               At SmartShelf, our mission is simple: to help you learn something new every day. We offer a carefully curated collection of novels, bestsellers, and timeless classics, all wrapped in a seamless and engaging digital experience.
             </p>

             <div className="pt-8 mt-12 border-t-2 border-blue-200 dark:border-gray-700">
               <h2 className="text-3xl md:text-4xl font-extrabold flex flex-col md:flex-row items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Powered by AI
               </h2>
               <p className="mt-6 text-lg md:text-xl text-black dark:text-gray-200 font-medium leading-relaxed">
                 What sets us apart? We bring the future of reading to your screen. With our built-in AI assistant, you can get instant, deep-dive summaries and insights for any book in our library. No more reading endless reviews—just smart, concise information to help you pick your perfect read.
               </p>
             </div>

             <div className="mt-16 pt-8">
               <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 font-semibold leading-relaxed italic border-l-4 border-blue-500 pl-6 text-left">
                 Created and designed by Anmol, SmartShelf is where your next great story begins. Explore our collection and start your journey today.
               </p>
             </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default About;
