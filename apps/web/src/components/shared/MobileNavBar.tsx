"use client";
import { Menu, X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useRef, useState } from "react";
import { navLinks, protectedNavLinks } from "@/src/utils/utils";
import Link from "next/link";
import { gsap } from "gsap";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export default function MobileNavBar() {
  // State to toggle the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for the menu and links
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle the menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Get the session
  const { data: session } = useSession();

  // Get the logged in user from the session
  const loggedInUser = session?.user as User;

  // Animation setup
  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      // Make it visible before animating
      menuRef.current.style.display = "block";

      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none"; // Hide after animation
          }
        },
      });
    }
  }, [isMenuOpen]);

  // Return the mobile nav bar
  return (
    <>
      <div className="xl:hidden">
        <Button
          type="button"
          size={"icon"}
          className="inline-flex bg-gradient-to-r from-yellow-600 to-orange-600 items-center justify-center p-2 rounded-md focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" />
          ) : (
            <Menu className="block h-6 w-6" />
          )}
        </Button>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div
        ref={menuRef}
        className="xl:hidden fixed left-0 right-0 top-16 bg-neutral-900 z-50 overflow-hidden"
        style={{ display: "none", opacity: 0 }} // Initial closed state
      >
        <div className="flex flex-col">
          {/* Navigation links */}
          {loggedInUser
            ? protectedNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-4 py-4 hover:text-primary transition duration-300 ease-in-out"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))
            : navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-4 py-4 hover:text-primary transition duration-300 ease-in-out"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}

          {loggedInUser ? (
            <div className="flex items-center justify-between p-4">
              <Link
                href={"/user/profile"}
                className="flex items-center space-x-3"
                onClick={toggleMenu}
              >
                <Avatar className="h-10 w-10 border border-zinc-700">
                  <AvatarImage
                    src={loggedInUser.image!}
                    alt={loggedInUser.username}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                    {loggedInUser.username &&
                      loggedInUser.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-zinc-300 text-sm">
                    {loggedInUser.username &&
                      loggedInUser.username.split(" ")[0]}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {loggedInUser.email}
                  </p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4 p-4">
              <Link href={"/signin"}>
                <Button
                  onClick={toggleMenu}
                  size={"lg"}
                  className="bg-transparent border-2 border-yellow-600 font-semibold"
                >
                  SignIn
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button
                  onClick={toggleMenu}
                  size={"lg"}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 font-semibold"
                >
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
