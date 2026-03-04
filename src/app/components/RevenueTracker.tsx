export function RevenueTracker() {
  const current = 0;
  const goal = 25_000_000;
  const pct = Math.round((current / goal) * 100);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-100">Revenue Tracker</h2>
        <span className="text-xs text-slate-500">YTD 2026</span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold text-slate-100">$0</span>
        <span className="text-sm text-slate-500 mb-1">of $25M goal</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${Math.max(pct, 1)}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{pct}% of goal</span>
        <span className="text-slate-600">Revenue data coming in Phase 2</span>
      </div>

      {/* Source indicators */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {["Copper", "Impact", "RedVentures", "AdsByMoney", "MSN"].map((source) => (
          <div key={source} className="text-center">
            <div className="text-xs text-slate-600 mb-1">{source}</div>
            <div className="h-1 bg-slate-800 rounded-full">
              <div className="h-1 bg-slate-700 rounded-full w-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
