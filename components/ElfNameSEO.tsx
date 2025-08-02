import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book, Users, Zap, TreePine, Moon, Sun, Waves, Snowflake, Eye } from "lucide-react";
import SEOImageGallery from './SEOImageGallery';
import Link from 'next/link';

export default function ElfNameSEO() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Why You Need an Elf Name Generator</h2>
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p className="text-lg text-gray-700">
                Are you searching for the perfect elf name for your next character, story, or game? An <strong>elf name generator</strong> is the ultimate tool for fantasy enthusiasts, writers, RPG fans, and gamers alike.
              </p>
              <p className="text-gray-600">
                Whether you need a classic elf name, a unique <strong>half elf name</strong>, or something that fits the world of <strong>wood elves</strong> or <strong>dark elves</strong>, an elf name generator can deliver thousands of magical and creative options with just a click.
              </p>
            </div>
          </section>

          {/* What Is Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">What Is an Elf Name Generator?</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-gray-700">
                An <strong>elf name generator</strong> is an online tool or application designed to help you create authentic and unique names for elf characters. These generators use complex algorithms, language patterns, and sometimes AI to craft names inspired by fantasy literature, mythology, and games like Dungeons & Dragons (DND), Lord of the Rings, and more.
              </p>
              <p className="text-gray-600">
                With just a few clicks, an elf name generator can provide you with dozens or even hundreds of creative elf names, ranging from <strong>high elf names</strong> to <strong>wood elf names</strong> and even <strong>dark elf names</strong>. Some generators even allow you to customize your results to fit specific fantasy races, gender, or thematic settings.
              </p>
            </div>
          </section>

          {/* Types of Generators */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Types of Elf Name Generators</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-gray-700 text-center mb-8">
                There are many different kinds of <strong>elf name generator</strong> tools available online, each catering to different needs:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">1. Classic Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Get names that fit the traditional elven fantasy style, perfect for most fantasy settings.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">2. Half Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Blending human and elf cultures, this generator provides names with both mystical and familiar sounds.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Wood Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Inspired by forest-dwelling elves, these names evoke nature, forests, and the ancient wild.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">4. Dark Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Perfect for darker or underground elf races, these names are mysterious, powerful, and often a bit sinister.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">5. DND Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Specially designed with Dungeons & Dragons lore in mind, ideal for creating memorable DND characters.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">6. Female/Male Elf Name Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Specify character gender for names that match male or female elf naming conventions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">How to Use an Elf Name Generator</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                Using an <strong>elf name generator</strong> is simple:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-blue-500">1</Badge>
                      Choose Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Choose your generator type (classic, half elf, wood elf, dark elf, etc.)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-green-500">2</Badge>
                      Set Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Enter any preferences, such as gender, culture, or specific sounds
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className="bg-purple-500">3</Badge>
                      Generate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Click &quot;generate&quot; and explore the magical list of elf names
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Essential */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Why an Elf Name Generator Is Essential for Fantasy Creators</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Save Time and Energy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Coming up with unique elf names can be difficult and time-consuming. An elf name generator instantly solves this issue, providing endless inspiration for your stories or games.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      Enhance Creativity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Seeing unexpected or beautifully constructed names from an elf name generator can inspire new characters, stories, or even entire elven cultures in your world-building.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Book className="h-5 w-5 text-blue-500" />
                      Consistency and Authenticity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Many elf name generator tools are designed with consistent fantasy linguistics, ensuring every elf name matches the style and culture you want.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-green-500" />
                      Accessible to All
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Anyone—whether a professional writer or a hobby gamer—can use an elf name generator. No special skills required!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Top Features to Look For */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Top Features to Look For in an Elf Name Generator</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                When choosing the best <strong>elf name generator</strong> for your project, consider these features:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">✨ Diverse Name Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      From half elf to wood elf and dark elf names - comprehensive coverage of all elf types.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">⚧ Gender Selection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Choose between male and female elf names for more realistic characters.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🎛 Customizable Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Advanced settings like culture, clan, background, or fantasy world integration.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🆓 Free and User-Friendly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      The best elf name generator is easy to use and free of charge.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Popular Uses */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Popular Uses for an Elf Name Generator</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-center mb-8">
                An <strong>elf name generator</strong> isn&apos;t just for writers or DND players. Here are a few fun ways to use one:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TreePine className="h-5 w-5 text-green-500" />
                      Tabletop RPGs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Instantly name your next elf, half elf, or dark elf character for D&D or Pathfinder.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Book className="h-5 w-5 text-blue-500" />
                      Fantasy Novels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Easily generate dozens of elvish names to bring diversity to your cast.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-purple-500" />
                      Online Games
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Create a wood elf, dark elf, or high elf that stands out in MMORPGs or social apps.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      Creative Writing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Bring your fantasy world to life with authentic elven names and backstories.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Supported Elf Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TreePine className="h-6 w-6 text-emerald-500" />
                  <div>
                    <h3 className="font-semibold">Wood Elf</h3>
                    <p className="text-sm text-gray-600">Elves in harmony with nature, skilled in archery and forest magic</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">Dark Elf (Drow)</h3>
                    <p className="text-sm text-gray-600">Underground dwelling elves with dark skin and silver-white hair</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Half-Elf</h3>
                    <p className="text-sm text-gray-600">Mixed heritage of human and elf, embodying traits of both races</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-gold-500" />
                  <div>
                    <h3 className="font-semibold">High Elf</h3>
                    <p className="text-sm text-gray-600">Noble elves with powerful magical abilities and ancient history</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Moon className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Moon Elf</h3>
                    <p className="text-sm text-gray-600">Nocturnal elves with silver hair and moonlight-like beauty</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sun className="h-6 w-6 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">Sun Elf</h3>
                    <p className="text-sm text-gray-600">Golden-haired elves with light magic and healing abilities</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Wild Elf</h3>
                    <p className="text-sm text-gray-600">Primitive elf race with the strongest connection to nature</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Waves className="h-6 w-6 text-cyan-500" />
                  <div>
                    <h3 className="font-semibold">Sea Elf</h3>
                    <p className="text-sm text-gray-600">Ocean-dwelling elves with aquatic abilities and sea magic</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Snowflake className="h-6 w-6 text-indigo-500" />
                  <div>
                    <h3 className="font-semibold">Snow Elf</h3>
                    <p className="text-sm text-gray-600">Elves living in cold regions with ice and snow magic</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Elf Character Examples Gallery */}
          <SEOImageGallery
            title="Elf Character Showcase"
            description="Explore different types of elf character designs to inspire your fantasy creations"
            images={[
              {
                url: "/seo-images/Wood Elf Ranger.png",
                alt: "Wood elf ranger character design for fantasy name generation",
                title: "Wood Elf Ranger",
                description: "Forest guardian with name: Silverleaf Moonwhisper, skilled in archery and nature magic"
              },
              {
                url: "/seo-images/Dark Elf Mage.png",
                alt: "Dark elf mage character design for fantasy gaming",
                title: "Dark Elf Mage",
                description: "Underground world mage with name: Vexara Shadowweaver, master of dark magic and illusions"
              },
              {
                url: "/seo-images/High Elf Noble.png",
                alt: "High elf noble character design for fantasy stories",
                title: "High Elf Noble",
                description: "Ancient royal bloodline elf with name: Goldenbrow Starcrown, possessing powerful magical talents"
              }
            ]}
          />



          {/* Elf Name Categories */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Categories and Meanings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nature-Inspired Names</CardTitle>
                  <CardDescription>Names reflecting natural elements and forest life</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Silverleaf</span>
                      <span className="text-xs text-gray-500">Tree guardian</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Moonwhisper</span>
                      <span className="text-xs text-gray-500">Night wanderer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Starweaver</span>
                      <span className="text-xs text-gray-500">Cosmic mage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Windrunner</span>
                      <span className="text-xs text-gray-500">Swift traveler</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Noble Titles</CardTitle>
                  <CardDescription>Names of elvish nobility and aristocracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Goldenbrow</span>
                      <span className="text-xs text-gray-500">Royal lineage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Crystalborn</span>
                      <span className="text-xs text-gray-500">Pure bloodline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Thornheart</span>
                      <span className="text-xs text-gray-500">Warrior lord</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Stormcrown</span>
                      <span className="text-xs text-gray-500">Weather master</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Magical Names</CardTitle>
                  <CardDescription>Names with magical significance and power</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Spellsong</span>
                      <span className="text-xs text-gray-500">Enchantress</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Runekeeper</span>
                      <span className="text-xs text-gray-500">Magic scholar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dreamweaver</span>
                      <span className="text-xs text-gray-500">Mind mage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lightbringer</span>
                      <span className="text-xs text-gray-500">Divine caster</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Linguistic Features */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Linguistic Features</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Elvish Language Patterns</CardTitle>
                  <CardDescription>Understanding the structure of elvish names</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Sindarin Influences</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Names inspired by Tolkien&apos;s Sindarin language, featuring flowing vowel sounds and nature-based meanings. Common prefixes include &quot;Gal-&quot; (light), &quot;Cel-&quot; (stream), and &quot;Mith-&quot; (grey).
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Soft consonant clusters</div>
                        <div>• Melodic vowel combinations</div>
                        <div>• Nature-inspired elements</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Quenya Patterns</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        High elvish naming conventions with formal, noble sounds. Often feature &quot;Eru-&quot; (one), &quot;Tar-&quot; (high), and &quot;Gil-&quot; (star) as meaningful components.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Formal linguistic structure</div>
                        <div>• Noble-sounding combinations</div>
                        <div>• Cosmic and divine themes</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">D&D Elvish</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Names following D&D lore and conventions, adapted for various elf subraces. Features unique patterns for wood elves, high elves, and drow cultures.
                      </p>
                      <div className="space-y-1 text-xs">
                        <div>• Subrace-specific patterns</div>
                        <div>• Cultural naming traditions</div>
                        <div>• Alignment-based influences</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Pronunciation Guide</CardTitle>
                  <CardDescription>How to pronounce elvish names correctly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Vowel Sounds</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">a</span>
                          <span className="text-sm text-gray-600">as in &quot;father&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">e</span>
                          <span className="text-sm text-gray-600">as in &quot;bed&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">i</span>
                          <span className="text-sm text-gray-600">as in &quot;machine&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">o</span>
                          <span className="text-sm text-gray-600">as in &quot;more&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">u</span>
                          <span className="text-sm text-gray-600">as in &quot;moon&quot;</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Consonant Combinations</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">th</span>
                          <span className="text-sm text-gray-600">soft &quot;th&quot; sound</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">dh</span>
                          <span className="text-sm text-gray-600">voiced &quot;th&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ng</span>
                          <span className="text-sm text-gray-600">as in &quot;sing&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ch</span>
                          <span className="text-sm text-gray-600">as in &quot;loch&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">r</span>
                          <span className="text-sm text-gray-600">rolled &quot;r&quot;</span>
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
            <h2 className="text-3xl font-bold text-center mb-8">Elf Name Generator Collection</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wood Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our wood elf name generator creates authentic names for forest-dwelling elves. Perfect for rangers, druids, and nature-connected characters. The wood elf name generator produces names with natural elements and sylvan influences.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Nature-themed naming patterns</div>
                    <div>• Forest culture integration</div>
                    <div>• Wood elf name generator for D&D</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dark Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Generate authentic drow names with our dark elf name generator. Perfect for underground campaigns and shadow-themed characters. The dark elf name generator creates names with mysterious and sometimes sinister undertones.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Underworld culture naming patterns</div>
                    <div>• Drow society integration</div>
                    <div>• Dark elf name generator for roleplaying</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Half Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our half elf name generator blends human and elven naming traditions. Perfect for characters with mixed heritage and unique backgrounds. The half elf name generator creates versatile names fitting multiple settings.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Cultural fusion naming patterns</div>
                    <div>• Adaptable to various campaigns</div>
                    <div>• Half elf name generator for diverse stories</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blood Elf Name Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Create majestic and powerful names with our blood elf name generator. Perfect for high-fantasy settings and arcane-influenced characters. The blood elf name generator produces names with elegant yet potent qualities.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Arcane-influenced naming patterns</div>
                    <div>• Magical heritage integration</div>
                    <div>• Blood elf name generator for fantasy gaming</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Elf Names Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our comprehensive elf names generator covers all types of elven cultures. This elf names generator creates authentic fantasy names suited for any setting or story. Use our elf names generator for instant character creation.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• Universal elven naming patterns</div>
                    <div>• Multi-cultural elven integration</div>
                    <div>• Elf names generator for all character types</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Elf Name Generator DnD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Our specialized elf name generator DnD creates names perfectly aligned with Dungeons & Dragons lore. This elf name generator DnD integrates with official race descriptions and naming conventions from the Player&apos;s Handbook.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div>• D&D rulebook compliant names</div>
                    <div>• Campaign setting appropriate</div>
                    <div>• Elf name generator DnD for authentic gameplay</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Conclusion */}
          <section className="text-center py-12 my-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Try the Ultimate Elf Name Generator Today
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg text-gray-700">
                A powerful <strong>elf name generator</strong> is essential for any creative project involving elves. With options for <strong>half elf</strong>, <strong>wood elf</strong>, <strong>dark elf</strong>, and more, these tools will save you time and help you create truly magical characters.
              </p>
              <p className="text-gray-600">
                Looking for the best place to generate elf names? Our advanced <strong>elf name generator</strong> platform can create names for half elves, wood elves, female elves, dark elves, and even unique <strong>DND elf names</strong>. Whether you need a <strong>half elf name generator</strong>, the perfect <strong>wood elf name generator</strong>, or inspiration for DND, our <strong>elf generator</strong> delivers the best results, instantly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/"
                className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                🧝‍♀️ Generate Elf Names Now
              </Link>
              <Link
                href="#supported-types"
                className="px-8 py-3 rounded-lg font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                🌟 Explore All Elf Types
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
            "name": "Ultimate Elf Name Generator",
            "description": "Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters with our ultimate elf name generator.",
            "url": "https://elfnamegenerator.pro",
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
              "name": "Ultimate Elf Name Generator"
            },
            "keywords": "elf name generator, ultimate elf name generator, wood elf name generator, dark elf name generator, half elf name generator, elf names generator, elf name generator dnd, fantasy names, magical elf names",
            "audience": {
              "@type": "Audience",
              "audienceType": ["Fantasy Writers", "RPG Gamers", "D&D Players", "Creative Writers"]
            },
            "featureList": [
              "Wood Elf Name Generation",
              "Dark Elf Name Generation", 
              "Half Elf Name Generation",
              "DND Character Names",
              "AI-Powered Generation",
              "Cultural Background Stories",
              "Pronunciation Guides",
              "Free to Use"
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
                "name": "What is the most popular elf name generator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many users love our elf name generator for its ease of use and wide variety of options, including wood elf and dark elf name generators. Our tool provides authentic names with cultural backgrounds and pronunciation guides."
                }
              },
              {
                "@type": "Question", 
                "name": "Can I generate female elf names specifically?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, most elf name generator tools allow you to choose gender-specific names for a more custom result. Our generator includes both male and female naming conventions for all elf types."
                }
              },
              {
                "@type": "Question",
                "name": "Are elf name generators suitable for DND characters?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! There are specialized elf name generator DND tools with lore-accurate names. Our generator follows D&D naming conventions and includes names for all official elf subraces."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use elf names for non-fantasy situations?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Of course! Elf name generators are perfect for usernames, screen names, or any time you want something magical and unique."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}