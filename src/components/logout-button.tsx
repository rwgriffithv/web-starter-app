"use client";

import { useFormStatus } from "react-dom";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <form action={logout}>
      <button
        type="submit"
        disabled={pending}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "transparent",
          color: "var(--color-sidebar-text)",
          fontSize: "0.875rem",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--color-sidebar-active)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-sidebar-text)"; }}
      >
        {pending ? "Signing out..." : "Sign Out"}
      </button>
    </form>
  );
}
