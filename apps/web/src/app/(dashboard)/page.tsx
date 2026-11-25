
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import KpiCard from "@/components/dashboard/kpi-card";
import RecentShipments from "@/components/dashboard/recent-shipments";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, Admin
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here's what's happening with your logistics operations today.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total Shipments"
          value="1,284"
          change="+12.5%"
          description="vs last month"
          icon={Package}
        />

        <KpiCard
          title="In Transit"
          value="186"
          change="+8.2%"
          description="vs last month"
          icon={Truck}
        />

        <KpiCard
          title="Delivered"
          value="1,042"
          change="+15.3%"
          description="vs last month"
          icon={CheckCircle2}
        />

        <KpiCard
          title="Pending"
          value="56"
          change="-4.5%"
          description="vs last month"
          icon={Clock3}
        />
      </section>

      <RecentShipments />
    </div>
  );
}
