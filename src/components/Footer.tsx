// footer component from the website 

import React from "react";
import Link from "next/link";
import Logo from "@/app/assets/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="p-8 bg-gradient-to-tr from-[#370450] to-[#1A0226] text-gray-300 z-50">
      <div className="flex flex-col mx-4 md:mx-12 md:my-20 gap-8">
        <div className="w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span style={{ color: '#fff' }}>
                  <Image src={Logo} alt="No logo" />
                </span>
              </Link>
            </div>
            <p className="mt-8 text-gray-300 text-base">
              All chains, all games—single destination. Nexuspost, where Web3
              gaming connects.
            </p>
          </div>
          {/* Copyright and links removed by request */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
