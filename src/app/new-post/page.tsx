"use client";
import React, { useState } from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";

async function uploadFile(
  file: File,
  setStatus: React.Dispatch<React.SetStateAction<string>>
): Promise<string | null> {
  setStatus("Uploading file...");
  const { data, error } = await supabase.storage
    .from("ImgAndVid")
    .upload(`public/${file.name}`, file);
  if (error) {
    console.log(error);
    setStatus("File upload failed.");
    return null;
  } else {
    console.log(data);
    setStatus("File uploaded successfully.");
    return data.path; // Return the file path
  }
}

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
      const filePath = await uploadFile(file, setStatus);
      if (filePath) {
        const { data, error } = await supabase.from("Content").insert([
          {
            title,
            description,
            file_url:
              "https://ujbncvgdlulldcjkwcbk.supabase.co/storage/v1/object/public/ImgAndVid/" +
              filePath,
          },
        ]);
        if (error) {
          console.error("Error inserting new post:", error);
          setStatus("Error inserting new post.");
        } else {
          console.log("New post inserted:", data);
          setStatus("New post created successfully.");
          window.location.href = "/";
        }
      }
    } else {
      setStatus("Please select a file to upload.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#270338] to-black-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <Link href="/">
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
