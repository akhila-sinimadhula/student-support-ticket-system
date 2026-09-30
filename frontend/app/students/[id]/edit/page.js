"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  getStudentById,
  updateStudent,
} from "../../../../services/ticketService";

import LoadingState from "../../../../components/common/LoadingState";
import ErrorState from "../../../../components/common/ErrorState";

export default function EditStudentPage() {
  const params = useParams();

  const [student, setStudent] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await getStudentById(params.id);

        setStudent(data);
        setName(data.name);
        setEmail(data.email);
        setDepartment(data.department);
        setYear(data.year);
      } catch (error) {
        setError("Unable to load student");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSaving(true);

      await updateStudent(
        params.id,
        name,
        email,
        department,
        Number(year)
      );

      window.location.href = `/students/${params.id}`;
    } catch (error) {
      setError(
        error.message || "Unable to update student"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <LoadingState message="Loading student..." />
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="p-6 lg:p-8">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">

      <div className="mb-8">
        <Link
          href={`/students/${params.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Student
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Edit Student
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update student information.
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
              value={student.student_code}
              disabled
              className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
            />

            <p className="mt-1 text-xs text-slate-500">
              Student code cannot be changed.
            </p>
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

          <div className="flex justify-end gap-3">

            <Link
              href={`/students/${params.id}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}