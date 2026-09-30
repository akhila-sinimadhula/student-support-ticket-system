"use client";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View system configuration and support management settings.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              System Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about the support management system.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-slate-700">
                Application
              </span>

              <span className="text-sm text-slate-500">
                Student Support System
              </span>
            </div>

            <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-slate-700">
                Frontend
              </span>

              <span className="text-sm text-slate-500">
                Next.js
              </span>
            </div>

            <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-slate-700">
                Backend
              </span>

              <span className="text-sm text-slate-500">
                FastAPI
              </span>
            </div>

            <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-slate-700">
                Database
              </span>

              <span className="text-sm text-slate-500">
                MySQL
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Ticket Workflow
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Statuses supported by the ticket management system.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 p-6">
            {[
              "Open",
              "In Progress",
              "Pending",
              "Resolved",
              "Closed",
            ].map((status) => (
              <span
                key={status}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Support Features
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Features available to support staff and administrators.
            </p>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">
                Ticket Management
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Create, assign, update, escalate, and resolve support tickets.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">
                Pending Actions
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Track follow-up actions and monitor overdue tasks.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">
                Escalation
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Escalate tickets when additional attention is required.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-900">
                Activity History
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Maintain a history of important ticket actions and changes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}