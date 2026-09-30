import Link from "next/link";

import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";

export default function TicketCard({
  id,
  ticketNumber,
  subject,
  status,
  priority,
}) {
  return (
    <Link
      href={`/tickets/${id}`}
      className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            {ticketNumber}
          </p>

          <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
            {subject}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          <PriorityBadge priority={priority} />
        </div>

      </div>
    </Link>
  );
}