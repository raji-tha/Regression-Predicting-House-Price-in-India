import React, { useState } from 'react';
import { modelResults, featureImportance, cvScores, predictedVsActualRF, predictedVsActualLR, residualsRF } from '@/data/housingData';
import { BarChart } from '@/components/charts/BarChart';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { CheckCircle, TrendingUp, Zap, FlaskConical } from 'lucide-react';

const metricsExplained = [
  { metric: 'R² Score', desc: 'Proportion of price variance explained. 1.0 = perfect, 0 = predicts only the mean.', better: 'Higher' },
  { metric: 'RMSE', desc: 'Root Mean Square Error — average prediction error (₹ Lakhs). Penalises large errors heavily.', better: 'Lower' },
  { metric: 'MAE', desc: 'Mean Absolute Error — average absolute deviation from true price in Lakhs.', better: 'Lower' },
];

const businessInsights = [
  { icon: TrendingUp, title: 'Location is Everything', desc: 'A 3 BHK in Koramangala (₹185L avg) costs nearly 3× the same flat in Electronic City (₹65L). Location premium is the single most impactful non-physical factor.' },
  { icon: Zap, title: 'Size Drives Price Linearly', desc: 'Each 100 sqft increase adds approximately ₹5–8L in value (varies by location). Our model captured this with a 0.87 correlation coefficient.' },
  { icon: CheckCircle, title: 'Random Forest Wins', desc: 'At 91.2% R² vs 81.8% for Linear Regression, the ensemble model significantly outperforms — it captures non-linear location × size interactions.' },
];

const featureLabels: Record<string, string> = {
  total_sqft: 'Total Area (sqft)',
  location_premium: 'Location Premium',
  bath: 'No. of Bathrooms',
  bhk: 'BHK Count',
  price_per_sqft: 'Price per Sqft',
  balcony: 'No. of Balconies',
  area_type_encoded: 'Area Type (encoded)',
};

const modelColors = ['#f97316', '#10b981', '#fb923c'];

type TabId = 'compare' | 'features' | 'insights' | 'advanced';

export const ModelResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('compare');

  const r2Data = modelResults.map((m, i) => ({ label: m.name.split(' ')[0], value: Math.round(m.r2 * 1000) / 10, color: modelColors[i] }));
  const rmseData = modelResults.map((m, i) => ({ label: m.name.split(' ')[0], value: m.rmse, color: modelColors[i] }));
  const fiData = featureImportance.slice(0, 5).map((f) => ({
    label: featureLabels[f.feature] || f.feature,
    value: Math.round(f.importance * 100),
    color: ['#f97316', '#fb923c', '#ea580c', '#10b981', '#fbbf24'][f.rank - 1],
  }));
  const residualBarData = residualsRF.map((r) => ({ label: r.range, value: r.count, color: '#f97316' }));
  const bestModel = modelResults.reduce((a, b) => (b.r2 > a.r2 ? b : a));

  const tabs: { id: TabId; label: string }[] = [
    { id: 'compare', label: 'Model Comparison' },
    { id: 'features', label: 'Feature Importance' },
    { id: 'insights', label: 'Business Insights' },
    { id: 'advanced', label: 'Advanced Metrics' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Model Building & Evaluation</h2>
        <p className="text-neutral-400 text-sm">3 regression models trained, validated, and compared with cross-validation</p>
      </div>

      <div className="flex gap-1 p-1 rounded-lg overflow-x-auto" style={{ backgroundColor: '#1a1a1a' }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className="flex-1 min-w-max text-sm font-medium py-2 px-3 rounded-md transition-all whitespace-nowrap"
            style={activeTab === t.id ? { backgroundColor: '#f97316', color: 'white' } : { color: '#a3a3a3' }}>
            {t.id === 'advanced' && <FlaskConical className="w-3 h-3 inline mr-1" />}
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'compare' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-3 gap-4">
            {modelResults.map((m, mi) => (
              <div key={m.name} className="rounded-xl border-2 p-5 transition-all"
                style={{
                  backgroundColor: '#141414',
                  borderColor: m.name === bestModel.name ? '#f97316' : '#2a2a2a',
                  boxShadow: m.name === bestModel.name ? '0 0 24px rgba(249,115,22,0.15)' : 'none',
                }}>
                {m.name === bestModel.name && (
                  <div className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                    style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#fb923c' }}>★ Best Model</div>
                )}
                <h3 className="font-bold text-white mb-3">{m.name}</h3>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>R² Score</span>
                      <span className="font-bold text-neutral-200">{(m.r2 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a2a' }}>
                      <div className="h-full rounded-full" style={{ width: `${m.r2 * 100}%`, backgroundColor: modelColors[mi] }} />
                    </div>
                  </div>
                  {[['RMSE', `₹${m.rmse}L`], ['MAE', `₹${m.mae}L`], ['Train Time', `${m.trainTime}s`]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-neutral-500">{k}</span>
                      <span className="font-semibold text-neutral-200">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <BarChart data={r2Data} title="R² Score Comparison (%)" formatValue={(v) => `${v}%`} height={240} darkMode />
            </div>
            <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <BarChart data={rmseData} title="RMSE Comparison (₹ Lakhs)" formatValue={(v) => `₹${v}L`} height={240} darkMode />
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                  {['Model', 'RMSE ↓', 'MAE ↓', 'R² ↑', 'CV Mean', 'CV Std', 'Verdict'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-neutral-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modelResults.map((m, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid #2a2a2a',
                    backgroundColor: m.name === bestModel.name ? 'rgba(249,115,22,0.06)' : i % 2 === 0 ? '#141414' : '#111111',
                  }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: modelColors[i] }} />
                        <span className="font-medium text-neutral-200">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-neutral-300">{m.rmse}</td>
                    <td className="px-4 py-3 font-mono text-neutral-300">{m.mae}</td>
                    <td className="px-4 py-3 font-mono font-semibold" style={{ color: modelColors[i] }}>{(m.r2 * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 font-mono text-neutral-300">{(cvScores[i].mean * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 font-mono text-neutral-500">±{cvScores[i].std.toFixed(3)}</td>
                    <td className="px-4 py-3">
                      {m.name === bestModel.name
                        ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#fb923c' }}>Recommended</span>
                        : <span className="text-neutral-600 text-xs">Baseline</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3">
            {metricsExplained.map((m) => (
              <div key={m.metric} className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="font-mono font-bold text-sm mt-0.5 min-w-[60px]" style={{ color: '#f97316' }}>{m.metric}</span>
                <p className="flex-1 text-sm text-neutral-400">{m.desc}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${m.better === 'Higher' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>{m.better}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-5">
          <div className="rounded-xl border p-6" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
            <BarChart data={fiData} title="Top 5 Features — Random Forest Importance Score" horizontal formatValue={(v) => `${v}%`} height={280} darkMode />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {featureImportance.slice(0, 5).map((f, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#2a2a2a', color: '#f97316' }}>#{f.rank}</span>
                    <span className="font-semibold text-neutral-200 text-sm">{featureLabels[f.feature]}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{(f.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a2a' }}>
                  <div className="h-full rounded-full" style={{ width: `${f.importance * 100}%`, backgroundColor: ['#f97316', '#fb923c', '#ea580c', '#10b981', '#fbbf24'][i] }} />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  {['Dominant predictor — area size drives value most directly.', 'Location quality (IT hubs, schools) adds/subtracts significantly.', 'More bathrooms indicate larger/luxury homes — strong proxy.', 'Bedroom count and size are interlinked price signals.', 'Derived feature: price ÷ sqft isolates location value.'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-4">
          {businessInsights.map((ins, i) => (
            <div key={i} className="rounded-xl border p-5 flex items-start gap-4" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                <ins.icon className="w-5 h-5" style={{ color: '#f97316' }} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{ins.title}</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">{ins.desc}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl border p-5" style={{ backgroundColor: 'rgba(249,115,22,0.07)', borderColor: 'rgba(249,115,22,0.2)' }}>
            <h4 className="font-bold mb-3" style={{ color: '#fb923c' }}>Actionable Recommendations</h4>
            <ul className="space-y-2">
              {[
                'Buyers seeking value: Electronic City & Marathahalli offer 40–50% lower per-sqft prices than central areas with comparable connectivity.',
                'Investors: 2 BHK in mid-tier locations (JP Nagar, Hebbal) show the best price-to-rent yield ratios.',
                'Developers: Standardise sqft reporting — Super built-up vs Carpet Area discrepancy inflates listed prices by 15–20%.',
                'The model estimates price within ±₹38L for most properties — reliable for initial property valuation screening.',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#f97316' }}>→</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="space-y-6">
          {/* Predicted vs Actual */}
          <div>
            <h3 className="font-bold text-white mb-1">Predicted vs Actual Price</h3>
            <p className="text-xs text-neutral-500 mb-3">Points along the green diagonal = perfect prediction. Tighter cluster = better model.</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <ScatterPlot
                  data={predictedVsActualRF}
                  extraData={predictedVsActualLR}
                  extraColor="#94a3b8"
                  extraLabel="LR"
                  title="Predicted vs Actual — RF (orange) vs LR (grey)"
                  xLabel="Actual Price (₹L)"
                  yLabel="Predicted (₹L)"
                  showPerfectLine
                  color="#f97316"
                  height={280}
                  darkMode
                />
              </div>
              <div className="rounded-xl border p-5 space-y-4" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <h4 className="font-semibold text-neutral-300 text-sm">What this tells us</h4>
                <div className="space-y-3">
                  {[
                    { color: '#f97316', label: 'Random Forest', note: 'Points tightly clustered around diagonal — high accuracy, minimal systematic bias.' },
                    { color: '#94a3b8', label: 'Linear Regression', note: 'More scatter, especially for high-value properties — misses luxury segment pricing.' },
                    { color: '#22c55e', label: 'Perfect Prediction Line', note: 'y = x diagonal. A perfect model would place all points exactly on this line.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <div>
                        <div className="text-xs font-semibold text-neutral-300">{item.label}</div>
                        <div className="text-xs text-neutral-500">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cross Validation */}
          <div>
            <h3 className="font-bold text-white mb-1">5-Fold Cross Validation</h3>
            <p className="text-xs text-neutral-500 mb-3">Ensures the model performance is consistent — not just lucky on one train/test split.</p>
            <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
                    {['Model', 'Fold 1', 'Fold 2', 'Fold 3', 'Fold 4', 'Fold 5', 'Mean R²', 'Std Dev', 'Stability'].map((h) => (
                      <th key={h} className="text-left px-3 py-3 font-semibold text-neutral-400 whitespace-nowrap text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cvScores.map((cv, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: i % 2 === 0 ? '#141414' : '#111111' }}>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cv.color }} />
                          <span className="font-medium text-neutral-200 text-xs">{cv.model}</span>
                        </div>
                      </td>
                      {cv.folds.map((f, fi) => (
                        <td key={fi} className="px-3 py-3 font-mono text-xs" style={{ color: cv.color }}>{f.toFixed(3)}</td>
                      ))}
                      <td className="px-3 py-3 font-mono font-bold text-xs text-white">{cv.mean.toFixed(3)}</td>
                      <td className="px-3 py-3 font-mono text-xs text-neutral-500">±{cv.std.toFixed(3)}</td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cv.std <= 0.007 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {cv.std <= 0.007 ? 'Stable' : 'Moderate'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 text-xs text-neutral-500" style={{ borderTop: '1px solid #2a2a2a' }}>
                Low std dev confirms Random Forest generalises well — performance is consistent across different data splits
              </div>
            </div>
          </div>

          {/* Residuals */}
          <div>
            <h3 className="font-bold text-white mb-1">Residuals Distribution (Random Forest)</h3>
            <p className="text-xs text-neutral-500 mb-3">Residual = Predicted − Actual. Bell-curve centred near 0 confirms no systematic bias.</p>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2 rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <BarChart data={residualBarData} title="Residuals Distribution (₹ Lakhs)" xLabel="Error Range (₹L)" yLabel="Count" height={260} darkMode />
              </div>
              <div className="rounded-xl border p-5 space-y-3" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <h4 className="font-semibold text-neutral-300 text-sm">Residual Analysis</h4>
                {[
                  { label: 'Mean Residual', value: '+2.3L', note: 'Slight over-prediction bias' },
                  { label: 'Std Residual', value: '34.8L', note: 'Spread of errors' },
                  { label: '% within ±20L', value: '68.4%', note: 'Within 1σ' },
                  { label: '% within ±40L', value: '89.2%', note: 'Within 2σ' },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ backgroundColor: '#111' }}>
                    <div className="text-xs text-neutral-500">{item.label}</div>
                    <div className="font-bold text-white">{item.value}</div>
                    <div className="text-xs text-neutral-600">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
