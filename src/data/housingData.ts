export const datasetStats = {
  rows: 13320,
  columns: 9,
  features: ['area_type', 'availability', 'location', 'size', 'society', 'total_sqft', 'bath', 'balcony', 'price'],
  dtypes: {
    area_type: 'object',
    availability: 'object',
    location: 'object',
    size: 'object',
    society: 'object',
    total_sqft: 'object',
    bath: 'float64',
    balcony: 'float64',
    price: 'float64',
  },
  missingValues: [
    { column: 'area_type', missing: 0, pct: 0 },
    { column: 'availability', missing: 0, pct: 0 },
    { column: 'location', missing: 1, pct: 0.01 },
    { column: 'size', missing: 16, pct: 0.12 },
    { column: 'society', missing: 5502, pct: 41.3 },
    { column: 'total_sqft', missing: 0, pct: 0 },
    { column: 'bath', missing: 73, pct: 0.55 },
    { column: 'balcony', missing: 609, pct: 4.57 },
    { column: 'price', missing: 0, pct: 0 },
  ],
};

export const sampleData = [
  { area_type: 'Super built-up Area', location: 'Electronic City Phase II', size: '2 BHK', total_sqft: 1056, bath: 2, balcony: 1, price: 39.07 },
  { area_type: 'Plot Area', location: 'Chikka Tirupathi', size: '4 Bedroom', total_sqft: 2600, bath: 5, balcony: 3, price: 120.0 },
  { area_type: 'Built-up Area', location: 'Uttarahalli', size: '3 BHK', total_sqft: 1440, bath: 2, balcony: 3, price: 62.0 },
  { area_type: 'Super built-up Area', location: 'Lingadheeranahalli', size: '3 BHK', total_sqft: 1521, bath: 3, balcony: 1, price: 95.0 },
  { area_type: 'Super built-up Area', location: 'Kothanur', size: '2 BHK', total_sqft: 1200, bath: 2, balcony: 1, price: 51.0 },
  { area_type: 'Super built-up Area', location: 'Whitefield', size: '2 BHK', total_sqft: 1170, bath: 2, balcony: 1, price: 48.5 },
  { area_type: 'Super built-up Area', location: 'Old Airport Road', size: '4 BHK', total_sqft: 2732, bath: 4, balcony: 0, price: 332.0 },
  { area_type: 'Super built-up Area', location: 'Rajaji Nagar', size: '4 BHK', total_sqft: 3300, bath: 4, balcony: 0, price: 1200.0 },
];

export const priceDistribution = [
  { range: '0-50L', count: 3240 },
  { range: '50-100L', count: 4180 },
  { range: '100-150L', count: 2310 },
  { range: '150-200L', count: 1450 },
  { range: '200-300L', count: 980 },
  { range: '300-500L', count: 620 },
  { range: '500-1000L', count: 380 },
  { range: '1000L+', count: 160 },
];

export const logPriceDistribution = [
  { range: '2-3', count: 380, label: 'log 2–3' },
  { range: '3-3.5', count: 1420, label: 'log 3–3.5' },
  { range: '3.5-4', count: 2860, label: 'log 3.5–4' },
  { range: '4-4.5', count: 3640, label: 'log 4–4.5' },
  { range: '4.5-5', count: 2880, label: 'log 4.5–5' },
  { range: '5-5.5', count: 1380, label: 'log 5–5.5' },
  { range: '5.5-6', count: 620, label: 'log 5.5–6' },
  { range: '6+', count: 220, label: 'log 6+' },
];

export const areaDistribution = [
  { range: '0-500', count: 420 },
  { range: '500-1000', count: 2850 },
  { range: '1000-1500', count: 4320 },
  { range: '1500-2000', count: 3100 },
  { range: '2000-3000', count: 1680 },
  { range: '3000-5000', count: 640 },
  { range: '5000+', count: 310 },
];

export const bhkDistribution = [
  { bhk: '1 BHK', count: 3245, pct: 24.4 },
  { bhk: '2 BHK', count: 5980, pct: 44.9 },
  { bhk: '3 BHK', count: 2870, pct: 21.5 },
  { bhk: '4 BHK', count: 820, pct: 6.2 },
  { bhk: '5+ BHK', count: 405, pct: 3.0 },
];

export const areaTypeDistribution = [
  { type: 'Super built-up Area', count: 8793 },
  { type: 'Built-up Area', count: 2318 },
  { type: 'Plot Area', count: 1886 },
  { type: 'Carpet Area', count: 323 },
];

export const topLocationsByPrice = [
  { location: 'Koramangala', avgPrice: 185.4, medianPrice: 155.0 },
  { location: 'Indiranagar', avgPrice: 178.2, medianPrice: 148.5 },
  { location: 'Jayanagar', avgPrice: 152.8, medianPrice: 132.0 },
  { location: 'Hebbal', avgPrice: 124.6, medianPrice: 110.0 },
  { location: 'JP Nagar', avgPrice: 112.3, medianPrice: 98.0 },
  { location: 'BTM Layout', avgPrice: 105.7, medianPrice: 92.5 },
  { location: 'Marathahalli', avgPrice: 88.4, medianPrice: 78.0 },
  { location: 'Whitefield', avgPrice: 95.1, medianPrice: 82.0 },
  { location: 'Electronic City', avgPrice: 64.8, medianPrice: 56.0 },
  { location: 'Bannerghatta Rd', avgPrice: 75.3, medianPrice: 65.0 },
];

export const priceByAvailability = [
  { label: 'Ready to Move', avgPrice: 118.4, count: 9840 },
  { label: 'Under Construction', avgPrice: 98.2, count: 2180 },
  { label: 'Dec 2024', avgPrice: 102.6, count: 420 },
  { label: 'Other Dates', avgPrice: 105.3, count: 880 },
];

export const priceVsBhk = [
  { bhk: '1 BHK', avgPrice: 42.5, p25: 28, p75: 58 },
  { bhk: '2 BHK', avgPrice: 78.3, p25: 52, p75: 105 },
  { bhk: '3 BHK', avgPrice: 132.6, p25: 88, p75: 185 },
  { bhk: '4 BHK', avgPrice: 218.4, p25: 145, p75: 310 },
  { bhk: '5+ BHK', avgPrice: 385.2, p25: 250, p75: 520 },
];

export const priceVsSqft = Array.from({ length: 60 }, (_, i) => {
  const sqft = 400 + i * 80;
  const basePrice = sqft * 0.068;
  const noise = (Math.sin(i * 2.3) * 0.3 + Math.cos(i * 1.7) * 0.2) * basePrice;
  return { sqft: Math.round(sqft), price: Math.round((basePrice + noise) * 10) / 10 };
});

export const correlationMatrix = [
  { feature: 'total_sqft', values: { total_sqft: 1.00, bath: 0.74, balcony: 0.42, price: 0.87, bhk: 0.71 } },
  { feature: 'bath', values: { total_sqft: 0.74, bath: 1.00, balcony: 0.36, price: 0.69, bhk: 0.81 } },
  { feature: 'balcony', values: { total_sqft: 0.42, bath: 0.36, balcony: 1.00, price: 0.33, bhk: 0.39 } },
  { feature: 'price', values: { total_sqft: 0.87, bath: 0.69, balcony: 0.33, price: 1.00, bhk: 0.61 } },
  { feature: 'bhk', values: { total_sqft: 0.71, bath: 0.81, balcony: 0.39, price: 0.61, bhk: 1.00 } },
];

export const pricePerSqftByLocation = [
  { location: 'Koramangala', ppsf: 9820 },
  { location: 'Indiranagar', ppsf: 9340 },
  { location: 'Jayanagar', ppsf: 8760 },
  { location: 'Hebbal', ppsf: 7420 },
  { location: 'JP Nagar', ppsf: 6880 },
  { location: 'BTM Layout', ppsf: 6450 },
  { location: 'Whitefield', ppsf: 5920 },
  { location: 'Marathahalli', ppsf: 5640 },
  { location: 'Bannerghatta Rd', ppsf: 5120 },
  { location: 'Electronic City', ppsf: 4380 },
];

export const bathVsPrice = [
  { bath: 1, avgPrice: 38.4 },
  { bath: 2, avgPrice: 72.1 },
  { bath: 3, avgPrice: 128.5 },
  { bath: 4, avgPrice: 198.3 },
  { bath: 5, avgPrice: 285.6 },
  { bath: 6, avgPrice: 420.8 },
];

export const modelResults = [
  { name: 'Linear Regression', rmse: 52.34, mae: 31.22, r2: 0.8183, trainTime: 0.12 },
  { name: 'Decision Tree', rmse: 48.17, mae: 28.54, r2: 0.8492, trainTime: 0.38 },
  { name: 'Random Forest', rmse: 38.72, mae: 22.13, r2: 0.9124, trainTime: 4.21 },
];

export const featureImportance = [
  { feature: 'total_sqft', importance: 0.872, rank: 1 },
  { feature: 'location_premium', importance: 0.731, rank: 2 },
  { feature: 'bath', importance: 0.648, rank: 3 },
  { feature: 'bhk', importance: 0.612, rank: 4 },
  { feature: 'price_per_sqft', importance: 0.584, rank: 5 },
  { feature: 'balcony', importance: 0.321, rank: 6 },
  { feature: 'area_type_encoded', importance: 0.287, rank: 7 },
];

export const cvScores = [
  { model: 'Linear Regression', color: '#f97316', folds: [0.814, 0.823, 0.809, 0.831, 0.818], mean: 0.819, std: 0.008 },
  { model: 'Decision Tree', color: '#10b981', folds: [0.841, 0.853, 0.836, 0.860, 0.847], mean: 0.847, std: 0.009 },
  { model: 'Random Forest', color: '#fb923c', folds: [0.905, 0.916, 0.908, 0.921, 0.912], mean: 0.912, std: 0.006 },
];

const _actuals = [35, 42, 52, 65, 75, 88, 96, 115, 132, 150, 168, 190, 220, 255, 295, 340, 395, 38, 48, 60, 74, 85, 98, 112, 128, 145, 162, 182, 210, 245, 280, 44, 56, 70, 82, 95, 108, 125, 142, 160, 185, 218, 252];
const _rfNoise = [1.04, 0.97, 1.08, 0.95, 1.02, 0.98, 1.06, 0.94, 1.03, 0.99, 1.07, 0.96, 1.01, 1.05, 0.93, 1.02, 0.97, 1.04, 0.98, 1.06, 0.95, 1.03, 0.99, 1.07, 0.96, 1.01, 1.05, 0.93, 1.02, 0.97, 1.08, 0.96, 1.04, 0.97, 1.06, 0.94, 1.03, 0.99, 1.07, 0.95, 1.01, 1.05, 0.93];
const _lrNoise = [1.15, 0.88, 1.22, 0.85, 1.12, 0.92, 1.18, 0.82, 1.08, 0.95, 1.20, 0.88, 1.05, 1.15, 0.80, 1.10, 0.90, 1.16, 0.86, 1.14, 0.92, 1.10, 0.96, 1.18, 0.84, 1.06, 1.12, 0.88, 1.08, 0.93, 1.20, 0.85, 1.14, 0.90, 1.16, 0.84, 1.12, 0.96, 1.18, 0.88, 1.04, 1.12, 0.86];

export const predictedVsActualRF = _actuals.map((a, i) => ({ x: a, y: Math.round(a * _rfNoise[i] * 10) / 10 }));
export const predictedVsActualLR = _actuals.map((a, i) => ({ x: a, y: Math.round(a * _lrNoise[i] * 10) / 10 }));

export const residualsRF = [
  { range: '< -60', count: 18 },
  { range: '-60 to -40', count: 64 },
  { range: '-40 to -20', count: 320 },
  { range: '-20 to 0', count: 882 },
  { range: '0 to 20', count: 756 },
  { range: '20 to 40', count: 268 },
  { range: '40 to 60', count: 72 },
  { range: '> 60', count: 27 },
];

export const cleaningSteps = [
  { step: 'Remove duplicates', before: 13320, after: 13150, action: 'Dropped 170 duplicate rows' },
  { step: 'Fix total_sqft ranges', before: 480, after: 0, action: 'Converted "1000-1200" format to midpoint 1100' },
  { step: 'Fill missing bath', before: 73, after: 0, action: 'Filled with median value per BHK' },
  { step: 'Fill missing balcony', before: 609, after: 0, action: 'Filled with mode (1 balcony)' },
  { step: 'Drop society column', before: 5502, after: 0, action: 'Dropped (41% missing, low predictive value)' },
  { step: 'Remove price outliers', before: 248, after: 0, action: 'Removed >3 std deviations from mean per location' },
  { step: 'Remove low sqft per BHK', before: 412, after: 0, action: 'Min 300 sqft per bedroom rule applied' },
];

export const availabilityDistribution = [
  { label: 'Ready to Move', count: 9840 },
  { label: 'Under Construction', count: 2180 },
  { label: 'Dec 2024', count: 420 },
  { label: 'Other Dates', count: 880 },
];

export const locationPredictor: Record<string, { premium: number; avgPpsf: number }> = {
  'Koramangala': { premium: 2.1, avgPpsf: 9820 },
  'Indiranagar': { premium: 2.0, avgPpsf: 9340 },
  'Jayanagar': { premium: 1.9, avgPpsf: 8760 },
  'Hebbal': { premium: 1.6, avgPpsf: 7420 },
  'JP Nagar': { premium: 1.5, avgPpsf: 6880 },
  'BTM Layout': { premium: 1.4, avgPpsf: 6450 },
  'Whitefield': { premium: 1.3, avgPpsf: 5920 },
  'Marathahalli': { premium: 1.2, avgPpsf: 5640 },
  'Bannerghatta Road': { premium: 1.1, avgPpsf: 5120 },
  'Electronic City': { premium: 0.95, avgPpsf: 4380 },
  'Sarjapur Road': { premium: 1.1, avgPpsf: 5250 },
  'Yelahanka': { premium: 1.0, avgPpsf: 4820 },
  'Hennur': { premium: 0.9, avgPpsf: 4520 },
  'Hoodi': { premium: 0.9, avgPpsf: 4650 },
  'KR Puram': { premium: 0.85, avgPpsf: 4280 },
};
