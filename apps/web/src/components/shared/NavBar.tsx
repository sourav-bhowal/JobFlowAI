import Link from "next/link";
import { navLinks } from "@/src/utils/utils";
import MobileNavBar from "./MobileNavBar";
import UserButton from "./UserButton";
import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import { Button } from "@workspace/ui/components/button";
import { User } from "next-auth";

// NavBar component
export default async function NavBar() {
  const session = await auth();
  const loggedInUser = session?.user as User;
  return (
    <nav className="bg-black text-white w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold border-b-3 border-yellow-600">
                JobNest
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-primary border-b-2 border-transparent hover:border-primary
                  transition duration-300 ease-in-out"
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
                        className="bg-transparent border-2 border-yellow-600 font-semibold shadow-md hover:bg-transparent hover:shadow-yellow-600 transition-shadow duration-300 ease-in-out"
                      >
                        SignIn
                      </Button>
                    </Link>
                    <Link href={"signup"}>
                      <Button
                        size={"lg"}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 font-semibold shadow-md hover:shadow-orange-600 transition-shadow duration-300 ease-in-out"
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
          <MobileNavBar />
        </div>
      </div>
    </nav>
  );
}
