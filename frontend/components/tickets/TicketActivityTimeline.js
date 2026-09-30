export default function TicketActivityTimeline({
  activities,
}) {
  if (activities.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No activity recorded for this ticket.
      </p>
    );
  }

  const activityStyles = {
    "Ticket Created": {
      dot: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700",
    },

    "Status Changed": {
      dot: "bg-yellow-500",
      badge: "bg-yellow-50 text-yellow-700",
    },

    "Priority Changed": {
      dot: "bg-orange-500",
      badge: "bg-orange-50 text-orange-700",
    },

    "Ticket Assigned": {
      dot: "bg-purple-500",
      badge: "bg-purple-50 text-purple-700",
    },

    "Ticket Escalated": {
      dot: "bg-red-500",
      badge: "bg-red-50 text-red-700",
    },

    "Pending Action Created": {
      dot: "bg-orange-500",
      badge: "bg-orange-50 text-orange-700",
    },

    "Pending Action Completed": {
      dot: "bg-green-500",
      badge: "bg-green-50 text-green-700",
    },

    "Pending Action Overdue": {
      dot: "bg-red-500",
      badge: "bg-red-50 text-red-700",
    },

    "Ticket Resolved": {
      dot: "bg-green-500",
      badge: "bg-green-50 text-green-700",
    },
  };

  return (
    <div className="space-y-5">
      {activities.map((activity) => {
        const styles =
          activityStyles[activity.activity_type] || {
            dot: "bg-slate-400",
            badge: "bg-slate-100 text-slate-600",
          };

        return (
          <div
            key={activity.id}
            className="relative border-l-2 border-slate-200 pl-5"
          >
            <div
              className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ${styles.dot}`}
            />

            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}
            >
              {activity.activity_type}
            </span>

            <p className="mt-2 text-sm text-slate-600">
              {activity.description}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {new Date(
                activity.created_at
              ).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}