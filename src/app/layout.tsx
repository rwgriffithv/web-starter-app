import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--color-text)" }}>
              {config.siteName}
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
            &copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
