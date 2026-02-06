import { Star, Clock, FileDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onShowFavorites: () => void;
  onShowHistory: () => void;
  onExportPDF: () => void;
  favoritesCount: number;
}

export default function Header({ onShowFavorites, onShowHistory, onExportPDF, favoritesCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-effect sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between">
        {/* Logo et titre */}
        <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer flex-shrink-0">
          <img 
            src="logo.png" 
            alt="Logo Startup-dev" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain transform group-hover:scale-105 transition-transform duration-300" 
          />
          
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-blue-800 leading-tight" 
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Startup-dev
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 sm:mt-1">
              Générateur de noms startup
            </p>
          </div>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={onShowFavorites}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/50 transition-all duration-300 group"
          >
            <Star className="w-4 h-4 text-blue-800 group-hover:fill-[#F7B801] transition-all" />
            <span className="text-sm font-medium">Favoris</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onShowHistory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/50 transition-all duration-300 group"
          >
            <Clock className="w-4 h-4 text-[#004E89] group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Historique</span>
          </button>

          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            <FileDown className="w-4 h-4" />
            <span>Exporter PDF</span>
          </button>
        </nav>

        {/* Bouton menu mobile UNIQUEMENT */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative p-2.5 rounded-xl hover:bg-white/50 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-800" />
            ) : (
              <>
                <Menu className="w-6 h-6 text-blue-800" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-xl animate-in slide-in-from-top">
          <div className="px-4 py-4 flex flex-col gap-2">
            <button
              onClick={() => {
                onShowFavorites();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-blue-800" />
                <span className="font-medium text-gray-800">Favoris</span>
              </div>
              {favoritesCount > 0 && (
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-white text-sm font-bold rounded-full px-2.5 py-0.5">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onShowHistory();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-gray-100"
            >
              <Clock className="w-5 h-5 text-[#004E89]" />
              <span className="font-medium text-gray-800">Historique</span>
            </button>

            <button
              onClick={() => {
                onExportPDF();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3.5 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all duration-300 font-medium mt-2"
            >
              <FileDown className="w-5 h-5" />
              <span>Exporter PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}