"use client";
import { Button } from "@workspace/ui/components/button";
import { motion } from "framer-motion";
import { UserPlus, Sliders, Sparkles } from "lucide-react";

// HowItWorks Component
export default function HowItWorks() {
  // Steps Data
  const steps = [
    {
      number: 1,
      title: "Create an account",
      description: "Sign up in less than 2 minutes. No credit card required.",
      icon: <UserPlus className="h-6 w-6" />,
    },
    {
      number: 2,
      title: "Update your Job Preferences",
      description:
        "Tell us about your skills, experience, and what you're looking for.",
      icon: <Sliders className="h-6 w-6" />,
    },
    {
      number: 3,
      title: "Receive Personalized Matches",
      description:
        "Our AI engine finds the perfect jobs that match your profile.",
      icon: <Sparkles className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 text-white" id="how-it-works">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            How It Works
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-32 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Getting started with JobNestAI is simple. Follow these three steps
            to find your dream job.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting Line (visible on desktop) */}
          <div className="hidden md:block absolute top-[30px] left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center">
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600  flex items-center justify-center text-white text-2xl font-bold mb-6`}
                >
                  {step.number}
                </motion.div>

                {/* Step Icon (visible on mobile) */}
                <div className="md:hidden bg-zinc-900 p-3 rounded-full mb-4">
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-zinc-400">{step.description}</p>
                </div>
              </div>

              {/* Step Details Card */}
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="mt-6 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hidden md:block"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 mr-4">
                    {step.icon}
                  </div>
                  <h4 className="font-semibold">{step.title}</h4>
                </div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {step.number === 1 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Quick sign-up with email</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Secure and private</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Free to use</span>
                      </li>
                    </>
                  )}
                  {step.number === 2 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Specify your skills and experience</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Set salary expectations</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Choose location and remote preferences</span>
                      </li>
                    </>
                  )}
                  {step.number === 3 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>AI-powered job matching</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Daily new recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        <span>Apply with one click</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8"
          >
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
