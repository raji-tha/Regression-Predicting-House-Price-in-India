import React, { useState } from 'react';
import { datasetStats, sampleData, cleaningSteps } from '@/data/housingData';
import { BarChart } from '@/components/charts/BarChart';

const typeColors: Record<string, string> = {
  object: 'bg-orange-500/20 text-orange-300',
  float64: 'bg-emerald-500/20 text-emerald-300',
  int64: 'bg-sky-500/20 text-sky-300',
};

const tabs = ['Sample Data', 'Data Types', 'Missing Values', 'Cleaning Steps'];

export const DataExploration: React.FC = () => {
  const [tab, setTab] = useState(0);

  const missingBarData = datasetStats.missingValues
    .filter((m) => m.missing > 0)
    .map((m) => ({ label: m.column, value: m.missing, color: m.pct > 10 ? '#ef4444' : '#f97316' }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Dataset Exploration</h2>
        <p className="text-neutral-400 text-sm">Shape: <strong className="text-neutral-200">{datasetStats.rows.toLocaleString()} rows × {datasetStats.columns} columns</strong></p>
      </div>

      <div className="flex gap-1 p-1 rounded-lg w-full overflow-x-auto" style={{ backgroundColor: '#1a1a1a' }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`flex-1 min-w-max text-sm font-medium px-4 py-2 rounded-md transition-all whitespace-nowrap`}
            style={tab === i
              ? { backgroundColor: '#f97316', color: 'white' }
              : { color: '#a3a3a3' }}
          >{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#2a2a2a' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                {['area_type', 'location', 'size', 'total_sqft', 'bath', 'balcony', 'price (L)'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-neutral-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, i) => (
                <tr key={i} className="transition-colors"
                  style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: i % 2 === 0 ? '#141414' : '#111111' }}>
                  <td className="px-4 py-2.5 text-neutral-300 max-w-[140px] truncate">{row.area_type}</td>
                  <td className="px-4 py-2.5 text-neutral-300 max-w-[140px] truncate">{row.location}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#fb923c' }}>{row.size}</span>
                  </td>
                  <td className="px-4 py-2.5 text-neutral-300 font-mono">{row.total_sqft.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-neutral-300 text-center">{row.bath}</td>
                  <td className="px-4 py-2.5 text-neutral-300 text-center">{row.balcony}</td>
                  <td className="px-4 py-2.5 font-semibold" style={{ color: '#34d399' }}>₹{row.price}L</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 text-xs text-neutral-500" style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #2a2a2a' }}>
            Showing 8 of 13,320 records
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: '#2a2a2a' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-400">Column</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-400">Dtype</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-400">Category</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(datasetStats.dtypes).map(([col, dtype], i) => (
                  <tr key={col} style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: i % 2 === 0 ? '#141414' : '#111111' }}>
                    <td className="px-4 py-2.5 font-mono text-neutral-300">{col}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[dtype] || 'bg-neutral-700 text-neutral-300'}`}>{dtype}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-neutral-500">{dtype === 'object' ? 'Categorical' : 'Numerical'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
            <h3 className="font-semibold text-neutral-200 mb-4">Feature Types Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}>
                <div>
                  <div className="font-semibold" style={{ color: '#fb923c' }}>Categorical (object)</div>
                  <div className="text-xs text-neutral-400">area_type, availability, location, size, society</div>
                </div>
                <span className="text-2xl font-black" style={{ color: 'rgba(249,115,22,0.3)' }}>5</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(52,211,153,0.1)' }}>
                <div>
                  <div className="font-semibold" style={{ color: '#34d399' }}>Numerical (float64)</div>
                  <div className="text-xs text-neutral-400">bath, balcony, price, total_sqft (after conversion)</div>
                </div>
                <span className="text-2xl font-black" style={{ color: 'rgba(52,211,153,0.3)' }}>4</span>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(234,179,8,0.1)' }}>
                <div className="font-semibold mb-1" style={{ color: '#fbbf24' }}>Note on total_sqft</div>
                <div className="text-xs text-neutral-400">Some values are ranges like "1000-1200" — converted to midpoint during cleaning.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: '#2a2a2a' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-400">Column</th>
                  <th className="text-right px-4 py-3 font-semibold text-neutral-400">Missing</th>
                  <th className="text-right px-4 py-3 font-semibold text-neutral-400">% Missing</th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {datasetStats.missingValues.map((m, i) => (
                  <tr key={m.column} style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: i % 2 === 0 ? '#141414' : '#111111' }}>
                    <td className="px-4 py-2.5 font-mono text-neutral-300">{m.column}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-neutral-200">{m.missing.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        m.pct > 30 ? 'bg-red-500/20 text-red-400'
                        : m.pct > 5 ? 'bg-orange-500/20 text-orange-400'
                        : m.pct > 0 ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {m.pct.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-neutral-500">{m.missing === 0 ? '✓ Complete' : m.pct > 30 ? 'Drop col' : 'Impute'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
            <BarChart
              data={missingBarData}
              title="Missing Values by Column"
              yLabel="Count"
              horizontal
              formatValue={(v) => v.toLocaleString()}
              darkMode
            />
          </div>
        </div>
      )}

      {tab === 3 && (
        <div className="space-y-3">
          {cleaningSteps.map((s, i) => (
            <div key={i} className="rounded-xl border p-4 flex items-center gap-4" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <div className="w-8 h-8 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: '#f97316' }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-neutral-200">{s.step}</div>
                <div className="text-sm text-neutral-500 truncate">{s.action}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-mono px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171' }}>{s.before.toLocaleString()}</span>
                <span className="text-neutral-600">→</span>
                <span className="text-sm font-mono px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{s.after.toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="rounded-xl border p-4 mt-2" style={{ backgroundColor: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.2)' }}>
            <div className="font-semibold mb-1" style={{ color: '#34d399' }}>After Cleaning</div>
            <p className="text-sm text-neutral-300">Final dataset: <strong className="text-white">12,036 clean rows</strong> ready for feature engineering and model training. Society column dropped entirely due to 41% missingness and low predictive value.</p>
          </div>
        </div>
      )}
    </div>
  );
};
