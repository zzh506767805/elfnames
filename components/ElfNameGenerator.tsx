"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
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
  const t = useTranslations();
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
    { value: "any", label: t('elfTypes.any') },
    { value: "wood-elf", label: t('elfTypes.woodElf') },
    { value: "dark-elf", label: t('elfTypes.darkElf') },
    { value: "half-elf", label: t('elfTypes.halfElf') },
    { value: "high-elf", label: t('elfTypes.highElf') },
    { value: "moon-elf", label: t('elfTypes.moonElf') },
    { value: "sun-elf", label: t('elfTypes.sunElf') },
    { value: "wild-elf", label: t('elfTypes.wildElf') },
    { value: "sea-elf", label: t('elfTypes.seaElf') },
    { value: "snow-elf", label: t('elfTypes.snowElf') },
    { value: "shadow-elf", label: t('elfTypes.shadowElf') },
  ];

  const genders = [
    { value: "any", label: t('genders.any') },
    { value: "male", label: t('genders.male') },
    { value: "female", label: t('genders.female') },
    { value: "non-binary", label: t('genders.nonBinary') },
  ];

  const nameStyles = [
    { value: "traditional", label: t('nameStyles.traditional') },
    { value: "modern", label: t('nameStyles.modern') },
    { value: "melodic", label: t('nameStyles.melodic') },
    { value: "mystical", label: t('nameStyles.mystical') },
    { value: "noble", label: t('nameStyles.noble') },
    { value: "nature-inspired", label: t('nameStyles.natureInspired') },
  ];

  const nameCounts = [
    { value: "3", label: t('nameCounts.3') },
    { value: "5", label: t('nameCounts.5') },
    { value: "8", label: t('nameCounts.8') },
    { value: "10", label: t('nameCounts.10') },
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
          toast.error(t('common.generationSuccess'));
          console.log("Raw response:", result.data.rawText);
        }
      } else {
        toast.error(result.error || t('common.generationFailed'));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t('common.networkError'));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('common.copiedToClipboard'));
  };

  const speakName = (name: string, pronunciation: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    } else {
      toast.error(t('common.browserNotSupported'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('header.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('header.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Generator Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  {t('generator.settingsTitle')}
                </CardTitle>
                <CardDescription>
                  {t('generator.settingsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="elfType">{t('form.elfType')}</Label>
                    <Select
                      value={formData.elfType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, elfType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.elfTypePlaceholder')} />
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
                    <Label htmlFor="gender">{t('form.gender')}</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.genderPlaceholder')} />
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
                    <Label htmlFor="nameStyle">{t('form.nameStyle')}</Label>
                    <Select
                      value={formData.nameStyle}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, nameStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.nameStylePlaceholder')} />
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
                    <Label htmlFor="nameCount">{t('form.nameCount')}</Label>
                    <Select
                      value={formData.nameCount}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, nameCount: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('form.nameCountPlaceholder')} />
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
                      {t('form.includeBackground')}
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customRequirements">{t('form.customRequirements')}</Label>
                    <Textarea
                      id="customRequirements"
                      placeholder={t('form.customRequirementsPlaceholder')}
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
                        {t('common.generating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t('common.generateButton')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Generated Results */}
            <Card>
              <CardHeader>
                <CardTitle>{t('generator.resultsTitle')}</CardTitle>
                <CardDescription>
                  {t('generator.resultsDescription')}
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
                            <span className="font-medium text-gray-700">{t('nameCard.pronunciation')}</span>
                            <span className="text-gray-600">{elfName.pronunciation}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">{t('nameCard.meaning')}</span>
                            <span className="text-gray-600">{elfName.meaning}</span>
                          </div>
                          <div>
                            <Badge variant="secondary" className="text-xs">
                              {elfName.elfType}
                            </Badge>
                          </div>
                          {elfName.background && (
                            <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                              <span className="font-medium text-gray-700">{t('nameCard.background')}</span>
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
                      {t('generator.noResults')}
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