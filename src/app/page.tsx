"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Posts from "@/components/posts";
import Display from "@/components/display";
import Footer from "@/components/Footer";
import { CirclePlus } from "lucide-react";


interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const fetchData = async (
  setData: React.Dispatch<React.SetStateAction<ContentInfo[] | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const response = await fetch("/api/fetch-content");
  const result = await response.json();
  if (response.ok) {
    setData(result.data);
  } else {
    console.error(result.error);
  }
  setLoading(false);
};

function Home() {
  const [data, setData] = useState<ContentInfo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(setData, setLoading); // Initial fetch

    const interval = setInterval(() => {
      fetchData(setData, setLoading);
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const newpost = () => {
    window.location.href = "/new-post"; // Redirect to the new post page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#17081f]">
      <div className="flex-grow flex">
        <div className="w-1/5 h-screen fixed left-0 top-0 overflow-y-hidden border-r-2 border-solid border-[#fccc4c]">
          <Navigation />
        </div>
        <button
          onClick={(newpost)}
          className="ml-2 p-2 top-8 right-[21%] bg-yellow-300 text-black font-bold rounded-lg fixed flex items-center"
        >
          <CirclePlus className="mr-2" />
          NEW POST
        </button>
        <main className="w-3/5 h-full ml-[20%] mt-[5%] mx-auto">
          <Posts info={data || []} />
        </main>
        <div className="w-1/5 h-screen border-l-2 border-solid border-[#fccc4c] fixed right-0 top-0 overflow-y-hidden">
          <Display info={data || []} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;