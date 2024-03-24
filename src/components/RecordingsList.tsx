import useLoadRecordings from "@/hooks/useLoadRecordings";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function RecordingsList() {
  const call = useStreamCall();

  const { recordingLoading, recordings } = useLoadRecordings(call);

  const { user, isLoaded: userLoaded } = useUser();

  if (userLoaded && !user) {
    return (
      <p className="text-center">You must be logged in to view recordings.</p>
    );
  }

  if (recordingLoading) return <Loader2 className="mx-auto animate-spin" />;

  return (
    <div className="space-y-3 text-center">
      {recordings?.length === 0 && <p>No recordings for this meeting</p>}
      <ul className="list-inside list-disc ">
        {recordings
          ?.sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((record, i) => (
            <li key={i}>
              <Link
                href={record.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(record.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-sm text-gray-500">
        Note: It can take up to 1 minute before new recordings show up.
        <br />
        You can{" "}
        <button
          className="text-blue-400 hover:underline"
          onClick={() => window.location.reload()}
        >
          refresh the page
        </button>{" "}
        to see if new recordings are available.
      </p>
    </div>
  );
}
