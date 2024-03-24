import { currentUser } from "@clerk/nextjs";
import MeetingLoginPage from "./MeetingLoginPage";
import MeetingPage from "./MeetingPage";

interface PageProps {
  params: { id: string };
  searchParams: { guest: string };
}

export function generateMetaData({ params: { id } }: PageProps) {
  return {
    title: `Meeting ${id}`,
  };
}

export default async function Page({
  params: { id },
  searchParams: { guest },
}: PageProps) {
  const user = await currentUser();

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return <MeetingLoginPage />;
  }

  return <MeetingPage id={id} />;
}
