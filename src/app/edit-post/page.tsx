"use client";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

const EditPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [initialFileUrl, setInitialFileUrl] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/view-post?id=${id}`);
          if (response.ok) {
            const result = await response.json();
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
            setInitialFileUrl(post.file_url);
          } else {
            const errorResult = await response.json();
            console.error("Error fetching post:", errorResult.error);
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };

      fetchPost();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Updating post...");
    console.log("Post update submitted:", { title, description, file });

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("file_url", initialFileUrl);
    }

    const response = await fetch(`/api/edit-post?id=${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Post updated successfully:", result.data);
      setStatus("Post updated successfully.");
      window.location.href = "/";
    } else {
      const errorResult = await response.json();
      console.error("Error updating post:", errorResult.error);
      setStatus("Error updating post.");
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
        <h2 className="text-2xl mb-4 text-black">Edit Post</h2>
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
            {initialFileUrl && !file && (
              <div className="mt-2">
                <a
                  href={initialFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View current file
                </a>
              </div>
            )}
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
              Update
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

export default EditPost;
