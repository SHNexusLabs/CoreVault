"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
}

const initialProfile: ProfileData = {
  fullName: "",
  email: "",
  phone: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
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
            Profile
          </h1>

          <p className="mt-1 text-sm text-(--foreground-muted)">
            Manage your personal information.
          </p>
        </div>

        <section className="mt-8 rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
          <div className="flex items-center gap-4 border-b border-(--border) pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--primary) text-(--primary-foreground)">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-(--foreground)">
                Personal Information
              </h2>

              <p className="mt-1 text-xs text-(--foreground-muted)">
                Keep your account information up to date.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Field
              label="Full Name"
              value={profile.fullName}
              onChange={(value) => {
                setProfile((current) => ({
                  ...current,
                  fullName: value,
                }));
                setSaved(false);
              }}
            />

            <Field
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(value) => {
                setProfile((current) => ({
                  ...current,
                  email: value,
                }));
                setSaved(false);
              }}
            />

            <Field
              label="Phone Number"
              type="tel"
              value={profile.phone}
              onChange={(value) => {
                setProfile((current) => ({
                  ...current,
                  phone: value,
                }));
                setSaved(false);
              }}
            />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="h-10 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground)"
              >
                Save Changes
              </button>

              {saved && (
                <span className="text-sm font-medium text-(--success)">
                  Changes saved
                </span>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border border-(--border) bg-(--background) px-3 text-sm text-(--foreground) outline-none focus:border-(--primary)"
      />
    </label>
  );
}
