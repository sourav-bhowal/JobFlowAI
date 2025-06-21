import Link from "next/link";
import { navLinks, protectedNavLinks } from "@/src/utils/utils";
import MobileNavBar from "./MobileNavBar";
import UserButton from "./UserButton";
import { Button } from "@workspace/ui/components/button";
import type { User } from "next-auth";
import { auth } from "@/src/utils/auth";

// NavBar component
export default async function NavBar() {
  const session = await auth();
  const loggedInUser = session?.user as User;
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="bg-black/30 backdrop-blur-md border border-orange-500/10 rounded-2xl shadow-2xl shadow-orange-500/20 ring-1 ring-orange-500/20 hover:shadow-orange-500/40 hover:ring-orange-500/30 transition-all duration-300">
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl text-white font-bold">
                  JobFlow
                  <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    AI
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:block">
              <div className="flex items-center">
                <div className="ml-10 flex items-center space-x-8">
                  {loggedInUser
                    ? protectedNavLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-white hover:text-transparent transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-600 hover:bg-clip-text"
                        >
                          {link.name}
                        </Link>
                      ))
                    : navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-white hover:text-transparent transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-600 hover:bg-clip-text"
                        >
                          {link.name}
                        </Link>
                      ))}
                </div>
                <div className="ml-10 flex items-center space-x-4">
                  {loggedInUser ? (
                    <UserButton loggedInUser={loggedInUser} />
                  ) : (
                    <>
                      <Link href={"/signin"}>
                        <Button
                          size={"lg"}
                          className="bg-transparent border-2 border-yellow-600 text-white font-semibold shadow-md hover:bg-yellow-600/10 hover:shadow-yellow-600/50 transition-all duration-300 ease-in-out"
                        >
                          SignIn
                        </Button>
                      </Link>
                      <Link href={"signup"}>
                        <Button
                          size={"lg"}
                          className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold shadow-md hover:shadow-orange-600/50 hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                          SignUp
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="xl:hidden">
              <MobileNavBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
