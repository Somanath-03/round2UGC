// this is for creating a new post 
// which data is recorded and sent to the upload content api


"use client";
import React, { useState } from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting new post...");
    console.log("New post submitted:", { title, description, file });

    if (file) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch("/api/upload-content", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("New post inserted:", result.data);
        setStatus("New post created successfully.");
        window.location.href = "/";
      } else {
        const errorResult = await response.json();
        console.error("Error inserting new post:", errorResult.error);
        setStatus("Error inserting new post.");
      }
    } else {
      setStatus("Please select a file to upload.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#270338] to-black-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={logo}
              alt="Logo"
              width={224}
              height={120}
              className="my-10"
            />
          </a>
        </Link>
        <h2 className="text-2xl mb-4 text-black">New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">File</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-red-700 rounded"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-300 text-black font-bold rounded"
            >
              Submit
            </button>
          </div>
        </form>
        {status && (
          <div className="mt-4 p-2 bg-gray-100 text-black rounded">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
