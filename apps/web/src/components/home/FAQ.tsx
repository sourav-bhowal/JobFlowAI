"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";
import { motion } from "framer-motion";

export default function FAQSection() {
  return (
    <div className="w-full bg-neutral-950 text-white py-16" id="faq">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mx-auto mb-6"></div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Find answers to the most common questions about JobNestAI and how
            our platform can help you find your perfect job match.
          </motion.p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              How does JobNestAI's matching algorithm work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              Our AI engine analyzes thousands of data points from your profile,
              skills, and preferences to match you with relevant job
              opportunities. The system continuously learns from your
              interactions to improve matching accuracy over time, resulting in
              our industry-leading 97% match accuracy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              Is JobNestAI free to use?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              JobNestAI offers a free basic tier that allows you to search and
              apply for jobs. We also offer premium plans with advanced features
              like priority matching, direct employer messaging, and
              personalized career coaching. All plans come with our core AI
              matching technology.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              How often are new jobs added to the platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              We add over 1000+ new job listings daily across various industries
              and locations. Our system automatically scans multiple job boards,
              company career pages, and exclusive partnerships to ensure you
              have access to the latest opportunities as soon as they become
              available.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              Can I use JobNestAI to find remote work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              Absolutely! JobNestAI specializes in matching candidates with both
              in-office and remote opportunities. You can filter your search
              preferences to focus exclusively on remote positions or hybrid
              arrangements based on your location preferences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              How do I update my skills and preferences?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              You can update your skills and preferences anytime by logging into
              your account and navigating to the Profile section. Our AI system
              will immediately incorporate your changes to refine your job
              matches. We recommend keeping your profile updated regularly for
              the best results.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b border-gray-800">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary">
              What makes JobNestAI different from other job boards?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              Unlike traditional job boards that show the same listings to
              everyone, JobNestAI uses advanced AI to personalize your job
              search experience. Our platform learns your unique skills and
              preferences to deliver highly relevant opportunities, saving you
              time and increasing your chances of finding the perfect fit up to
              5x faster.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
