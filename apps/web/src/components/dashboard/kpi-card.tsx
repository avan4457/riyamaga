
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
}

export default function KpiCard({
  title,
  value,
  change,
  description,
  icon: Icon,
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>

        <div className="mt-2 flex items-center gap-1 text-xs">
          <TrendingUp size={14} className="text-emerald-600" />
          <span className="font-semibold text-emerald-600">{change}</span>
          <span className="text-slate-500">{description}</span>
        </div>
      </div>
    </div>
  );
}
