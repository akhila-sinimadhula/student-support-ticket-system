"use client";

import { useState } from "react";

import { createTicketResolution } from "../../services/ticketService";

export default function TicketResolutionForm({
  ticketId,
  onResolutionCreated,
}) {
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!resolutionNotes.trim()) {
      setError("Resolution notes are required");
      return;
    }

    try {
      setError("");
      setSaving(true);

      const resolution = await createTicketResolution(
        ticketId,
        resolutionNotes
      );

      setResolutionNotes("");
      onResolutionCreated(resolution);
    } catch (error) {
      setError("Unable to create ticket resolution");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="text-sm font-medium text-slate-700">
          Resolution Notes
        </label>

        <textarea
          value={resolutionNotes}
          onChange={(event) =>
            setResolutionNotes(event.target.value)
          }
          rows={4}
          placeholder="Describe how the issue was resolved..."
          disabled={saving}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Resolve Ticket"}
      </button>

    </form>
  );
}