// Navigation component on the left hand side of the website

import Link from "next/link";
import {
  Home,
  Compass,
  Bell,
  Mail,
  User,
  Settings,
  Ticket,
  ShoppingBag,
} from "lucide-react";
import Logo from "@/app/assets/logo.svg";
import Image from "next/image";

function Navigation() {
  return (
    <div className="mt-5 w-64 h-full space-y-6 p-4 ">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex-shrink-0">
          <Image src={Logo} alt="Logo" className="w-56 h-30 my-0" />
        </Link>
      </div>
      <nav className="space-y-2 mt-5 w-full pt-4 pb-4 border-t-2 border-solid border-[#fccc4c]">
        <div className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <User className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span className="font-semibold">Username</span>
        </div>
        <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Home className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Home</span>
        </Link>
        <Link href="/game-pass" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Ticket className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Game Pass</span>
        </Link>
        <Link href="/marketplace" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <ShoppingBag className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Marketplace</span>
        </Link>
        <Link href="/explore" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Compass className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Explore</span>
        </Link>
        <Link href="/notifications" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Bell className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Notifications</span>
        </Link>
        <Link href="/messages" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Mail className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Messages</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:text-yellow-600">
          <Settings className="w-5 h-5 transition-colors hover:text-yellow-600" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default Navigation;