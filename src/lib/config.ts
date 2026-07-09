function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[config] ${name} is required but not set. ` +
      `Set ${name} in your environment or .env file.`,
    );
  }
  return value;
}

let _config: {
  siteName: string;
  siteDescription: string;
  adminUsername: string;
  adminPassword: string;
  sessionSecret: string;
} | null = null;

export function getConfig() {
  if (!_config) {
    _config = {
      siteName: process.env.APP_NAME || "WebStarter",
      siteDescription: "A production-ready Next.js starter with dashboard",
      adminUsername: requireEnv("ADMIN_USERNAME"),
      adminPassword: requireEnv("ADMIN_PASSWORD"),
      sessionSecret: requireEnv("SESSION_SECRET"),
    };
  }
  return _config;
}
