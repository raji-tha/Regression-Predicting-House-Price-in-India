import React, { useState } from 'react';
import {
  priceDistribution, areaDistribution, bhkDistribution, topLocationsByPrice,
  priceVsBhk, priceVsSqft, correlationMatrix, pricePerSqftByLocation,
  bathVsPrice, areaTypeDistribution, availabilityDistribution,
  logPriceDistribution, priceByAvailability,
} from '@/data/housingData';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { HeatMap } from '@/components/charts/HeatMap';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { LineChart } from '@/components/charts/LineChart';

const features = ['total_sqft', 'bath', 'balcony', 'price', 'bhk'];

const chartCards = [
  'Price Distribution', 'Log Price Dist.', 'Area Distribution', 'BHK Distribution',
  'Area Type', 'Availability', 'Price by Availability', 'Price vs Location',
  'Price per Sqft/Location', 'Price vs BHK', 'Price vs Sqft',
  'Bath vs Price', 'Correlation Matrix',
];

export const EDACharts: React.FC = () => {
  const [selected, setSelected] = useState(0);

  const priceBarData = priceDistribution.map((d) => ({ label: d.range, value: d.count, color: '#f97316' }));
  const logPriceData = logPriceDistribution.map((d) => ({ label: d.range, value: d.count, color: '#fb923c' }));
  const areaBarData = areaDistribution.map((d) => ({ label: d.range, value: d.count, color: '#10b981' }));
  const bhkBarData = bhkDistribution.map((d) => ({ label: d.bhk, value: d.count, color: '#fb923c' }));
  const locationBarData = topLocationsByPrice.map((d) => ({ label: d.location, value: d.avgPrice, color: '#f97316' }));
  const ppsfBarData = pricePerSqftByLocation.map((d) => ({ label: d.location, value: d.ppsf, color: '#ea580c' }));
  const priceVsBhkData = priceVsBhk.map((d) => ({ label: d.bhk, value: d.avgPrice, color: '#f97316' }));
  const bathPriceData = bathVsPrice.map((d) => ({ label: `${d.bath}`, value: d.avgPrice, color: '#fb923c' }));
  const availPriceData = priceByAvailability.map((d) => ({ label: d.label, value: d.avgPrice, color: '#fbbf24' }));
  const scatterData = priceVsSqft.map((d) => ({ x: d.sqft, y: d.price * 100 }));
  const areaTypePieData = areaTypeDistribution.map((d) => ({ label: d.type.replace(' Area', ''), value: d.count }));
  const availPieData = availabilityDistribution.map((d) => ({ label: d.label, value: d.count }));

  const charts: Record<number, React.ReactNode> = {
    0: <BarChart data={priceBarData} title="Raw Price Distribution (INR Lakhs)" xLabel="Price Range" yLabel="Properties" height={290} darkMode />,
    1: <BarChart data={logPriceData} title="Log(Price) Distribution — Approx. Normal after transformation" xLabel="log₁(1+price) bin" yLabel="Count" height={290} darkMode />,
    2: <BarChart data={areaBarData} title="Area Distribution (Sqft)" xLabel="Area Range (Sqft)" yLabel="Properties" height={290} darkMode />,
    3: <BarChart data={bhkBarData} title="BHK Distribution" xLabel="BHK Type" yLabel="Count" height={290} darkMode />,
    4: <div className="flex justify-center"><PieChart data={areaTypePieData} title="Distribution by Area Type" size={240} darkMode /></div>,
    5: <div className="flex justify-center"><PieChart data={availPieData} title="Availability Status" size={240} darkMode /></div>,
    6: <BarChart data={availPriceData} title="Avg Price by Availability Status (₹ Lakhs)" xLabel="Status" yLabel="Avg Price (L)" formatValue={(v) => `₹${v}L`} height={290} darkMode />,
    7: <BarChart data={locationBarData} title="Average Price by Location (₹ Lakhs)" horizontal formatValue={(v) => `₹${v}L`} height={320} darkMode />,
    8: <BarChart data={ppsfBarData} title="Avg Price per Sqft by Location (₹)" horizontal formatValue={(v) => `₹${v.toLocaleString()}`} height={320} darkMode />,
    9: <LineChart data={priceVsBhkData} title="Average Price by BHK (₹ Lakhs)" xLabel="BHK Type" yLabel="Avg Price (L)" formatValue={(v) => `₹${v}L`} height={290} color="#f97316" darkMode />,
    10: <ScatterPlot data={scatterData} title="Price vs Total Sqft (Scatter with Trend Line)" xLabel="Total Sqft" yLabel="Price (₹ '00s)" height={290} showTrendLine color="#f97316" darkMode />,
    11: <LineChart data={bathPriceData} title="Avg Price vs No. of Bathrooms" xLabel="Bathrooms" yLabel="Avg Price (L)" formatValue={(v) => `₹${v}L`} color="#fb923c" height={290} darkMode />,
    12: <HeatMap features={features} matrix={correlationMatrix} title="Feature Correlation Matrix" darkMode />,
  };

  const insights: Record<number, string> = {
    0: 'Raw price is heavily right-skewed: most properties cluster at ₹50–150L with a long tail of luxury properties above ₹500L. Log transformation normalises this for modeling.',
    1: 'After log₁(1+price) transformation, the distribution approximates normal — validating the log-transform step before linear regression. This is why log-price models outperform raw-price ones.',
    2: 'Majority of properties fall in the 1000–2000 sqft range, typical for 2–3 BHK apartments in urban residential markets.',
    3: '2 BHK is the most popular configuration (44.9%), followed by 1 BHK (24.4%) and 3 BHK (21.5%), reflecting demand for mid-size urban housing.',
    4: '"Super built-up Area" dominates at 66% of listings — this is the builder-quoted area including common spaces. Important for fair sqft comparison.',
    5: 'About 81% of listings are "Ready to Move". Under-construction properties carry a time-risk discount visible in lower average prices.',
    6: 'Ready-to-move properties command ₹118L avg vs ₹98L for under-construction — a 20% premium for immediate possession. Useful for pricing under-construction properties at a discount.',
    7: 'Koramangala and Indiranagar command the highest average prices (₹185L+), 3× more than Electronic City (₹65L), confirming location as a dominant price driver.',
    8: 'Price per sqft reveals true value. Koramangala tops at ₹9,820/sqft vs Electronic City at ₹4,380/sqft — same sqft, very different investment value.',
    9: 'Clear linear relationship between BHK count and price. Each additional BHK adds roughly ₹50–80L on average, though variance increases with size.',
    10: 'Strong positive correlation between area and price (R=0.87). The red trend line confirms sqft is the strongest predictor. Outliers represent luxury/premium locations at normal sqft.',
    11: 'More bathrooms indicate luxury/larger homes — properties with 4–6 bathrooms command 5–7× the average 1-bath price.',
    12: 'total_sqft (0.87) and bath (0.69) have the strongest relationships with price. bhk and bath are highly correlated (0.81) — multicollinearity to watch for in linear models.',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Exploratory Data Analysis</h2>
        <p className="text-neutral-400 text-sm">13 charts exploring price, location, size, feature relationships, and data transformations</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {chartCards.map((name, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all border"
            style={selected === i
              ? { backgroundColor: '#f97316', color: 'white', borderColor: '#f97316' }
              : { backgroundColor: '#141414', color: '#a3a3a3', borderColor: '#2a2a2a' }}
          >
            <span className="text-xs opacity-50 mr-1">{String(i + 1).padStart(2, '0')}</span>
            {name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border p-6" style={{ backgroundColor: '#141414', borderColor: '#2a2a2a' }}>
        {charts[selected]}
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #2a2a2a' }}>
          <div className="flex items-start gap-2">
            <span className="font-bold text-sm mt-0.5 flex-shrink-0" style={{ color: '#f97316' }}>Insight:</span>
            <p className="text-sm text-neutral-400 leading-relaxed">{insights[selected]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
