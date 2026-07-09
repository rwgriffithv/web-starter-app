import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteName = process.env.APP_NAME || "WebStarter";
const siteDescription = "A production-ready Next.js starter with dashboard";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
