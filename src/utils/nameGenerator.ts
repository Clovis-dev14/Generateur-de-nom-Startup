import { wordDatabase } from '../data/wordDatabase';
import { generateBaseline } from './baselineGenerator';
import { generateLogo } from './logoGenerator';
import type { GeneratedName } from '../types';

const randomPick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateNames = (category: string, keyword?: string, count: number = 10): GeneratedName[] => {
  const words = wordDatabase[category];
  const names: Set<string> = new Set();

  while (names.size < count) {
    const method = Math.floor(Math.random() * 4);
    let name = '';

    switch(method) {
      case 0:
        name = randomPick(words.adjectives) + randomPick(words.nouns);
        break;
      case 1:
        name = randomPick(words.prefixes) + randomPick(words.suffixes);
        break;
      case 2:
        name = randomPick(words.nouns) + randomPick(words.suffixes);
        break;
      case 3:
        name = randomPick(words.adjectives) + randomPick(words.nouns) + randomPick(words.suffixes);
        break;
    }

    if (keyword && keyword.trim()) {
      name = keyword.charAt(0).toUpperCase() + keyword.slice(1) + randomPick(words.nouns);
    }

    if (name.length >= 6 && name.length <= 15) {
      names.add(name);
    }
  }

  return Array.from(names).map(name => ({
    id: crypto.randomUUID(),
    name,
    baseline: generateBaseline(category),
    category,
    logo: generateLogo(name),
    domains: {},
    socials: {},
    timestamp: Date.now()
  }));
};
