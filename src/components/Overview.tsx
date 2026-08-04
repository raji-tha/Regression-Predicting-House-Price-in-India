import React, { useEffect, useState } from 'react';
import { Database, TrendingUp, MapPin, Home, BarChart2, Award, ChevronRight, Target, Layers, GitBranch, FlaskConical, Trophy } from 'lucide-react';

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

function useAnimCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

const keyFindings = [
  { icon: Trophy, value: 91.2, suffix: '%', label: 'Model Accuracy', sub: 'Random Forest R² Score', color: '#f97316' },
  { icon: MapPin, value: 3, suffix: '×', label: 'Location Gap', sub: 'Koramangala vs Electronic City', color: '#fb923c' },
  { icon: Target, value: 87.2, suffix: '%', label: 'Top Feature', sub: 'Total sqft importance score', color: '#10b981' },
  { icon: TrendingUp, value: 38.7, suffix: 'L', label: 'Avg Prediction Error', sub: 'RMSE (₹ Lakhs)', color: '#fbbf24' },
];

const pipeline = [
  { step: '01', title: 'Load & Explore', desc: 'Inspect data types, shapes, missing values, and sample records.', tab: 'data', icon: Database },
  { step: '02', title: 'Data Cleaning', desc: 'Handle missing values, fix sqft ranges, remove outliers.', tab: 'data', icon: Layers },
  { step: '03', title: 'EDA', desc: 'Visualize distributions and feature-price relationships.', tab: 'eda', icon: BarChart2 },
  { step: '04', title: 'Feature Engineering', desc: 'Create price_per_sqft, encode categorical variables.', tab: 'eda', icon: GitBranch },
  { step: '05', title: 'Model Building', desc: 'Train Linear Regression, Decision Tree, Random Forest.', tab: 'models', icon: FlaskConical },
  { step: '06', title: 'Evaluation', desc: 'RMSE, MAE, R², cross-validation, and feature importance.', tab: 'models', icon: Award },
];

const conclusions = [
  'Random Forest with 91.2% R² is the recommended model — it captures non-linear location × size interactions that linear models cannot.',
  'Location alone accounts for a 3× price multiplier — the same 1,200 sqft flat costs ₹60L in Electronic City vs ₹180L in Koramangala.',
  'Feature engineering (price_per_sqft) was critical: it improved Random Forest R² by ~3.5 percentage points over the raw feature set.',
  'Cross-validation confirms stability: Random Forest scored 0.905–0.921 across all 5 folds (std = 0.006), showing no overfitting.',
];

function KeyFindingCard({ icon: Icon, value, suffix, label, sub, color, delay }: typeof keyFindings[0] & { delay: number }) {
  const animated = useAnimCounter(Math.round(value * 10), 1200 + delay);
  const display = value % 1 === 0 ? animated.toString() : (animated / 10).toFixed(1);
  return (
    <div className="rounded-xl p-5 border flex flex-col gap-2 transition-all hover:scale-[1.02]"
      style={{ backgroundColor: '#141414', borderColor: '#2a2a2a', borderTopWidth: 3, borderTopColor: color }}>
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-3xl font-black" style={{ color }}>{display}{suffix}</span>
      </div>
      <div>
        <div className="font-bold text-white text-sm">{label}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

export const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden p-8 md:p-12"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ea580c 0%, transparent 40%)' }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #f97316 40px, #f97316 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #f97316 40px, #f97316 41px)' }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border"
            style={{ backgroundColor: 'rgba(249,115,22,0.15)', borderColor: 'rgba(249,115,22,0.3)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#f97316' }} />
            <span className="text-sm font-medium" style={{ color: '#fb923c' }}>Machine Learning — Regression Project</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Housing Price<br />
            <span style={{ color: '#f97316' }}>Forecasting Engine</span>
          </h1>
          <p className="text-neutral-300 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
            A complete end-to-end regression pipeline — from raw data cleaning to model deployment — predicting
            residential property values using area, location, BHK, and engineered features.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'].map((tag) => (
              <span key={tag} className="text-neutral-300 text-xs px-3 py-1 rounded-full border"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)' }}>{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('predict')}
              className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
              Try Price Predictor <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('eda')}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.2)', color: '#e5e5e5' }}>
              View EDA Charts
            </button>
          </div>
        </div>
      </div>

      {/* Animated Key Findings */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#f97316' }} />
          <h2 className="text-lg font-bold text-white">Key Findings</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyFindings.map((f, i) => (
            <KeyFindingCard key={i} {...f} delay={i * 150} />
          ))}
        </div>
      </div>

      {/* Dataset Stats */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#f97316' }} />
          <h2 className="text-lg font-bold text-white">Dataset at a Glance</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: Database, label: 'Total Records', value: '13,320' },
            { icon: BarChart2, label: 'Features', value: '9' },
            { icon: MapPin, label: 'Locations', value: '1,293' },
            { icon: Home, label: 'Avg Price', value: '₹112L' },
            { icon: TrendingUp, label: 'Best R²', value: '91.2%' },
            { icon: Award, label: 'Best RMSE', value: '₹38.7L' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-4 border transition-all hover:border-orange-500/40"
              style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
              <s.icon className="w-4 h-4 mb-2" style={{ color: '#f97316' }} />
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Pipeline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#f97316' }} />
          <h2 className="text-lg font-bold text-white">Project Pipeline</h2>
          <span className="text-xs text-neutral-500 ml-1">— click any step to jump to it</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pipeline.map((p, i) => (
            <button
              key={i}
              onClick={() => onNavigate(p.tab)}
              className="text-left rounded-xl p-4 border transition-all group hover:border-orange-500/60 hover:scale-[1.01]"
              style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: '#222' }}>
                  <p.icon className="w-4 h-4 transition-colors" style={{ color: '#f97316' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: '#f97316' }}>{p.step}</span>
                    <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-700 group-hover:text-orange-500 flex-shrink-0 transition-colors mt-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Conclusions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#f97316' }} />
          <h2 className="text-lg font-bold text-white">Project Conclusions</h2>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
          {conclusions.map((c, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4"
              style={{ borderBottom: i < conclusions.length - 1 ? '1px solid #2a2a2a' : 'none' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#f97316' }}>{i + 1}</span>
              <p className="text-sm text-neutral-300 leading-relaxed">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Note */}
      <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(249,115,22,0.06)', borderColor: 'rgba(249,115,22,0.2)' }}>
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(249,115,22,0.2)' }}>
            <span className="font-bold text-xs" style={{ color: '#f97316' }}>i</span>
          </div>
          <div>
            <h4 className="font-semibold mb-1" style={{ color: '#fb923c' }}>Dataset: Urban Housing Prices</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              ~13,320 records with area type, location, size (BHK), total sqft, bathrooms, balconies, and price (INR Lakhs).
              Download the <button onClick={() => onNavigate('notebook')} className="underline font-semibold" style={{ color: '#fb923c' }}>Python Notebook</button> to run the full pipeline in Google Colab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
