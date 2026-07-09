import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Sign In</h1>
        <p>Sign in to your account.</p>
        <LoginForm />
      </div>
    </div>
  );
}
