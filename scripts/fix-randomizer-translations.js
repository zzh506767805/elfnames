#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of language files to process
const languages = ['ar', 'de', 'en', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'th', 'vi'];

// Complete randomizerSeo structure based on ElfNameSEO component requirements
const completeRandomizerSeoStructure = {
  introduction: {
    title: "",
    paragraph1: "",
    paragraph2: ""
  },
  whatIs: {
    title: "",
    paragraph1: "",
    paragraph2: ""
  },
  types: {
    title: "",
    description: "",
    classic: { title: "", description: "" },
    halfElf: { title: "", description: "" },
    woodElf: { title: "", description: "" },
    darkElf: { title: "", description: "" },
    dnd: { title: "", description: "" },
    gender: { title: "", description: "" }
  },
  howToUse: {
    title: "",
    description: "",
    step1: { title: "", description: "" },
    step2: { title: "", description: "" },
    step3: { title: "", description: "" }
  },
  whyEssential: {
    title: "",
    saveTime: { title: "", description: "" },
    creativity: { title: "", description: "" },
    consistency: { title: "", description: "" },
    accessible: { title: "", description: "" }
  },
  topFeatures: {
    title: "",
    description: "",
    diverse: { title: "", description: "" },
    gender: { title: "", description: "" },
    customizable: { title: "", description: "" },
    free: { title: "", description: "" }
  },
  popularUses: {
    title: "",
    description: "",
    tabletop: { title: "", description: "" },
    novels: { title: "", description: "" },
    onlineGames: { title: "", description: "" },
    creativeWriting: { title: "", description: "" }
  },
  supportedTypes: {
    title: "",
    woodElf: { title: "", description: "" },
    darkElf: { title: "", description: "" },
    halfElf: { title: "", description: "" },
    highElf: { title: "", description: "" },
    moonElf: { title: "", description: "" },
    sunElf: { title: "", description: "" },
    wildElf: { title: "", description: "" },
    seaElf: { title: "", description: "" },
    snowElf: { title: "", description: "" }
  },
  gallery: {
    title: "",
    description: "",
    woodElf: { alt: "", title: "", description: "" },
    darkElf: { alt: "", title: "", description: "" },
    highElf: { alt: "", title: "", description: "" }
  },
  categories: {
    title: "",
    natureInspired: {
      title: "",
      description: "",
      examples: {
        silverleaf: { name: "", meaning: "" },
        moonwhisper: { name: "", meaning: "" },
        starweaver: { name: "", meaning: "" },
        windrunner: { name: "", meaning: "" }
      }
    },
    nobleTitles: {
      title: "",
      description: "",
      examples: {
        goldenbrow: { name: "", meaning: "" },
        crystalborn: { name: "", meaning: "" },
        thornheart: { name: "", meaning: "" },
        stormcrown: { name: "", meaning: "" }
      }
    },
    magicalNames: {
      title: "",
      description: "",
      examples: {
        spellsong: { name: "", meaning: "" },
        runekeeper: { name: "", meaning: "" },
        dreamweaver: { name: "", meaning: "" },
        lightbringer: { name: "", meaning: "" }
      }
    }
  },
  linguisticFeatures: {
    title: "",
    elvishLanguagePatterns: {
      title: "",
      description: "",
      sindarin: {
        title: "",
        description: "",
        feature1: "",
        feature2: "",
        feature3: ""
      },
      quenya: {
        title: "",
        description: "",
        feature1: "",
        feature2: "",
        feature3: ""
      },
      dndElvish: {
        title: "",
        description: "",
        feature1: "",
        feature2: "",
        feature3: ""
      }
    },
    pronunciationGuide: {
      title: "",
      description: "",
      vowelSounds: {
        title: "",
        sounds: {
          a: "",
          e: "",
          i: "",
          o: "",
          u: ""
        }
      },
      consonantCombinations: {
        title: "",
        combinations: {
          th: "",
          dh: "",
          ng: "",
          ch: "",
          ph: ""
        }
      }
    }
  },
  cta: {
    title: "",
    description: "",
    primaryButton: "",
    secondaryButton: "",
    exploreButton: ""
  }
};

function cleanupTranslationFile(langCode) {
  const filePath = path.join(__dirname, '..', 'messages', `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log(`Processing ${langCode}.json...`);

    // Remove duplicate elfRandomizerSeo section if it exists
    if (data.elfRandomizerSeo) {
      console.log(`  - Removing duplicate elfRandomizerSeo section`);
      delete data.elfRandomizerSeo;
    }

    // Remove duplicate elfRandomizer section if it exists
    if (data.elfRandomizer) {
      console.log(`  - Removing duplicate elfRandomizer section`);
      delete data.elfRandomizer;
    }

    // Check if randomizerSeo exists and is complete
    if (!data.randomizerSeo) {
      console.log(`  - Creating missing randomizerSeo section`);
      data.randomizerSeo = completeRandomizerSeoStructure;
    } else {
      console.log(`  - Validating randomizerSeo structure`);
      // Ensure all required keys exist
      data.randomizerSeo = mergeStructures(data.randomizerSeo, completeRandomizerSeoStructure);
    }

    // Write the cleaned up file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  ✓ Cleaned up ${langCode}.json`);

  } catch (error) {
    console.error(`Error processing ${langCode}.json:`, error.message);
  }
}

function mergeStructures(existing, template) {
  const result = { ...existing };
  
  for (const key in template) {
    if (typeof template[key] === 'object' && template[key] !== null && !Array.isArray(template[key])) {
      if (!result[key] || typeof result[key] !== 'object') {
        result[key] = {};
      }
      result[key] = mergeStructures(result[key], template[key]);
    } else if (!result.hasOwnProperty(key)) {
      result[key] = template[key];
    }
  }
  
  return result;
}

function main() {
  console.log('Starting randomizer translation cleanup...\n');

  // Process each language file
  languages.forEach(langCode => {
    cleanupTranslationFile(langCode);
  });

  console.log('\n✓ Randomizer translation cleanup completed!');
  console.log('\nNext steps:');
  console.log('1. Review the cleaned up translation files');
  console.log('2. Fill in missing translations for each language');
  console.log('3. Test the randomizer page in each language');
}

if (require.main === module) {
  main();
}

module.exports = { cleanupTranslationFile, completeRandomizerSeoStructure };