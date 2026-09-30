"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { getStaff } from "../../services/ticketService";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStaff() {
      try {
        const data = await getStaff();

        setStaff(data);
      } catch (error) {
        setError("Unable to load staff");
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  return (
    <div className="p-6 lg:p-8">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Staff
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View staff members available to handle support tickets.
          </p>
        </div>

        <Link
          href="/staff/create"
          className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Add Staff
        </Link>

      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Staff Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Staff members who manage student support requests.
          </p>
        </div>

        <div className="p-6">

          {loading && (
            <LoadingState message="Loading staff..." />
          )}

          {error && (
            <ErrorState message={error} />
          )}

          {!loading &&
            !error &&
            staff.length === 0 && (
              <p className="text-sm text-slate-500">
                No staff members found.
              </p>
            )}

          {!loading &&
            !error &&
            staff.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-slate-200">

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Role
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {staff.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-slate-100 last:border-0"
                      >

                        <td className="px-4 py-4 text-sm font-medium text-blue-600">
                          <Link
                            href={`/staff/${member.id}`}
                            className="hover:text-blue-700 hover:underline"
                          >
                            {member.name}
                          </Link>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {member.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {member.role}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>
              </div>
            )}

        </div>
      </div>
    </div>
  );
}