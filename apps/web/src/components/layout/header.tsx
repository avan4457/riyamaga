
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Overview of your logistics operations
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400 sm:flex">
          <Search size={17} />
          <span>Search shipments...</span>
          <span className="ml-4 rounded bg-slate-100 px-2 py-1 text-xs">
            ⌘ K
          </span>
        </div>

        <div className="relative text-slate-500">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-600" />
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          AD
        </div>
      </div>
    </header>
  );
}
