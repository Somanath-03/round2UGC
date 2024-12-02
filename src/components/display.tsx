// used to filter content and data is recieved from the top layer instead of api calls

"use client";
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const Display: React.FC<{ info: ContentInfo[] }> = ({ info }) => {
  const [input, setInput] = useState("");

  const handleClear = () => {
    setInput("");
  };

  const filteredInfo = info.filter((content) =>
    content.title.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center border border-gray-300 rounded-md p-2 mt-20 m-3">
        <Search className="mr-2" />
        <input
          type="text"
          placeholder="Search Content..."
          value={input}
          className="border-none outline-none flex-grow border-3 text-white rounded-md bg-transparent"
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <button onClick={handleClear} className="ml-2">
            <X className="text-gray-500" />
          </button>
        )}
      </div>
      <div className="ml-4 text-white text-left">
        {filteredInfo.map((content) => (
          <Link
            key={content.id}
            href={`/view-post?id=${content.id}`}
            className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600"
          >
            {content.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Display;
