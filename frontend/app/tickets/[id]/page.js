"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getTicketById,
  getTicketActivities,
  getPendingActions,
  getTicketResolution,
  getStudentById,
} from "../../../services/ticketService";































































import LoadingState from "../../../components/common/LoadingState";
import ErrorState from "../../../components/common/ErrorState";
import StatusBadge from "../../../components/common/StatusBadge";
import PriorityBadge from "../../../components/common/PriorityBadge";
import TicketActivityTimeline from "../../../components/tickets/TicketActivityTimeline";
import PendingActionList from "../../../components/tickets/PendingActionList";
import PendingActionForm from "../../../components/tickets/PendingActionForm";
import TicketStatusControl from "../../../components/tickets/TicketStatusControl";
import TicketPriorityControl from "../../../components/tickets/TicketPriorityControl";
import TicketEscalationControl from "../../../components/tickets/TicketEscalationControl";
import TicketResolutionForm from "../../../components/tickets/TicketResolutionForm";
import TicketAssignmentControl from "../../../components/tickets/TicketAssignmentControl";

export default function TicketDetailPage({ params }) {
  const [ticket, setTicket] = useState(null);
  const [activities, setActivities] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolution, setResolution] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadTicket() {
      try {
        const { id } = await params;

        const data = await getTicketById(id);

        const studentData = await getStudentById(
          data.student_id
        );

        const activityData =
          await getTicketActivities(id);

        const pendingActionData =
          await getPendingActions(id);

        let resolutionData = null;

        try {
          resolutionData =
            await getTicketResolution(id);
        } catch (error) {
          resolutionData = null;
        }

        setTicket(data);
        setStudent(studentData);
        setActivities(activityData);
        setPendingActions(pendingActionData);
        setResolution(resolutionData);
      } catch (error) {
        setError("Unable to load ticket");
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [params]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <LoadingState message="Loading ticket..." />
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
        href="/tickets"
        className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
      >
        ← Back to Tickets
      </Link>

      {/* Ticket Header */}
      <div className="mb-8">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <p className="text-sm font-medium text-slate-500">
              {ticket.ticket_number}
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              {ticket.subject}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Ticket details and support information.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />

            <PriorityBadge
              priority={ticket.priority}
            />

            {ticket.is_escalated && (
              <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                Escalated
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Ticket Information */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">

          {/* Status */}
          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <div className="mt-2">
              <StatusBadge status={ticket.status} />
            </div>
          </div>

          <div>
            <TicketStatusControl
              ticketId={ticket.id}
              currentStatus={ticket.status}
              onStatusUpdated={(updatedTicket) => {
                setTicket(updatedTicket);
              }}
            />
          </div>

          {/* Priority */}
          <div>
            <p className="text-sm text-slate-500">
              Priority
            </p>

            <div className="mt-2">
              <PriorityBadge
                priority={ticket.priority}
              />
            </div>
          </div>

          <div>
            <TicketPriorityControl
              ticketId={ticket.id}
              currentPriority={ticket.priority}
              onPriorityUpdated={(updatedTicket) => {
                setTicket(updatedTicket);
              }}
            />
          </div>

          {/* Student */}
          <div>
            <p className="text-sm text-slate-500">
              Student
            </p>

            {student ? (
              <div className="mt-1">
                <p className="text-sm font-medium text-slate-900">
                  {student.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {student.email}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {student.department} · Year{" "}
                  {student.year}
                </p>
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                Loading student...
              </p>
            )}
          </div>

          {/* Assignment */}
          <div>
            <TicketAssignmentControl
              ticketId={ticket.id}
              currentStaffId={
                ticket.assigned_staff_id
              }
              onTicketAssigned={(updatedTicket) => {
                setTicket(updatedTicket);
              }}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <p className="text-sm text-slate-500">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {ticket.description}
            </p>
          </div>

          {/* Escalation */}
          <div>
            <TicketEscalationControl
              ticketId={ticket.id}
              isEscalated={ticket.is_escalated}
              onTicketEscalated={(updatedTicket) => {
                setTicket(updatedTicket);
              }}
            />
          </div>

        </div>
      </div>

      {/* Activity History */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Activity History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            History of actions and changes made to this ticket.
          </p>
        </div>

        <div className="p-6">
          <TicketActivityTimeline
            activities={activities}
          />
        </div>

      </div>

      {/* Pending Actions */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Pending Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Actions that require follow-up for this ticket.
          </p>
        </div>

        <div className="p-6">

          <PendingActionList
            actions={pendingActions}
            onActionCompleted={(completedAction) => {
              setPendingActions((currentActions) =>
                currentActions.map((action) =>
                  action.id === completedAction.id
                    ? completedAction
                    : action
                )
              );
            }}
          />

          <PendingActionForm
            ticketId={ticket.id}
            onActionCreated={(createdAction) => {
              setPendingActions((currentActions) => [
                ...currentActions,
                createdAction,
              ]);
            }}
          />

        </div>
      </div>

      {/* Ticket Resolution */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Ticket Resolution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Record how the student's issue was resolved.
          </p>
        </div>

        <div className="p-6">

          {resolution ? (
            <div>
              <p className="text-sm font-medium text-slate-900">
                Resolution Notes
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {resolution.resolution_notes}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Resolved on{" "}
                {new Date(
                  resolution.resolved_at
                ).toLocaleString()}
              </p>
            </div>
          ) : (
            <TicketResolutionForm
              ticketId={ticket.id}
              onResolutionCreated={(createdResolution) => {
                setResolution(createdResolution);

                setTicket((currentTicket) => ({
                  ...currentTicket,
                  status: "Resolved",
                }));
              }}
            />
          )}

        </div>
      </div>

    </div>
  );
}