"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { getStudents } from "../../services/ticketService";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getStudents();

        setStudents(data);
      } catch (error) {
        setError("Unable to load students");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                Students
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                View students registered in the support system.
                </p>
            </div>

            <a
                href="/students/create"
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Add Student
            </a>
            </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Student Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Student information associated with support requests.
          </p>
        </div>

        <div className="p-6">
          {loading && (
            <LoadingState message="Loading students..." />
          )}

          {error && (
            <ErrorState message={error} />
          )}

          {!loading &&
            !error &&
            students.length === 0 && (
              <p className="text-sm text-slate-500">
                No students found.
              </p>
            )}

          {!loading &&
            !error &&
            students.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student ID
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Name
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Department
                      </th>

                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Year
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-slate-900">
                          {student.student_code}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-blue-600">
                            <Link
                                href={`/students/${student.id}`}
                                className="hover:text-blue-700 hover:underline"
                            >
                                {student.name}
                            </Link>
                            </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {student.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {student.department}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          Year {student.year}
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