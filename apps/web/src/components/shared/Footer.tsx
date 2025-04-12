import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 ">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-white">JobNest</span>
                  <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    AI
                  </span>
                </h2>
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 h-[3px] w-full"></div>
              </div>
            </div>

            <p className="text-zinc-400 text-sm">
              AI-powered job matching that finds your perfect fit in seconds.
              Our platform learns your skills and preferences to deliver
              personalized opportunities.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-zinc-400 hover:text-[#FF8A00] transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-[#FF8A00] transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-[#FF8A00] transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-[#FF8A00] transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/find-jobs"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/recommendations"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-tips"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/interview-prep"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/job-market-trends"
                  className="text-zinc-400 hover:text-[#FF8A00] transition-colors text-sm"
                >
                  Job Market Trends
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-[#FF8A00] mr-2 mt-0.5" />
                <span className="text-zinc-400 text-sm">
                  support@jobnestai.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-[#FF8A00] mr-2 mt-0.5" />
                <span className="text-zinc-400 text-sm">+1 (800) 555-0123</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#FF8A00] px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-[#FF8A00]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-zinc-800 pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-zinc-400 text-sm">
                Subscribe to our newsletter for the latest job opportunities and
                career tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#FF8A00]"
              />
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF8A00] px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-[#FF8A00]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} JobNestAI. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/privacy-policy"
              className="text-zinc-500 hover:text-[#FF8A00] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-zinc-500 hover:text-[#FF8A00] text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-zinc-500 hover:text-[#FF8A00] text-sm transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/accessibility"
              className="text-zinc-500 hover:text-[#FF8A00] text-sm transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
