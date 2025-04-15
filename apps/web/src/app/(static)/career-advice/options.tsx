import {
  Users,
  BookOpen,
  UserPlus,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Featured articles data
export const featuredArticles = [
  {
    id: 1,
    title: "10 Networking Strategies That Actually Work",
    excerpt:
      "Learn how to build meaningful professional relationships that can accelerate your career growth and open new opportunities.",
    image: "https://socio.events/wp-content/uploads/2022/04/AdobeStock_118993437.jpeg",
    category: "networking",
    readTime: "8 min read",
    date: "Apr 10, 2025",
    author: {
      name: "Sarah Johnson",
      role: "Career Coach",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "The Ultimate Guide to Upskilling in 2025",
    excerpt:
      "Discover the most in-demand skills across industries and how to develop them efficiently to stay competitive in today's job market.",
    image: "https://fthmb.tqn.com/qHR7F5ZaNDNtdmhibQ1EDvcD-ho=/2714x1811/filters:fill(auto,1)/iStock_000059517630Large-56b098205f9b58b7d024451a.jpg",
    category: "skills",
    readTime: "12 min read",
    date: "Apr 8, 2025",
    author: {
      name: "Michael Chen",
      role: "Learning Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "How to Find and Work with the Right Mentor",
    excerpt:
      "A step-by-step approach to identifying potential mentors, making the initial connection, and building a productive mentoring relationship.",
    image: "https://taxila.in/article/img/art-of-mentoring.jpg",
    category: "mentorship",
    readTime: "10 min read",
    date: "Apr 5, 2025",
    author: {
      name: "David Rodriguez",
      role: "Leadership Coach",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
];

// Career advice categories with icons
export const categories = [
  {
    id: "networking",
    name: "Networking",
    icon: <Users className="h-5 w-5" />,
    color: "from-yellow-600 to-orange-600",
  },
  {
    id: "skills",
    name: "Skill Development",
    icon: <BookOpen className="h-5 w-5" />,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "mentorship",
    name: "Mentorship",
    icon: <UserPlus className="h-5 w-5" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "goals",
    name: "Goal Setting",
    icon: <Target className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
  },
];

// Quick tips data
export const quickTips = [
  {
    id: 1,
    tip: "Network with professionals in your field",
    icon: <Users className="h-5 w-5 text-yellow-500" />,
    category: "networking",
  },
  {
    id: 2,
    tip: "Continuously learn and develop new skills",
    icon: <BookOpen className="h-5 w-5 text-orange-500" />,
    category: "skills",
  },
  {
    id: 3,
    tip: "Seek mentorship from industry leaders",
    icon: <UserPlus className="h-5 w-5 text-blue-500" />,
    category: "mentorship",
  },
  {
    id: 4,
    tip: "Set clear, achievable career goals",
    icon: <Target className="h-5 w-5 text-green-500" />,
    category: "goals",
  },
  {
    id: 5,
    tip: "Build your personal brand online",
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    category: "networking",
  },
  {
    id: 6,
    tip: "Take on challenging projects to grow",
    icon: <TrendingUp className="h-5 w-5 text-red-500" />,
    category: "skills",
  },
];

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
