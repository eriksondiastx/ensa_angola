import React, { useState } from "react";
import { BookOpen, Calendar, HelpCircle, Star, Sparkles, Filter } from "lucide-react";
import { CHARACTERS, RELEASES_CALENDAR, Character, ReleaseItem } from "../data/staticData";

export default function WikiAndCalendar() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [calendarFilter, setCalendarFilter] = useState<string>("Tudo");

  // Filter release items based on category tabs
  const filteredCalendar = calendarFilter === "Tudo" 
    ? RELEASES_CALENDAR 
    : RELEASES_CALENDAR.filter(item => item.type === calendarFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* SECTION 1: Character Wiki */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl font-black text-white tracking-widest flex items-center space-x-2.5">
              <BookOpen className="w-6 h-6 text-ensa-orange" />
              <span>FICHEIRO DE PERSONAGENS (WIKI)</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">Análises detalhadas, estatísticas de combate e biografia das tuas lendas favoritas.</p>
          </div>
          
          {/* Quick selection tags */}
          <div className="flex flex-wrap gap-2">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`text-xs px-3 py-2 rounded-lg font-bold border transition ${
                  selectedCharacter.id === char.id
                    ? "bg-ensa-orange border-ensa-orange text-white"
                    : "border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300"
                }`}
              >
                {char.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Character Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Cover & General Tag */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-lg bg-neutral-950">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase shadow-md ${
                selectedCharacter.role === "Protagonista" 
                  ? "bg-green-600" 
                  : selectedCharacter.role === "Antagonista" 
                  ? "bg-ensa-red" 
                  : "bg-blue-600"
              }`}>
                {selectedCharacter.role}
              </span>
            </div>

            {/* Custom Quote card */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/60 italic text-neutral-300 text-xs sm:text-sm relative">
              <span className="absolute top-1 left-2 font-display text-4xl text-ensa-orange/30">“</span>
              <p className="pl-4 py-2 font-medium">"{selectedCharacter.quote}"</p>
              <p className="text-right text-[10px] font-bold text-ensa-orange font-sans uppercase tracking-widest mt-1">- {selectedCharacter.name}</p>
            </div>
          </div>

          {/* Details & Fighting Stats */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="flex items-baseline space-x-3">
                <h3 className="font-display text-4xl font-black text-white leading-none">{selectedCharacter.name}</h3>
                <span className="text-ensa-orange text-xs font-bold uppercase tracking-wider">{selectedCharacter.anime}</span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-light">
                {selectedCharacter.bio}
              </p>
            </div>

            {/* Combat Power stats chart */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 space-y-4">
              <h4 className="font-display text-lg font-black text-white tracking-wider flex items-center space-x-1.5 border-b border-neutral-800 pb-2">
                <Star className="w-4 h-4 text-ensa-orange fill-current" />
                <span>ATRIBUTOS DE PODER</span>
              </h4>

              <div className="space-y-3">
                {/* Força */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-neutral-300">
                    <span>Força Física / Ataque</span>
                    <span className="font-mono text-ensa-orange">{selectedCharacter.stats.forca} / 100</span>
                  </div>
                  <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-ensa-red rounded-full transition-all duration-500" 
                      style={{ width: `${selectedCharacter.stats.forca}%` }} 
                    />
                  </div>
                </div>

                {/* Velocidade */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-neutral-300">
                    <span>Velocidade / Agilidade</span>
                    <span className="font-mono text-ensa-orange">{selectedCharacter.stats.velocidade} / 100</span>
                  </div>
                  <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-ensa-orange rounded-full transition-all duration-500" 
                      style={{ width: `${selectedCharacter.stats.velocidade}%` }} 
                    />
                  </div>
                </div>

                {/* Inteligência */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-neutral-300">
                    <span>Inteligência / Táticas</span>
                    <span className="font-mono text-ensa-orange">{selectedCharacter.stats.inteligencia} / 100</span>
                  </div>
                  <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${selectedCharacter.stats.inteligencia}%` }} 
                    />
                  </div>
                </div>

                {/* Poder Especial */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-neutral-300">
                    <span>Poder Especial (Chakra / Sombras)</span>
                    <span className="font-mono text-ensa-orange">{selectedCharacter.stats.poderEspecial} / 100</span>
                  </div>
                  <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-ensa-orange to-ensa-red rounded-full transition-all duration-500" 
                      style={{ width: `${selectedCharacter.stats.poderEspecial}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Release Calendar */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl font-black text-white tracking-widest flex items-center space-x-2.5">
              <Calendar className="w-6 h-6 text-ensa-orange" />
              <span>CALENDÁRIO GEES DE LANÇAMENTOS</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">Sabe quando chegam as novas temporadas, jogos e filmes mais aguardados.</p>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["Tudo", "Anime", "Jogo", "Filme", "Série"].map((type) => (
              <button
                key={type}
                onClick={() => setCalendarFilter(type)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-bold border transition ${
                  calendarFilter === type
                    ? "bg-ensa-red border-ensa-red text-white"
                    : "border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalendar.map((item) => (
            <div 
              key={item.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-ensa-orange/40 transition-all duration-300 p-4 flex gap-4"
            >
              {/* Cover thumbnail */}
              <div className="w-20 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-800 bg-neutral-900">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Data list */}
              <div className="flex flex-col justify-between flex-1 py-0.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-ensa-orange/10 border border-ensa-orange/20 text-ensa-orange text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-wide ${
                      item.expectation === "Extrema" 
                        ? "bg-ensa-red/10 border border-ensa-red/20 text-ensa-red" 
                        : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500"
                    }`}>
                      Espectativa {item.expectation}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="text-[11px] font-medium border-t border-neutral-900 pt-2 text-neutral-400">
                  <p>Lançamento: <span className="text-white font-bold">{item.date}</span></p>
                  <p className="truncate">Plataforma: <span className="text-neutral-300">{item.platform}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
