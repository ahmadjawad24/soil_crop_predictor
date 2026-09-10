import { useState } from 'react';
import { CROPS } from '../data/cropDataset';
import { CropProfile, CropCategory } from '../types';
import {
  Database,
  Search,
  ArrowRight,
  Scale,
  X,
  BookOpen
} from 'lucide-react';

interface ModelExplorerProps {
  onApplyCropParameters: (crop: CropProfile) => void;
  onViewCropDetails: (crop: CropProfile) => void;
}

export function ModelExplorer({ onApplyCropParameters, onViewCropDetails }: ModelExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Comparison State
  const [compareMode, setCompareMode] = useState(false);
  const [compareCrop1, setCompareCrop1] = useState<CropProfile>(CROPS[0]); // Rice
  const [compareCrop2, setCompareCrop2] = useState<CropProfile>(CROPS[1]); // Maize

  const categories: (CropCategory | 'All')[] = ['All', 'Cereal', 'Pulse', 'Fruit', 'Commercial'];

  const filteredCrops = CROPS.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.soilType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Crop Intelligence Catalog & Matrix
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {CROPS.length} Crops Indexed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore empirical soil chemical tolerances, climate demands, and cultivation protocols
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              id="btn-toggle-crop-compare"
              type="button"
              onClick={() => setCompareMode(!compareMode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                compareMode
                  ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{compareMode ? 'Close Comparison' : 'Side-by-Side Comparison'}</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Drawer */}
        {compareMode && (
          <div className="mt-6 p-5 rounded-2xl bg-teal-50/50 border border-teal-200/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-sm text-slate-900">Crop Comparison Engine</h3>
              </div>
              <button
                type="button"
                onClick={() => setCompareMode(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop 1</label>
                <select
                  id="select-compare-crop-1"
                  value={compareCrop1.id}
                  onChange={(e) => {
                    const c = CROPS.find((x) => x.id === e.target.value);
                    if (c) setCompareCrop1(c);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800"
                >
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop 2</label>
                <select
                  id="select-compare-crop-2"
                  value={compareCrop2.id}
                  onChange={(e) => {
                    const c = CROPS.find((x) => x.id === e.target.value);
                    if (c) setCompareCrop2(c);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800"
                >
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-2.5 text-left font-bold w-1/3">Agronomic Parameter</th>
                    <th className="p-2.5 text-left font-bold w-1/3 text-emerald-800">
                      {compareCrop1.emoji} {compareCrop1.name}
                    </th>
                    <th className="p-2.5 text-left font-bold w-1/3 text-teal-800">
                      {compareCrop2.emoji} {compareCrop2.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Optimal Nitrogen (N)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop1.idealN[0]} – {compareCrop1.idealN[1]} kg/ha</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop2.idealN[0]} – {compareCrop2.idealN[1]} kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Optimal Phosphorus (P)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop1.idealP[0]} – {compareCrop1.idealP[1]} kg/ha</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop2.idealP[0]} – {compareCrop2.idealP[1]} kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Optimal Potassium (K)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop1.idealK[0]} – {compareCrop1.idealK[1]} kg/ha</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop2.idealK[0]} – {compareCrop2.idealK[1]} kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Soil Reaction (pH)</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop1.idealPh[0]} – {compareCrop1.idealPh[1]}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{compareCrop2.idealPh[0]} – {compareCrop2.idealPh[1]}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Water Demand</td>
                    <td className="p-2.5 font-semibold text-slate-800">{compareCrop1.waterRequirement}</td>
                    <td className="p-2.5 font-semibold text-slate-800">{compareCrop2.waterRequirement}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Growth Duration</td>
                    <td className="p-2.5 text-slate-800">{compareCrop1.growthDuration}</td>
                    <td className="p-2.5 text-slate-800">{compareCrop2.growthDuration}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-600">Soil Texture</td>
                    <td className="p-2.5 text-slate-800">{compareCrop1.soilType}</td>
                    <td className="p-2.5 text-slate-800">{compareCrop2.soilType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-crop-search"
              type="text"
              placeholder="Search crop name, soil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            id={`crop-card-${crop.id}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-3xl shadow-2xs flex-shrink-0">
                    {crop.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-slate-900 truncate">
                      {crop.name}
                    </h3>
                    <span className="text-xs text-slate-500 block truncate">
                      {crop.category} • {crop.season}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
                  {crop.waterRequirement} Water
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {crop.description}
              </p>

              {/* Chemical Nutrient Specs */}
              <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center font-mono text-xs mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 block">N (kg)</span>
                  <span className="font-bold text-slate-800">{crop.idealN[0]}-{crop.idealN[1]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">P (kg)</span>
                  <span className="font-bold text-slate-800">{crop.idealP[0]}-{crop.idealP[1]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">K (kg)</span>
                  <span className="font-bold text-slate-800">{crop.idealK[0]}-{crop.idealK[1]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">pH</span>
                  <span className="font-bold text-emerald-700">{crop.idealPh[0]}-{crop.idealPh[1]}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onViewCropDetails(crop)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Profile</span>
              </button>

              <button
                type="button"
                onClick={() => onApplyCropParameters(crop)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
                title="Populate soil parameters with this crop's target values"
              >
                <span>Load Soil Preset</span>
                <ArrowRight className="w-3 h-3 text-emerald-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">No matching crops found</p>
          <p className="text-xs text-slate-500 mt-1">Try refining your search terms or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
