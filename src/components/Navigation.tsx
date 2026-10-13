import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, BookOpen, Settings, Flame, ShieldAlert, ChevronDown, Users, Sun, Moon } from "lucide-react";
import { GameUser } from "../types";
import logoImg from "../../assets/images/ENSA.png";
import { ADMIN_PROFILES } from "../App";
import UserAvatar from "./UserAvatar";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: GameUser;
  onSelectUser?: (user: GameUser) => void;
}

export default function Navigation({ activeTab, setActiveTab, user, onSelectUser }: NavigationProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("ensa-theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("ensa-theme", theme);
  }, [theme]);

  // Calculate XP progress bar
  const xpInCurrentLevel = user.points % 100;
  const xpNeededForNext = 100;
  const xpPercent = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  const tabs = [
    { id: "inicio", label: "Notícias", icon: Flame },
    { id: "wiki", label: "Wiki & Lançamentos", icon: BookOpen },
    { id: "comunidade", label: "Comunidade Otaku", icon: Trophy },
    { id: "admin", label: "Painel Admin", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ensa-dark/95 backdrop-blur-md border-b border-neutral-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("inicio")}>
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="ENSA"
                className="h-12 sm:h-14 w-auto object-contain block"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                  const fallback = document.getElementById("ensa-text-fallback");
                  if (fallback) {
                    fallback.style.display = "flex";
                    fallback.classList.remove("hidden");
                  }
                }}
              />
              <div id="ensa-text-fallback" className="hidden items-center space-x-3">
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-ensa-orange to-ensa-red rounded-xl shadow-lg shadow-ensa-orange/20 overflow-hidden border border-ensa-orange/30">
                  <span className="font-display text-2xl font-black text-white tracking-widest">E</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-display text-3xl font-black text-neutral-100 tracking-wide">ENSA</span>
                    <span className="bg-ensa-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">Angola</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block border-l border-neutral-850 pl-3">
              <p className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase font-sans">
                Explosão Naruto Shippuden em Angola
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isAdmin = tab.id === "admin";
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={isAdmin ? tab.label : undefined}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isAdmin ? "" : "space-x-2"
                  } ${
                    isActive
                      ? "bg-ensa-orange text-white shadow-lg shadow-ensa-orange/20 scale-105"
                      : "text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                  {!isAdmin && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Theme Switcher & User Status Widget with Dropdown Switcher */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700 transition-all duration-300 text-neutral-300 hover:text-ensa-orange shadow cursor-pointer flex items-center justify-center"
              title={theme === "dark" ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-ensa-orange transition-transform hover:-rotate-12" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 p-2.5 rounded-xl space-x-3 max-w-sm text-left transition duration-300 focus:outline-none focus:border-ensa-orange cursor-pointer group"
              >
                <div className="relative flex-shrink-0">
                  <UserAvatar
                    avatarUrl={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full border-2 border-ensa-orange shadow group-hover:border-white transition-colors"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-ensa-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-neutral-950 font-mono">
                    {user.level}
                  </span>
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <div className="flex items-center justify-between text-xs mb-1 space-x-2">
                    <span className="font-bold text-neutral-200 truncate max-w-[90px]">{user.username}</span>
                    <div className="flex items-center space-x-1 font-mono text-ensa-orange font-bold">
                      <span>{user.points} XP</span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-ensa-orange transition" />
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-ensa-orange to-ensa-red rounded-full transition-all duration-500"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-neutral-400 font-mono mt-0.5">
                    <span className="bg-ensa-red/20 text-ensa-red font-bold px-1 rounded uppercase scale-90 origin-left">Admin</span>
                    <span>{xpInCurrentLevel}/100 XP</span>
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  {/* Backdrop overlay to close on click outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                  />
                  
                  <div className="absolute right-0 mt-2 w-72 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="flex items-center space-x-2 border-b border-neutral-900 pb-2.5 mb-3">
                      <Users className="w-4 h-4 text-ensa-orange" />
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Simular Administrador</span>
                    </div>
                    
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                      {ADMIN_PROFILES.map((prof) => {
                        const isSelected = prof.username === user.username;
                        return (
                          <button
                            key={prof.username}
                            onClick={() => {
                              if (onSelectUser) onSelectUser(prof);
                              setShowDropdown(false);
                            }}
                            className={`w-full flex items-center space-x-3 p-2 rounded-xl text-left transition duration-200 ${
                              isSelected 
                                ? "bg-ensa-orange/15 border border-ensa-orange/40 text-white" 
                                : "border border-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white"
                            }`}
                          >
                            <UserAvatar
                              avatarUrl={prof.avatar}
                              alt={prof.username}
                              className={`w-8 h-8 rounded-full border ${
                                isSelected ? "border-ensa-orange" : "border-neutral-800"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold truncate text-white">{prof.username}</span>
                                <span className="text-[10px] font-mono font-bold text-ensa-orange">Nív. {prof.level}</span>
                              </div>
                              <p className="text-[9px] text-neutral-500 truncate">
                                {prof.badges[0]} • {prof.badges[1]}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-neutral-900 pt-2.5 mt-3 text-center">
                      <p className="text-[9px] text-neutral-600">
                        Clique para alternar o administrador e simular acções.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
