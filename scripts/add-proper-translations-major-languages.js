#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 主要语言的翻译
const translations = {
  fr: {
    types: {
      classic: {
        title: "Noms Elfiques Classiques Aléatoires",
        description: "Noms elfiques traditionnels sélectionnés aléatoirement parmi les traditions de nommage anciennes couvrant toutes les cultures elfiques principales."
      },
      halfElf: {
        title: "Noms Aléatoires d'Héritage Mixte",
        description: "Noms aléatoires mélangeant différentes traditions elfiques avec des influences humaines occasionnelles pour des personnages aux origines diverses."
      },
      woodElf: {
        title: "Noms Elfiques de Nature Aléatoires",
        description: "Noms aléatoires sur le thème de la forêt et de la nature parfaits pour les personnages liés aux environnements boisés et à la magie naturelle."
      },
      darkElf: {
        title: "Noms Elfiques d'Ombre Aléatoires",
        description: "Noms aléatoires mystérieux et sombres adaptés aux cultures souterraines, utilisateurs de magie d'ombre et concepts de personnages sinistres."
      },
      dnd: {
        title: "Noms Elfiques D&D Aléatoires",
        description: "Noms aléatoires spécifiquement adaptés aux campagnes Dungeons & Dragons, couvrant toutes les sous-races elfiques officielles."
      },
      gender: {
        title: "Noms Aléatoires Diversifiés par Genre",
        description: "Noms elfiques aléatoires couvrant les conventions de nommage masculines, féminines et non-binaires à travers toutes les traditions culturelles elfiques."
      }
    },
    howToUse: {
      title: "Comment Utiliser le Randomiseur de Noms Elfiques",
      description: "L'utilisation de notre randomiseur de noms elfiques est conçue pour une inspiration rapide et une création instantanée de personnages.",
      step1: {
        title: "Définir les Paramètres Aléatoires",
        description: "Choisissez votre portée de randomisation préférée, incluant des cultures elfiques spécifiques ou une sélection complètement aléatoire."
      },
      step2: {
        title: "Générer des Noms Aléatoires",
        description: "Cliquez sur le bouton randomiser pour générer instantanément des noms elfiques divers de notre base de données complète."
      },
      step3: {
        title: "Explorer et Itérer",
        description: "Parcourez les résultats générés aléatoirement et générez de nouveaux lots jusqu'à trouver l'inspiration parfaite."
      }
    },
    whyEssential: {
      title: "Pourquoi Utiliser un Randomiseur de Noms Elfiques ?",
      saveTime: {
        title: "Inspiration Instantanée",
        description: "Notre randomiseur de noms elfiques fournit une inspiration créative immédiate, éliminant le temps passé à réfléchir."
      },
      creativity: {
        title: "Combinaisons Inattendues",
        description: "La génération aléatoire crée des combinaisons de noms surprenantes auxquelles vous n'auriez jamais pensé."
      },
      consistency: {
        title: "Randomisation Authentique",
        description: "Chaque nom généré aléatoirement maintient des motifs linguistiques elfiques authentiques."
      },
      accessible: {
        title: "Outil Aléatoire Universel",
        description: "Notre randomiseur de noms elfiques fonctionne pour tout cadre fantastique, style de campagne ou projet créatif."
      }
    },
    topFeatures: {
      title: "Fonctionnalités Avancées du Randomiseur",
      description: "Notre randomiseur inclut des algorithmes sophistiqués qui assurent une génération authentique, diverse et inspirante.",
      diverse: {
        title: "Couverture Culturelle Complète",
        description: "Le randomiseur puise dans toutes les cultures elfiques principales, assurant des résultats vraiment divers."
      },
      gender: {
        title: "Options Aléatoires Inclusives",
        description: "Générez des noms elfiques aléatoires à travers toutes les présentations de genre."
      },
      customizable: {
        title: "Randomisation Contrôlée",
        description: "Ajustez les paramètres de randomisation pour vous concentrer sur des cultures elfiques spécifiques."
      },
      free: {
        title: "Génération Aléatoire Illimitée",
        description: "Utilisez notre randomiseur sans restrictions, générant des noms illimités pour tous vos projets."
      }
    },
    popularUses: {
      title: "Utilisations Populaires des Randomiseurs",
      description: "Notre randomiseur sert les créateurs sur de nombreuses plateformes, fournissant une inspiration instantanée.",
      tabletop: {
        title: "Rencontres JdR Aléatoires",
        description: "Les maîtres de jeu utilisent notre randomiseur pour créer rapidement des PNJ pendant le jeu."
      },
      novels: {
        title: "Littérature Fantastique",
        description: "Les auteurs utilisent notre randomiseur pour peupler leurs mondes fantastiques de personnages elfiques divers."
      },
      onlineGames: {
        title: "Jeux en Ligne",
        description: "Les joueurs utilisent notre randomiseur pour les MMORPG, créant des noms de personnages uniques."
      },
      creativeWriting: {
        title: "Écriture Créative",
        description: "Les écrivains utilisent notre randomiseur pour des nouvelles, scénarios et projets créatifs."
      }
    },
    collection: {
      title: "Collection Complète de Randomiseurs de Noms Elfiques",
      woodElfGenerator: {
        title: "Noms Aléatoires d'Elfes des Bois",
        description: "Générez des noms d'elfes des bois aléatoires avec des thèmes inspirés de la nature.",
        feature1: "Génération thématique forestière",
        feature2: "Motifs basés sur la nature",
        feature3: "Intégration de la culture des bois"
      },
      darkElfGenerator: {
        title: "Noms Aléatoires d'Elfes Noirs",
        description: "Créez des noms d'elfes noirs aléatoires avec des thèmes souterrains mystérieux.",
        feature1: "Motifs de culture souterraine",
        feature2: "Noms thématiques d'ombre",
        feature3: "Intégration de la société drow"
      },
      halfElfGenerator: {
        title: "Noms Aléatoires de Demi-Elfes",
        description: "Générez des noms de demi-elfes aléatoires mélangeant les traditions humaines et elfiques.",
        feature1: "Motifs d'héritage mixte",
        feature2: "Nommage de fusion culturelle",
        feature3: "Options de personnages polyvalents"
      },
      bloodElfGenerator: {
        title: "Noms Aléatoires d'Elfes de Sang",
        description: "Créez des noms d'elfes de sang aléatoires avec des thèmes arcaniques.",
        feature1: "Motifs influencés par l'arcane",
        feature2: "Thèmes d'héritage magique",
        feature3: "Intégration haute fantaisie"
      },
      elfNamesGenerator: {
        title: "Noms Elfiques Généraux Aléatoires",
        description: "Générez des noms elfiques aléatoires couvrant toutes les cultures elfiques.",
        feature1: "Motifs elfiques universels",
        feature2: "Intégration multi-culturelle",
        feature3: "Compatibilité fantastique large"
      },
      elfNameGeneratorDnd: {
        title: "Noms Elfiques D&D Aléatoires",
        description: "Créez des noms elfiques aléatoires spécialement conçus pour les campagnes D&D.",
        feature1: "Conformité à la tradition D&D",
        feature2: "Motifs de sous-races officielles",
        feature3: "Prêt pour l'intégration de campagne"
      }
    },
    conclusion: {
      title: "Commencez Votre Aventure de Noms Elfiques Aléatoires",
      paragraph1: "Que vous créiez des elfes noirs mystérieux, des hauts elfes nobles ou des elfes des bois amoureux de la nature, notre randomiseur fournit une inspiration infinie.",
      paragraph2: "Rejoignez des milliers de créateurs qui comptent sur notre randomiseur pour des noms elfiques authentiques et divers.",
      generateButton: "Générer des Noms Elfiques Aléatoires",
      exploreButton: "Explorer les Options Aléatoires"
    }
  },
  es: {
    types: {
      classic: {
        title: "Nombres Élficos Clásicos Aleatorios",
        description: "Nombres élficos tradicionales seleccionados aleatoriamente de tradiciones de nomenclatura antiguas que abarcan todas las culturas élficas principales."
      },
      halfElf: {
        title: "Nombres Aleatorios de Herencia Mixta",
        description: "Nombres aleatorios que mezclan diferentes tradiciones élficas con influencias humanas ocasionales para personajes con antecedentes diversos."
      },
      woodElf: {
        title: "Nombres Élficos de Naturaleza Aleatorios",
        description: "Nombres aleatorios con temática de bosque y naturaleza perfectos para personajes conectados con ambientes boscosos y magia natural."
      },
      darkElf: {
        title: "Nombres Élficos de Sombra Aleatorios",
        description: "Nombres aleatorios misteriosos y oscuros adecuados para culturas subterráneas, usuarios de magia sombría y conceptos de personajes siniestros."
      },
      dnd: {
        title: "Nombres Élficos D&D Aleatorios",
        description: "Nombres aleatorios específicamente adaptados para campañas de Dungeons & Dragons, cubriendo todas las subrazas élficas oficiales."
      },
      gender: {
        title: "Nombres Aleatorios Diversos por Género",
        description: "Nombres élficos aleatorios que abarcan convenciones de nomenclatura masculinas, femeninas y no binarias a través de todas las tradiciones culturales élficas."
      }
    },
    collection: {
      title: "Colección Completa de Generadores de Nombres Élficos Aleatorios",
      woodElfGenerator: {
        title: "Nombres Aleatorios de Elfos del Bosque",
        description: "Genera nombres aleatorios de elfos del bosque con temas inspirados en la naturaleza.",
        feature1: "Generación temática forestal",
        feature2: "Patrones basados en la naturaleza",
        feature3: "Integración de cultura boscosa"
      },
      darkElfGenerator: {
        title: "Nombres Aleatorios de Elfos Oscuros",
        description: "Crea nombres aleatorios de elfos oscuros con temas subterráneos misteriosos.",
        feature1: "Patrones de cultura subterránea",
        feature2: "Nombres temáticos de sombra",
        feature3: "Integración de sociedad drow"
      }
    },
    conclusion: {
      title: "Comienza Tu Aventura de Nombres Élficos Aleatorios",
      paragraph1: "Ya sea que estés creando elfos oscuros misteriosos, altos elfos nobles o elfos del bosque amantes de la naturaleza, nuestro generador aleatorio proporciona inspiración infinita.",
      paragraph2: "Únete a miles de creadores que confían en nuestro generador aleatorio para nombres élficos auténticos y diversos.",
      generateButton: "Generar Nombres Élficos Aleatorios",
      exploreButton: "Explorar Opciones Aleatorias"
    }
  }
};

function addProperTranslations(langCode) {
  const filePath = path.join(__dirname, '..', 'messages', `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    console.log(`Adding proper translations for ${langCode}...`);

    if (data.randomizerSeo && translations[langCode]) {
      // Deep merge function that overwrites empty strings
      function deepMerge(target, source) {
        for (const key in source) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== 'object') {
              target[key] = {};
            }
            deepMerge(target[key], source[key]);
          } else {
            // Overwrite if target is empty string or doesn't exist
            if (!target[key] || target[key] === "") {
              target[key] = source[key];
            }
          }
        }
        return target;
      }
      
      // Add proper translations
      deepMerge(data.randomizerSeo, translations[langCode]);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✓ Added proper translations to ${langCode}.json`);
    } else {
      console.log(`  ❌ randomizerSeo section not found in ${langCode}.json or no translations available`);
    }

  } catch (error) {
    console.error(`Error processing ${langCode}.json:`, error.message);
  }
}

function main() {
  console.log('Adding proper translations for major languages...\n');

  // Process each language that has translations
  Object.keys(translations).forEach(langCode => {
    addProperTranslations(langCode);
  });

  console.log('\n✓ Proper translations added for major languages!');
}

if (require.main === module) {
  main();
}

module.exports = { translations, addProperTranslations };