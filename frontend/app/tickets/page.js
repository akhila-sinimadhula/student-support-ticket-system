"use client";

import { useEffect, useState } from "react";

import TicketCard from "../../components/dashboard/TicketCard";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { getTickets } from "../../services/ticketService";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets();

        setTickets(data);
      } catch (error) {
        setError("Unable to load tickets");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      ticket.ticket_number
        .toLowerCase()
        .includes(searchTerm) ||
      ticket.subject
        .toLowerCase()
        .includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Tickets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student support requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/tickets/create";
          }}
          className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Create Ticket
        </button>
      </div>

      {/* Ticket List */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Search and Filter */}
        <div className="border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All Tickets
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter support requests.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by ticket number or subject..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Statuses
              </option>

              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>
            </select>
          </div>
        </div>

        {/* Tickets */}
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
            tickets.length > 0 &&
            filteredTickets.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-500">
                No tickets match your filters.
              </p>
            )}

          {!loading &&
            !error &&
            filteredTickets.map((ticket) => (
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