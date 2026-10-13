import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, Eye, ThumbsUp } from "lucide-react";
import { Article } from "../types";
import UserAvatar from "./UserAvatar";

interface HeroSliderProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export default function HeroSlider({ articles, onSelectArticle }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (articles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-neutral-900 h-96 rounded-2xl flex items-center justify-center border border-neutral-800">
        <span className="text-neutral-400">Nenhum artigo de destaque disponível no momento.</span>
      </div>
    );
  }

  const active = articles[current];

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % articles.length);
  };

  return (
    <div 
      className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-neutral-950 rounded-2xl overflow-hidden group shadow-2xl border border-neutral-800 cursor-pointer"
      onClick={() => onSelectArticle(active)}
    >
      {/* Background Image with Vignette Overlay */}
      <div className="absolute inset-0">
        <img
          src={active.coverImage}
          alt={active.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />
      </div>

      {/* Slide Navigation Buttons */}
      {articles.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900/80 hover:bg-ensa-orange text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur border border-neutral-800 z-10 hover:scale-110"
            aria-label="Artigo Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900/80 hover:bg-ensa-orange text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur border border-neutral-800 z-10 hover:scale-110"
            aria-label="Próximo Artigo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-ensa-orange text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase">
            {active.category}
          </span>
          {active.subcategory && (
            <span className="bg-ensa-red text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase">
              {active.subcategory}
            </span>
          )}
          {active.isSponsored && (
            <span className="bg-yellow-500 text-neutral-950 text-xs font-black px-2 py-1 rounded-md tracking-wider uppercase">
              Patrocinado
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-wide drop-shadow mb-4 group-hover:text-ensa-orange transition-colors duration-300">
          {active.title}
        </h1>

        <p className="text-neutral-300 text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mb-6 max-w-3xl font-light">
          {active.summary}
        </p>

        {/* Article Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400 font-medium">
          <div className="flex items-center space-x-2">
            <UserAvatar
              avatarUrl={active.authorAvatar}
              alt={active.authorName}
              className="w-6 h-6 rounded-full border border-neutral-700"
            />
            <span className="text-white font-semibold">{active.authorName}</span>
          </div>
          <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-ensa-orange" />
            <span>{new Date(active.createdAt).toLocaleDateString("pt-AO", { day: "2-digit", month: "short", year: "numeric" })}</span>
          </div>
          <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-ensa-orange" />
            <span>{active.readTime} min de leitura</span>
          </div>
          <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />
          <div className="flex items-center space-x-4 ml-auto">
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{active.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{active.likes}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bullet Indicator dots */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 right-6 flex space-x-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-ensa-orange w-6" : "bg-neutral-600 hover:bg-neutral-400"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
