import { X, Clock, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { GeneratedName } from '../types';

interface HistoryPanelProps {
  onClose: () => void;
}

export default function HistoryPanel({ onClose }: HistoryPanelProps) {
  const [history, setHistory] = useState<GeneratedName[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    if (confirm('Voulez-vous vraiment effacer tout l\'historique ?')) {
      localStorage.removeItem('history');
      setHistory([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return new Date(timestamp).toLocaleDateString('fr-FR');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-scale">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-[#F0F7FF] to-white border-b border-[#E0DDD9]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#004E89] to-[#0066B8] rounded-2xl shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Historique
                </h2>
                <p className="text-[#6B6B6B] text-sm mt-1">
                  {history.length} génération{history.length > 1 ? 's' : ''} enregistrée{history.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 text-[#D64045] hover:bg-[#FFEAEA] rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Tout effacer</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-white rounded-xl transition-all duration-300 hover:rotate-90"
              >
                <X className="w-6 h-6 text-[#6B6B6B]" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gradient-to-br from-[#F5F3F0] to-white rounded-3xl mb-6">
                <Clock className="w-16 h-16 text-[#E0DDD9]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Aucun historique pour le moment
              </h3>
              <p className="text-[#6B6B6B]">
                Vos générations de noms apparaîtront ici
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((name, index) => (
                <div
                  key={name.id}
                  style={{ animationDelay: `${index * 20}ms` }}
                  className="group bg-gradient-to-br from-white to-[#F5F3F0] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-[#E0DDD9]/30 animate-scale"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7B801] blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <img src={name.logo} alt={name.name} className="relative w-12 h-12 rounded-xl shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors line-clamp-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {name.name}
                      </h3>
                      <p className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(name.timestamp)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">{name.baseline}</p>
                  
                  {/* Mini badges */}
                  <div className="flex gap-1 mt-3">
                    {Object.entries(name.domains).slice(0, 2).map(([ext, available]) => (
                      <span
                        key={ext}
                        className={`
                          px-2 py-0.5 rounded-md text-xs font-semibold
                          ${available
                            ? 'bg-[#E6F7F1] text-[#06A77D]'
                            : 'bg-[#FFEAEA] text-[#D64045]'
                          }
                        `}
                      >
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
