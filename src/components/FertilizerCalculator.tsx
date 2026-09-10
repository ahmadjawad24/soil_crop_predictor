import { useState } from 'react';
import { CropProfile, SoilInput } from '../types';
import { CROPS, calculateFertilizerPlan } from '../data/cropDataset';
import {
  Calculator,
  Calendar,
  Layers,
  ClipboardCopy,
  Check
} from 'lucide-react';

interface FertilizerCalculatorProps {
  currentSoil: SoilInput;
  selectedCrop: CropProfile;
  onCropChange: (crop: CropProfile) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
}

export function FertilizerCalculator({
  currentSoil,
  selectedCrop,
  onCropChange,
  onShowToast
}: FertilizerCalculatorProps) {
  const [areaValue, setAreaValue] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'hectares' | 'acres' | 'sqm'>('hectares');
  const [copied, setCopied] = useState(false);

  // Convert area to hectares multiplier
  const getHectares = () => {
    if (areaUnit === 'hectares') return areaValue;
    if (areaUnit === 'acres') return areaValue * 0.404686;
    if (areaUnit === 'sqm') return areaValue / 10000;
    return 1;
  };

  const hectares = Math.max(0.01, getHectares());
  const fertilizerPlan = calculateFertilizerPlan(currentSoil, selectedCrop);

  const handleCopyPlan = () => {
    const textLines = [
      `🌱 FERTILIZER PRESCRIPTION REPORT`,
      `Target Crop: ${selectedCrop.name} (${selectedCrop.category})`,
      `Field Size: ${areaValue} ${areaUnit} (~${hectares.toFixed(2)} ha)`,
      `Soil Test: N: ${currentSoil.n} kg/ha | P: ${currentSoil.p} kg/ha | K: ${currentSoil.k} kg/ha | pH: ${currentSoil.ph.toFixed(1)}`,
      ``,
      `AMENDMENT SCHEDULE:`,
      ...fertilizerPlan.map((rec) => {
        const totalKg = Math.round(rec.ratePerHectare * hectares);
        const bags = Math.ceil(totalKg / 50);
        return `• ${rec.nutrient} [${rec.status}]:\n  Source: ${rec.primarySource}\n  Total Requirement: ${totalKg} kg (${bags} bags of 50kg)\n  Timing: ${rec.applicationTiming}\n  Notes: ${rec.notes}\n`;
      })
    ];

    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    onShowToast('Fertilizer schedule copied!', 'You can now paste or share this advisory with field workers.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Precision Fertilizer & Soil Amendment Calculator
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Calculates exact commercial fertilizer quantities (Urea, DAP, MOP, Lime/Gypsum) based on soil deficits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPlan}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs cursor-pointer self-start md:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <ClipboardCopy className="w-4 h-4 text-emerald-600" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Fertilizer Plan'}</span>
          </button>
        </div>

        {/* Configuration Row: Select Crop & Plot Size */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Crop Selection */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Target Crop for Prescription
            </label>
            <div className="flex items-center gap-2">
              <select
                id="select-calc-crop"
                value={selectedCrop.id}
                onChange={(e) => {
                  const found = CROPS.find((c) => c.id === e.target.value);
                  if (found) onCropChange(found);
                }}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji} {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
              <span>Target N-P-K: {selectedCrop.idealN[0]}–{selectedCrop.idealN[1]} / {selectedCrop.idealP[0]}–{selectedCrop.idealP[1]} / {selectedCrop.idealK[0]}–{selectedCrop.idealK[1]}</span>
              <span>Target pH: {selectedCrop.idealPh[0]}–{selectedCrop.idealPh[1]}</span>
            </div>
          </div>

          {/* Plot Size Scaler */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Field / Plot Land Area
            </label>
            <div className="flex items-center gap-2">
              <input
                id="input-plot-area"
                type="number"
                min="0.1"
                step="0.1"
                value={areaValue}
                onChange={(e) => setAreaValue(Math.max(0.01, Number(e.target.value) || 1))}
                className="w-28 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <select
                id="select-plot-unit"
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value as any)}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="hectares">Hectares (ha)</option>
                <option value="acres">Acres (ac)</option>
                <option value="sqm">Square Meters (m²)</option>
              </select>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Normalized calculation basis: <strong className="text-slate-800 font-mono">{hectares.toFixed(2)} hectares</strong> (~{(hectares * 2.471).toFixed(2)} acres)
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fertilizerPlan.map((rec, index) => {
          const totalKgForField = Math.round(rec.ratePerHectare * hectares);
          const bags50kg = Math.ceil(totalKgForField / 50);
          const isDeficit = rec.status === 'Deficit';
          const isExcess = rec.status === 'Excess';

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
                isDeficit
                  ? 'border-amber-200/80 ring-1 ring-amber-100'
                  : isExcess
                  ? 'border-blue-200/80'
                  : 'border-emerald-200/80'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{rec.nutrient}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      isDeficit
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : isExcess
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>

                {isDeficit && (
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Deficit: {rec.deficitAmount} {rec.nutrient.includes('pH') ? 'pH' : 'kg/ha'}
                  </span>
                )}
              </div>

              {/* Source & Dosage Display */}
              <div className="mt-4 space-y-3">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Recommended Agricultural Source
                  </span>
                  <p className="font-bold text-sm text-slate-900 leading-snug">
                    {rec.primarySource}
                  </p>
                </div>

                {/* Quantitative Rate Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">Total Field Quantity</span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      {totalKgForField} <span className="text-xs font-normal text-slate-500">kg</span>
                    </span>
                    {totalKgForField > 0 && (
                      <span className="text-[11px] text-emerald-700 block font-semibold">
                        ~{bags50kg} bag{bags50kg > 1 ? 's' : ''} (50kg)
                      </span>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">Application Rate</span>
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      {rec.ratePerHectare} <span className="text-xs font-normal text-slate-500">kg/ha</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      ({rec.ratePerAcre} kg/acre)
                    </span>
                  </div>
                </div>

                {/* Timing & Notes */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Application Timing:</strong> {rec.applicationTiming}</span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    <Layers className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>{rec.notes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
