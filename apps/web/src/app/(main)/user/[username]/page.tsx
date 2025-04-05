import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import UserProfile from "@/src/components/user/UserProfile";
import { fetchUser } from "@/src/utils/FetchUser";
import { Metadata } from "next";

// User Page Props
interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

// Generate Meta Data for User Page
export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  // get logged in user
  const session = await auth();

  // if not logged in user, return empty metadata
  if (!session?.user) return {};

  // get username from params
  const { username } = await params;

  // get user data
  const user = await fetchUser(username);

  // if user then return metadata
  return {
    title: `@${user.username}`,
  };
}

// User Profile Page Component
export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  // get username from params
  const { username } = await params;
  return <UserProfile user={await fetchUser(username)} />;
}
