import MeetingPage from "./MeetingPage";

interface PageProps {
  params: { id: string };
}

export function generateMetaData({ params: { id } }: PageProps) {
  return {
    title: `Meeting ${id}`,
  };
}

export default function Page({ params: { id } }: PageProps) {
  return <MeetingPage id={id} />;
}
