import { X, Trash2, Star } from 'lucide-react';
import type { GeneratedName } from '../types';

interface FavoritesListProps {
  favorites: GeneratedName[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function FavoritesList({ favorites, onClose, onRemove }: FavoritesListProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-scale">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-[#FFF5F2] to-white border-b border-[#E0DDD9]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-800 rounded-2xl shadow-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Mes Favoris
                </h2>
                <p className="text-[#6B6B6B] text-sm mt-1">
                  {favorites.length} nom{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-white rounded-xl transition-all duration-300 hover:rotate-90"
            >
              <X className="w-6 h-6 text-[#6B6B6B]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gradient-to-br from-[#F5F3F0] to-white rounded-3xl mb-6">
<img src="start-up.png" alt="Startup Logo" className="w-16 h-16 text-[#E0DDD9]" />              
</div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Aucun favori pour le moment
              </h3>
              <p className="text-[#6B6B6B]">
                Cliquez sur l'étoile ⭐ pour sauvegarder vos noms préférés
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((name, index) => (
                <div
                  key={name.id}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className="group relative bg-gradient-to-br from-white to-[#F5F3F0] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border border-[#E0DDD9]/30 animate-scale"
                >
                  <div className="flex items-center gap-5">
                    {/* Logo */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7B801] blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <img src={name.logo} alt={name.name} className="relative w-14 h-14 rounded-xl shadow-md" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#FF6B35] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {name.name}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] line-clamp-1">{name.baseline}</p>
                      
                      {/* Badges de disponibilité */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {Object.entries(name.domains).slice(0, 3).map(([ext, available]) => (
                          <span
                            key={ext}
                            className={`
                              px-2 py-1 rounded-lg text-xs font-semibold
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
                    
                    {/* Bouton supprimer */}
                    <button
                      onClick={() => onRemove(name.id)}
                      className="flex-shrink-0 p-3 hover:bg-[#FFEAEA] text-[#6B6B6B] hover:text-[#D64045] rounded-xl transition-all duration-300 group/del"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 group-hover/del:scale-110 transition-transform" />
                    </button>
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
