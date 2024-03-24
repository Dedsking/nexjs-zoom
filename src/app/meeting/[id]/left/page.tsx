import { buttonClassname } from "@/components/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}
export default function page({ params: { id } }: PageProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You Left The Meeting</p>

      <Link
        href={`/meeting/${id}`}
        className={cn(buttonClassname, "bg-gray-500 hover:bg-gray-600")}
      >
        Rejoin
      </Link>
    </div>
  );
}
