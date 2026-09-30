"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getStudentById,
  getTicketsByStudent,
} from "../../../services/ticketService";

import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";
import StatusBadge from "../../../components/common/StatusBadge";
import PriorityBadge from "../../../components/common/PriorityBadge";
import TicketCard from "../../../components/dashboard/TicketCard";

export default function StudentDetailPage({ params }) {
  const [student, setStudent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudent() {
      try {
        const { id } = await params;

        const studentData = await getStudentById(id);
        const ticketData = await getTicketsByStudent(id);

        setStudent(studentData);
        setTickets(ticketData);
      } catch (error) {
        setError("Unable to load student");
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [params]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <LoadingState message="Loading student..." />
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
        href="/students"
        className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to Students
      </Link>

      {/* Student Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  <div>
    <h1 className="text-2xl font-semibold text-slate-900">
      {student.name}
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Student profile and support ticket history.
    </p>
  </div>

  <Link
    href={`/students/${student.id}/edit`}
    className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
  >
    Edit Student
  </Link>
</div>

      {/* Student Information */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Student Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Student Code
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {student.student_code}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {student.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {student.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Department
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {student.department}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Year
            </p>

            <p className="mt-1 text-sm text-slate-700">
              Year {student.year}
            </p>
          </div>

        </div>
      </div>

      {/* Ticket History */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Support tickets associated with this student.
          </p>
        </div>

        <div className="space-y-3 p-6">

          {tickets.length === 0 && (
            <p className="text-sm text-slate-500">
              No tickets found for this student.
            </p>
          )}

          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              ticketNumber={ticket.ticket_number}
              subject={ticket.subject}
              status={ticket.status}
              priority={ticket.priority}
            />
          ))}

        </div>
      </div>

    </div>
  );
}