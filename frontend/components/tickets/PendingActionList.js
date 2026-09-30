"use client";

import { useState } from "react";

import { completePendingAction } from "../../services/ticketService";

export default function PendingActionList({
  actions,
  onActionCompleted,
}) {
  const [completingId, setCompletingId] = useState(null);
  const [error, setError] = useState("");

  async function handleComplete(actionId) {
    try {
      setError("");
      setCompletingId(actionId);

      const completedAction = await completePendingAction(
        actionId
      );

      onActionCompleted(completedAction);
    } catch (error) {
      setError("Unable to complete pending action");
    } finally {
      setCompletingId(null);
    }
  }

  if (actions.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No pending actions for this ticket.
      </p>
    );
  }

  const statusStyles = {
    Pending: "bg-orange-50 text-orange-700",
    Overdue: "bg-red-50 text-red-700",
    Completed: "bg-green-50 text-green-700",
  };

  return (
    <div className="space-y-3">

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {actions.map((action) => {
        const displayStatus =
          !action.is_completed &&
          action.due_at &&
          new Date(action.due_at) < new Date()
            ? "Overdue"
            : action.status;

        return (
          <div
            key={action.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <p className="text-sm font-medium text-slate-900">
                  {action.action_description}
                </p>

                {action.due_at && (
                  <p className="mt-1 text-xs text-slate-500">
                    Due:{" "}
                    {new Date(
                      action.due_at
                    ).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusStyles[displayStatus] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {displayStatus}
                </span>

                {!action.is_completed && (
                  <button
                    type="button"
                    onClick={() =>
                      handleComplete(action.id)
                    }
                    disabled={
                      completingId === action.id
                    }
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {completingId === action.id
                      ? "Completing..."
                      : "Complete"}
                  </button>
                )}

              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}