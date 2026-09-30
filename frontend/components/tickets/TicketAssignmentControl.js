"use client";

import { useEffect, useState } from "react";

import {
  assignTicket,
  getStaff,
} from "../../services/ticketService";

export default function TicketAssignmentControl({
  ticketId,
  currentStaffId,
  onTicketAssigned,
}) {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(
    currentStaffId || ""
  );
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
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

  async function handleAssignment(event) {
    const staffId = event.target.value;

    if (!staffId) {
      return;
    }

    try {
      setError("");
      setAssigning(true);

      const updatedTicket = await assignTicket(
        ticketId,
        Number(staffId)
      );

      setSelectedStaff(updatedTicket.assigned_staff_id);

      onTicketAssigned(updatedTicket);
    } catch (error) {
      setError("Unable to assign ticket");
      setSelectedStaff(currentStaffId || "");
    } finally {
      setAssigning(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-slate-500">
        Assign Staff
      </p>

      <select
        value={selectedStaff}
        onChange={handleAssignment}
        disabled={loading || assigning}
        className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      >
        <option value="">
          {loading ? "Loading staff..." : "Select staff"}
        </option>

        {staff.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>

      {assigning && (
        <p className="mt-1 text-xs text-slate-500">
          Assigning...
        </p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}