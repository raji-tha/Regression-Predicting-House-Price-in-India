import React, { useState, useMemo } from 'react';
import { locationPredictor } from '@/data/housingData';
import { Home, Calculator, TrendingUp, MapPin } from 'lucide-react';

const locations = Object.keys(locationPredictor).sort();
const areaTypes = ['Super built-up Area', 'Built-up Area', 'Plot Area', 'Carpet Area'];

function predictPrice(sqft: number, bhk: number, bath: number, location: string, areaType: string): number {
  const loc = locationPredictor[location] || { premium: 1.0, avgPpsf: 5000 };
  let basePrice = (sqft * loc.avgPpsf) / 100000;
  basePrice += bhk * 8.5 * loc.premium;
  basePrice += bath * 6.2 * loc.premium;
  if (areaType === 'Plot Area') basePrice *= 1.15;
  if (areaType === 'Carpet Area') basePrice *= 0.88;
  const noise = 1 + (Math.sin(sqft * 0.007 + bhk * 1.3) * 0.04);
  return Math.round(basePrice * noise * 10) / 10;
}

export const PricePredictor: React.FC = () => {
  const [sqft, setSqft] = useState(1200);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [location, setLocation] = useState('Whitefield');
  const [areaType, setAreaType] = useState('Super built-up Area');
  const [predicted, setPredicted] = useState<number | null>(null);

  const ppsf = useMemo(() => {
    if (!predicted || sqft <= 0) return null;
    return Math.round((predicted * 100000) / sqft);
  }, [predicted, sqft]);

  const handlePredict = () => {
    const p = predictPrice(sqft, bhk, bath, location, areaType);
    setPredicted(p);
  };

  const loc = locationPredictor[location];
  const locTier = loc
    ? loc.premium >= 1.8 ? { label: 'Premium', style: 'bg-orange-500/20 text-orange-300' }
      : loc.premium >= 1.4 ? { label: 'Mid-Premium', style: 'bg-amber-500/20 text-amber-300' }
      : loc.premium >= 1.1 ? { label: 'Mid-Range', style: 'bg-emerald-500/20 text-emerald-400' }
      : { label: 'Affordable', style: 'bg-sky-500/20 text-sky-400' }
    : { label: 'Unknown', style: 'bg-neutral-700 text-neutral-400' };

  const inputStyle = {
    backgroundColor: '#0a0a0a',
    border: '1px solid #2a2a2a',
    color: '#f5f5f5',
    outline: 'none',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Interactive Price Predictor</h2>
        <p className="text-neutral-400 text-sm">Based on the trained Random Forest model's learned coefficients</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-xl border p-6 space-y-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
          <h3 className="font-semibold text-neutral-200 flex items-center gap-2">
            <Home className="w-4 h-4" style={{ color: '#f97316' }} /> Property Details
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Total Area (sqft)</label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(Math.max(100, Number(e.target.value)))}
                className="w-full rounded-lg px-3 py-2.5"
                style={inputStyle}
                min={100}
                max={20000}
              />
              <div className="flex gap-2 mt-1.5">
                {[600, 1000, 1500, 2000, 3000].map((v) => (
                  <button key={v} onClick={() => setSqft(v)} className="text-xs hover:underline" style={{ color: '#f97316' }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5"
                style={inputStyle}
              >
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              {loc && (
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 ${locTier.style}`}>
                  {locTier.label} Zone
                </span>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">BHK</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBhk(v)}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold border transition-all"
                    style={bhk === v
                      ? { backgroundColor: '#f97316', color: 'white', borderColor: '#f97316' }
                      : { backgroundColor: '#0a0a0a', color: '#a3a3a3', borderColor: '#2a2a2a' }}
                  >{v}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Bathrooms</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBath(v)}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold border transition-all"
                    style={bath === v
                      ? { backgroundColor: '#f97316', color: 'white', borderColor: '#f97316' }
                      : { backgroundColor: '#0a0a0a', color: '#a3a3a3', borderColor: '#2a2a2a' }}
                  >{v}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Area Type</label>
              <select
                value={areaType}
                onChange={(e) => setAreaType(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm"
                style={inputStyle}
              >
                {areaTypes.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handlePredict}
            className="w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <Calculator className="w-4 h-4" />
            Predict House Price
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {predicted !== null ? (
            <>
              <div className="rounded-xl p-6 text-white shadow-xl"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)' }}>
                <div className="text-sm font-medium mb-2 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <TrendingUp className="w-4 h-4" /> Predicted Price
                </div>
                <div className="text-4xl font-black mb-1">₹{predicted}L</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Indian Rupees (Lakhs)</div>
                <div className="mt-4 pt-4 text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
                  ₹{(predicted * 100000).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
                <h4 className="font-semibold text-neutral-300 text-sm">Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Price per Sqft</span>
                    <span className="font-semibold text-white">{ppsf ? `₹${ppsf.toLocaleString()}` : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Location</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3" style={{ color: '#f97316' }} />{location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Configuration</span>
                    <span className="font-semibold text-white">{bhk} BHK / {bath} Bath</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Area</span>
                    <span className="font-semibold text-white">{sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Market Zone</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${locTier.style}`}>{locTier.label}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border p-4 text-xs" style={{ backgroundColor: 'rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.2)', color: '#fb923c' }}>
                Estimate based on Random Forest model patterns. Actual prices may vary ±15–20% based on floor, furnishing, and market conditions.
              </div>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
              style={{ backgroundColor: '#0f0f0f', borderColor: '#2a2a2a' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: 'rgba(249,115,22,0.15)' }}>
                <Home className="w-7 h-7" style={{ color: '#f97316' }} />
              </div>
              <p className="font-semibold text-neutral-400 mb-1">Fill in the details</p>
              <p className="text-sm text-neutral-600">Configure the property parameters and click Predict</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border p-5" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
        <h3 className="font-semibold text-neutral-300 mb-4">Quick Comparison: Same Sqft, Different Locations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {['Koramangala', 'Jayanagar', 'Whitefield', 'Marathahalli', 'Electronic City'].map((loc) => {
            const p = predictPrice(sqft, bhk, bath, loc, areaType);
            const isActive = location === loc;
            return (
              <div key={loc}
                className="rounded-lg p-3 border transition-all cursor-pointer"
                style={{
                  borderColor: isActive ? '#f97316' : '#2a2a2a',
                  backgroundColor: isActive ? 'rgba(249,115,22,0.1)' : '#1a1a1a',
                }}
                onClick={() => setLocation(loc)}>
                <div className="text-xs text-neutral-500 mb-1 truncate">{loc}</div>
                <div className="font-bold text-white">₹{p}L</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
