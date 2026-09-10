import { SoilInput } from '../types';
import { SOIL_PRESETS } from '../data/cropDataset';
import {
  RotateCcw,
  Sparkles,
  Zap,
  Info,
  Beaker
} from 'lucide-react';

interface SoilInputFormProps {
  input: SoilInput;
  onChange: (input: SoilInput) => void;
  onPredict: () => void;
  isPredicting: boolean;
  liveMode: boolean;
  onToggleLiveMode: () => void;
}

export function SoilInputForm({
  input,
  onChange,
  onPredict,
  isPredicting,
  liveMode,
  onToggleLiveMode
}: SoilInputFormProps) {
  const handleSliderChange = (field: keyof SoilInput, value: number) => {
    onChange({
      ...input,
      [field]: value
    });
  };

  const handleStep = (field: keyof SoilInput, delta: number, min: number, max: number) => {
    const current = input[field];
    const updated = field === 'ph'
      ? Number(Math.min(max, Math.max(min, current + delta)).toFixed(1))
      : Math.min(max, Math.max(min, Math.round(current + delta)));
    onChange({
      ...input,
      [field]: updated
    });
  };

  const handleReset = () => {
    onChange({
      n: 90,
      p: 42,
      k: 43,
      ph: 6.5
    });
  };

  const handlePresetSelect = (presetIndex: number) => {
    const preset = SOIL_PRESETS[presetIndex];
    if (preset) {
      onChange({ ...preset.values });
    }
  };

  // Helper for nutrient tier indicator
  const getNutrientTier = (value: number, lowThreshold: number, highThreshold: number) => {
    if (value < lowThreshold) return { label: 'Low', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (value > highThreshold) return { label: 'High', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Optimal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const nTier = getNutrientTier(input.n, 50, 100);
  const pTier = getNutrientTier(input.p, 30, 60);
  const kTier = getNutrientTier(input.k, 30, 70);

  const getPhTier = (ph: number) => {
    if (ph < 5.5) return { label: 'Acidic', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    if (ph > 7.5) return { label: 'Alkaline', color: 'text-purple-700 bg-purple-50 border-purple-200' };
    return { label: 'Neutral', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const phTier = getPhTier(input.ph);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
            <Beaker className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              Soil Test Parameters
            </h2>
            <p className="text-[11px] text-slate-500">
              Laboratory measurements in kg/ha and pH
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-toggle-live-mode"
            type="button"
            onClick={onToggleLiveMode}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border ${
              liveMode
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="Toggle instant real-time calculation vs manual compute"
          >
            <Zap className={`w-3 h-3 ${liveMode ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
            <span>{liveMode ? 'Live Mode' : 'Manual'}</span>
          </button>

          <button
            id="btn-reset-soil-inputs"
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            title="Reset soil inputs to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Preset Soil Profiles (Fast Testing) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Quick Soil Profiles
            </label>
            <span className="text-[11px] text-slate-400">1-click presets</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SOIL_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                type="button"
                onClick={() => handlePresetSelect(idx)}
                className="text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                  N:{preset.values.n} P:{preset.values.p} K:{preset.values.k} pH:{preset.values.ph}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5 space-y-5">
          {/* Parameter 1: Nitrogen (N) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <label htmlFor="input-nitrogen-slider" className="text-xs font-bold text-slate-800">
                  Nitrogen (N)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">kg/ha</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${nTier.color}`}>
                  {nTier.label}
                </span>
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleStep('n', -5, 0, 140)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="input-nitrogen-number"
                    type="number"
                    min="0"
                    max="140"
                    value={input.n}
                    onChange={(e) => handleSliderChange('n', Math.min(140, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-12 text-center text-xs font-bold font-mono bg-white rounded py-0.5 text-slate-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleStep('n', 5, 0, 140)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <input
              id="input-nitrogen-slider"
              type="range"
              min="0"
              max="140"
              step="1"
              value={input.n}
              onChange={(e) => handleSliderChange('n', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Deficient)</span>
              <span>70 (Moderate)</span>
              <span>140 kg/ha (High)</span>
            </div>
          </div>

          {/* Parameter 2: Phosphorus (P) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <label htmlFor="input-phosphorus-slider" className="text-xs font-bold text-slate-800">
                  Phosphorus (P)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">kg/ha</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${pTier.color}`}>
                  {pTier.label}
                </span>
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleStep('p', -5, 5, 145)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="input-phosphorus-number"
                    type="number"
                    min="5"
                    max="145"
                    value={input.p}
                    onChange={(e) => handleSliderChange('p', Math.min(145, Math.max(5, Number(e.target.value) || 5)))}
                    className="w-12 text-center text-xs font-bold font-mono bg-white rounded py-0.5 text-slate-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleStep('p', 5, 5, 145)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <input
              id="input-phosphorus-slider"
              type="range"
              min="5"
              max="145"
              step="1"
              value={input.p}
              onChange={(e) => handleSliderChange('p', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 kg/ha</span>
              <span>75 kg/ha</span>
              <span>145 kg/ha</span>
            </div>
          </div>

          {/* Parameter 3: Potassium (K) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <label htmlFor="input-potassium-slider" className="text-xs font-bold text-slate-800">
                  Potassium (K)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">kg/ha</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${kTier.color}`}>
                  {kTier.label}
                </span>
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleStep('k', -5, 5, 205)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="input-potassium-number"
                    type="number"
                    min="5"
                    max="205"
                    value={input.k}
                    onChange={(e) => handleSliderChange('k', Math.min(205, Math.max(5, Number(e.target.value) || 5)))}
                    className="w-12 text-center text-xs font-bold font-mono bg-white rounded py-0.5 text-slate-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleStep('k', 5, 5, 205)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <input
              id="input-potassium-slider"
              type="range"
              min="5"
              max="205"
              step="1"
              value={input.k}
              onChange={(e) => handleSliderChange('k', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 kg/ha</span>
              <span>100 kg/ha</span>
              <span>205 kg/ha</span>
            </div>
          </div>

          {/* Parameter 4: Soil Reaction (pH) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <label htmlFor="input-ph-slider" className="text-xs font-bold text-slate-800">
                  Soil pH Value
                </label>
                <span className="text-[10px] text-slate-400 font-mono">(0-14 Scale)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${phTier.color}`}>
                  {phTier.label}
                </span>
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleStep('ph', -0.1, 3.5, 9.9)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="input-ph-number"
                    type="number"
                    min="3.5"
                    max="9.9"
                    step="0.1"
                    value={input.ph}
                    onChange={(e) => handleSliderChange('ph', Math.min(9.9, Math.max(3.5, Number(e.target.value) || 3.5)))}
                    className="w-12 text-center text-xs font-bold font-mono bg-white rounded py-0.5 text-slate-900 shadow-2xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleStep('ph', 0.1, 3.5, 9.9)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <input
              id="input-ph-slider"
              type="range"
              min="3.5"
              max="9.9"
              step="0.1"
              value={input.ph}
              onChange={(e) => handleSliderChange('ph', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>3.5 (Strong Acid)</span>
              <span>6.5 - 7.5 (Optimal)</span>
              <span>9.9 (Alkaline)</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!liveMode && (
          <button
            id="btn-calculate-prediction"
            type="button"
            onClick={onPredict}
            disabled={isPredicting}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPredicting ? 'Evaluating Soil Parameters...' : 'Calculate Optimal Crop'}</span>
          </button>
        )}

        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-2 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Values are analyzed against multi-variable Gaussian similarity distributions calibrated on agricultural trial datasets.
          </p>
        </div>
      </div>
    </div>
  );
}
