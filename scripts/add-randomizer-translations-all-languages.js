#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of language files to process
const languages = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'th', 'vi'];

// Basic translations for missing keys (using English as fallback for now)
const basicTranslations = {
  linguisticFeatures: {
    pronunciationGuide: {
      consonantCombinations: {
        combinations: {
          r: "slightly rolled 'r' sound",
          ph: "as 'f' sound"
        }
      }
    }
  },
  
  collection: {
    title: "Elf Name Generator Collection",
    woodElfGenerator: {
      title: "Wood Elf Names",
      description: "Generate wood elf names with nature themes.",
      feature1: "Forest-themed generation",
      feature2: "Nature-based patterns", 
      feature3: "Woodland integration"
    },
    darkElfGenerator: {
      title: "Dark Elf Names",
      description: "Create dark elf names with mysterious themes.",
      feature1: "Underground patterns",
      feature2: "Shadow-themed names",
      feature3: "Drow integration"
    },
    halfElfGenerator: {
      title: "Half-Elf Names",
      description: "Generate half-elf names with mixed heritage.",
      feature1: "Mixed heritage patterns",
      feature2: "Cultural fusion",
      feature3: "Versatile options"
    },
    bloodElfGenerator: {
      title: "Blood Elf Names",
      description: "Create blood elf names with arcane themes.",
      feature1: "Arcane patterns",
      feature2: "Magical themes",
      feature3: "High fantasy"
    },
    elfNamesGenerator: {
      title: "General Elf Names",
      description: "Generate elf names for all cultures.",
      feature1: "Universal patterns",
      feature2: "Multi-cultural",
      feature3: "Broad compatibility"
    },
    elfNameGeneratorDnd: {
      title: "D&D Elf Names",
      description: "Create D&D elf names following official lore.",
      feature1: "D&D compliance",
      feature2: "Official patterns",
      feature3: "Campaign ready"
    }
  },
  
  conclusion: {
    title: "Start Your Elf Name Adventure",
    paragraph1: "Create amazing elf characters with our name generator.",
    paragraph2: "Join thousands of creators using our elf name tools.",
    generateButton: "Generate Elf Names",
    exploreButton: "Explore Options"
  }
};

function addTranslationsToLanguage(langCode) {
  const filePath = path.join(__dirname, '..', 'messages', `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log(`Processing ${langCode}.json...`);

    if (data.randomizerSeo) {
      // Deep merge function
      function deepMerge(target, source) {
        for (const key in source) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
              target[key] = {};
            }
            deepMerge(target[key], source[key]);
          } else if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
          }
        }
        return target;
      }
      
      // Add missing translations
      deepMerge(data.randomizerSeo, basicTranslations);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✓ Added missing translations to ${langCode}.json`);
    } else {
      console.log(`  ❌ randomizerSeo section not found in ${langCode}.json`);
    }

  } catch (error) {
    console.error(`Error processing ${langCode}.json:`, error.message);
  }
}

function main() {
  console.log('Adding missing randomizer translations to all languages...\n');

  // Process each language file
  languages.forEach(langCode => {
    addTranslationsToLanguage(langCode);
  });

  console.log('\n✓ Missing randomizer translations added to all languages!');
  console.log('\nNote: These are basic English fallback translations.');
  console.log('For production, these should be properly translated to each language.');
}

if (require.main === module) {
  main();
}

module.exports = { basicTranslations, addTranslationsToLanguage };