"use client";
import {
  signInSchema,
  SignInSchemaType,
  signUpSchema,
  SignUpSchemaType,
} from "@repo/validations/src/auth-validation";
import { useForm, zodResolver } from "@workspace/ui/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

// Interface for Auth Page
interface AuthPageProps {
  isSignIn: boolean;
}

// Auth Page Component
export default function AuthPage({ isSignIn }: AuthPageProps) {
  // States
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const form = useForm<SignInSchemaType | SignUpSchemaType>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // On Submit
  const onSubmit = async (data: SignInSchemaType | SignUpSchemaType) => {};

  // Render
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-lg bg-zinc-900/70 rounded-2xl p-8 shadow-xl border border-zinc-800"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 blur-md opacity-70" />
                    <div className="relative bg-zinc-900 rounded-full p-3">
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                </motion.div>
                <h1 className="text-2xl max-sm:text-xl font-bold mb-1">
                  {isSignIn ? "Welcome Back" : "Create an account"}
                </h1>
                <p className="text-zinc-400 text-sm">
                  Join thousands of users and start your journey
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Username Field */}
                  {!isSignIn && (
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel
                            className={cn(
                              "text-sm transition-colors duration-200",
                              focusedField === "username"
                                ? "text-yellow-400"
                                : "text-zinc-400"
                            )}
                          >
                            Username
                          </FormLabel>
                          <div className="relative">
                            <motion.div
                              className={cn(
                                "absolute left-3 top-3 text-zinc-400 z-10",
                                focusedField === "username" && "text-yellow-400"
                              )}
                              animate={{
                                scale: focusedField === "username" ? 1.1 : 1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                              }}
                            >
                              <User className="h-5 w-5" />
                            </motion.div>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className={cn(
                                  "pl-10 bg-zinc-800/50 border-zinc-700 h-12 focus-visible:ring-yellow-500"
                                )}
                                {...field}
                                onFocus={() => setFocusedField("username")}
                                onBlur={() => {
                                  setFocusedField(null);
                                  field.onBlur();
                                }}
                              />
                            </FormControl>
                          </div>
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <FormMessage className="text-xs text-red-500 mt-1" />
                            </motion.div>
                          </AnimatePresence>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel
                          className={cn(
                            "text-sm transition-colors duration-200",
                            focusedField === "email"
                              ? "text-yellow-400"
                              : "text-zinc-400"
                          )}
                        >
                          Email Address
                        </FormLabel>
                        <div className="relative">
                          <motion.div
                            className={cn(
                              "absolute left-3 top-3 text-zinc-400 z-10",
                              focusedField === "email" && "text-yellow-400"
                            )}
                            animate={{
                              scale: focusedField === "email" ? 1.1 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <Mail className="h-5 w-5" />
                          </motion.div>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              className={cn(
                                "pl-10 bg-zinc-800/50 border-zinc-700 h-12 focus-visible:ring-yellow-500"
                              )}
                              {...field}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => {
                                setFocusedField(null);
                                field.onBlur();
                              }}
                            />
                          </FormControl>
                        </div>
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage className="text-xs text-red-500 mt-1" />
                          </motion.div>
                        </AnimatePresence>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel
                          className={cn(
                            "text-sm transition-colors duration-200",
                            focusedField === "password"
                              ? "text-yellow-400"
                              : "text-zinc-400"
                          )}
                        >
                          Password
                        </FormLabel>
                        <div className="relative">
                          <motion.div
                            className={cn(
                              "absolute left-3 top-3 text-zinc-400 z-10",
                              focusedField === "password" && "text-yellow-400"
                            )}
                            animate={{
                              scale: focusedField === "password" ? 1.1 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <Lock className="h-5 w-5" />
                          </motion.div>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className={cn(
                                "pl-10 bg-zinc-800/50 border-zinc-700 h-12 focus-visible:ring-yellow-500"
                              )}
                              {...field}
                              onFocus={() => setFocusedField("password")}
                              onBlur={() => {
                                setFocusedField(null);
                                field.onBlur();
                              }}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-300 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage className="text-xs text-red-500 mt-1" />
                          </motion.div>
                        </AnimatePresence>
                      </FormItem>
                    )}
                  />

                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className={cn(
                        "w-full h-12 text-white font-medium relative overflow-hidden transition-all duration-300",
                        !form.formState.isValid || loading
                          ? "bg-zinc-700 hover:bg-zinc-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                      )}
                      disabled={!form.formState.isValid || loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating your account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}

                      {form.formState.isValid && !loading && (
                        <motion.div
                          className="absolute inset-0 bg-white"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.5, opacity: 0.1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center text-zinc-400 text-sm max-sm:text-xs">
                    {isSignIn ? (
                      <>
                        Don't have an account?{" "}
                        <Link
                          href="/signup"
                          className="text-yellow-500 hover:underline"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <Link
                          href="/signin"
                          className="text-yellow-500 hover:underline"
                        >
                          Sign In
                        </Link>
                      </>
                    )}
                  </div>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-lg bg-zinc-900/70 rounded-2xl p-8 shadow-xl border border-zinc-800 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mx-auto flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
              <p className="text-zinc-400 mb-6">
                Your account has been successfully created. Welcome to our
                platform!
              </p>

              <Button
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium px-6 py-2"
                onClick={() => setSubmitted(false)}
              >
                Back to Sign Up
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
