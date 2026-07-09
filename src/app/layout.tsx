import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import "./globals.css";

const defaultSiteName = process.env.APP_NAME || "WebStarter";
const siteDescription = "A production-ready Next.js starter with dashboard";

export const metadata: Metadata = {
  title: defaultSiteName,
  description: siteDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const db = getDb();
  const row = db.prepare("SELECT value FROM site_config WHERE key = 'site_name'").get() as { value: string } | undefined;
  const siteName = row?.value || defaultSiteName;

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--color-text)" }}>
              {siteName}
            </Link>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/features">Features</Link>
              <Link href="/about">About</Link>
              <Link href="/login" className="btn btn-outline" style={{ textDecoration: "none" }}>
                Sign In
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <div className="container">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
