"use client";

import { useState, useEffect } from "react";
import ElfNameGenerator from "@/components/ElfNameGenerator";
import { Suspense } from "react";

// 动态导入SEO组件，启用服务器端渲染以支持SEO
const ElfNameSEO = dynamic(() => import("@/components/ElfNameSEO"), {
  ssr: true, // 启用服务器端渲染，确保搜索引擎可以索引内容
});

import dynamic from "next/dynamic";

export default function ElfNamePage() {
  const [showSEO, setShowSEO] = useState(false);

  useEffect(() => {
    // 设置一个定时器，确保SEO内容在页面加载后显示，无论是否滚动
    // 这有助于搜索引擎爬虫能够看到内容
    const timer = setTimeout(() => {
      setShowSEO(true);
    }, 100); // 页面加载后很快显示SEO内容
    
    // 使用Intersection Observer来检测用户是否滚动到页面下方
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowSEO(true);
          }
        });
      },
      {
        rootMargin: "200px", // 提前200px触发
      }
    );

    const trigger = document.createElement("div");
    trigger.style.height = "1px";
    trigger.style.position = "absolute";
    trigger.style.bottom = "70%"; // 更靠近页面上部，确保早点触发
    trigger.style.left = "0";
    trigger.style.width = "100%";
    trigger.style.pointerEvents = "none";
    
    document.body.appendChild(trigger);
    observer.observe(trigger);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (document.body.contains(trigger)) {
        document.body.removeChild(trigger);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ElfNameGenerator />
      
      {/* 懒加载SEO内容 - 包含精灵名字生成器的各种类型：wood elf name generator, dark elf name generator, half elf name generator, blood elf name generator */}
      {showSEO && (
        <Suspense fallback={<div className="h-4" />}>
          {/* 加载elf name generator dnd内容和elf names generator相关组件 */}
          <ElfNameSEO />
        </Suspense>
      )}
    </div>
  );
}