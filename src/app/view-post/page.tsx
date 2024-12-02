"use client";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const ViewPost: React.FC = () => {
  const [post, setPost] = useState<ContentInfo | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/view-post?id=${id}`);
          if (response.ok) {
            const result = await response.json();
            setPost(result.data);
          } else {
            const errorResult = await response.json();
            console.error("Error fetching post:", errorResult.error);
            setStatus("Error fetching post.");
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
          setStatus("Failed to fetch post.");
        }
      };

      fetchPost();
    }
  }, []);

  if (!post) {
    return <div>Loading... {status}</div>;
  }

  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-r from-[#270338] to-black-400">
      <div className="bg-white m-[5%] p-6 w-[80%] rounded-lg shadow-lg    ">
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
        <h2 className="text-2xl mb-4 text-black">{post.title}</h2>

        {post.file_url.endsWith(".mp4") ? (
          <video controls autoPlay loop src={post.file_url} />
        ) : (
          <Image
            src={post.file_url}
            alt={post.title}
            width={400}
            height={300}
            layout="responsive"
          />
        )}
        <p className="text-black mb-4">{post.description}</p>
        <div className="flex justify-end">
          <Link href="/" legacyBehavior>
            <a className="px-4 py-2 bg-yellow-300 text-black font-bold rounded">
              Back
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
