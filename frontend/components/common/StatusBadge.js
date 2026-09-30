const statusStyles = {
  Open: "bg-blue-50 text-blue-700",
  "In Progress": "bg-yellow-50 text-yellow-700",
  Pending: "bg-orange-50 text-orange-700",
  Resolved: "bg-green-50 text-green-700",
  Closed: "bg-slate-100 text-slate-600",
};

export default function StatusBadge({ status }) {
  const styles =
    statusStyles[status] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}