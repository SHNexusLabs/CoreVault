"use client";

import { useState } from "react";

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

const initialForm: CheckoutFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

interface CheckoutFormProps {
  onContinue?: (data: CheckoutFormData) => void;
}

export function CheckoutForm({ onContinue }: CheckoutFormProps) {
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    const nextForm = {
      ...form,
      [field]: value,
    };

    setForm(nextForm);

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      nextErrors.state = "State is required.";
    }

    if (!form.pinCode.trim()) {
      nextErrors.pinCode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(form.pinCode)) {
      nextErrors.pinCode = "Enter a valid 6-digit PIN code.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  return (
    <section className="rounded-lg border border-(--border) bg-(--background) p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Shipping
        </p>

        <h2 className="mt-1 text-lg font-semibold text-(--foreground)">
          Customer & Shipping Details
        </h2>

        <p className="mt-1 text-sm text-(--foreground-muted)">
          Enter the details needed to deliver your order.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          value={form.fullName}
          error={errors.fullName}
          placeholder="Your full name"
          onChange={(value) => updateField("fullName", value)}
        />

        <Field
          label="Email Address"
          type="email"
          value={form.email}
          error={errors.email}
          placeholder="you@example.com"
          onChange={(value) => updateField("email", value)}
        />

        <Field
          label="Phone Number"
          type="tel"
          value={form.phone}
          error={errors.phone}
          placeholder="9876543210"
          maxLength={10}
          onChange={(value) =>
            updateField("phone", value.replace(/\D/g, "").slice(0, 10))
          }
        />

        <div className="sm:col-span-2">
          <Field
            label="Address"
            value={form.address}
            error={errors.address}
            placeholder="House / Flat / Street / Area"
            onChange={(value) => updateField("address", value)}
          />
        </div>

        <Field
          label="City"
          value={form.city}
          error={errors.city}
          placeholder="Surat"
          onChange={(value) => updateField("city", value)}
        />

        <Field
          label="State"
          value={form.state}
          error={errors.state}
          placeholder="Gujarat"
          onChange={(value) => updateField("state", value)}
        />

        <Field
          label="PIN Code"
          value={form.pinCode}
          error={errors.pinCode}
          placeholder="395001"
          maxLength={6}
          onChange={(value) =>
            updateField("pinCode", value.replace(/\D/g, "").slice(0, 6))
          }
        />
      </div>

      <button
        type="button"
        onClick={() => {
          if (validate()) {
            onContinue?.(form);
          }
        }}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
      >
        Continue
      </button>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

function Field({
  label,
  value,
  error,
  placeholder,
  type = "text",
  maxLength,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-(--foreground)">
        {label}
      </label>

      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        className={`mt-2 h-11 w-full rounded-md border bg-(--surface) px-3 text-sm text-(--foreground) outline-none transition-colors placeholder:text-(--foreground-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--focus-ring) ${
          error ? "border-(--error)" : "border-(--border)"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-(--error)">{error}</p>}
    </div>
  );
}
