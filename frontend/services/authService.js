const API_URL = "http://127.0.0.1:8000";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  localStorage.setItem("access_token", data.access_token);

  localStorage.setItem(
    "current_staff",
    JSON.stringify({
      id: data.staff_id,
      name: data.name,
      email: data.email,
      role: data.role
    })
  );

  return data;
}


export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}


export function getCurrentStaff() {
  if (typeof window === "undefined") {
    return null;
  }

  const staff = localStorage.getItem("current_staff");

  return staff ? JSON.parse(staff) : null;
}


export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("current_staff");
}