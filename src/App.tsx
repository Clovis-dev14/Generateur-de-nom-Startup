import { useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NameGenerator from './components/NameGenerator';
import NameCard from './components/NameCard';
import FavoritesList from './components/FavoritesList';
import HistoryPanel from './components/HistoryPanel';
import { exportToPDF } from './utils/pdfGenerator';
import { TrendingUp, Zap } from 'lucide-react';
import type { GeneratedName } from './types';

function App() {
  const [category, setCategory] = useState('tech');
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [favorites, setFavorites] = useState<GeneratedName[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleAddToFavorites = (name: GeneratedName) => {
    if (!favorites.some(f => f.id === name.id)) {
      setFavorites([...favorites, name]);
    } else {
      setFavorites(favorites.filter(f => f.id !== name.id));
    }
  };

  const handleExportPDF = () => {
    if (names.length === 0) {
      alert('Générez des noms avant d\'exporter !');
      return;
    }
    exportToPDF(names);
  };

  return (
    <div className="min-h-screen">
      <Header
        onShowFavorites={() => setShowFavorites(true)}
        onShowHistory={() => setShowHistory(true)}
        onExportPDF={handleExportPDF}
        favoritesCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <CategoryFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        <NameGenerator
          category={category}
          onGenerate={setNames}
        />

        {names.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {names.map((name, index) => (
              <div key={name.id} style={{ animationDelay: `${index * 50}ms` }}>
                <NameCard
                  name={name}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={favorites.some(f => f.id === name.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-in">
         <div className="relative inline-block mb-8">
                 <div className="absolute inset-0 bg-blue-800 blur-3xl opacity-20 animate-pulse -z-10"></div>
     <img 
  src="logo.png" 
  alt="Logo Startup-dev" 
  className="w-20 h-20 object-contain transform group-hover:scale-110 transition-transform duration-300 relative" 
  style={{ width: '90px', height: '90px' }} 
/>
</div>
            
            <h3 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Prêt à trouver le nom parfait ?
            </h3>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-md mx-auto">
              Sélectionnez une catégorie et cliquez sur "Générer" pour découvrir des noms uniques pour votre startup
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[#6B6B6B]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E6F7F1] rounded-xl">
                  <TrendingUp className="w-5 h-5 text-[#06A77D]" />
                </div>
                <span>10 noms générés instantanément</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFF5F2] rounded-xl">
                  <Zap className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <span>Vérification automatique</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onRemove={(id) => setFavorites(favorites.filter(f => f.id !== id))}
        />
      )}

      {showHistory && (
        <HistoryPanel
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-[#6B6B6B] text-sm border-t border-[#E0DDD9]/30">
       
        <p className="mt-2">© 2026 Startup-dev - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
