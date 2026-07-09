"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";

const initialState = null as { error?: string } | null;

export function LoginForm() {
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <form action={dispatch}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" required placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required placeholder="Enter password" />
      </div>
      {state?.error && (
        <p style={{ color: "var(--color-error)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{state.error}</p>
      )}
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        Sign In
      </button>
    </form>
  );
}
