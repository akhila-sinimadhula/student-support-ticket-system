"use client";

import { useState } from "react";

import { escalateTicket } from "../../services/ticketService";

export default function TicketEscalationControl({
  ticketId,
  isEscalated,
  onTicketEscalated,
}) {
  const [escalating, setEscalating] = useState(false);
  const [error, setError] = useState("");

  async function handleEscalate() {
    try {
      setError("");
      setEscalating(true);

      const updatedTicket = await escalateTicket(ticketId);

      onTicketEscalated(updatedTicket);
    } catch (error) {
      setError("Unable to escalate ticket");
    } finally {
      setEscalating(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-500">
        Escalation
      </p>

      <div className="mt-2 flex items-center gap-3">

        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            isEscalated
              ? "bg-red-50 text-red-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isEscalated ? "Escalated" : "Not Escalated"}
        </span>

        {!isEscalated && (
          <button
            type="button"
            onClick={handleEscalate}
            disabled={escalating}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {escalating ? "Escalating..." : "Escalate"}
          </button>
        )}

      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}