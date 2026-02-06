export const generateBaseline = (category: string): string => {
  const templates: Record<string, string[]> = {
    tech: [
      "L'innovation à portée de main",
      "Réinventer le futur, aujourd'hui",
      "La technologie au service de l'humain",
      "Votre partenaire numérique d'excellence",
      "Des solutions intelligentes pour un monde connecté",
      "Transformer les idées en réalité numérique",
      "L'expertise technologique qui fait la différence",
      "Connecter, créer, inspirer",
      "La puissance technologique au service de votre vision"
    ],
    finance: [
      "Votre liberté financière, notre mission",
      "Redéfinir l'excellence financière",
      "Investir intelligemment, vivre sereinement",
      "Votre partenaire de confiance pour la croissance",
      "Des solutions financières sur mesure",
      "Optimiser votre patrimoine, sécuriser votre avenir",
      "L'expertise financière au service de vos ambitions",
      "Gérez, investissez, prospérez",
      "Une vision financière pour chaque étape de votre vie"
    ],
    green: [
      "L'avenir durable commence ici",
      "Des solutions écologiques pour un monde meilleur",
      "Innovation verte, impact positif",
      "Réconcilier progrès et préservation",
      "Votre partenaire pour une transition écologique réussie",
      "Construire demain, respecter aujourd'hui",
      "L'écologie au cœur de l'innovation",
      "Un engagement vert pour chaque projet",
      "Solutions durables, impact mesurable"
    ],
    food: [
      "L'art culinaire réinventé",
      "Des saveurs authentiques, une expérience unique",
      "La gastronomie à son excellence",
      "Fraîcheur, qualité, passion",
      "Redécouvrez le plaisir de bien manger",
      "Créateurs de moments gourmands inoubliables",
      "L'excellence culinaire à portée de main",
      "Tradition et innovation au service du goût",
      "Chaque plat raconte une histoire"
    ],
    health: [
      "Votre bien-être, notre priorité absolue",
      "Prenez soin de vous, nous nous occupons du reste",
      "Une approche holistique de votre santé",
      "Votre partenaire santé pour une vie équilibrée",
      "Des solutions personnalisées pour votre vitalité",
      "Investir dans votre santé, le meilleur des rendements",
      "Bien-être au quotidien, excellence à chaque étape",
      "Votre parcours santé sur mesure",
      "La science au service de votre épanouissement"
    ],
    creative: [
      "Donner vie à vos inspirations",
      "L'art de transformer les idées en expériences",
      "Créativité et innovation sans frontières",
      "Votre vision, notre expertise créative",
      "Des solutions design qui marquent les esprits",
      "L'excellence créative au service de votre marque",
      "Imaginer, concevoir, impressionner",
      "Chaque projet est une œuvre unique",
      "L'innovation créative qui fait la différence"
    ]
  };

  const categoryTemplates = templates[category] || templates.tech;
  return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
};