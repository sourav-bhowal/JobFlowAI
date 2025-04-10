"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import {
  Briefcase,
  ChevronDown,
  LogOut,
  User as UserAvatar,
} from "lucide-react";
import Link from "next/link";

// User Button component
export default function UserButton({ loggedInUser }: { loggedInUser: User }) {
  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Render the user button with avatar and dropdown
  return (
    <div className="relative">
      <Button
        variant="ghost"
        className={cn(
          "flex items-center px-2 hover:bg-zinc-800",
          isDropdownOpen && "bg-zinc-800"
        )}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <Avatar className="h-8 w-8 border border-zinc-700">
          <AvatarImage src={loggedInUser.image!} alt={loggedInUser.username} />
          <AvatarFallback className="bg-primary text-white">
            {loggedInUser.username &&
              loggedInUser
                .username.split(" ")
                .map((n) => n[0])
                .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="text-zinc-300 hidden sm:inline-block">
          {loggedInUser.username && loggedInUser.username.split(" ")[0]}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-400 transition-transform",
            isDropdownOpen && "transform rotate-180"
          )}
        />
      </Button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-60 origin-top-right rounded-md bg-zinc-900 border border-zinc-800 shadow-lg"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {/* User Info */}
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border border-zinc-700">
                  <AvatarImage
                    src={loggedInUser.image!}
                    alt={loggedInUser.name!}
                  />
                  <AvatarFallback className="bg-primary text-white">
                    {loggedInUser.username &&
                      loggedInUser
                        .username.split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{loggedInUser.username}</p>
                  <p className="text-xs text-zinc-400">{loggedInUser.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="p-2 border-b border-zinc-800">
              <h3 className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Profile
              </h3>
              <div className="space-y-1">
                <DropdownItem
                  icon={<UserAvatar className="h-4 w-4" />}
                  label="View Profile"
                  href="/user/profile"
                />

                <DropdownItem
                  icon={<Briefcase className="h-4 w-4" />}
                  label="My Recommendations"
                  href="/user/my-recommendations"
                />
              </div>
            </div>

            {/* Logout */}
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full flex justify-start text-red-400 hover:bg-red-500/10 hover:text-red-400"
                onClick={() => signOut()}
              >
                <LogOut className=" h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dropdown item component
function DropdownItem({
  icon,
  label,
  href,
  highlight = false,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        highlight
          ? "text-yellow-400 hover:bg-yellow-500/10"
          : danger
            ? "text-red-400 hover:bg-red-500/10"
            : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
      )}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
}
