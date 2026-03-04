export default function SalesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Sales Pipeline</h1>
        <p className="text-sm text-slate-500 mt-1">Deal tracking and proposal visibility</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4 opacity-30">$</div>
        <h2 className="text-lg font-semibold text-slate-300 mb-2">Coming in Phase 2</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Copper CRM deals, Arlo proposals, brand conversations, and win/loss tracking
          will appear here once API integrations are wired.
        </p>
      </div>
    </div>
  );
}
