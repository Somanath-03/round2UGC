import React from "react";
import Link from "next/link";
import Logo from "@/app/assets/logo.svg";
import { FaDiscord, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="p-8 bg-gradient-to-tr from-[#370450] to-[#1A0226] text-gray-300 z-50">
      <div className="flex flex-col md:flex-row mx-4 md:mx-12 md:my-20 justify-between columns-[400px] gap-8">
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src={Logo} alt="No logo" />
              </Link>
            </div>
            <p className="mt-8 text-gray-300 text-base">
              All chains, all games—single destination. Captain Side, where Web3
              gaming connects.
            </p>
          </div>
          <div className="mt-12 md:mt-52">
            <p className="text-gray-500 text-sm">
              Copyright © 2024 Captain Side | All Rights Reserved
            </p>
          </div>
        </div>

        <div className="w-full ">
          <div className="pentagon1 p-8 md:p-16 md:pl-20 shadow-lg bg-[#310F43] flex flex-col md:flex-row justify-center items-stretch w-full h-auto md:h-full">
            {/* Left Partition */}
            <div className="w-full md:w-1/2 flex flex-col space-y-6 md:space-y-12 mb-6 md:mb-0 text-white">
              <Link href="/events" className="hover:underline">
                Events
              </Link>
              <Link href="/gamePass" className="hover:underline">
                Game Pass
              </Link>

              <Link href="/aboutus" className="hover:underline">
                About Us
              </Link>
              <Link href="/" className="hover:underline">
                Help & Support
              </Link>
              <Link href="/" className="hover:underline">
                Terms & Conditions
              </Link>
            </div>

            {/* Divider */}
            <div className="border-l border-[#D700E1] mx-0 md:mx-4 mb-6 md:mb-7"></div>

            <div className="w-full md:w-1/2 pl-0 md:pl-12 flex flex-col space-y-6 md:space-y-12 text-white">
              <a
                href="https://discord.com/invite/captain-side-710346966722281494"
                className="flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord className="mr-2 w-6 h-6" /> Discord
              </a>
              <a
                href="https://www.instagram.com/captainside_esports"
                className="flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="mr-2 w-6 h-6" /> Instagram
              </a>
              <a
                href="https://www.youtube.com/@captainside2064"
                className="flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="mr-2 w-6 h-6" /> YouTube
              </a>
              <a
                href="https://x.com/CaptainSide1"
                className="flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="mr-2 w-6 h-6" /> X
              </a>
              <a
                href="mailto:abhijeetgupta8998@gmail.com"
                className="flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope className="mr-2 w-5 h-5" /> Email
              </a>
              <Link href="/" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
