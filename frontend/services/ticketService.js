import { API_URL } from "../config/api";
import { getToken } from "./authService";


async function apiFetch(url, options = {}) {
  const token = getToken();

  console.log("API REQUEST:", url);
  console.log("AUTH TOKEN EXISTS:", !!token);

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}


export async function getTickets() {
  const response = await apiFetch(`${API_URL}/tickets/`);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}


export async function getTicketById(ticketId) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}


export async function getTicketActivities(ticketId) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}/activities`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket activities");
  }

  return response.json();
}


export async function getPendingActions(ticketId) {
  const response = await apiFetch(
    `${API_URL}/pending-actions/ticket/${ticketId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pending actions");
  }

  return response.json();
}


export async function completePendingAction(actionId) {
  const response = await apiFetch(
    `${API_URL}/pending-actions/${actionId}/complete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Completed",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to complete pending action");
  }

  return response.json();
}


export async function updateTicketStatus(ticketId, status) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }

  return response.json();
}


export async function updateTicketPriority(ticketId, priority) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}/priority`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priority,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket priority");
  }

  return response.json();
}


export async function escalateTicket(ticketId) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}/escalate`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to escalate ticket");
  }

  return response.json();
}


export async function createTicketResolution(
  ticketId,
  resolutionNotes
) {
  const response = await apiFetch(
    `${API_URL}/ticket-resolutions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: ticketId,
        resolution_notes: resolutionNotes,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create ticket resolution");
  }

  return response.json();
}


export async function getTicketResolution(ticketId) {
  const response = await apiFetch(
    `${API_URL}/ticket-resolutions/${ticketId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket resolution");
  }

  return response.json();
}


export async function assignTicket(ticketId, staffId) {
  const response = await apiFetch(
    `${API_URL}/tickets/${ticketId}/assign`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        staff_id: staffId,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to assign ticket"
    );
  }

  return response.json();
}


export async function getStaff() {
  const response = await apiFetch(
    `${API_URL}/staff/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch staff");
  }

  return response.json();
}


export async function getStaffById(staffId) {
  const response = await apiFetch(
    `${API_URL}/staff/${staffId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch staff member");
  }

  return response.json();
}


export async function getStudents() {
  const response = await apiFetch(
    `${API_URL}/students/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}


export async function getStudentById(studentId) {
  const response = await apiFetch(
    `${API_URL}/students/${studentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }

  return response.json();
}


export async function getTicketsByStudent(studentId) {
  const response = await apiFetch(
    `${API_URL}/tickets/student/${studentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch student tickets");
  }

  return response.json();
}


export async function createTicket(
  studentId,
  subject,
  description,
  priority
) {
  const response = await apiFetch(
    `${API_URL}/tickets/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        subject,
        description,
        priority,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to create ticket"
    );
  }

  return response.json();
}


export async function createPendingAction(
  ticketId,
  actionDescription,
  dueAt
) {
  const response = await apiFetch(
    `${API_URL}/pending-actions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: ticketId,
        action_description: actionDescription,
        due_at: dueAt || null,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to create pending action"
    );
  }

  return response.json();
}


export async function updateStudent(
  studentId,
  name,
  email,
  department,
  year
) {
  const response = await apiFetch(
    `${API_URL}/students/${studentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        department,
        year,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to update student"
    );
  }

  return response.json();
}


export async function updateStaff(
  staffId,
  name,
  email,
  role
) {
  const response = await apiFetch(
    `${API_URL}/staff/${staffId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        role,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Failed to update staff"
    );
  }

  return response.json();
}