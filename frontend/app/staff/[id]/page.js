"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getStaffById,
} from "../../../services/ticketService";

import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";

export default function StaffDetailPage({ params }) {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStaff() {
      try {
        const { id } = await params;

        const data = await getStaffById(id);

        setStaff(data);
      } catch (error) {
        setError("Unable to load staff member");
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, [params]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <LoadingState message="Loading staff member..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">

      <Link
        href="/staff"
        className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to Staff
      </Link>

      {/* Staff Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {staff.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Staff profile and support information.
          </p>
        </div>

        <Link
          href={`/staff/${staff.id}/edit`}
          className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Edit Staff
        </Link>

      </div>

      {/* Staff Information */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Staff Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Staff ID
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {staff.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {staff.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {staff.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {staff.role}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}