"use client";

import { useState } from "react";

import { updateTicketStatus } from "../../services/ticketService";

const statuses = [
  "Open",
  "In Progress",
  "Pending",
  "Resolved",
  "Closed",
];

export default function TicketStatusControl({
  ticketId,
  currentStatus,
  onStatusUpdated,
}) {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  async function handleStatusChange(event) {
    const newStatus = event.target.value;

    try {
      setError("");
      setUpdating(true);

      const updatedTicket = await updateTicketStatus(
        ticketId,
        newStatus
      );

      setStatus(updatedTicket.status);

      onStatusUpdated(updatedTicket);
    } catch (error) {
      setError("Unable to update ticket status");
      setStatus(currentStatus);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-500">
        Update Status
      </p>

      <select
        value={status}
        onChange={handleStatusChange}
        disabled={updating}
        className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      >
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>

      {updating && (
        <p className="mt-1 text-xs text-slate-500">
          Updating...
        </p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}