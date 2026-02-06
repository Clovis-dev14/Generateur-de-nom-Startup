import { Star, Clock, FileDown } from 'lucide-react';

interface HeaderProps {
  onShowFavorites: () => void;
  onShowHistory: () => void;
  onExportPDF: () => void;
  favoritesCount: number;
}

export default function Header({ onShowFavorites, onShowHistory, onExportPDF, favoritesCount }: HeaderProps) {
  return (
    <header className="glass-effect sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4 group cursor-pointer">
  {/* Logo seul, taille agrandie */}
  <img 
    src="logo.png" 
    alt="Logo Startup-dev" 
    className="w-20 h-20 object-contain transform group-hover:scale-110 transition-transform duration-300" 
  />
  
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-blue-800" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      Startup-dev
    </h1>
    <p className="text-sm text-gray-700 mt-1 font-medium">
      Générateur de noms startup
    </p>
  </div>
</div>
        <nav className="flex items-center gap-2">
          <button
            onClick={onShowFavorites}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/50 transition-all duration-300 group"
          >
            <Star className="w-4 h-4 text-blue-800 group-hover:fill-[#F7B801] transition-all" />
            <span className="hidden sm:inline text-sm font-medium">Favoris</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF6B35] to-[#F7B801] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg badge-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={onShowHistory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/50 transition-all duration-300 group"
          >
            <Clock className="w-4 h-4 text-[#004E89] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-sm font-medium">Historique</span>
          </button>

          <button
            onClick={onExportPDF}
            className="relative flex items-center gap-2 px-6 py-2.5 bg-blue-800 text-white rounded-xl hover:shadow-hover transition-all duration-300 font-medium ml-2 btn-ripple overflow-hidden group"
          >
            <FileDown className="w-4 h-4 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Exporter PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
