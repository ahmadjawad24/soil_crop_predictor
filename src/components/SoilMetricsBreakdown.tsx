import { SoilInput, PredictionResult, ParameterSuitability } from '../types';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Check
} from 'lucide-react';

interface SoilMetricsBreakdownProps {
  input: SoilInput;
  result: PredictionResult;
}

export function SoilMetricsBreakdown({ input, result }: SoilMetricsBreakdownProps) {
  const { crop, soilHealthAssessment } = result;

  const renderNutrientStatus = (
    name: string,
    current: number,
    idealRange: [number, number],
    unit: string,
    suitability: ParameterSuitability
  ) => {
    const isOptimal = suitability.status === 'optimal';
    const isLow = suitability.status === 'low';

    // Calculate percentage on a standard 0 to max scale
    const maxScale = Math.max(idealRange[1] * 1.4, current * 1.2, 100);
    const currentPercent = Math.min(100, Math.max(0, (current / maxScale) * 100));
    const idealMinPercent = (idealRange[0] / maxScale) * 100;
    const idealMaxPercent = (idealRange[1] / maxScale) * 100;

    return (
      <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-slate-800">{name}</span>
            <span className="text-[10px] text-slate-500 font-mono">
              (Ideal: {idealRange[0]}–{idealRange[1]} {unit})
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isOptimal ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-3 h-3 text-emerald-700" />
                <span>Optimal</span>
              </span>
            ) : isLow ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                <ArrowDownRight className="w-3 h-3 text-amber-700" />
                <span>Low (-{Math.abs(suitability.difference)} {unit})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-100/90 px-2 py-0.5 rounded border border-blue-200">
                <ArrowUpRight className="w-3 h-3 text-blue-700" />
                <span>High (+{Math.abs(suitability.difference)} {unit})</span>
              </span>
            )}
          </div>
        </div>

        {/* Visual Range Bar */}
        <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
          {/* Ideal target range zone */}
          <div
            className="absolute top-0 bottom-0 bg-emerald-200/90"
            style={{
              left: `${idealMinPercent}%`,
              width: `${idealMaxPercent - idealMinPercent}%`
            }}
          />

          {/* Current measurement indicator bar */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isOptimal ? 'bg-emerald-600' : isLow ? 'bg-amber-500' : 'bg-blue-600'
            }`}
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>0 {unit}</span>
          <span className="font-bold text-slate-900">
            Current: {current} {unit}
          </span>
          <span>{Math.round(maxScale)} {unit}</span>
        </div>
      </div>
    );
  };

  const isAnyDeficient = soilHealthAssessment.npkBalance.includes('Deficient');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Soil Nutrient Balance for {crop.name}
            </h2>
            <p className="text-[11px] text-slate-500">
              Gap analysis compared against {crop.name}'s optimal physiological uptake
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-block">
          {soilHealthAssessment.npkBalance}
        </span>
      </div>

      {/* Nutrient Range Visualizers */}
      <div className="space-y-3">
        {renderNutrientStatus(
          'Nitrogen (N)',
          input.n,
          crop.idealN,
          'kg/ha',
          soilHealthAssessment.suitability.n
        )}

        {renderNutrientStatus(
          'Phosphorus (P)',
          input.p,
          crop.idealP,
          'kg/ha',
          soilHealthAssessment.suitability.p
        )}

        {renderNutrientStatus(
          'Potassium (K)',
          input.k,
          crop.idealK,
          'kg/ha',
          soilHealthAssessment.suitability.k
        )}

        {renderNutrientStatus(
          'Soil Reaction (pH)',
          input.ph,
          crop.idealPh,
          'pH',
          soilHealthAssessment.suitability.ph
        )}
      </div>

      {/* Advisory Insight Summary */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        {isAnyDeficient ? (
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        )}

        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-800 block">
            Agronomist Advisory Summary
          </span>
          <p className="text-slate-600 leading-relaxed">
            {soilHealthAssessment.recommendationSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
