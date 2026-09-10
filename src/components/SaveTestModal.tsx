import React, { useState } from 'react';
import { SoilInput, PredictionResult } from '../types';
import { X, BookmarkPlus, MapPin } from 'lucide-react';

interface SaveTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: SoilInput;
  result: PredictionResult;
  onSave: (data: { plotName: string; location: string; notes: string }) => void;
}

export function SaveTestModal({
  isOpen,
  onClose,
  input,
  result,
  onSave
}: SaveTestModalProps) {
  const [plotName, setPlotName] = useState('North Acre Plot A');
  const [location, setLocation] = useState('Field Zone 3');
  const [notes, setNotes] = useState('Pre-monsoon soil core sampling test');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotName.trim()) return;
    onSave({
      plotName: plotName.trim(),
      location: location.trim(),
      notes: notes.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <BookmarkPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Save Soil Test Record</h3>
              <p className="text-[11px] text-slate-500">Store this test sample in local history</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Quick Snapshot */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[10px]">CURRENT SOIL</span>
              <span className="font-mono font-bold text-slate-800">
                N:{input.n} | P:{input.p} | K:{input.k} | pH:{input.ph.toFixed(1)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">PREDICTED</span>
              <span className="font-bold text-emerald-700">
                {result.crop.emoji} {result.crop.name}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Plot / Field Name *
            </label>
            <input
              type="text"
              required
              value={plotName}
              onChange={(e) => setPlotName(e.target.value)}
              placeholder="e.g. South Sector 4, Riverbed plot"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Farm Location / Region (Optional)
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Block C, Western Valley"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Field Notes / Observations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Low moisture prior to rain, slight sandy texture..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs cursor-pointer"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
