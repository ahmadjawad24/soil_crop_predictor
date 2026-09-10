import { useState, useEffect, useMemo } from 'react';
import { SoilInput, CropProfile, PredictionResult, SavedSoilRecord, ToastMessage } from './types';
import { CROPS, predictCrop } from './data/cropDataset';
import { Header } from './components/Header';
import { SoilInputForm } from './components/SoilInputForm';
import { CropResultCard } from './components/CropResultCard';
import { SoilMetricsBreakdown } from './components/SoilMetricsBreakdown';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { ModelExplorer } from './components/ModelExplorer';
import { SavedTestsHistory } from './components/SavedTestsHistory';
import { CropDetailModal } from './components/CropDetailModal';
import { SaveTestModal } from './components/SaveTestModal';
import { SoilReportModal } from './components/SoilReportModal';
import { ToastContainer } from './components/Toast';
import { Sprout, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'agri_soil_saved_records_v1';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'predictor' | 'fertilizer' | 'catalog' | 'history'>('predictor');

  // Soil Input State (Default to balanced alluvial paddy)
  const [soilInput, setSoilInput] = useState<SoilInput>({
    n: 90,
    p: 45,
    k: 40,
    ph: 6.5
  });

  // Calculation Mode
  const [liveMode, setLiveMode] = useState<boolean>(true);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  // Modals & Selected Crop Details
  const [selectedCropForDetail, setSelectedCropForDetail] = useState<CropProfile | null>(null);
  const [selectedCropForFertilizer, setSelectedCropForFertilizer] = useState<CropProfile>(CROPS[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Saved Records from LocalStorage
  const [savedRecords, setSavedRecords] = useState<SavedSoilRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved records from localStorage', e);
    }
    return [
      {
        id: 'sample-1',
        plotName: 'East Valley Paddy Field',
        location: 'Plot #12, Delta Zone',
        date: '2026-09-08',
        input: { n: 85, p: 48, k: 40, ph: 6.5 },
        recommendedCrop: 'Rice (Paddy)',
        cropEmoji: '🌾',
        category: 'Cereal',
        confidence: 94,
        notes: 'Pre-monsoon soil test. High moisture retention.'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecords));
    } catch (e) {
      console.error('Failed to persist saved records', e);
    }
  }, [savedRecords]);

  // Main Prediction Result (Memoized for high performance)
  const predictionResult: PredictionResult = useMemo(() => {
    return predictCrop(soilInput);
  }, [soilInput]);

  // Keep fertilizer selected crop synced with top prediction if not manually modified
  useEffect(() => {
    if (predictionResult?.crop) {
      setSelectedCropForFertilizer(predictionResult.crop);
    }
  }, [predictionResult?.crop?.id]);

  const handleManualPredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      showToast('Prediction Calculated', `Best match: ${predictionResult.crop.name} (${predictionResult.confidence}% confidence)`, 'success');
    }, 250);
  };

  const handleApplyCropPreset = (crop: CropProfile) => {
    const newValues: SoilInput = {
      n: Math.round((crop.idealN[0] + crop.idealN[1]) / 2),
      p: Math.round((crop.idealP[0] + crop.idealP[1]) / 2),
      k: Math.round((crop.idealK[0] + crop.idealK[1]) / 2),
      ph: Number(((crop.idealPh[0] + crop.idealPh[1]) / 2).toFixed(1))
    };
    setSoilInput(newValues);
    setActiveTab('predictor');
    showToast('Applied Crop Soil Target', `Configured soil values for ${crop.name}.`, 'info');
  };

  const handleSaveRecord = (data: { plotName: string; location: string; notes: string }) => {
    const newRecord: SavedSoilRecord = {
      id: Date.now().toString(),
      plotName: data.plotName,
      location: data.location,
      date: new Date().toISOString().slice(0, 10),
      input: { ...soilInput },
      recommendedCrop: predictionResult.crop.name,
      cropEmoji: predictionResult.crop.emoji,
      category: predictionResult.crop.category,
      confidence: predictionResult.confidence,
      notes: data.notes
    };
    setSavedRecords((prev) => [newRecord, ...prev]);
    showToast('Soil Sample Saved', `Plot "${data.plotName}" added to history.`, 'success');
  };

  const handleLoadSavedRecord = (record: SavedSoilRecord) => {
    setSoilInput(record.input);
    setActiveTab('predictor');
    showToast('Loaded Soil Sample', `Loaded measurements from "${record.plotName}".`, 'info');
  };

  const handleDeleteSavedRecord = (id: string) => {
    setSavedRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Record Deleted', 'Soil test removed from history.', 'info');
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedRecords.length}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab 1: Soil Predictor (Main Workspace) */}
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            {/* Top Subheader Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold flex-shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    Soil Crop Intelligence & Precision Matching
                  </h1>
                  <p className="text-xs text-slate-500">
                    Input your soil test readings to receive instant crop recommendations and agronomic advisory.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>22 Agricultural Crops Evaluated</span>
                </span>
              </div>
            </div>

            {/* 2-Column Responsive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Soil Input Console (5 cols on large screens) */}
              <div className="lg:col-span-5 space-y-6">
                <SoilInputForm
                  input={soilInput}
                  onChange={setSoilInput}
                  onPredict={handleManualPredict}
                  isPredicting={isPredicting}
                  liveMode={liveMode}
                  onToggleLiveMode={() => {
                    setLiveMode(!liveMode);
                    showToast(
                      !liveMode ? 'Live Mode Enabled' : 'Manual Mode Enabled',
                      !liveMode ? 'Predictions calculate instantly as sliders move.' : 'Click Calculate button to run model.',
                      'info'
                    );
                  }}
                />
              </div>

              {/* Right Column: Prediction Hero Card & Breakdown (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <CropResultCard
                  result={predictionResult}
                  onSelectCrop={(crop) => {
                    setSelectedCropForDetail(crop);
                  }}
                  onViewCropDetails={(crop) => {
                    setSelectedCropForDetail(crop);
                  }}
                  onNavigateToFertilizer={() => {
                    setSelectedCropForFertilizer(predictionResult.crop);
                    setActiveTab('fertilizer');
                  }}
                  onSaveTest={() => {
                    setIsSaveModalOpen(true);
                  }}
                />

                <SoilMetricsBreakdown
                  input={soilInput}
                  result={predictionResult}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fertilizer & Amendment Calculator */}
        {activeTab === 'fertilizer' && (
          <FertilizerCalculator
            currentSoil={soilInput}
            selectedCrop={selectedCropForFertilizer}
            onCropChange={setSelectedCropForFertilizer}
            onShowToast={showToast}
          />
        )}

        {/* Tab 3: Crop Database & Matrix */}
        {activeTab === 'catalog' && (
          <ModelExplorer
            onApplyCropParameters={handleApplyCropPreset}
            onViewCropDetails={(crop) => setSelectedCropForDetail(crop)}
          />
        )}

        {/* Tab 4: Saved Soil Tests History */}
        {activeTab === 'history' && (
          <SavedTestsHistory
            records={savedRecords}
            onLoadRecord={handleLoadSavedRecord}
            onDeleteRecord={handleDeleteSavedRecord}
            onClearAll={handleClearAllRecords}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">AgroEdaphix</span>
            <span>•</span>
            <span>Precision Edaphic Intelligence & Agronomic Prescription Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Machine Learning Agricultural Model</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Production Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <CropDetailModal
        crop={selectedCropForDetail}
        onClose={() => setSelectedCropForDetail(null)}
        onApplySoilPreset={handleApplyCropPreset}
        onNavigateToFertilizer={(crop) => {
          setSelectedCropForFertilizer(crop);
          setActiveTab('fertilizer');
        }}
      />

      <SaveTestModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        input={soilInput}
        result={predictionResult}
        onSave={handleSaveRecord}
      />

      <SoilReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        input={soilInput}
        result={predictionResult}
        onShowToast={showToast}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
export default App;
