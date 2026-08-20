"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";

import { useAddressStore } from "@/store/addresses";
import type { Address } from "@/types/order";

const emptyAddress: Omit<Address, "id"> = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

export default function AddressesPage() {
  const addresses = useAddressStore((state) => state.addresses);
  const addAddress = useAddressStore((state) => state.addAddress);
  const updateAddress = useAddressStore((state) => state.updateAddress);
  const removeAddress = useAddressStore((state) => state.removeAddress);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyAddress);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyAddress);
  };

  const startEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pinCode.trim()
    ) {
      return;
    }

    if (editingId) {
      updateAddress(editingId, {
        id: editingId,
        ...form,
      });
    } else {
      addAddress({
        id: crypto.randomUUID(),
        ...form,
      });
    }

    setEditingId(null);
    setForm(emptyAddress);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="text-sm font-medium text-(--primary) hover:underline"
        >
          ← My Account
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-(--foreground)">
              My Addresses
            </h1>

            <p className="mt-1 text-sm text-(--foreground-muted)">
              Manage your saved shipping addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={startAdd}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground)"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-xl border border-(--border) bg-(--surface) p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-(--background)">
                  <MapPin className="h-5 w-5 text-(--primary)" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-(--foreground)">
                    {address.fullName}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-(--foreground-secondary)">
                    {address.address}
                    <br />
                    {address.city}, {address.state} {address.pinCode}
                    <br />
                    {address.phone}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-(--border) pt-4">
                <button
                  type="button"
                  onClick={() => startEdit(address)}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-(--border) px-3 text-sm font-medium text-(--foreground) hover:border-(--primary)"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-(--border) px-3 text-sm font-medium text-red-500 hover:border-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="mt-8 rounded-xl border border-(--border) bg-(--surface) px-6 py-14 text-center">
            <MapPin className="mx-auto h-10 w-10 text-(--foreground-muted)" />

            <h2 className="mt-4 text-lg font-semibold text-(--foreground)">
              No saved addresses
            </h2>

            <p className="mt-2 text-sm text-(--foreground-muted)">
              Add an address to make checkout faster.
            </p>
          </div>
        )}

        {(editingId !== null ||
          form.fullName !== "" ||
          addresses.length === 0) && (
          <section className="mt-8 rounded-xl border border-(--border) bg-(--surface) p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-(--foreground)">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    fullName: value,
                  }))
                }
              />

              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    phone: value,
                  }))
                }
              />

              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  value={form.address}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      address: value,
                    }))
                  }
                />
              </div>

              <Field
                label="City"
                value={form.city}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    city: value,
                  }))
                }
              />

              <Field
                label="State"
                value={form.state}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    state: value,
                  }))
                }
              />

              <Field
                label="PIN Code"
                value={form.pinCode}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    pinCode: value,
                  }))
                }
              />

              <div className="flex items-end gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyAddress);
                    }}
                    className="h-10 rounded-md border border-(--border) px-4 text-sm font-medium text-(--foreground)"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="h-10 flex-1 rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground)"
                >
                  {editingId ? "Save Changes" : "Save Address"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-(--foreground)">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border border-(--border) bg-(--background) px-3 text-sm text-(--foreground) outline-none placeholder:text-(--foreground-muted) focus:border-(--primary)"
      />
    </label>
  );
}
