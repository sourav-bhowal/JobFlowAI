import UserProfile from "@/src/components/user/UserProfile";
import { fetchUser } from "@/src/utils/FetchUser";
import { Metadata } from "next";

// Generate Meta Data for User Page
export async function generateMetadata(): Promise<Metadata> {
  // get user data
  const user = await fetchUser();

  // if user then return metadata
  return {
    title: `@${user.username}`,
  };
}

// User Profile Page Component
export default async function UserProfilePage() {
  // Return User Profile Component
  return <UserProfile user={await fetchUser()} />;
}
