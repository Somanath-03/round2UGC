"use client";
import React, { useState } from "react";
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

  return (
    <>
      {/* New post button is rendered in page header for consistency; avoid duplicate fixed button here */}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col p-2 md:p-4 w-full md:w-1/2">
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
        <div className="flex flex-col p-2 md:p-4 w-full md:w-1/2">
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
