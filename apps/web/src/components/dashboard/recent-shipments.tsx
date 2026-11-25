
import { ArrowUpRight } from "lucide-react";

const shipments = [
  {
    reference: "RM-1001",
    customer: "Acme Logistics",
    destination: "Sydney CBD",
    driver: "John Smith",
    status: "In Transit",
  },
  {
    reference: "RM-1002",
    customer: "Fresh Foods Co.",
    destination: "Parramatta",
    driver: "Michael Brown",
    status: "Delivered",
  },
  {
    reference: "RM-1003",
    customer: "Global Supplies",
    destination: "Liverpool",
    driver: "David Wilson",
    status: "Pending",
  },
  {
    reference: "RM-1004",
    customer: "Urban Retail",
    destination: "Chatswood",
    driver: "James Taylor",
    status: "Assigned",
  },
];

const statusStyles: Record<string, string> = {
  "In Transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Assigned: "bg-violet-50 text-violet-700",
};

export default function RecentShipments() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent Shipments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest shipment activity
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Reference</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Destination</th>
              <th className="px-6 py-4 font-medium">Driver</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {shipments.map((shipment) => (
              <tr key={shipment.reference} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                  {shipment.reference}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {shipment.customer}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {shipment.destination}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {shipment.driver}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[shipment.status]}`}
                  >
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
