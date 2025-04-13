import UserJobReccomendations from "@/src/components/user/JobRecommendations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Recommendations",
  description: "JobNestAI is an AI powered job recommendation platform",
};

export default function UserJobReccomendationsPage() {
  return <UserJobReccomendations />;
}
