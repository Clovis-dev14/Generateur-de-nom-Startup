export const wordDatabase: Record<string, { adjectives: string[]; nouns: string[]; prefixes: string[]; suffixes: string[] }> = {
  tech: {
    adjectives: ["Apex", "Nova", "Vertex", "Zenith", "Prime", "Quantum", "Neural", "Synaptic", "Orbital", "Celestial", "Augmented", "Virtual", "Intelligent", "Adaptive", "Agile"],
    nouns: ["Logic", "Nexus", "Matrix", "Core", "Sphere", "Grid", "Stack", "Node", "Pulse", "Flow", "Circuit", "Signal", "Data", "Code", "Bit"],
    prefixes: ["Neuro", "Apex", "Nova", "Vertex", "Zenith", "Prime", "Quantum", "Data", "Cloud", "Smart", "Digi", "Cyber", "Virtual", "Synth", "Algo"],
    suffixes: ["tech", "labs", "ai", "io", "sys", "core", "grid", "flow", "logic", "nexus", "pulse", "signal", "data", "code", "bit"]
  },
  finance: {
    adjectives: ["Alpha", "Beta", "Gamma", "Sigma", "Omega", "Capital", "Sovereign", "Meridian", "Prosper", "Ascend", "Pinnacle", "Summit", "Vantage", "Crest", "Apex"],
    nouns: ["Wealth", "Capital", "Equity", "Asset", "Trust", "Yield", "Dividend", "Portfolio", "Security", "Bond", "Fund", "Credit", "Ledger", "Vault", "Safe"],
    prefixes: ["Alpha", "Capital", "Equity", "Wealth", "Asset", "Trust", "Yield", "Fund", "Port", "Safe", "Vault", "Credit", "Ledger", "Bond", "Security"],
    suffixes: ["wealth", "capital", "trust", "fund", "asset", "equity", "yield", "dividend", "portfolio", "security", "bond", "credit", "ledger", "vault", "safe"]
  },
  green: {
    adjectives: ["Verdant", "Lush", "Emerald", "Jade", "Forest", "Moss", "Sage", "Olive", "Spring", "Meadow", "Breeze", "Zephyr", "Solar", "Lunar", "Terra"],
    nouns: ["Bloom", "Leaf", "Root", "Seed", "Sprout", "Canopy", "Grove", "Meadow", "Garden", "Orchard", "Harvest", "Crop", "Soil", "Compost", "Eco"],
    prefixes: ["Eco", "Green", "Bio", "Verd", "Emerald", "Forest", "Moss", "Sage", "Solar", "Lunar", "Terra", "Bloom", "Leaf", "Root", "Seed"],
    suffixes: ["green", "eco", "bio", "leaf", "root", "seed", "sprout", "bloom", "garden", "grove", "meadow", "orchard", "harvest", "soil", "compost"]
  },
  food: {
    adjectives: ["Savory", "Umami", "Aromatic", "Zesty", "Tangy", "Crisp", "Velvety", "Buttery", "Smoky", "Herbal", "Spicy", "Mild", "Rich", "Light", "Fresh"],
    nouns: ["Bite", "Morsel", "Crumb", "Slice", "Dice", "Chop", "Mince", "Whisk", "Fold", "Knead", "Baste", "Glaze", "Marinade", "Rub", "Crust"],
    prefixes: ["Gusto", "Zest", "Aroma", "Flavor", "Taste", "Savor", "Bite", "Crumb", "Slice", "Dice", "Chop", "Mince", "Whisk", "Fold", "Knead"],
    suffixes: ["bite", "morsel", "crumb", "slice", "dice", "chop", "mince", "whisk", "fold", "knead", "baste", "glaze", "marinade", "rub", "crust"]
  },
  health: {
    adjectives: ["Vital", "Robust", "Sturdy", "Sound", "Whole", "Balanced", "Centered", "Aligned", "Tuned", "Optimal", "Peak", "Prime", "Zen", "Calm", "Serene"],
    nouns: ["Pulse", "Rhythm", "Beat", "Flow", "Cycle", "Phase", "State", "Mode", "Form", "Shape", "Posture", "Stance", "Gait", "Breath", "Focus"],
    prefixes: ["Vita", "Zen", "Pulse", "Rhythm", "Flow", "Cycle", "Phase", "State", "Mode", "Form", "Shape", "Posture", "Stance", "Gait", "Breath"],
    suffixes: ["vital", "zen", "pulse", "rhythm", "flow", "cycle", "phase", "state", "mode", "form", "shape", "posture", "stance", "gait", "breath"]
  },
  creative: {
    adjectives: ["Vivid", "Bold", "Sharp", "Crisp", "Clean", "Pure", "Raw", "Edgy", "Sleek", "Smooth", "Textured", "Layered", "Depth", "Volume", "Space"],
    nouns: ["Stroke", "Line", "Edge", "Curve", "Angle", "Plane", "Form", "Mass", "Volume", "Space", "Depth", "Layer", "Texture", "Finish", "Polish"],
    prefixes: ["Vivid", "Bold", "Sharp", "Crisp", "Clean", "Pure", "Raw", "Edgy", "Sleek", "Stroke", "Line", "Edge", "Curve", "Angle", "Plane"],
    suffixes: ["vivid", "bold", "sharp", "crisp", "clean", "pure", "raw", "edgy", "sleek", "stroke", "line", "edge", "curve", "angle", "plane"]
  }
};