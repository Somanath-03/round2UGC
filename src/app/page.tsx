"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Posts from "@/components/posts";
import Display from "@/components/display";
import Footer from "@/components/Footer";
import { CirclePlus, Menu, Search, X } from "lucide-react";


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
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

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
    <div className="min-h-screen bg-[#17081f] text-white">
      {/* Mobile header with access to side columns */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-[#fccc4c] bg-[#17081f]">
        <button
          aria-label="Open menu"
          onClick={() => setLeftOpen(true)}
          className="p-2 rounded-md hover:bg-white/10"
        >
          <Menu />
        </button>
        <button
          onClick={newpost}
          className="px-3 py-2 bg-yellow-300 text-black font-semibold rounded-lg flex items-center gap-2"
        >
          <CirclePlus className="h-4 w-4" />
          New Post
        </button>
        <button
          aria-label="Open search"
          onClick={() => setRightOpen(true)}
          className="p-2 rounded-md hover:bg-white/10"
        >
          <Search />
        </button>
      </div>

      {/* Left sidebar (md+): fixed width */}
      <aside className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 border-r border-[#fccc4c] overflow-y-auto">
        <Navigation />
      </aside>

  {/* Right sidebar (md+): visible on tablets and up */}
  <aside className="hidden md:block md:fixed md:inset-y-0 md:right-0 md:w-72 border-l border-[#fccc4c] overflow-y-auto">
        <Display info={data || []} />
      </aside>

      {/* Main content area with paddings for sidebars on larger screens */}
  <main className="w-full md:pl-64 md:pr-72">
        {/* Desktop/tablet sticky header with New Post */}
        <div className="hidden md:flex sticky top-0 z-20 items-center justify-end px-4 py-3 border-b border-[#fccc4c] bg-[#17081f]">
          <button
            onClick={newpost}
            className="px-3 py-2 bg-yellow-300 text-black font-semibold rounded-lg flex items-center gap-2"
          >
            <CirclePlus className="h-4 w-4" />
            New Post
          </button>
        </div>
        <div className="px-4 py-4">
          <Posts info={data || []} />
        </div>
      </main>

      <Footer />

      {/* Mobile left drawer */}
      {leftOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setLeftOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-[#17081f] border-r border-[#fccc4c] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#fccc4c]">
              <span className="font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setLeftOpen(false)}
                className="p-2 rounded-md hover:bg-white/10"
              >
                <X />
              </button>
            </div>
            <Navigation />
          </div>
        </div>
      )}

      {/* Mobile right drawer */}
      {rightOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setRightOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-72 max-w-[85%] bg-[#17081f] border-l border-[#fccc4c] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#fccc4c]">
              <span className="font-semibold">Search</span>
              <button
                aria-label="Close search"
                onClick={() => setRightOpen(false)}
                className="p-2 rounded-md hover:bg-white/10"
              >
                <X />
              </button>
            </div>
            <div className="p-2">
              <Display info={data || []} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;