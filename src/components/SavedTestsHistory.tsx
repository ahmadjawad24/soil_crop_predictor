import { useState } from 'react';
import { SavedSoilRecord } from '../types';
import {
  History,
  Trash2,
  Download,
  ArrowRight,
  Calendar,
  MapPin
} from 'lucide-react';

interface SavedTestsHistoryProps {
  records: SavedSoilRecord[];
  onLoadRecord: (record: SavedSoilRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
}

export function SavedTestsHistory({
  records,
  onLoadRecord,
  onDeleteRecord,
  onClearAll,
  onShowToast
}: SavedTestsHistoryProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredRecords = records.filter(
    (r) =>
      r.plotName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (r.location && r.location.toLowerCase().includes(filterQuery.toLowerCase())) ||
      r.recommendedCrop.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    if (records.length === 0) return;

    const headers = ['Plot Name', 'Location', 'Date', 'Nitrogen (kg/ha)', 'Phosphorus (kg/ha)', 'Potassium (kg/ha)', 'pH', 'Recommended Crop', 'Confidence %', 'Notes'];
    const rows = records.map((r) => [
      `"${r.plotName}"`,
      `"${r.location || ''}"`,
      `"${r.date}"`,
      r.input.n,
      r.input.p,
      r.input.k,
      r.input.ph,
      `"${r.recommendedCrop}"`,
      r.confidence,
      `"${r.notes || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `soil_tests_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Exported soil test history', 'Downloaded as CSV spreadsheet.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Saved Soil Test Records
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {records.length} Records
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Review, reload, and export previously analyzed agricultural plot soil tests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {records.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete all saved soil records?')) {
                      onClearAll();
                      onShowToast('Cleared history', 'All soil records removed.', 'info');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Clear All</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter search if records exist */}
        {records.length > 0 && (
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search by plot name, location, crop..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full sm:w-80 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Records List */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900">
                        {record.plotName}
                      </h3>
                      {record.location && (
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {record.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{record.date}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteRecord(record.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Soil Measurements */}
                <div className="grid grid-cols-4 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center font-mono text-xs mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">N</span>
                    <span className="font-bold text-slate-900">{record.input.n}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">P</span>
                    <span className="font-bold text-slate-900">{record.input.p}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">K</span>
                    <span className="font-bold text-slate-900">{record.input.k}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">pH</span>
                    <span className="font-bold text-emerald-700">{record.input.ph.toFixed(1)}</span>
                  </div>
                </div>

                {/* Recommendation Match */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{record.cropEmoji}</span>
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase block">Predicted Match</span>
                      <span className="font-bold text-xs text-slate-900">{record.recommendedCrop}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {record.confidence}% match
                  </span>
                </div>

                {record.notes && (
                  <p className="text-xs text-slate-500 italic mt-2.5">
                    "{record.notes}"
                  </p>
                )}
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => onLoadRecord(record)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Load Into Predictor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Saved Soil Tests Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
            Run a soil test prediction on the main console and click <strong>"Save Soil Test"</strong> to record plot samples for future reference.
          </p>
        </div>
      )}
    </div>
  );
}
