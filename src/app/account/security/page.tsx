"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Shield } from "lucide-react";

export default function SecurityPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="text-sm font-medium text-(--primary) hover:underline"
        >
          ← My Account
        </Link>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            Account
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-(--foreground)">
            Security
          </h1>

          <p className="mt-1 text-sm text-(--foreground-muted)">
            Manage your password and account security.
          </p>
        </div>

        <section className="mt-8 rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
          <div className="flex items-center gap-4 border-b border-(--border) pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary) text-(--primary-foreground)">
              <Shield className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-(--foreground)">
                Change Password
              </h2>

              <p className="mt-1 text-xs text-(--foreground-muted)">
                Use a strong password to protect your account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <PasswordField label="Current Password" />

            <PasswordField label="New Password" />

            <PasswordField label="Confirm New Password" />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
              >
                <Lock className="h-4 w-4" />
                Update Password
              </button>

              {saved && (
                <span className="text-sm font-medium text-(--success)">
                  Password updated
                </span>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function PasswordField({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>

      <input
        type="password"
        required
        className="mt-1.5 h-10 w-full rounded-md border border-(--border) bg-(--background) px-3 text-sm text-(--foreground) outline-none focus:border-(--primary)"
      />
    </label>
  );
}
