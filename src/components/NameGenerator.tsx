import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateNames } from '../utils/nameGenerator';
import { checkAllDomains } from '../utils/domainChecker';
import { checkAllSocials } from '../utils/socialChecker';
import type { GeneratedName } from '../types';

interface NameGeneratorProps {
  category: string;
  onGenerate: (names: GeneratedName[]) => void;
}

export default function NameGenerator({ category, onGenerate }: NameGeneratorProps) {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const generatedNames = generateNames(category, keyword);

    const namesWithAvailability = await Promise.all(
      generatedNames.map(async (name) => {
        const domains = await checkAllDomains(name.name);
        const socials = await checkAllSocials(name.name);
        return { ...name, domains, socials };
      })
    );

    onGenerate(namesWithAvailability);
    setLoading(false);

    const history = JSON.parse(localStorage.getItem('history') || '[]');
    localStorage.setItem('history', JSON.stringify([...namesWithAvailability, ...history].slice(0, 20)));
  };

  return (
    <section className="relative mb-16 animate-in">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-[#F7B801]/5 rounded-3xl blur-3xl"></div>
      
      <div className="relative glass-effect rounded-3xl p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-800 rounded-xl">
           <img src="start-up.png" alt="icone startup" className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Générateur de noms
            </h3>
            <p className="text-sm text-[#6B6B6B]">Ajoutez un mot-clé pour personnaliser (optionnel)</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ex: fast, smart, green, pay..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleGenerate()}
              className="w-full px-5 py-4 bg-white border-2 border-[#E0DDD9] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all shadow-sm placeholder:text-[#6B6B6B]/50"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#FF6B35] transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="relative px-10 py-4 bg-blue-800 text-white rounded-2xl font-semibold flex items-center gap-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-hover transition-all duration-300 btn-ripple group overflow-hidden"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Générer 10 noms</span>
              </>
            )}
          </button>
        </div>

        {/* Indication */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B6B6B]">
          <div className="w-1.5 h-1.5 bg-[#06A77D] rounded-full animate-pulse"></div>
          <span>Vérification automatique des domaines et réseaux sociaux</span>
        </div>
      </div>
    </section>
  );
}
