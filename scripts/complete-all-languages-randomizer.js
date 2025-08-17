#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 所有语言的基本翻译模板
const languageTranslations = {
  ar: {
    collection: {
      title: "مجموعة مولد أسماء الجن الكاملة",
      woodElfGenerator: {
        title: "أسماء الجن الخشبية العشوائية",
        description: "إنشاء أسماء الجن الخشبية العشوائية بمواضيع مستوحاة من الطبيعة.",
        feature1: "توليد بموضوع الغابة",
        feature2: "أنماط قائمة على الطبيعة",
        feature3: "تكامل ثقافة الغابات"
      },
      darkElfGenerator: {
        title: "أسماء الجن المظلمة العشوائية",
        description: "إنشاء أسماء الجن المظلمة العشوائية بمواضيع تحت الأرض غامضة.",
        feature1: "أنماط الثقافة تحت الأرض",
        feature2: "أسماء بموضوع الظل",
        feature3: "تكامل مجتمع الدرو"
      }
    },
    conclusion: {
      title: "ابدأ مغامرة أسماء الجن العشوائية",
      paragraph1: "سواء كنت تنشئ جنًا مظلمًا غامضًا أو جنًا نبيلًا عاليًا، يوفر مولدنا العشوائي إلهامًا لا نهائيًا.",
      paragraph2: "انضم إلى آلاف المبدعين الذين يعتمدون على مولدنا العشوائي للحصول على أسماء جن أصيلة ومتنوعة.",
      generateButton: "إنشاء أسماء الجن العشوائية",
      exploreButton: "استكشاف الخيارات العشوائية"
    }
  },
  it: {
    collection: {
      title: "Collezione Completa Generatore Nomi Elfi Casuali",
      woodElfGenerator: {
        title: "Nomi Casuali Elfi del Bosco",
        description: "Genera nomi casuali di elfi del bosco con temi ispirati alla natura.",
        feature1: "Generazione a tema forestale",
        feature2: "Modelli basati sulla natura",
        feature3: "Integrazione cultura boschiva"
      },
      darkElfGenerator: {
        title: "Nomi Casuali Elfi Scuri",
        description: "Crea nomi casuali di elfi scuri con temi sotterranei misteriosi.",
        feature1: "Modelli cultura sotterranea",
        feature2: "Nomi a tema ombra",
        feature3: "Integrazione società drow"
      }
    },
    conclusion: {
      title: "Inizia la Tua Avventura di Nomi Elfici Casuali",
      paragraph1: "Che tu stia creando elfi scuri misteriosi o alti elfi nobili, il nostro generatore casuale fornisce ispirazione infinita.",
      paragraph2: "Unisciti a migliaia di creatori che si affidano al nostro generatore casuale per nomi elfici autentici e diversi.",
      generateButton: "Genera Nomi Elfici Casuali",
      exploreButton: "Esplora Opzioni Casuali"
    }
  },
  ja: {
    collection: {
      title: "完全なエルフ名前ランダマイザーコレクション",
      woodElfGenerator: {
        title: "ウッドエルフランダム名前",
        description: "自然にインスパイアされたテーマでウッドエルフのランダム名前を生成。",
        feature1: "森林テーマ生成",
        feature2: "自然ベースパターン",
        feature3: "森林文化統合"
      },
      darkElfGenerator: {
        title: "ダークエルフランダム名前",
        description: "神秘的な地下テーマでダークエルフのランダム名前を作成。",
        feature1: "地下文化パターン",
        feature2: "影テーマ名前",
        feature3: "ドロウ社会統合"
      }
    },
    conclusion: {
      title: "ランダムエルフ名前冒険を始めよう",
      paragraph1: "神秘的なダークエルフや高貴なハイエルフを作成する場合、私たちのランダマイザーは無限のインスピレーションを提供します。",
      paragraph2: "本格的で多様なエルフ名前のために私たちのランダマイザーに頼る何千もの創作者に参加してください。",
      generateButton: "ランダムエルフ名前を生成",
      exploreButton: "ランダムオプションを探索"
    }
  },
  ko: {
    collection: {
      title: "완전한 엘프 이름 랜더마이저 컬렉션",
      woodElfGenerator: {
        title: "우드 엘프 랜덤 이름",
        description: "자연에서 영감을 받은 테마로 우드 엘프 랜덤 이름을 생성합니다.",
        feature1: "숲 테마 생성",
        feature2: "자연 기반 패턴",
        feature3: "숲 문화 통합"
      },
      darkElfGenerator: {
        title: "다크 엘프 랜덤 이름",
        description: "신비로운 지하 테마로 다크 엘프 랜덤 이름을 만듭니다.",
        feature1: "지하 문화 패턴",
        feature2: "그림자 테마 이름",
        feature3: "드로우 사회 통합"
      }
    },
    conclusion: {
      title: "랜덤 엘프 이름 모험을 시작하세요",
      paragraph1: "신비로운 다크 엘프나 고귀한 하이 엘프를 만들든, 우리의 랜더마이저는 무한한 영감을 제공합니다.",
      paragraph2: "진정하고 다양한 엘프 이름을 위해 우리의 랜더마이저를 신뢰하는 수천 명의 창작자들과 함께하세요.",
      generateButton: "랜덤 엘프 이름 생성",
      exploreButton: "랜덤 옵션 탐색"
    }
  },
  pt: {
    collection: {
      title: "Coleção Completa de Gerador de Nomes Élficos Aleatórios",
      woodElfGenerator: {
        title: "Nomes Aleatórios de Elfos da Floresta",
        description: "Gere nomes aleatórios de elfos da floresta com temas inspirados na natureza.",
        feature1: "Geração temática florestal",
        feature2: "Padrões baseados na natureza",
        feature3: "Integração cultura florestal"
      },
      darkElfGenerator: {
        title: "Nomes Aleatórios de Elfos Sombrios",
        description: "Crie nomes aleatórios de elfos sombrios com temas subterrâneos misteriosos.",
        feature1: "Padrões cultura subterrânea",
        feature2: "Nomes temáticos sombrios",
        feature3: "Integração sociedade drow"
      }
    },
    conclusion: {
      title: "Comece Sua Aventura de Nomes Élficos Aleatórios",
      paragraph1: "Seja criando elfos sombrios misteriosos ou altos elfos nobres, nosso gerador aleatório fornece inspiração infinita.",
      paragraph2: "Junte-se a milhares de criadores que confiam em nosso gerador aleatório para nomes élficos autênticos e diversos.",
      generateButton: "Gerar Nomes Élficos Aleatórios",
      exploreButton: "Explorar Opções Aleatórias"
    }
  },
  ru: {
    collection: {
      title: "Полная Коллекция Генератора Случайных Эльфийских Имён",
      woodElfGenerator: {
        title: "Случайные Имена Лесных Эльфов",
        description: "Генерируйте случайные имена лесных эльфов с природными темами.",
        feature1: "Лесная тематическая генерация",
        feature2: "Природные паттерны",
        feature3: "Интеграция лесной культуры"
      },
      darkElfGenerator: {
        title: "Случайные Имена Тёмных Эльфов",
        description: "Создавайте случайные имена тёмных эльфов с мистическими подземными темами.",
        feature1: "Подземные культурные паттерны",
        feature2: "Теневые тематические имена",
        feature3: "Интеграция общества дроу"
      }
    },
    conclusion: {
      title: "Начните Своё Приключение Случайных Эльфийских Имён",
      paragraph1: "Создаёте ли вы мистических тёмных эльфов или благородных высших эльфов, наш случайный генератор предоставляет бесконечное вдохновение.",
      paragraph2: "Присоединяйтесь к тысячам создателей, которые доверяют нашему случайному генератору для подлинных и разнообразных эльфийских имён.",
      generateButton: "Генерировать Случайные Эльфийские Имена",
      exploreButton: "Исследовать Случайные Варианты"
    }
  },
  th: {
    collection: {
      title: "คอลเลกชันเครื่องสุ่มชื่อเอลฟ์แบบสมบูรณ์",
      woodElfGenerator: {
        title: "ชื่อเอลฟ์ป่าแบบสุ่ม",
        description: "สร้างชื่อเอลฟ์ป่าแบบสุ่มด้วยธีมที่ได้แรงบันดาลใจจากธรรมชาติ",
        feature1: "การสร้างธีมป่าไผ่",
        feature2: "รูปแบบที่ใช้ธรรมชาติ",
        feature3: "การรวมวัฒนธรรมป่า"
      },
      darkElfGenerator: {
        title: "ชื่อเอลฟ์มืดแบบสุ่ม",
        description: "สร้างชื่อเอลฟ์มืดแบบสุ่มด้วยธีมใต้ดินลึกลับ",
        feature1: "รูปแบบวัฒนธรรมใต้ดิน",
        feature2: "ชื่อธีมเงา",
        feature3: "การรวมสังคมโดรว์"
      }
    },
    conclusion: {
      title: "เริ่มการผจญภัยชื่อเอลฟ์แบบสุ่มของคุณ",
      paragraph1: "ไม่ว่าคุณจะสร้างเอลฟ์มืดลึกลับหรือเอลฟ์สูงส่งสูงศักดิ์ เครื่องสุ่มของเราให้แรงบันดาลใจไม่สิ้นสุด",
      paragraph2: "เข้าร่วมกับผู้สร้างสรรค์หลายพันคนที่เชื่อมั่นในเครื่องสุ่มของเราสำหรับชื่อเอลฟ์ที่แท้จริงและหลากหลาย",
      generateButton: "สร้างชื่อเอลฟ์แบบสุ่ม",
      exploreButton: "สำรวจตัวเลือกแบบสุ่ม"
    }
  },
  vi: {
    collection: {
      title: "Bộ Sưu Tập Trình Tạo Tên Elf Ngẫu Nhiên Hoàn Chỉnh",
      woodElfGenerator: {
        title: "Tên Elf Rừng Ngẫu Nhiên",
        description: "Tạo tên elf rừng ngẫu nhiên với chủ đề lấy cảm hứng từ thiên nhiên.",
        feature1: "Tạo chủ đề rừng",
        feature2: "Mẫu dựa trên thiên nhiên",
        feature3: "Tích hợp văn hóa rừng"
      },
      darkElfGenerator: {
        title: "Tên Elf Tối Ngẫu Nhiên",
        description: "Tạo tên elf tối ngẫu nhiên với chủ đề ngầm bí ẩn.",
        feature1: "Mẫu văn hóa ngầm",
        feature2: "Tên chủ đề bóng tối",
        feature3: "Tích hợp xã hội drow"
      }
    },
    conclusion: {
      title: "Bắt Đầu Cuộc Phiêu Lưu Tên Elf Ngẫu Nhiên",
      paragraph1: "Dù bạn đang tạo elf tối bí ẩn hay elf cao quý, trình tạo ngẫu nhiên của chúng tôi cung cấp cảm hứng vô tận.",
      paragraph2: "Tham gia cùng hàng nghìn nhà sáng tạo tin tưởng trình tạo ngẫu nhiên của chúng tôi cho tên elf chân thực và đa dạng.",
      generateButton: "Tạo Tên Elf Ngẫu Nhiên",
      exploreButton: "Khám Phá Tùy Chọn Ngẫu Nhiên"
    }
  },
  id: {
    collection: {
      title: "Koleksi Lengkap Generator Nama Elf Acak",
      woodElfGenerator: {
        title: "Nama Elf Hutan Acak",
        description: "Buat nama elf hutan acak dengan tema yang terinspirasi alam.",
        feature1: "Generasi bertema hutan",
        feature2: "Pola berbasis alam",
        feature3: "Integrasi budaya hutan"
      },
      darkElfGenerator: {
        title: "Nama Elf Gelap Acak",
        description: "Buat nama elf gelap acak dengan tema bawah tanah misterius.",
        feature1: "Pola budaya bawah tanah",
        feature2: "Nama bertema bayangan",
        feature3: "Integrasi masyarakat drow"
      }
    },
    conclusion: {
      title: "Mulai Petualangan Nama Elf Acak Anda",
      paragraph1: "Baik Anda membuat elf gelap misterius atau elf tinggi mulia, generator acak kami memberikan inspirasi tak terbatas.",
      paragraph2: "Bergabunglah dengan ribuan pencipta yang mempercayai generator acak kami untuk nama elf yang otentik dan beragam.",
      generateButton: "Buat Nama Elf Acak",
      exploreButton: "Jelajahi Opsi Acak"
    }
  },
  pl: {
    collection: {
      title: "Kompletna Kolekcja Generatora Losowych Imion Elfów",
      woodElfGenerator: {
        title: "Losowe Imiona Elfów Leśnych",
        description: "Generuj losowe imiona elfów leśnych z motywami inspirowanymi naturą.",
        feature1: "Generacja o tematyce leśnej",
        feature2: "Wzorce oparte na naturze",
        feature3: "Integracja kultury leśnej"
      },
      darkElfGenerator: {
        title: "Losowe Imiona Ciemnych Elfów",
        description: "Twórz losowe imiona ciemnych elfów z tajemniczymi motywami podziemnymi.",
        feature1: "Wzorce kultury podziemnej",
        feature2: "Imiona o tematyce cienia",
        feature3: "Integracja społeczeństwa drow"
      }
    },
    conclusion: {
      title: "Rozpocznij Swoją Przygodę z Losowymi Imionami Elfów",
      paragraph1: "Czy tworzysz tajemniczych ciemnych elfów, czy szlachetnych wysokich elfów, nasz losowy generator zapewnia nieskończoną inspirację.",
      paragraph2: "Dołącz do tysięcy twórców, którzy ufają naszemu losowemu generatorowi autentycznych i różnorodnych imion elfów.",
      generateButton: "Generuj Losowe Imiona Elfów",
      exploreButton: "Odkrywaj Losowe Opcje"
    }
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

    console.log(`Adding complete translations for ${langCode}...`);

    if (data.randomizerSeo && languageTranslations[langCode]) {
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
      
      // Add translations
      deepMerge(data.randomizerSeo, languageTranslations[langCode]);
      
      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✓ Added complete translations to ${langCode}.json`);
    } else {
      console.log(`  ❌ randomizerSeo section not found in ${langCode}.json or no translations available`);
    }

  } catch (error) {
    console.error(`Error processing ${langCode}.json:`, error.message);
  }
}

function main() {
  console.log('Adding complete translations for all languages...\n');

  // Process each language that has translations
  Object.keys(languageTranslations).forEach(langCode => {
    addTranslationsToLanguage(langCode);
  });

  console.log('\n✓ Complete translations added for all languages!');
  console.log('\nNote: These translations provide basic coverage for all missing keys.');
  console.log('For production, consider having native speakers review and improve the translations.');
}

if (require.main === module) {
  main();
}

module.exports = { languageTranslations, addTranslationsToLanguage };