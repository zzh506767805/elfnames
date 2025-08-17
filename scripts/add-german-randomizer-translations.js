#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// German translations for missing keys
const germanTranslations = {
  linguisticFeatures: {
    pronunciationGuide: {
      consonantCombinations: {
        combinations: {
          r: "leicht gerolltes 'r' (zufällige Muster)",
          ph: "als 'f'-Laut (zufällige Platzierung)"
        }
      }
    }
  },
  
  collection: {
    title: "Komplette Elfennamen-Randomizer Sammlung",
    woodElfGenerator: {
      title: "Waldelfen Zufallsnamen",
      description: "Generiere zufällige Waldelfen-Namen mit naturinspirierten Themen für Waldläufer und Druiden-Charaktere.",
      feature1: "Waldthematische Zufallsgenerierung",
      feature2: "Naturbasierte Namensmuster",
      feature3: "Waldkultur-Integration"
    },
    darkElfGenerator: {
      title: "Dunkelelfen Zufallsnamen",
      description: "Erstelle zufällige Dunkelelfen-Namen mit mysteriösen Unterwelt-Themen für Drow-Charaktere und Schattenmagier.",
      feature1: "Unterwelt-Kulturmuster",
      feature2: "Schattenthematische Zufallsnamen",
      feature3: "Drow-Gesellschafts-Integration"
    },
    halfElfGenerator: {
      title: "Halbelfen Zufallsnamen",
      description: "Generiere zufällige Halbelfen-Namen, die menschliche und elfische Traditionen für Charaktere mit gemischtem Erbe verbinden.",
      feature1: "Gemischte Erbe-Muster",
      feature2: "Kulturfusion-Namensgebung",
      feature3: "Vielseitige Charakteroptionen"
    },
    bloodElfGenerator: {
      title: "Blutelfen Zufallsnamen",
      description: "Erstelle zufällige Blutelfen-Namen mit arkanen Themen und magischen Sucht-Elementen für High-Fantasy-Settings.",
      feature1: "Arkan-beeinflusste Muster",
      feature2: "Magische Erbe-Themen",
      feature3: "High-Fantasy-Integration"
    },
    elfNamesGenerator: {
      title: "Allgemeine Elfen Zufallsnamen",
      description: "Generiere zufällige Elfennamen für alle elfischen Kulturen und Traditionen für universelle Fantasy-Charaktererstellung.",
      feature1: "Universelle elfische Muster",
      feature2: "Multi-kulturelle Integration",
      feature3: "Breite Fantasy-Kompatibilität"
    },
    elfNameGeneratorDnd: {
      title: "D&D Elfen Zufallsnamen",
      description: "Erstelle zufällige Elfennamen speziell für Dungeons & Dragons-Kampagnen nach offizieller Überlieferung.",
      feature1: "D&D-Überlieferungs-Konformität",
      feature2: "Offizielle Unterrassen-Muster",
      feature3: "Kampagnen-Integration bereit"
    }
  },
  
  conclusion: {
    title: "Starte Dein Zufälliges Elfennamen-Abenteuer",
    paragraph1: "Ob du mysteriöse Dunkelelfen, edle Hochelfen oder naturliebende Waldelfen erschaffst, unser Elfennamen-Randomizer bietet endlose Inspiration für deine Fantasy-Charaktere und Kampagnen.",
    paragraph2: "Schließe dich Tausenden von Erstellern an, die auf unseren Randomizer für authentische, vielfältige Elfennamen vertrauen, die ihre Fantasy-Welten mit authentischen elfischen Namensgebungstraditionen zum Leben erwecken.",
    generateButton: "Zufällige Elfennamen Generieren",
    exploreButton: "Zufällige Optionen Erkunden"
  }
};

function addGermanTranslations() {
  const filePath = path.join(__dirname, '..', 'messages', 'de.json');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log('Adding German randomizerSeo translations...');

    if (data.randomizerSeo) {
      // Deep merge function
      function deepMerge(target, source) {
        for (const key in source) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
              target[key] = {};
            }
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key]; // Overwrite with German translation
          }
        }
        return target;
      }
      
      // Add German translations
      deepMerge(data.randomizerSeo, germanTranslations);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log('✓ German randomizerSeo translations added successfully!');
    } else {
      console.log('❌ randomizerSeo section not found in German file');
    }

  } catch (error) {
    console.error('Error adding German translations:', error.message);
  }
}

if (require.main === module) {
  addGermanTranslations();
}

module.exports = { germanTranslations, addGermanTranslations };