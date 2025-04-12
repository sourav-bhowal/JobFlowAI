"use client";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Database, Zap, Cpu, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

// RecommendationSection Component
const recommendations = [
  {
    title: "Job Collection",
    description:
      "We web scrap jobs from LinkedIn, Naukri, Internshala, Glassdoor, and more to provide comprehensive coverage.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "Vector Embeddings",
    description:
      "Jobs and profiles are converted into vector embeddings that capture semantic meaning beyond keywords.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Similarity Matching",
    description:
      "Our algorithm calculates cosine similarity between vectors to find the most relevant job matches.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Personalized Results",
    description:
      "Get job recommendations that truly match your skills and preferences, ranked by relevance.",
    icon: <UserCheck className="h-6 w-6" />,
  },
];

// Parent container animation
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Individual card animation
const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

// RecommendationSection Component
export function RecommendationSection() {
  return (
    <section
      className="relative py-20 bg-black text-white overflow-hidden"
      id="recommendations"
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-[300px] w-[400px] rounded-full bg-yellow-600 opacity-10 blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-orange-600 opacity-10 blur-[160px]"></div>
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="inline-block rounded-lg bg-gradient-to-r from-yellow-600/10 to-orange-600/10 px-3 py-1 text-sm text-orange-500 mb-4">
            Advanced Technology
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI-Powered Job Recommendations
          </h2>
          <p className="max-w-[800px] text-gray-400 text-lg/relaxed">
            Our intelligent matching system uses vector embeddings and vector
            search to find your perfect job fit
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {recommendations.map((item, index) => (
            <motion.div variants={cardVariants} key={index}>
              <Card
                className="flex flex-col h-full bg-zinc-900 border border-zinc-800/70 shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300 rounded-2xl"
                key={index}
              >
                <CardContent className="pt-6 px-5 flex-1">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-600/10 to-orange-600/10 text-orange-500">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
