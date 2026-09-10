import { PredictionResult, CropProfile } from '../types';
import {
  Droplet,
  Sun,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Award,
  Thermometer,
  CloudRain,
  Calculator,
  BookmarkPlus,
  BookOpen
} from 'lucide-react';

interface CropResultCardProps {
  result: PredictionResult;
  onSelectCrop: (crop: CropProfile) => void;
  onViewCropDetails: (crop: CropProfile) => void;
  onNavigateToFertilizer: () => void;
  onSaveTest: () => void;
}

export function CropResultCard({
  result,
  onSelectCrop,
  onViewCropDetails,
  onNavigateToFertilizer,
  onSaveTest
}: CropResultCardProps) {
  const { crop, confidence, runnersUp } = result;

  const getWaterBadge = (water: CropProfile['waterRequirement']) => {
    switch (water) {
      case 'Very High':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'High':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Medium':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Low':
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  const getCategoryBadge = (cat: CropProfile['category']) => {
    switch (cat) {
      case 'Cereal':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Pulse':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'Fruit':
        return 'bg-rose-50 text-rose-900 border-rose-200';
      case 'Commercial':
        return 'bg-indigo-50 text-indigo-900 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-900 border-slate-200';
    }
  };

  return (
    <div id="crop-recommendation-card" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* SaaS Product-Grade Header Banner (Light mode with refined emerald accent) */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-slate-50 p-5 sm:p-7 border-b border-slate-200/80 relative">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
              Primary Recommendation
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getCategoryBadge(crop.category)}`}>
              {crop.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{confidence}% Confidence Match</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-4xl sm:text-5xl shadow-xs flex-shrink-0">
            {crop.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h1 id="predicted-crop-name" className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900">
                {crop.name}
              </h1>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {crop.description}
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-view-crop-full-profile"
              type="button"
              onClick={() => onViewCropDetails(crop)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agronomy Dossier</span>
            </button>

            <button
              id="btn-calc-crop-fertilizer"
              type="button"
              onClick={onNavigateToFertilizer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Fertilizer Schedule</span>
            </button>
          </div>

          <button
            id="btn-save-soil-test"
            type="button"
            onClick={onSaveTest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Soil Test</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Agronomic Conditions Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Agronomic Profile & Growing Windows
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Droplet className="w-3.5 h-3.5 text-sky-600" />
                <span>Water Demand</span>
              </div>
              <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                <span className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${getWaterBadge(crop.waterRequirement)}`}>
                  {crop.waterRequirement}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Optimal Season</span>
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                {crop.season}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Crop Duration</span>
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                {crop.growthDuration}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Soil Affinity</span>
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate" title={crop.soilType}>
                {crop.soilType}
              </div>
            </div>
          </div>

          {/* Secondary Agro-Climatic Row */}
          <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-slate-50/60 rounded-xl p-2.5 border border-slate-200/60 flex items-center gap-2 text-xs">
              <Thermometer className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px]">Temperature Range</span>
                <span className="font-semibold text-slate-800">{crop.tempRange[0]}°C – {crop.tempRange[1]}°C</span>
              </div>
            </div>

            <div className="bg-slate-50/60 rounded-xl p-2.5 border border-slate-200/60 flex items-center gap-2 text-xs">
              <CloudRain className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px]">Annual Rainfall</span>
                <span className="font-semibold text-slate-800">{crop.rainfallRange[0]} – {crop.rainfallRange[1]} mm</span>
              </div>
            </div>

            <div className="bg-slate-50/60 rounded-xl p-2.5 border border-slate-200/60 flex items-center gap-2 text-xs col-span-2 sm:col-span-1">
              <Droplet className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px]">Relative Humidity</span>
                <span className="font-semibold text-slate-800">{crop.humidityRange[0]}% – {crop.humidityRange[1]}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Cultivation Guidance */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Field Cultivation Best Practices
          </h3>
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-4 space-y-2.5">
            {crop.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Alternative Candidates */}
        {runnersUp.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Secondary Crop Candidates
              </h3>
              <span className="text-[11px] text-slate-400">Alternative matches for this soil</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {runnersUp.map((runner) => (
                <div
                  key={runner.crop.id}
                  id={`runner-up-${runner.crop.id}`}
                  onClick={() => onSelectCrop(runner.crop)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-emerald-300 hover:shadow-2xs transition-all cursor-pointer group flex items-center justify-between"
                  title="Click to evaluate this crop profile"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                      {runner.crop.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {runner.crop.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {runner.crop.category} • {runner.crop.season}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200">
                      {runner.confidence}%
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
