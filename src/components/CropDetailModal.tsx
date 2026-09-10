import { CropProfile } from '../types';
import {
  X,
  Droplet,
  Sun,
  Thermometer,
  CloudRain,
  Bug,
  CheckCircle2,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface CropDetailModalProps {
  crop: CropProfile | null;
  onClose: () => void;
  onApplySoilPreset: (crop: CropProfile) => void;
  onNavigateToFertilizer: (crop: CropProfile) => void;
}

export function CropDetailModal({
  crop,
  onClose,
  onApplySoilPreset,
  onNavigateToFertilizer
}: CropDetailModalProps) {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-6 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-4xl shadow-xs flex-shrink-0">
              {crop.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                  {crop.name}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  {crop.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {crop.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* Chemical Target Envelope */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Ideal Soil Chemical Envelope
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">Nitrogen (N)</span>
                <span className="text-base font-bold font-mono text-slate-900">{crop.idealN[0]} – {crop.idealN[1]}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">Phosphorus (P)</span>
                <span className="text-base font-bold font-mono text-slate-900">{crop.idealP[0]} – {crop.idealP[1]}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">Potassium (K)</span>
                <span className="text-base font-bold font-mono text-slate-900">{crop.idealK[0]} – {crop.idealK[1]}</span>
                <span className="text-[10px] text-slate-400 block">kg/ha</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs text-emerald-800 block">Reaction (pH)</span>
                <span className="text-base font-bold font-mono text-emerald-950">{crop.idealPh[0]} – {crop.idealPh[1]}</span>
                <span className="text-[10px] text-emerald-700 block">Optimal pH</span>
              </div>
            </div>
          </div>

          {/* Environmental Climate Bounds */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Climatic & Environmental Requirements
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                <Thermometer className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Temperature</span>
                  <span className="font-bold text-slate-900">{crop.tempRange[0]}°C – {crop.tempRange[1]}°C</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                <CloudRain className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Annual Rainfall</span>
                  <span className="font-bold text-slate-900">{crop.rainfallRange[0]} – {crop.rainfallRange[1]} mm</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Droplet className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Relative Humidity</span>
                  <span className="font-bold text-slate-900">{crop.humidityRange[0]}% – {crop.humidityRange[1]}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sowing & Field Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Planting Method & Spacing
              </span>
              <p className="font-semibold text-slate-800 leading-relaxed">
                {crop.plantingMethod}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Soil Texture & Affinity
              </span>
              <p className="font-semibold text-slate-800 leading-relaxed">
                {crop.soilType}
              </p>
            </div>
          </div>

          {/* Pests & Harvest Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                <Bug className="w-4 h-4" />
                <span>Key Pests & Pathologies</span>
              </div>
              <ul className="space-y-1 text-slate-700">
                {crop.majorPests.map((pest, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>{pest}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <Sun className="w-4 h-4" />
                <span>Harvest Readiness Indicators</span>
              </div>
              <ul className="space-y-1 text-slate-700">
                {crop.harvestIndicators.map((ind, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Field Agronomy Tips */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Agronomic Field Recommendations
            </h4>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-xs">
              {crop.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToFertilizer(crop);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl shadow-2xs cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Calculate Fertilizer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApplySoilPreset(crop);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
            >
              <span>Load to Predictor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
