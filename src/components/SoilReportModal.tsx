import { useState } from 'react';
import { SoilInput, PredictionResult } from '../types';
import { calculateFertilizerPlan } from '../data/cropDataset';
import {
  X,
  Printer,
  ClipboardCopy,
  Check,
  Sprout,
  FileText
} from 'lucide-react';

interface SoilReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: SoilInput;
  result: PredictionResult;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
}

export function SoilReportModal({
  isOpen,
  onClose,
  input,
  result,
  onShowToast
}: SoilReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { crop, confidence, runnersUp, soilHealthAssessment } = result;
  const fertilizerPlan = calculateFertilizerPlan(input, crop);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const reportSummary = `
==================================================
AGROEDAPHIX PRECISION EDAPHIC & CROP REPORT
Date: ${reportDate}
--------------------------------------------------
SOIL TEST MEASUREMENTS:
- Nitrogen (N): ${input.n} kg/ha [${soilHealthAssessment.suitability.n.status.toUpperCase()}]
- Phosphorus (P): ${input.p} kg/ha [${soilHealthAssessment.suitability.p.status.toUpperCase()}]
- Potassium (K): ${input.k} kg/ha [${soilHealthAssessment.suitability.k.status.toUpperCase()}]
- Soil pH: ${input.ph.toFixed(1)} [${soilHealthAssessment.phNature}]
- General Balance: ${soilHealthAssessment.npkBalance}

PRIMARY CROP RECOMMENDATION:
- Best Crop: ${crop.name} (${crop.category})
- Match Confidence: ${confidence}%
- Optimal Season: ${crop.season}
- Water Requirement: ${crop.waterRequirement}
- Expected Duration: ${crop.growthDuration}

SECONDARY ALTERNATIVES:
${runnersUp.map((r) => `- ${r.crop.name} (${r.confidence}% match)`).join('\n')}

FERTILIZER PRESCRIPTION:
${fertilizerPlan.map((f) => `- ${f.nutrient}: ${f.primarySource} @ ${f.ratePerHectare} kg/ha (${f.ratePerAcre} kg/acre) - ${f.applicationTiming}`).join('\n')}

AGRONOMIC NOTES:
${soilHealthAssessment.recommendationSummary}
==================================================
`;
    navigator.clipboard.writeText(reportSummary);
    setCopied(true);
    onShowToast('Report copied to clipboard', 'You can paste this into email, WhatsApp, or notes.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Header Bar */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Agronomic Soil Analysis Report
              </h3>
              <p className="text-[11px] text-slate-500">Official Soil-Crop Prediction & Fertilizer Plan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ClipboardCopy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 font-sans" id="printable-report">
          {/* Document Header */}
          <div className="border-b-2 border-emerald-600 pb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900">
                  AgroEdaphix Precision Soil & Crop Advisory
                </h1>
                <p className="text-xs text-slate-500">
                  Edaphic Machine Learning System • Physicochemical Profile Matrix
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <span className="block font-bold text-slate-800">Report Date: {reportDate}</span>
              <span className="text-[11px]">Ref: AGR-SOIL-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          </div>

          {/* Section 1: Soil Test Chemical Profile */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              1. Soil Chemical Analysis Summary
            </h2>
            <div className="grid grid-cols-4 gap-2.5 text-center text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 block">Nitrogen (N)</span>
                <span className="text-lg font-bold font-mono text-slate-900">{input.n}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 block">Phosphorus (P)</span>
                <span className="text-lg font-bold font-mono text-slate-900">{input.p}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 block">Potassium (K)</span>
                <span className="text-lg font-bold font-mono text-slate-900">{input.k}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-emerald-800 block">Reaction (pH)</span>
                <span className="text-lg font-bold font-mono text-emerald-950">{input.ph.toFixed(1)}</span>
                <span className="text-[10px] text-emerald-700 block">{soilHealthAssessment.phNature}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Crop Recommendation Result */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
              2. Primary Crop Recommendation
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{crop.emoji}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {crop.name} ({crop.category})
                  </h3>
                  <p className="text-xs text-slate-600 max-w-lg">
                    {crop.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-800 font-mono">
                  {confidence}%
                </span>
                <span className="text-[10px] text-emerald-700 block font-semibold">Match Score</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-200/80 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Season:</span>
                <span className="font-semibold text-slate-800">{crop.season}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Water Demand:</span>
                <span className="font-semibold text-slate-800">{crop.waterRequirement}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Duration:</span>
                <span className="font-semibold text-slate-800">{crop.growthDuration}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Fertilizer Prescription */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              3. Fertilizer & Soil Amendment Prescription (Per Hectare Basis)
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-2.5 text-left font-bold">Nutrient / Parameter</th>
                    <th className="p-2.5 text-left font-bold">Recommended Commercial Source</th>
                    <th className="p-2.5 text-right font-bold">Rate (kg/ha)</th>
                    <th className="p-2.5 text-right font-bold">Rate (kg/acre)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fertilizerPlan.map((f, i) => (
                    <tr key={i} className={f.status === 'Deficit' ? 'bg-amber-50/40' : ''}>
                      <td className="p-2.5 font-bold text-slate-900">{f.nutrient}</td>
                      <td className="p-2.5 text-slate-700">{f.primarySource}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">{f.ratePerHectare} kg</td>
                      <td className="p-2.5 text-right font-mono text-slate-600">{f.ratePerAcre} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Secondary Options */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              4. Secondary Crop Alternatives
            </h2>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {runnersUp.map((r) => (
                <div key={r.crop.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{r.crop.emoji} {r.crop.name}</span>
                  <span className="font-mono text-emerald-800 font-bold">{r.confidence}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
