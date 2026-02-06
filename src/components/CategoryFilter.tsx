interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'tech', label: 'Tech/SaaS', emoji: '🚀', gradient: 'from-[#FF6B35] to-[#FF8C5A]' },
  { id: 'finance', label: 'Finance', emoji: '💰', gradient: 'from-[#004E89] to-[#0066B8]' },
  { id: 'green', label: 'Écologie', emoji: '🌿', gradient: 'from-[#06A77D] to-[#2AC99A]' },
  { id: 'food', label: 'Food', emoji: '🍔', gradient: 'from-[#F7B801] to-[#FFC93C]' },
  { id: 'health', label: 'Santé', emoji: '🏥', gradient: 'from-[#D64045] to-[#E76F51]' },
  { id: 'creative', label: 'Creative', emoji: '🎨', gradient: 'from-[#2A9D8F] to-[#48C4B7]' },
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <section className="mb-16 animate-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Quelle est votre industrie ?
        </h2>
        <p className="text-[#6B6B6B]">Choisissez une catégorie pour générer des noms adaptés</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`
              group relative p-6 rounded-2xl transition-all duration-300 animate-scale
              ${selectedCategory === cat.id
                ? 'bg-white shadow-hover scale-105'
                : 'bg-white/50 hover:bg-white hover:shadow-soft hover:scale-102'
              }
            `}
          >
            {/* Badge de sélection */}
            {selectedCategory === cat.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FF6B35] to-[#F7B801] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Fond gradient au survol */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 
              transition-opacity duration-300 rounded-2xl
            `}></div>
            
            {/* Contenu */}
            <div className="relative">
              <div className={`
                text-5xl mb-3 transition-transform duration-300
                ${selectedCategory === cat.id ? 'scale-110' : 'group-hover:scale-110 group-hover:animate-bounce'}
              `}>
                {cat.emoji}
              </div>
              <div className={`
                text-sm font-semibold transition-colors
                ${selectedCategory === cat.id ? 'text-[#FF6B35]' : 'text-[#1A1A1A] group-hover:text-[#FF6B35]'}
              `}>
                {cat.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
