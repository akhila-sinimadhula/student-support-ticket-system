
"use client";

import { useState } from "react";

import { createPendingAction } from "../../services/ticketService";

export default function PendingActionForm({
  ticketId,
  onActionCreated,
}) {
  const [actionDescription, setActionDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!actionDescription.trim()) {
      setError("Action description is required");
      return;
    }

    if ((dueDate && !dueTime) || (!dueDate && dueTime)) {
      setError("Please provide both due date and due time");
      return;
    }

    try {
      setError("");
      setSaving(true);

      let dueAt = null;

      if (dueDate && dueTime) {
        dueAt = dueDate + "T" + dueTime;
      }

      const action = await createPendingAction(
        ticketId,
        actionDescription,
        dueAt
      );

      setActionDescription("");
      setDueDate("");
      setDueTime("");

      onActionCreated(action);
    } catch (error) {
      setError(
        error.message || "Unable to create pending action"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4"
    >
      <h3 className="text-sm font-semibold text-slate-900">
        Add Pending Action
      </h3>

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">
          Action
        </label>

        <input
          type="text"
          value={actionDescription}
          onChange={(event) =>
            setActionDescription(event.target.value)
          }
          placeholder="Example: Contact examination department"
          disabled={saving}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">
          Due Date and Time
        </label>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            disabled={saving}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />

          <input
            type="time"
            value={dueTime}
            onChange={(event) =>
              setDueTime(event.target.value)
            }
            disabled={saving}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Optional. Leave both fields empty if no due date is required.
        </p>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Adding..." : "Add Action"}
      </button>
    </form>
  );
}
