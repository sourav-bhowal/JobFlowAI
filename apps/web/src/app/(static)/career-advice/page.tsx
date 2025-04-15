"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Share2,
  Sparkles,
  Lightbulb,
  Clock,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  categories,
  containerVariants,
  featuredArticles,
  itemVariants,
  quickTips,
} from "./options";
import Image from "next/image";

// Career
export default function CareerAdvice() {
  // State
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter tips based on active category
  const filteredTips =
    activeCategory === "all"
      ? quickTips
      : quickTips.filter((tip) => tip.category === activeCategory);

  return (
    <>
      <div className="bg-zinc-950 min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 z-0"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-600/10 to-transparent z-0"></div>

          <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 mb-4">
                  Career Resources
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Expert Career Advice
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mb-6"></div>
                <p className="text-xl max-sm:text-md text-zinc-300 mb-8">
                  Discover insights, strategies, and practical tips to help you
                  navigate your career journey and achieve your professional
                  goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12 bg-black">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Articles</h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featuredArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full hover:border-yellow-600/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        width={500}
                        height={300}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={`${
                            article.category === "networking"
                              ? "bg-yellow-500"
                              : article.category === "skills"
                                ? "bg-orange-500"
                                : article.category === "mentorship"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                          }`}
                        >
                          {article.category.charAt(0).toUpperCase() +
                            article.category.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-white">
                        {article.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-zinc-400 mt-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.readTime}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-zinc-400 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between pt-0">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={article.author.avatar || "/placeholder.svg"}
                            alt={article.author.name}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-yellow-600 to-orange-600">
                            {article.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {article.author.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            {article.author.role}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-16 bg-zinc-950">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center mb-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 blur-md opacity-70" />
                  <div className="relative bg-zinc-900 rounded-full p-3">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold mb-4"
              >
                Quick Career Tips
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-zinc-400 max-w-2xl mx-auto"
              >
                Actionable advice to help you advance your career and achieve
                your professional goals.
              </motion.p>
            </div>

            <Tabs
              defaultValue={activeCategory}
              className="w-full"
              onValueChange={setActiveCategory}
            >
              <TabsList className="bg-zinc-900 h-[50px] border border-zinc-800 p-1 mb-8 mx-auto gap-3 flex justify-center">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 text-white"
                >
                  All Tips
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 text-white"
                  >
                    <span className="flex items-center">
                      {category.icon}
                      <span className="ml-2 hidden sm:inline">
                        {category.name}
                      </span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredTips.map((tip) => (
                    <motion.div key={tip.id} variants={itemVariants}>
                      <Card className="bg-zinc-900 border-zinc-800 hover:border-yellow-600/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div
                              className={`p-3 rounded-full mr-4 ${
                                tip.category === "networking"
                                  ? "bg-yellow-500/10"
                                  : tip.category === "skills"
                                    ? "bg-orange-500/10"
                                    : tip.category === "mentorship"
                                      ? "bg-blue-500/10"
                                      : "bg-green-500/10"
                              }`}
                            >
                              {tip.icon}
                            </div>
                            <div>
                              <p className="font-medium text-lg text-gray-400">
                                {tip.tip}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-zinc-900 to-black">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Get Career Advice in Your Inbox
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    Subscribe to our newsletter for weekly career tips, industry
                    insights, and exclusive opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-zinc-800 h-12 border-zinc-700 focus-visible:ring-yellow-500"
                    />
                    <Button className="bg-gradient-to-r h-12 max-sm:w-full from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-500 mt-3">
                    By subscribing, you agree to our Privacy Policy and Terms of
                    Service.
                  </p>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur-xl opacity-20" />
                    <div className="relative bg-zinc-800 rounded-xl p-6 border border-zinc-700">
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-2 rounded-full mr-3">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-semibold">
                          Weekly Career Insights
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center text-sm text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span>Expert career advice</span>
                        </li>
                        <li className="flex items-center text-sm text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span>Industry trends and insights</span>
                        </li>
                        <li className="flex items-center text-sm text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span>Exclusive job opportunities</span>
                        </li>
                        <li className="flex items-center text-sm text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span>Networking events and webinars</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
