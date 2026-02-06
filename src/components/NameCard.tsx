import { Star, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { GeneratedName } from '../types';

interface NameCardProps {
  name: GeneratedName;
  onAddToFavorites: (name: GeneratedName) => void;
  isFavorite: boolean;
}

export default function NameCard({ name, onAddToFavorites, isFavorite }: NameCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-3xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 card-hover animate-scale border border-[#E0DDD9]/30">
      {/* Effet de fond au survol */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/0 to-[#F7B801]/0 group-hover:from-[#FF6B35]/5 group-hover:to-[#F7B801]/5 rounded-3xl transition-all duration-300"></div>
      
      <div className="relative">
        {/* Header avec logo et favori */}
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7B801] blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img src={name.logo} alt={name.name} className="relative w-16 h-16 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300" />
          </div>

          <button
            onClick={() => onAddToFavorites(name)}
            className="p-2 rounded-xl hover:bg-[#FFF5F2] transition-all duration-300 group/fav"
          >
            <Star className={`w-5 h-5 transition-all duration-300 ${
              isFavorite 
                ? 'fill-[#F7B801] text-[#F7B801] scale-110' 
                : 'text-[#E0DDD9] group-hover/fav:text-[#F7B801] group-hover/fav:scale-110'
            }`} />
          </button>
        </div>

        {/* Nom et baseline */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF6B35] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {name.name}
          </h3>
          <p className="text-[#6B6B6B] text-sm leading-relaxed">{name.baseline}</p>
        </div>

        {/* Disponibilité domaines */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-1 bg-[#FF6B35] rounded-full"></div>
            <span className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">Domaines</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(name.domains).map(([ext, available]) => (
              <span
                key={ext}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300
                  ${available === null
                    ? 'bg-gray-100 text-gray-500'
                    : available
                    ? 'bg-gradient-to-r from-[#06A77D]/10 to-[#06A77D]/20 text-[#06A77D] border border-[#06A77D]/20'
                    : 'bg-gradient-to-r from-[#D64045]/10 to-[#D64045]/20 text-[#D64045] border border-[#D64045]/20'
                  }
                `}
              >
                {ext} {available === null ? '?' : available ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>

        {/* Disponibilité réseaux sociaux */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-1 bg-[#004E89] rounded-full"></div>
            <span className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">Réseaux</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(name.socials).map(([platform, available]) => (
              <span
                key={platform}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all duration-300
                  ${available
                    ? 'bg-gradient-to-r from-[#06A77D]/10 to-[#06A77D]/20 text-[#06A77D] border border-[#06A77D]/20'
                    : 'bg-gradient-to-r from-[#D64045]/10 to-[#D64045]/20 text-[#D64045] border border-[#D64045]/20'
                  }
                `}
              >
                {platform} {available ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-[#E0DDD9]/50">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-2.5 bg-[#F5F3F0] hover:bg-[#E0DDD9] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/copy"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#06A77D]" />
                <span className="text-sm font-medium text-[#06A77D]">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6B6B6B] group-hover/copy:text-[#FF6B35] transition-colors" />
                <span className="text-sm font-medium text-[#6B6B6B] group-hover/copy:text-[#FF6B35] transition-colors">Copier</span>
              </>
            )}
          </button>
          
      
        </div>
      </div>
    </div>
  );
}
