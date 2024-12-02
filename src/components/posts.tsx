"use client";
import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import PostCard from "@/components/postcard";

interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

interface PostsProps {
  info: ContentInfo[];
}

const Posts: React.FC<PostsProps> = ({ info }) => {
  const [modalOpen, setModalOpen] = useState<number | false>(false);

  const handleModalClick = (contentId: number) => {
    setModalOpen(modalOpen === contentId ? false : contentId);
  };

  const onehalf = [];
  const otherhalf = [];
  for (let i = 0; i < info.length; i++) {
    if (i % 2 === 0) {
      onehalf.push(info[i]);
    } else {
      otherhalf.push(info[i]);
    }
  }

  const newpost = () => {
    window.location.href = "/new-post"; // Redirect to the new post page
  };

  return (
    <>
      <button
        onClick={newpost}
        className="ml-2 p-2 top-8 right-[21%] bg-yellow-300 text-black font-bold rounded-lg fixed flex items-center"
      >
        <CirclePlus className="mr-2" />
        NEW POST
      </button>
      <div className="flex">
        <div className="flex flex-col p-4 w-1/2">
          {onehalf.map((content, i) => (
            <PostCard
              key={content.id}
              content={content}
              index={i}
              expanded={modalOpen}
              handleExpandClick={handleModalClick}
            />
          ))}
        </div>
        <div className="flex flex-col p-4 w-1/2">
          {otherhalf.map((content, i) => (
            <PostCard
              key={content.id}
              content={content}
              index={i}
              expanded={modalOpen}
              handleExpandClick={handleModalClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
