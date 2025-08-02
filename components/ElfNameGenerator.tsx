"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Copy, Sparkles, Shuffle, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface ElfName {
  name: string;
  pronunciation: string;
  meaning: string;
  background?: string;
  elfType: string;
}

export default function ElfNameGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<ElfName[]>([]);
  const [formData, setFormData] = useState({
    elfType: "",
    gender: "",
    nameCount: "5",
    nameStyle: "traditional",
    includeBackground: false,
    customRequirements: "",
  });

  const elfTypes = [
    { value: "any", label: "Any Elf Type" },
    { value: "wood-elf", label: "Wood Elf" },
    { value: "dark-elf", label: "Dark Elf / Drow" },
    { value: "half-elf", label: "Half-Elf" },
    { value: "high-elf", label: "High Elf" },
    { value: "moon-elf", label: "Moon Elf" },
    { value: "sun-elf", label: "Sun Elf" },
    { value: "wild-elf", label: "Wild Elf" },
    { value: "sea-elf", label: "Sea Elf" },
    { value: "snow-elf", label: "Snow Elf" },
    { value: "shadow-elf", label: "Shadow Elf" },
  ];

  const genders = [
    { value: "any", label: "Any Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
  ];

  const nameStyles = [
    { value: "traditional", label: "Traditional" },
    { value: "modern", label: "Modern" },
    { value: "melodic", label: "Melodic" },
    { value: "mystical", label: "Mystical" },
    { value: "noble", label: "Noble" },
    { value: "nature-inspired", label: "Nature-inspired" },
  ];

  const nameCounts = [
    { value: "3", label: "3 names" },
    { value: "5", label: "5 names" },
    { value: "8", label: "8 names" },
    { value: "10", label: "10 names" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/elf-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        if (Array.isArray(result.data)) {
          setGeneratedNames(result.data);
        } else if (result.data.rawText) {
          // Handle parsing failure
          toast.error("Generation successful, but format parsing failed, please check the original result");
          console.log("Raw response:", result.data.rawText);
        }
      } else {
        toast.error(result.error || "Generation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error, please try again later");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const speakName = (name: string, pronunciation: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    } else {
      toast.error("Your browser does not support speech synthesis");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Elf Name Generator | Fantasy Name Creation Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our complete elf name generator suite includes wood elf name generator, dark elf name generator, half elf name generator, blood elf name generator, and elf name generator dnd tools for your fantasy stories, D&D characters, and RPG games. The best elf names generator available online!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Generator Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  Name Generator Settings
                </CardTitle>
                <CardDescription>
                  Configure the type and style of elf names you want to generate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="elfType">Elf Type</Label>
                    <Select
                      value={formData.elfType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, elfType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select elf type" />
                      </SelectTrigger>
                      <SelectContent>
                        {elfTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameStyle">Name Style</Label>
                    <Select
                      value={formData.nameStyle}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, nameStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select name style" />
                      </SelectTrigger>
                      <SelectContent>
                        {nameStyles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameCount">Number of Names</Label>
                    <Select
                      value={formData.nameCount}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, nameCount: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of names" />
                      </SelectTrigger>
                      <SelectContent>
                        {nameCounts.map((count) => (
                          <SelectItem key={count.value} value={count.value}>
                            {count.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeBackground"
                      checked={formData.includeBackground}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, includeBackground: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeBackground" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Include Background Stories
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customRequirements">Custom Requirements (Optional)</Label>
                    <Textarea
                      id="customRequirements"
                      placeholder="e.g., make names sound more mystical, include specific meanings, etc..."
                      value={formData.customRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, customRequirements: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <Shuffle className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Elf Names
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Generated Results */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Elf Names</CardTitle>
                <CardDescription>
                  Click the copy button to copy names to clipboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedNames.length > 0 ? (
                  <div className="space-y-4">
                    {generatedNames.map((elfName, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {elfName.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakName(elfName.name, elfName.pronunciation)}
                              className="h-8 w-8 p-0"
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(elfName.name)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Pronunciation:</span>
                            <span className="text-gray-600">{elfName.pronunciation}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Meaning:</span>
                            <span className="text-gray-600">{elfName.meaning}</span>
                          </div>
                          <div>
                            <Badge variant="secondary" className="text-xs">
                              {elfName.elfType}
                            </Badge>
                          </div>
                          {elfName.background && (
                            <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                              <span className="font-medium text-gray-700">Background:</span>
                              <p className="text-gray-600 mt-1">{elfName.background}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Fill in the configuration and click &quot;Generate Elf Names&quot; to start creating
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}