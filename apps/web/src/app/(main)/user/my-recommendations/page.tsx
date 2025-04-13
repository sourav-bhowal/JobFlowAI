import MyRecommendations from "@/src/components/user/MyRecommendations";
import { Metadata } from "next";

// Metadata is a Next.js type that allows us to define metadata for the page
export const metadata: Metadata = {
  title: "My Recommendations",
  description: "View your personalized job recommendations",
};

// This is the main component for the My Recommendations page
export default function MyRecommendationsPage() {
  return <MyRecommendations />;
}
