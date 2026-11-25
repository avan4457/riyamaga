
"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Package, X } from "lucide-react";

type ShipmentStatus =
  | "Pending"
  | "Assigned"
  | "In Transit"
  | "Delivered"
  | "Delivery Failed";

interface Shipment {
  reference: string;
  customer: string;
  origin: string;
  destination: string;
  driver: string;
  status: ShipmentStatus;
  createdAt: string;
  scheduledAt?: string;
  description?: string;
}

const sampleShipments: Shipment[] = [
  {
    reference: "RM-1001",
    customer: "Acme Logistics",
    origin: "Sydney",
    destination: "Parramatta",
    driver: "John Smith",
    status: "In Transit",
    createdAt: "16 Nov 2026",
  },
  {
    reference: "RM-1002",
    customer: "Fresh Foods Co.",
    origin: "Liverpool",
    destination: "Sydney CBD",
    driver: "Michael Brown",
    status: "Delivered",
    createdAt: "15 Nov 2026",
  },
  {
    reference: "RM-1003",
    customer: "Global Supplies",
    origin: "Penrith",
    destination: "Blacktown",
    driver: "Unassigned",
    status: "Pending",
    createdAt: "15 Nov 2026",
  },
  {
    reference: "RM-1004",
    customer: "Urban Retail",
    origin: "Chatswood",
    destination: "North Sydney",
    driver: "James Taylor",
    status: "Assigned",
    createdAt: "14 Nov 2026",
  },
  {
    reference: "RM-1005",
    customer: "City Distributors",
    origin: "Bankstown",
    destination: "Liverpool",
    driver: "David Wilson",
    status: "Delivery Failed",
    createdAt: "13 Nov 2026",
  },
];

const statuses = [
  "All",
  "Pending",
  "Assigned",
  "In Transit",
  "Delivered",
  "Delivery Failed",
];

const statusStyles: Record<ShipmentStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Assigned: "bg-purple-50 text-purple-700",
  "In Transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-green-50 text-green-700",
  "Delivery Failed": "bg-red-50 text-red-700",
};

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState(sampleShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    customer: "",
    origin: "",
    destination: "",
    scheduledAt: "",
    description: "",
  });

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch = [
        shipment.reference,
        shipment.customer,
        shipment.origin,
        shipment.destination,
        shipment.driver,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || shipment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  function handleCreateShipment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextNumber =
      Math.max(
        ...shipments.map((shipment) =>
          Number(shipment.reference.replace("RM-", "")),
        ),
      ) + 1;

    const newShipment: Shipment = {
      reference: `RM-${nextNumber}`,
      customer: formData.customer.trim(),
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      driver: "Unassigned",
      status: "Pending",
      createdAt: new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      scheduledAt: formData.scheduledAt,
      description: formData.description.trim(),
    };

    setShipments((current) => [newShipment, ...current]);
    setSearch("");
    setStatusFilter("All");
    setSuccessMessage(
      `${newShipment.reference} was created successfully.`,
    );

    setFormData({
      customer: "",
      origin: "",
      destination: "",
      scheduledAt: "",
      description: "",
    });

    setIsModalOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Shipments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track all your shipments.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Demonstration data — not live operational records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccessMessage("");
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Shipment
        </button>
      </div>

      {successMessage && (
        <div
          role="status"
          className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {successMessage}
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss success message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference, customer, driver or location..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
            aria-label="Filter shipments by status"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All statuses" : status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm font-medium text-slate-700">
            Shipment records
          </p>
          <p className="text-xs text-slate-500">
            {filteredShipments.length} results
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Route</th>
                <th className="px-5 py-4">Driver</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredShipments.map((shipment) => (
                <tr
                  key={shipment.reference}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-blue-700">
                    {shipment.reference}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {shipment.customer}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {shipment.origin} → {shipment.destination}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {shipment.driver}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {shipment.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[shipment.status]}`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <Package
                      size={28}
                      className="mx-auto mb-3 text-slate-300"
                    />
                    <p className="font-medium text-slate-700">
                      No shipments found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-shipment-title"
            className="my-auto w-full max-w-xl rounded-xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2
                  id="create-shipment-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  Create Shipment
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the shipment details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="space-y-4 p-6">
              <div>
                <label
                  htmlFor="customer"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Customer name *
                </label>
                <input
                  id="customer"
                  required
                  maxLength={100}
                  value={formData.customer}
                  onChange={(event) =>
                    setFormData({ ...formData, customer: event.target.value })
                  }
                  placeholder="e.g. Acme Logistics"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="origin"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Origin *
                  </label>
                  <input
                    id="origin"
                    required
                    maxLength={150}
                    value={formData.origin}
                    onChange={(event) =>
                      setFormData({ ...formData, origin: event.target.value })
                    }
                    placeholder="e.g. Sydney"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Destination *
                  </label>
                  <input
                    id="destination"
                    required
                    maxLength={150}
                    value={formData.destination}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        destination: event.target.value,
                      })
                    }
                    placeholder="e.g. Parramatta"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="scheduledAt"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Scheduled delivery date *
                </label>
                <input
                  id="scheduledAt"
                  type="date"
                  required
                  value={formData.scheduledAt}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      scheduledAt: event.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Description
                  <span className="ml-1 font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>
                <textarea
                  id="description"
                  rows={3}
                  maxLength={500}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  placeholder="Additional shipment information..."
                  className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Create Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
