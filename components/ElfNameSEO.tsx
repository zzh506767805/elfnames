import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Users, Zap, TreePine, Moon, Sun, Waves, Snowflake, Eye } from "lucide-react";
import SEOImageGallery from './SEOImageGallery';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { buildLocalizedPath } from '../lib/pathUtils';

interface ElfNameSEOProps {
  translations: (key: string) => string;
}

export default function ElfNameSEO({ translations: t }: ElfNameSEOProps) {
  const currentLocale = useLocale();
  const homeHref = buildLocalizedPath(currentLocale as any, []);
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('introduction.title')}</h2>
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p className="text-lg text-gray-700">
                {t('introduction.paragraph1')}
              </p>
              <p className="text-gray-600">
                {t('introduction.paragraph2')}
              </p>
            </div>
          </section>

          {/* What Is Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('whatIs.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-gray-700">
                {t('whatIs.paragraph1')}
              </p>
              <p className="text-gray-600">
                {t('whatIs.paragraph2')}
              </p>
            </div>
          </section>

          {/* Types of Generators */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('types.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-gray-700 text-center mb-8">
                {t('types.description')}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.classic.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.classic.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.halfElf.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.halfElf.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.woodElf.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.woodElf.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.darkElf.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.darkElf.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.dnd.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.dnd.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('types.gender.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('types.gender.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('howToUse.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                {t('howToUse.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-blue-500">1</Badge>
                      {t('howToUse.step1.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('howToUse.step1.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-green-500">2</Badge>
                      {t('howToUse.step2.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('howToUse.step2.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-purple-500">3</Badge>
                      {t('howToUse.step3.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('howToUse.step3.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Essential */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('whyEssential.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      {t('whyEssential.saveTime.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('whyEssential.saveTime.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      {t('whyEssential.creativity.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('whyEssential.creativity.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Book className="h-5 w-5 text-blue-500" />
                      {t('whyEssential.consistency.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('whyEssential.consistency.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-green-500" />
                      {t('whyEssential.accessible.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('whyEssential.accessible.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Top Features to Look For */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('topFeatures.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                {t('topFeatures.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('topFeatures.diverse.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('topFeatures.diverse.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('topFeatures.gender.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('topFeatures.gender.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('topFeatures.customizable.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('topFeatures.customizable.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('topFeatures.free.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('topFeatures.free.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Popular Uses */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('popularUses.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                {t('popularUses.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TreePine className="h-5 w-5 text-green-500" />
                      {t('popularUses.tabletop.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('popularUses.tabletop.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Book className="h-5 w-5 text-blue-500" />
                      {t('popularUses.novels.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('popularUses.novels.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-purple-500" />
                      {t('popularUses.onlineGames.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('popularUses.onlineGames.description')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      {t('popularUses.creativeWriting.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('popularUses.creativeWriting.description')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('supportedTypes.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TreePine className="h-6 w-6 text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.woodElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.woodElf.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.darkElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.darkElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.halfElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.halfElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-gold-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.highElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.highElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Moon className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.moonElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.moonElf.description')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sun className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.sunElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.sunElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.wildElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.wildElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Waves className="h-6 w-6 text-cyan-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.seaElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.seaElf.description')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Snowflake className="h-6 w-6 text-indigo-500" />
                  <div>
                    <h3 className="font-semibold">{t('supportedTypes.snowElf.title')}</h3>
                    <p className="text-sm text-gray-600">{t('supportedTypes.snowElf.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Elf Character Examples Gallery */}
          <SEOImageGallery
            title={t('gallery.title')}
            description={t('gallery.description')}
            images={[
              {
                url: "/seo-images/Wood Elf Ranger.png",
                alt: t('gallery.woodElf.alt'),
                title: t('gallery.woodElf.title'),
                description: t('gallery.woodElf.description')
              },
              {
                url: "/seo-images/Dark Elf Mage.png",
                alt: t('gallery.darkElf.alt'),
                title: t('gallery.darkElf.title'),
                description: t('gallery.darkElf.description')
              },
              {
                url: "/seo-images/High Elf Noble.png",
                alt: t('gallery.highElf.alt'),
                title: t('gallery.highElf.title'),
                description: t('gallery.highElf.description')
              }
            ]}
          />



          {/* Elf Name Categories */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('categories.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('categories.natureInspired.title')}</CardTitle>
                  <CardDescription>{t('categories.natureInspired.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.natureInspired.examples.silverleaf.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.natureInspired.examples.silverleaf.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.natureInspired.examples.moonwhisper.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.natureInspired.examples.moonwhisper.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.natureInspired.examples.starweaver.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.natureInspired.examples.starweaver.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.natureInspired.examples.windrunner.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.natureInspired.examples.windrunner.meaning')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('categories.nobleTitles.title')}</CardTitle>
                  <CardDescription>{t('categories.nobleTitles.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.nobleTitles.examples.goldenbrow.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.nobleTitles.examples.goldenbrow.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.nobleTitles.examples.crystalborn.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.nobleTitles.examples.crystalborn.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.nobleTitles.examples.thornheart.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.nobleTitles.examples.thornheart.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.nobleTitles.examples.stormcrown.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.nobleTitles.examples.stormcrown.meaning')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('categories.magicalNames.title')}</CardTitle>
                  <CardDescription>{t('categories.magicalNames.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.magicalNames.examples.spellsong.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.magicalNames.examples.spellsong.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.magicalNames.examples.runekeeper.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.magicalNames.examples.runekeeper.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.magicalNames.examples.dreamweaver.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.magicalNames.examples.dreamweaver.meaning')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('categories.magicalNames.examples.lightbringer.name')}</span>
                      <span className="text-xs text-gray-500">{t('categories.magicalNames.examples.lightbringer.meaning')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Linguistic Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('linguisticFeatures.title')}</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('linguisticFeatures.elvishLanguagePatterns.title')}</CardTitle>
                  <CardDescription>{t('linguisticFeatures.elvishLanguagePatterns.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">{t('linguisticFeatures.elvishLanguagePatterns.sindarin.title')}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('linguisticFeatures.elvishLanguagePatterns.sindarin.description')}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.sindarin.feature1')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.sindarin.feature2')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.sindarin.feature3')}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">{t('linguisticFeatures.elvishLanguagePatterns.quenya.title')}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('linguisticFeatures.elvishLanguagePatterns.quenya.description')}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.quenya.feature1')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.quenya.feature2')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.quenya.feature3')}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">{t('linguisticFeatures.elvishLanguagePatterns.dndElvish.title')}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('linguisticFeatures.elvishLanguagePatterns.dndElvish.description')}
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.dndElvish.feature1')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.dndElvish.feature2')}</div>
                        <div>• {t('linguisticFeatures.elvishLanguagePatterns.dndElvish.feature3')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('linguisticFeatures.pronunciationGuide.title')}</CardTitle>
                  <CardDescription>{t('linguisticFeatures.pronunciationGuide.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">{t('linguisticFeatures.pronunciationGuide.vowelSounds.title')}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">a</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.vowelSounds.sounds.a')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">e</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.vowelSounds.sounds.e')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">i</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.vowelSounds.sounds.i')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">o</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.vowelSounds.sounds.o')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">u</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.vowelSounds.sounds.u')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.title')}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">th</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.combinations.th')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">dh</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.combinations.dh')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ng</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.combinations.ng')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ch</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.combinations.ch')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">r</span>
                          <span className="text-sm text-gray-600">{t('linguisticFeatures.pronunciationGuide.consonantCombinations.combinations.r')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Elf Name Generator Types - Keyword Density Enhancement */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{t('collection.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.woodElfGenerator.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.woodElfGenerator.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.woodElfGenerator.feature1')}</div>
                    <div>• {t('collection.woodElfGenerator.feature2')}</div>
                    <div>• {t('collection.woodElfGenerator.feature3')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.darkElfGenerator.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.darkElfGenerator.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.darkElfGenerator.feature1')}</div>
                    <div>• {t('collection.darkElfGenerator.feature2')}</div>
                    <div>• {t('collection.darkElfGenerator.feature3')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.halfElfGenerator.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.halfElfGenerator.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.halfElfGenerator.feature1')}</div>
                    <div>• {t('collection.halfElfGenerator.feature2')}</div>
                    <div>• {t('collection.halfElfGenerator.feature3')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.bloodElfGenerator.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.bloodElfGenerator.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.bloodElfGenerator.feature1')}</div>
                    <div>• {t('collection.bloodElfGenerator.feature2')}</div>
                    <div>• {t('collection.bloodElfGenerator.feature3')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.elfNamesGenerator.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.elfNamesGenerator.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.elfNamesGenerator.feature1')}</div>
                    <div>• {t('collection.elfNamesGenerator.feature2')}</div>
                    <div>• {t('collection.elfNamesGenerator.feature3')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('collection.elfNameGeneratorDnd.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('collection.elfNameGeneratorDnd.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• {t('collection.elfNameGeneratorDnd.feature1')}</div>
                    <div>• {t('collection.elfNameGeneratorDnd.feature2')}</div>
                    <div>• {t('collection.elfNameGeneratorDnd.feature3')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Conclusion */}
          <section className="text-center py-12 my-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('conclusion.title')}
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg text-gray-700">
                {t('conclusion.paragraph1')}
              </p>
              <p className="text-gray-600">
                {t('conclusion.paragraph2')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href={homeHref}
                className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                🧝‍♀️ {t('conclusion.generateButton')}
              </Link>
              <Link
                href="#supported-types"
                className="px-8 py-3 rounded-lg font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                🌟 {t('conclusion.exploreButton')}
              </Link>
            </div>
          </section>

          {/* Related Sites Section */}
          <section className="text-center py-12 mt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('relatedSites.title')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('relatedSites.description')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <Link
                href={t('relatedSites.chineseNameGenerator.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-center group"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{t('relatedSites.chineseNameGenerator.title')}</div>
                <div className="text-sm text-gray-500 mt-1">{t('relatedSites.chineseNameGenerator.description')}</div>
              </Link>
              
              <Link
                href={t('relatedSites.dressMeAI.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-center group"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-purple-600">{t('relatedSites.dressMeAI.title')}</div>
                <div className="text-sm text-gray-500 mt-1">{t('relatedSites.dressMeAI.description')}</div>
              </Link>
              
              <Link
                href={t('relatedSites.dreamfinityX.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-center group"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">{t('relatedSites.dreamfinityX.title')}</div>
                <div className="text-sm text-gray-500 mt-1">{t('relatedSites.dreamfinityX.description')}</div>
              </Link>
              
              <Link
                href={t('relatedSites.aiNailsPro.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 text-center group"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-pink-600">{t('relatedSites.aiNailsPro.title')}</div>
                <div className="text-sm text-gray-500 mt-1">{t('relatedSites.aiNailsPro.description')}</div>
              </Link>
              
              <Link
                href={t('relatedSites.characterReadCanon.url')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-center group"
              >
                <div className="text-lg font-semibold text-gray-800 group-hover:text-green-600">{t('relatedSites.characterReadCanon.title')}</div>
                <div className="text-sm text-gray-500 mt-1">{t('relatedSites.characterReadCanon.description')}</div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": t('structuredData.appName'),
            "description": t('structuredData.appDescription'),
            "url": "https://elfname.pro",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "Any",
            "browserRequirements": "Any modern web browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "creator": {
              "@type": "Organization",
              "name": t('structuredData.appName')
            },
            "keywords": t('structuredData.keywords'),
            "audience": {
              "@type": "Audience",
              "audienceType": [
                t('structuredData.audienceType1'),
                t('structuredData.audienceType2'),
                t('structuredData.audienceType3'),
                t('structuredData.audienceType4')
              ]
            },
            "featureList": [
              t('structuredData.feature1'),
              t('structuredData.feature2'),
              t('structuredData.feature3'),
              t('structuredData.feature4'),
              t('structuredData.feature5'),
              t('structuredData.feature6'),
              t('structuredData.feature7'),
              t('structuredData.feature8')
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "2847",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": t('structuredData.faq1Question'),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t('structuredData.faq1Answer')
                }
              },
              {
                "@type": "Question",
                "name": t('structuredData.faq2Question'),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t('structuredData.faq2Answer')
                }
              },
              {
                "@type": "Question",
                "name": t('structuredData.faq3Question'),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t('structuredData.faq3Answer')
                }
              },
              {
                "@type": "Question",
                "name": t('structuredData.faq4Question'),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t('structuredData.faq4Answer')
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}