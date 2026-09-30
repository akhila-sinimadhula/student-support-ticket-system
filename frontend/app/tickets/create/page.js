"use client";

import { useState } from "react";

import { createTicket } from "../../../services/ticketService";

export default function CreateTicketPage() {
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const numericStudentId = Number(studentId);

    if (!Number.isInteger(numericStudentId) || numericStudentId <= 0) {
      setError("Please enter a valid Student ID");
      return;
    }

    try {
      setError("");
      setSaving(true);

      await createTicket(
        numericStudentId,
        subject,
        description,
        priority
      );

      window.location.href = "/tickets";
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8">

      <div className="mb-8">
        <a
          href="/tickets"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Tickets
        </a>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Create Ticket
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new student support request.
        </p>
      </div>

      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket Information
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <div>
            <label className="text-sm font-medium text-slate-700">
              Student ID
            </label>

            <input
              type="number"
              value={studentId}
              onChange={(event) =>
                setStudentId(event.target.value)
              }
              placeholder="Enter student ID"
              required
              min="1"
              step="1"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Subject
            </label>

            <input
              type="text"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
              placeholder="Enter ticket subject"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={5}
              placeholder="Describe the student's issue..."
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
              className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create Ticket"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}