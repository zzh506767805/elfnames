#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Complete missing translation keys for randomizerSeo
const completeTranslations = {
  // Fix missing consonant combinations
  linguisticFeatures: {
    pronunciationGuide: {
      consonantCombinations: {
        combinations: {
          r: "slightly rolled 'r' sound (random patterns)",
          ph: "as 'f' sound (random placement)"
        }
      }
    }
  },
  
  // Add complete collection section
  collection: {
    title: "Complete Elf Name Randomizer Collection",
    woodElfGenerator: {
      title: "Wood Elf Random Names",
      description: "Generate random wood elf names with nature-inspired themes perfect for forest rangers and druidic characters.",
      feature1: "Forest-themed random generation",
      feature2: "Nature-based naming patterns",
      feature3: "Woodland culture integration"
    },
    darkElfGenerator: {
      title: "Dark Elf Random Names", 
      description: "Create random dark elf names with mysterious underground themes for drow characters and shadow magic users.",
      feature1: "Underground culture patterns",
      feature2: "Shadow-themed random names",
      feature3: "Drow society integration"
    },
    halfElfGenerator: {
      title: "Half-Elf Random Names",
      description: "Generate random half-elf names blending human and elvish traditions for characters with mixed heritage.",
      feature1: "Mixed heritage patterns",
      feature2: "Cultural fusion naming",
      feature3: "Versatile character options"
    },
    bloodElfGenerator: {
      title: "Blood Elf Random Names",
      description: "Create random blood elf names with arcane themes and magical addiction elements for high fantasy settings.",
      feature1: "Arcane-influenced patterns",
      feature2: "Magical heritage themes",
      feature3: "High fantasy integration"
    },
    elfNamesGenerator: {
      title: "General Elf Random Names",
      description: "Generate random elf names covering all elvish cultures and traditions for universal fantasy character creation.",
      feature1: "Universal elvish patterns",
      feature2: "Multi-cultural integration",
      feature3: "Broad fantasy compatibility"
    },
    elfNameGeneratorDnd: {
      title: "D&D Elf Random Names",
      description: "Create random elf names specifically designed for Dungeons & Dragons campaigns following official lore.",
      feature1: "D&D lore compliance",
      feature2: "Official subrace patterns",
      feature3: "Campaign integration ready"
    }
  },
  
  // Add conclusion section
  conclusion: {
    title: "Start Your Random Elf Name Adventure",
    paragraph1: "Whether you're creating mysterious dark elves, noble high elves, or nature-loving wood elves, our elf name randomizer provides endless inspiration for your fantasy characters and campaigns.",
    paragraph2: "Join thousands of creators who rely on our randomizer for authentic, diverse elf names that bring their fantasy worlds to life with authentic elvish naming traditions.",
    generateButton: "Generate Random Elf Names",
    exploreButton: "Explore Random Options"
  }
};

function addCompleteTranslations() {
  const filePath = path.join(__dirname, '..', 'messages', 'en.json');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log('Adding complete randomizerSeo translations...');

    if (data.randomizerSeo) {
      // Deep merge function to add missing keys without overwriting existing ones
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
      
      // Add the missing translations
      deepMerge(data.randomizerSeo, completeTranslations);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log('✓ Complete randomizerSeo translations added successfully!');
    } else {
      console.log('❌ randomizerSeo section not found in English file');
    }

  } catch (error) {
    console.error('Error adding complete translations:', error.message);
  }
}

if (require.main === module) {
  addCompleteTranslations();
}

module.exports = { completeTranslations, addCompleteTranslations };