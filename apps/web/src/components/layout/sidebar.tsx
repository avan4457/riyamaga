
"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  CarFront,
  Settings,
  MapPinned,
  ChartNoAxesCombined,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Shipments", href: "/shipments", icon: Package },
      { label: "Delivery Jobs", href: "/delivery-jobs", icon: MapPinned },
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Drivers", href: "/drivers", icon: Truck },
      { label: "Vehicles", href: "/vehicles", icon: CarFront },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
          R
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            RiyaMaga
          </h1>
          <p className="text-xs text-slate-500">
            Logistics Platform
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              Admin User
            </p>
            <p className="text-xs text-slate-500">
              Operations Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
