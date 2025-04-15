import Link from "next/link";
import { ChevronDown } from "lucide-react";
import HeroTiles from "./HeroTiles";

// Hero Section
export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 py-20 text-center text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-orange-500 opacity-10 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-400 opacity-10 blur-[160px]"></div>
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-5 blur-[200px]"></div>
      <div className="container mx-auto max-w-5xl">
        <div>
          {/* Tagline */}
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-yellow-600/10 to-orange-600/10 px-3 py-1 text-sm text-orange-500">
            {/* Pulsating dot */}
            <span className="inline-block h-2 w-2 animate-pulse mr-1 rounded-full bg-orange-500"></span>
            Early Access
          </div>
        </div>

        {/* Logo/Brand */}
        <div className="mb-8 inline-block rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 p-[2px]">
          <div className="rounded-lg bg-neutral-950 px-8 py-4">
            <h1 className="md:text-5xl text-4xl font-bold">
              JobFlow
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
          </div>
        </div>

        {/* Yellow underline */}
        <div className="mx-auto mb-10 h-1 w-20 bg-gradient-to-r from-yellow-600 to-orange-600"></div>

        {/* Main headline */}
        <h2 className="mb-8 text-4xl font-bold leading-tight md:text-5xl">
          AI-powered job matching that finds your perfect fit in seconds
        </h2>

        {/* Subheading */}
        <p className="mb-12 text-lg md:text-xl text-muted-foreground">
          Stop wasting time scrolling through irrelevant job listings. Our AI
          engine learns your skills and preferences to deliver personalized
          opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <Link
            href="/user/my-recommendations"
            className="w-64 rounded-md bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-4 font-semibold shadow-md hover:shadow-orange-600 duration-500 hover:scale-105 transition-all ease-in-out"
          >
            Find Your Job Now
          </Link>
          <div className="w-64 rounded-md bg-gradient-to-r from-yellow-600 to-orange-600 p-[2px] shadow-md hover:shadow-orange-600 transition-shadow duration-500 ease-in-out">
            <Link
              href="#how-it-works"
              className="block rounded-md bg-neutral-950 px-8 py-4 font-semibold text-white"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <HeroTiles />
      </div>

      {/* Down arrow */}
      <div className="absolute bottom-5 animate-bounce text-yellow-600">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
