"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "../../services/authService";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(event) {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    await login(email, password);

    window.dispatchEvent(new Event("auth-change"));

    router.push("/");
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "32px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>
          Student Support
        </h1>

        <p style={{ marginBottom: "24px", color: "#666" }}>
          Sign in to your account
        </p>


        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          </div>


          <div style={{ marginBottom: "16px" }}>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          </div>


          {error && (
            <p style={{ color: "red", marginBottom: "16px" }}>
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>
      </div>
    </main>
  );
}