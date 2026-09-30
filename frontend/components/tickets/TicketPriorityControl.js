"use client";

import { useState } from "react";

import { updateTicketPriority } from "../../services/ticketService";

const priorities = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

export default function TicketPriorityControl({
  ticketId,
  currentPriority,
  onPriorityUpdated,
}) {
  const [priority, setPriority] = useState(currentPriority);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  async function handlePriorityChange(event) {
    const newPriority = event.target.value;

    try {
      setError("");
      setUpdating(true);

      const updatedTicket = await updateTicketPriority(
        ticketId,
        newPriority
      );

      setPriority(updatedTicket.priority);

      onPriorityUpdated(updatedTicket);
    } catch (error) {
      setError("Unable to update ticket priority");
      setPriority(currentPriority);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-500">
        Update Priority
      </p>

      <select
        value={priority}
        onChange={handlePriorityChange}
        disabled={updating}
        className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      >
        {priorities.map((priorityOption) => (
          <option
            key={priorityOption}
            value={priorityOption}
          >
            {priorityOption}
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