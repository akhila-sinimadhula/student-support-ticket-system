"use client";

import { useEffect, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import TicketCard from "../components/dashboard/TicketCard";
import { getTickets } from "../services/ticketService";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  async function loadTickets() {
    try {
      const data = await getTickets();

      setTickets(data);
    } catch (error) {
      setError("Unable to load dashboard tickets");
    } finally {
      setLoading(false);
    }
  }

  loadTickets();
}, []);
  return (
    <div className="p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of student support activity and tickets.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

        
        <StatCard
          title="Total Tickets"
          value={tickets.length}
          description="All support tickets"
          icon="T"
        />

        <StatCard
          title="Open Tickets"
          value={
            tickets.filter(
              (ticket) => ticket.status === "Open"
            ).length
          }
          description="Currently open"
          icon="O"
        />

        <StatCard
          title="Pending Tickets"
          value={
            tickets.filter(
              (ticket) => ticket.status === "Pending"
            ).length
          }
          description="Waiting for action"
          icon="P"
        />
        <StatCard
          title="Resolved Tickets"
          value={
            tickets.filter(
              (ticket) => ticket.status === "Resolved"
            ).length
          }
          description="Successfully resolved"
          icon="R"
        />

        <StatCard
          title="Escalated"
          value={
            tickets.filter(
              (ticket) => ticket.is_escalated
            ).length
          }
          description="Requires attention"
          icon="!"
        />

      </div>

      {/* Recent Tickets */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

       <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Tickets
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest student support requests.
            </p>
          </div>

          <a
            href="/tickets"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            View all
          </a>

        </div>

       <div className="space-y-3 p-6">

                    {loading && (
            <LoadingState message="Loading tickets..." />
          )}

          {error && (
            <ErrorState message={error} />
          )}

          {!loading &&
            !error &&
            tickets.length === 0 && (
              <p className="text-sm text-slate-500">
                No tickets found.
              </p>
            )}

          {!loading &&
            !error &&
            [...tickets]
    .sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    ).slice(0, 3).map((ticket) => (
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