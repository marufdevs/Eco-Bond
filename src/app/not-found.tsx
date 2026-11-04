// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}