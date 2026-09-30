"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  getStaffById,
  updateStaff,
} from "../../../../services/ticketService";

import LoadingState from "../../../../components/common/LoadingState";
import ErrorState from "../../../../components/common/ErrorState";

export default function EditStaffPage() {
  const params = useParams();

  const [staff, setStaff] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStaff() {
      try {
        const data = await getStaffById(params.id);

        setStaff(data);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (error) {
        setError("Unable to load staff member");
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSaving(true);

      await updateStaff(
        params.id,
        name,
        email,
        role
      );

      window.location.href = `/staff/${params.id}`;
    } catch (error) {
      setError(
        error.message || "Unable to update staff member"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <LoadingState message="Loading staff member..." />
      </div>
    );
  }

  if (error && !staff) {
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
          href={`/staff/${params.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Staff
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Edit Staff
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update staff member information.
        </p>
      </div>

      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Staff Information
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <div>
            <label className="text-sm font-medium text-slate-700">
              Staff ID
            </label>

            <input
              type="text"
              value={staff.id}
              disabled
              className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
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
              Role
            </label>

            <input
              type="text"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
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
              href={`/staff/${params.id}`}
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