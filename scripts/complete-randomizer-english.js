#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Complete English translations for randomizerSeo
const englishTranslations = {
  types: {
    classic: {
      title: "Classic Random Elf Names",
      description: "Traditional elvish names randomly selected from ancient naming traditions spanning all major elf cultures and linguistic patterns."
    },
    halfElf: {
      title: "Mixed Heritage Random Names", 
      description: "Random names blending different elvish traditions with occasional human influences for characters with diverse backgrounds."
    },
    woodElf: {
      title: "Nature Random Elf Names",
      description: "Forest and nature-themed random names perfect for characters with connections to woodland environments and natural magic."
    },
    darkElf: {
      title: "Shadow Random Elf Names",
      description: "Mysterious and dark-themed random names suitable for underground cultures, shadow magic users, and sinister character concepts."
    },
    dnd: {
      title: "D&D Random Elf Names",
      description: "Random names specifically suited for Dungeons & Dragons campaigns, covering all official elf subraces and cultural variations."
    },
    gender: {
      title: "Gender-Diverse Random Names",
      description: "Random elf names spanning male, female, and non-binary naming conventions across all elvish cultural traditions."
    }
  },
  howToUse: {
    title: "How to Use the Elf Name Randomizer",
    description: "Using our elf name randomizer is designed for quick inspiration and instant character creation across all your fantasy projects.",
    step1: {
      title: "Set Random Parameters",
      description: "Choose your preferred randomization scope, including specific elf cultures or complete random selection across all elvish traditions."
    },
    step2: {
      title: "Generate Random Names", 
      description: "Click the randomize button to instantly generate diverse elf names from our comprehensive database of authentic elvish naming patterns."
    },
    step3: {
      title: "Explore and Iterate",
      description: "Browse through randomly generated results and generate new batches until you find the perfect inspiration for your characters or creative projects."
    }
  },
  whyEssential: {
    title: "Why Use an Elf Name Randomizer?",
    saveTime: {
      title: "Instant Inspiration",
      description: "Our elf name randomizer provides immediate creative inspiration, eliminating the time spent brainstorming and researching elvish naming conventions."
    },
    creativity: {
      title: "Unexpected Combinations",
      description: "Random generation creates surprising name combinations you might never have considered, sparking new character concepts and story ideas."
    },
    consistency: {
      title: "Authentic Randomness",
      description: "Every randomly generated name maintains authentic elvish linguistic patterns while providing the unpredictability essential for creative inspiration."
    },
    accessible: {
      title: "Universal Random Tool",
      description: "Our elf name randomizer works for any fantasy setting, campaign style, or creative project requiring diverse elvish character names."
    }
  },
  topFeatures: {
    title: "Advanced Elf Name Randomizer Features",
    description: "Our elf name randomizer includes sophisticated algorithms that ensure authentic, diverse, and inspiring random name generation.",
    diverse: {
      title: "Complete Cultural Coverage",
      description: "The elf name randomizer draws from all major elvish cultures, ensuring truly diverse random results that span the entire spectrum of fantasy naming traditions."
    },
    gender: {
      title: "Inclusive Random Options",
      description: "Generate random elf names across all gender presentations, with the randomizer respecting traditional naming patterns while ensuring inclusive representation."
    },
    customizable: {
      title: "Controlled Randomization",
      description: "Adjust randomization parameters to focus on specific elvish cultures or maintain complete randomness across all naming traditions."
    },
    free: {
      title: "Unlimited Random Generation",
      description: "Use our elf name randomizer without restrictions, generating unlimited random names for all your creative projects and campaigns."
    }
  },
  popularUses: {
    title: "Popular Uses for Elf Name Randomizers",
    description: "Our elf name randomizer serves creators across many platforms, providing instant inspiration for diverse creative needs.",
    tabletop: {
      title: "Random RPG Encounters",
      description: "Game masters use our elf name randomizer to quickly create NPCs during gameplay, ensuring every random encounter has authentic elvish characters."
    },
    novels: {
      title: "Fantasy Literature",
      description: "Authors use our elf name randomizer to populate their fantasy worlds with diverse elvish characters, ensuring authentic naming across all cultures."
    },
    onlineGames: {
      title: "Online Gaming",
      description: "Players use our elf name randomizer for MMORPGs, creating unique character names that stand out while maintaining fantasy authenticity."
    },
    creativeWriting: {
      title: "Creative Writing",
      description: "Writers use our elf name randomizer for short stories, screenplays, and creative projects requiring authentic elvish character names."
    }
  },
  supportedTypes: {
    title: "Supported Random Elf Types",
    woodElf: {
      title: "Wood Elf Random Names",
      description: "Forest-dwelling elves with nature-inspired random names perfect for rangers, druids, and woodland characters."
    },
    darkElf: {
      title: "Dark Elf Random Names", 
      description: "Underground and shadow-themed random names suitable for drow, dark magic users, and mysterious characters."
    },
    halfElf: {
      title: "Half-Elf Random Names",
      description: "Mixed heritage random names blending elvish and human naming traditions for diverse character backgrounds."
    },
    highElf: {
      title: "High Elf Random Names",
      description: "Noble and arcane random names perfect for magical scholars, court nobles, and ancient elvish bloodlines."
    },
    moonElf: {
      title: "Moon Elf Random Names",
      description: "Celestial-themed random names for elves connected to lunar magic, night activities, and astral powers."
    },
    sunElf: {
      title: "Sun Elf Random Names",
      description: "Solar-inspired random names for elves associated with daylight, solar magic, and radiant energies."
    },
    wildElf: {
      title: "Wild Elf Random Names",
      description: "Primal and untamed random names for elves living in harmony with raw nature and wild magic."
    },
    seaElf: {
      title: "Sea Elf Random Names",
      description: "Ocean-themed random names for aquatic elves, coastal dwellers, and maritime magical traditions."
    },
    snowElf: {
      title: "Snow Elf Random Names",
      description: "Arctic-inspired random names for elves adapted to cold climates, ice magic, and winter environments."
    }
  },
  gallery: {
    title: "Elf Character Examples Gallery",
    description: "Explore visual inspiration for the diverse elf characters you can create with our random name generator.",
    woodElf: {
      alt: "Wood Elf Ranger character with bow in forest setting",
      title: "Wood Elf Ranger",
      description: "A skilled forest guardian with nature-inspired random names perfect for woodland adventures and druidic magic."
    },
    darkElf: {
      alt: "Dark Elf Mage with magical powers in underground setting", 
      title: "Dark Elf Mage",
      description: "A mysterious spellcaster with shadow-themed random names ideal for underground campaigns and dark magic."
    },
    highElf: {
      alt: "High Elf Noble in elegant robes with arcane symbols",
      title: "High Elf Noble", 
      description: "An aristocratic magic user with noble random names perfect for court intrigue and ancient magical traditions."
    }
  },
  categories: {
    title: "Random Elf Name Categories",
    natureInspired: {
      title: "Nature-Inspired Random Names",
      description: "Random names drawing from natural elements, seasons, and woodland themes.",
      examples: {
        silverleaf: { name: "Silverleaf", meaning: "Silver Tree" },
        moonwhisper: { name: "Moonwhisper", meaning: "Lunar Voice" },
        starweaver: { name: "Starweaver", meaning: "Celestial Crafter" },
        windrunner: { name: "Windrunner", meaning: "Swift Traveler" }
      }
    },
    nobleTitles: {
      title: "Noble Random Titles",
      description: "Random names reflecting elvish nobility, ancient bloodlines, and royal heritage.",
      examples: {
        goldenbrow: { name: "Goldenbrow", meaning: "Noble Bearing" },
        crystalborn: { name: "Crystalborn", meaning: "Pure Heritage" },
        thornheart: { name: "Thornheart", meaning: "Protected Soul" },
        stormcrown: { name: "Stormcrown", meaning: "Weather Master" }
      }
    },
    magicalNames: {
      title: "Magical Random Names",
      description: "Random names emphasizing arcane power, spellcasting, and mystical abilities.",
      examples: {
        spellsong: { name: "Spellsong", meaning: "Magic Voice" },
        runekeeper: { name: "Runekeeper", meaning: "Symbol Guardian" },
        dreamweaver: { name: "Dreamweaver", meaning: "Vision Crafter" },
        lightbringer: { name: "Lightbringer", meaning: "Illumination Bearer" }
      }
    }
  },
  linguisticFeatures: {
    title: "Random Elf Name Linguistic Features",
    elvishLanguagePatterns: {
      title: "Random Elvish Language Patterns",
      description: "Our elf name randomizer incorporates authentic linguistic patterns from major elvish language families.",
      sindarin: {
        title: "Sindarin Random Patterns",
        description: "Random names following Tolkien's Grey-elven linguistic structures and phonetic rules.",
        feature1: "Flowing consonant clusters in random combinations",
        feature2: "Melodic vowel patterns in random arrangements", 
        feature3: "Nature-based random morphemes and meanings"
      },
      quenya: {
        title: "Quenya Random Patterns",
        description: "Random names based on High Elvish formal linguistic traditions and ancient structures.",
        feature1: "Formal random syllable structures",
        feature2: "Ancient random morphological patterns",
        feature3: "Noble random naming conventions"
      },
      dndElvish: {
        title: "D&D Elvish Random Patterns",
        description: "Random names adapted for Dungeons & Dragons elvish cultures and campaign settings.",
        feature1: "Campaign-appropriate random naming",
        feature2: "Subrace-specific random patterns",
        feature3: "Setting-neutral random adaptability"
      }
    },
    pronunciationGuide: {
      title: "Random Name Pronunciation Guide",
      description: "Learn to pronounce randomly generated elvish names with authentic elvish phonetic patterns.",
      vowelSounds: {
        title: "Random Vowel Sounds",
        sounds: {
          a: "as in 'father' (random combinations)",
          e: "as in 'hey' (random patterns)",
          i: "as in 'machine' (random usage)",
          o: "as in 'more' (random placement)",
          u: "as in 'moon' (random occurrence)"
        }
      },
      consonantCombinations: {
        title: "Random Consonant Combinations",
        combinations: {
          th: "soft 'th' as in 'think' (random positioning)",
          dh: "soft 'th' as in 'this' (random usage)",
          ng: "as in 'sing' (random combinations)",
          ch: "as in German 'ach' (random patterns)",
          ph: "as 'f' sound (random placement)"
        }
      }
    }
  },
  cta: {
    title: "Start Your Random Elf Name Journey",
    description: "Ready to discover unique elvish names through random generation? Our elf name randomizer provides instant inspiration for all your fantasy character needs.",
    primaryButton: "Generate Random Elf Names",
    secondaryButton: "Explore Random Options",
    exploreButton: "Explore Random Options"
  }
};

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function completeEnglishTranslations() {
  const filePath = path.join(__dirname, '..', 'messages', 'en.json');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log('Completing English randomizerSeo translations...');

    if (data.randomizerSeo) {
      // Merge the complete translations with existing content
      data.randomizerSeo = deepMerge(data.randomizerSeo, englishTranslations);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log('✓ English randomizerSeo translations completed!');
    } else {
      console.log('❌ randomizerSeo section not found in English file');
    }

  } catch (error) {
    console.error('Error completing English translations:', error.message);
  }
}

if (require.main === module) {
  completeEnglishTranslations();
}

module.exports = { englishTranslations, completeEnglishTranslations };