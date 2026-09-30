"use client";

import { useState } from "react";

import { API_URL } from "../../../config/api";

export default function CreateStudentPage() {
  const [studentCode, setStudentCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSaving(true);

      const response = await fetch(
        `${API_URL}/students/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_code: studentCode,
            name,
            email,
            department,
            year: Number(year),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to create student"
        );
      }

      window.location.href = "/students";
    } catch (error) {
      setError(
        error.message || "Unable to create student"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8">

      <div className="mb-8">
        <a
          href="/students"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Students
        </a>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Add Student
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Register a new student in the support system.
        </p>
      </div>

      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Student Information
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <div>
            <label className="text-sm font-medium text-slate-700">
              Student Code
            </label>

            <input
              type="text"
              value={studentCode}
              onChange={(event) =>
                setStudentCode(event.target.value)
              }
              placeholder="Example: STU002"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter student name"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter student email"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Department
            </label>

            <input
              type="text"
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              placeholder="Example: Computer Science"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Year
            </label>

            <input
              type="number"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              placeholder="Example: 4"
              min="1"
              max="6"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
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
              {saving ? "Adding..." : "Add Student"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}