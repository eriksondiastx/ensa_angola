import React, { useState, useEffect } from "react";
import { 
  Flame, Calendar, Mail, Search, Send, Check, Heart, Bookmark, 
  Eye, Clock, ThumbsUp, ChevronRight, Compass, ShieldAlert, Award, FileText
} from "lucide-react";

// Components
import Navigation from "./components/Navigation";
import HeroSlider from "./components/HeroSlider";
import ArticleView from "./components/ArticleView";
import QuizzesAndGamification from "./components/QuizzesAndGamification";
import WikiAndCalendar from "./components/WikiAndCalendar";
import AdminPanel from "./components/AdminPanel";
import UserAvatar from "./components/UserAvatar";

// Types
import { Article, AdConfig, GameUser } from "./types";
import logoImg from "../assets/images/ENSA.png";

export const ADMIN_PROFILES: GameUser[] = [
  {
    username: "Danilton Garcia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    points: 450,
    level: 5,
    badges: ["Hokage", "Fundador", "Super User"],
    favorites: [],
    bookmarks: [],
    completedQuizzes: []
  },
  {
    username: "Décio Moreira",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
    points: 380,
    level: 4,
    badges: ["Anbu", "Escritor Chefe", "Super User"],
    favorites: [],
    bookmarks: [],
    completedQuizzes: []
  },
  {
    username: "Barata Design",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    points: 520,
    level: 6,
    badges: ["Uchiha", "Mestre de Estilo", "Super User"],
    favorites: [],
    bookmarks: [],
    completedQuizzes: []
  },
  {
    username: "Guterres",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120",
    points: 290,
    level: 3,
    badges: ["Senju", "Segurança Principal", "Super User"],
    favorites: [],
    bookmarks: [],
    completedQuizzes: []
  },
  {
    username: "Sadan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    points: 310,
    level: 4,
    badges: ["Nara", "Estratega", "Super User"],
    favorites: [],
    bookmarks: [],
    completedQuizzes: []
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [articles, setArticles] = useState<Article[]>([]);
  const [ads, setAds] = useState<AdConfig[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Search & Category states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tudo");

  // User/Gamification state (Simulated Local Storage initialized as Danilton Garcia)
  const [user, setUser] = useState<GameUser>(ADMIN_PROFILES[0]);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Cookie Consent (Google Consent Mode v2 style)
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    fetchArticles();
    fetchAds();

    // Check cookie consent local storage
    const consent = localStorage.getItem("ensa_cookie_consent");
    if (consent) {
      setCookieConsent(consent === "granted");
    }
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error("Error fetching articles:", e);
    }
  };

  const fetchAds = async () => {
    try {
      const res = await fetch("/api/admin/ads");
      if (res.ok) {
        const data = await res.json();
        setAds(data);
      }
    } catch (e) {
      console.error("Error fetching ads:", e);
    }
  };

  // Add Points / XP and trigger dynamic Level-up notifications
  const handleAddXP = (points: number, badgeToUnlock?: string) => {
    setUser((prev) => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      const updatedBadges = [...prev.badges];

      if (badgeToUnlock && !updatedBadges.includes(badgeToUnlock)) {
        updatedBadges.push(badgeToUnlock);
      }

      // If user reaches Level 5, unlock Otaku Master
      if (newLevel >= 5 && !updatedBadges.includes("Otaku Master")) {
        updatedBadges.push("Otaku Master");
      }

      if (newLevel > prev.level) {
        // Simple and beautiful custom level-up notification
        setTimeout(() => {
          alert(`🎉 SUBIDA DE NÍVEL! Parabéns ${prev.username}, alcançaste o Nível ${newLevel} no portal ENSA!`);
        }, 300);
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        badges: updatedBadges
      };
    });
  };

  const handleToggleFavorite = (id: string) => {
    setUser((prev) => {
      const favorites = [...prev.favorites];
      const idx = favorites.indexOf(id);
      let xpAward = 0;
      let badge = undefined;

      if (idx === -1) {
        favorites.push(id);
        xpAward = 10; // +10 XP for favoriting!
        if (favorites.length >= 3 && !prev.badges.includes("Colecionador")) {
          badge = "Colecionador";
        }
      } else {
        favorites.splice(idx, 1);
      }

      return {
        ...prev,
        favorites,
        points: prev.points + xpAward,
        badges: badge ? [...prev.badges, badge] : prev.badges
      };
    });
  };

  const handleToggleBookmark = (id: string) => {
    setUser((prev) => {
      const bookmarks = [...prev.bookmarks];
      const idx = bookmarks.indexOf(id);
      let xpAward = 0;

      if (idx === -1) {
        bookmarks.push(id);
        xpAward = 10;
      } else {
        bookmarks.splice(idx, 1);
      }

      return {
        ...prev,
        bookmarks,
        points: prev.points + xpAward
      };
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });

      if (res.ok) {
        setNewsletterSubscribed(true);
        setNewsletterEmail("");
        handleAddXP(20); // +20 XP for joining newsletter!
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCookieConsent = (granted: boolean) => {
    setCookieConsent(granted);
    localStorage.setItem("ensa_cookie_consent", granted ? "granted" : "denied");
    
    // Simulate Consent Mode v2 push
    if (window.hasOwnProperty("gtag")) {
      (window as any).gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied"
      });
    }
  };

  // Filter articles based on Category pills and search bar queries
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === "Tudo" || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const spotlightArticles = articles.filter(a => !a.isDraft).slice(0, 3);

  // Helper for Google AdSense slots
  const getAdConfig = (slotName: string) => ads.find(ad => ad.slotName === slotName);

  return (
    <div className="min-h-screen bg-ensa-dark text-neutral-100 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
        }} 
        user={user}
        onSelectUser={(newUser) => setUser(newUser)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full">
        {selectedArticle ? (
          /* SINGLE NEWS DETAIL VIEW */
          <ArticleView
            article={selectedArticle}
            onBack={() => {
              setSelectedArticle(null);
              fetchArticles(); // refresh views
            }}
            user={user}
            onAddXP={handleAddXP}
            onToggleFavorite={handleToggleFavorite}
            onToggleBookmark={handleToggleBookmark}
            isFavorite={user.favorites.includes(selectedArticle.id)}
            isBookmarked={user.bookmarks.includes(selectedArticle.id)}
            adConfig={getAdConfig("article_in")}
          />
        ) : (
          /* TAB ROUTING */
          <>
            {activeTab === "inicio" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                
                {/* Spotlight Banner Slider */}
                {spotlightArticles.length > 0 && (
                  <HeroSlider 
                    articles={spotlightArticles} 
                    onSelectArticle={(art) => setSelectedArticle(art)} 
                  />
                )}

                {/* Adsense: Under Hero Slot */}
                {getAdConfig("home_hero_bottom")?.isActive && (
                  <div 
                    className="w-full" 
                    dangerouslySetInnerHTML={{ __html: getAdConfig("home_hero_bottom")!.code }} 
                  />
                )}

                {/* Sub layout: 2 columns (Left: Feed, Right: Widgets Sidebar) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: News Feed */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Filter and Search controls */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                      
                      {/* Category Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {["Tudo", "Anime", "Mangás", "Manhwa", "Jogos", "ESports", "Tecnologia"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition duration-300 border ${
                              selectedCategory === cat
                                ? "bg-ensa-orange border-ensa-orange text-white"
                                : "text-neutral-400 border-neutral-800 hover:border-neutral-700 bg-neutral-950/60"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Pesquisar notícias..."
                          className="bg-neutral-950 border border-neutral-800 text-white rounded-xl pl-9 pr-4 py-2 text-xs w-full sm:w-60 focus:outline-none focus:border-ensa-orange transition"
                        />
                      </div>

                    </div>

                    {/* Articles list */}
                    {filteredArticles.length === 0 ? (
                      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center text-neutral-400">
                        <Compass className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                        <p className="font-bold text-base">Nenhum artigo encontrado.</p>
                        <p className="text-xs text-neutral-500 mt-1">Experimenta alterar a categoria ou o termo de pesquisa!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredArticles.map((art, idx) => {
                          const isLarge = false;
                          return (
                            <div
                              key={art.id}
                              onClick={() => setSelectedArticle(art)}
                              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-ensa-orange transition-all duration-300 flex flex-col justify-between cursor-pointer"
                            >
                              <div>
                                <div className="h-44 relative overflow-hidden bg-neutral-950">
                                  <img
                                    src={art.coverImage}
                                    alt={art.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <span className="absolute top-3 left-3 bg-ensa-orange text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded uppercase">
                                    {art.category}
                                  </span>
                                  {art.isSponsored && (
                                    <span className="absolute top-3 right-3 bg-yellow-500 text-neutral-900 text-[9px] font-black tracking-wider px-2 py-0.5 rounded uppercase">
                                      Patrocinado
                                    </span>
                                  )}
                                </div>

                                <div className="p-4 sm:p-5">
                                  <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-semibold mb-2">
                                    <span>{new Date(art.createdAt).toLocaleDateString("pt-AO")}</span>
                                    <span>•</span>
                                    <span>{art.readTime} min</span>
                                  </div>
                                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-ensa-orange transition-colors leading-tight mb-2">
                                    {art.title}
                                  </h3>
                                  <p className="text-xs text-neutral-400 line-clamp-2">
                                    {art.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="p-4 sm:px-5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-bold">
                                <div className="flex items-center space-x-1.5">
                                  <UserAvatar
                                    avatarUrl={art.authorAvatar}
                                    alt={art.authorName}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <span className="truncate max-w-[80px]">{art.authorName}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className="flex items-center space-x-0.5">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{art.views}</span>
                                  </span>
                                  <span className="flex items-center space-x-0.5">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    <span>{art.likes}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Adsense: Inside Articles list */}
                    {getAdConfig("after_3_news")?.isActive && (
                      <div 
                        className="w-full" 
                        dangerouslySetInnerHTML={{ __html: getAdConfig("after_3_news")!.code }} 
                      />
                    )}

                  </div>

                  {/* Right Column: Sidebar Widgets */}
                  <div className="space-y-8">
                    
                    {/* Newsletter Signup widget card */}
                    <div className="bg-gradient-to-br from-ensa-orange to-ensa-red rounded-3xl p-6 shadow-xl text-center space-y-4">
                      <div className="p-3 bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-white">
                        <Mail className="w-6 h-6" />
                      </div>
                      
                      <div>
                        <h3 className="font-display text-2xl font-black text-white tracking-widest uppercase">Manto de Notícias</h3>
                        <p className="text-white/80 text-xs mt-1">Cria a tua inscrição e recebe as novidades exclusivas de Naruto e outros animes diretamente!</p>
                      </div>

                      {newsletterSubscribed ? (
                        <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-white font-bold text-xs flex items-center justify-center space-x-1.5 animate-pulse">
                          <Check className="w-4 h-4" />
                          <span>Já subscreveste com sucesso! (+20 XP)</span>
                        </div>
                      ) : (
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                          <input
                            type="email"
                            placeholder="Teu e-mail otaku..."
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            className="bg-white/20 text-white placeholder-white/60 border border-white/20 text-xs rounded-xl px-3 py-2.5 w-full focus:outline-none focus:bg-white/30"
                            required
                          />
                          <button
                            type="submit"
                            className="w-full bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-xs py-2.5 rounded-xl transition"
                          >
                            Subscrever Lista (+20 XP)
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Adsense: Sidebar Banner */}
                    {getAdConfig("sidebar")?.isActive && (
                      <div 
                        className="w-full" 
                        dangerouslySetInnerHTML={{ __html: getAdConfig("sidebar")!.code }} 
                      />
                    )}

                    {/* Releases bento tracker preview */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                        <h3 className="font-display text-lg font-black text-white tracking-wider flex items-center space-x-1.5">
                          <Calendar className="w-4.5 h-4.5 text-ensa-orange" />
                          <span>PRÓXIMOS LANÇAMENTOS</span>
                        </h3>
                        <button 
                          onClick={() => setActiveTab("wiki")}
                          className="text-[10px] text-ensa-orange font-bold hover:underline"
                        >
                          Ver tudo
                        </button>
                      </div>

                      <div className="space-y-3">
                        {articles.slice(0, 3).map((a) => (
                          <div 
                            key={a.id}
                            onClick={() => setSelectedArticle(a)}
                            className="flex items-center space-x-3 cursor-pointer p-1.5 rounded-lg hover:bg-neutral-950 transition"
                          >
                            <img
                              src={a.coverImage}
                              alt={a.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[8px] bg-ensa-red/15 text-ensa-red font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                {a.category}
                              </span>
                              <h4 className="text-white font-bold text-xs truncate mt-1 group-hover:text-ensa-orange transition">
                                {a.title}
                              </h4>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {activeTab === "wiki" && <WikiAndCalendar />}

            {activeTab === "comunidade" && (
              <QuizzesAndGamification user={user} onAddXP={handleAddXP} />
            )}

            {activeTab === "admin" && (
              <AdminPanel
                articles={articles}
                onRefreshArticles={fetchArticles}
                ads={ads}
                onRefreshAds={fetchAds}
                user={{ username: user.username, avatar: user.avatar }}
                onAddXP={(xp) => handleAddXP(xp)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer completo */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-10 mt-12 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-neutral-900 pb-8">
            
            {/* Colon 1: ENSA */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={logoImg}
                  alt="ENSA"
                  className="h-12 w-auto object-contain block"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = document.getElementById("ensa-footer-fallback");
                    if (fallback) {
                      fallback.style.display = "flex";
                      fallback.classList.remove("hidden");
                    }
                  }}
                />
                <div id="ensa-footer-fallback" className="hidden items-center space-x-2">
                  <span className="font-display text-2xl font-black text-white tracking-widest">ENSA</span>
                  <span className="bg-ensa-orange text-white text-[8px] font-bold px-1 py-0.5 rounded">ANGOLA</span>
                </div>
              </div>
              <p className="text-neutral-500 font-medium leading-relaxed font-sans">
                O maior portal Geek profissional de Angola, trazendo notícias, trailers, análises críticas e construindo a maior guilda otaku angolana.
              </p>
            </div>

            {/* Colon 2: Categorias */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-black text-white tracking-widest uppercase">Navegação</h4>
              <ul className="space-y-2 font-medium">
                <li><button onClick={() => { setActiveTab("inicio"); setSelectedArticle(null); }} className="hover:text-ensa-orange transition">Início / Notícias</button></li>
                <li><button onClick={() => { setActiveTab("wiki"); setSelectedArticle(null); }} className="hover:text-ensa-orange transition">Wiki de Heróis</button></li>
                <li><button onClick={() => { setActiveTab("comunidade"); setSelectedArticle(null); }} className="hover:text-ensa-orange transition">Quizzes & Gamificação</button></li>
                <li><button onClick={() => { setActiveTab("admin"); setSelectedArticle(null); }} className="hover:text-ensa-orange transition">Painel Administrativo</button></li>
              </ul>
            </div>

            {/* Colon 3: SEO sitemap / robots / rss links */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-black text-white tracking-widest uppercase">SEO & Links Úteis</h4>
              <ul className="space-y-2 font-mono text-[10px]">
                <li><a href="/sitemap.xml" target="_blank" className="hover:text-ensa-orange flex items-center space-x-1"><FileText className="w-3.5 h-3.5" /> <span>/sitemap.xml</span></a></li>
                <li><a href="/robots.txt" target="_blank" className="hover:text-ensa-orange flex items-center space-x-1"><FileText className="w-3.5 h-3.5" /> <span>/robots.txt</span></a></li>
                <li><a href="/feed.rss" target="_blank" className="hover:text-ensa-orange flex items-center space-x-1"><FileText className="w-3.5 h-3.5" /> <span>/feed.xml (RSS)</span></a></li>
                <li><a href="/schema.json-ld" target="_blank" className="hover:text-ensa-orange flex items-center space-x-1"><FileText className="w-3.5 h-3.5" /> <span>Schema JSON-LD</span></a></li>
              </ul>
            </div>

            {/* Colon 4: Community references */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-black text-white tracking-widest uppercase">Guilda ENSA</h4>
              <p className="text-neutral-500 font-medium">Junta-te à nossa comunidade no Discord ou WhatsApp e partilha as tuas teorias com milhares de ninjas.</p>
              <div className="flex space-x-3 pt-1">
                <span className="text-xs bg-neutral-900 border border-neutral-800 p-2 rounded-lg text-neutral-300 font-bold hover:text-white cursor-pointer transition">WhatsApp</span>
                <span className="text-xs bg-neutral-900 border border-neutral-800 p-2 rounded-lg text-neutral-300 font-bold hover:text-white cursor-pointer transition">Discord</span>
              </div>
            </div>

          </div>

          {/* Copyright and legal notices */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-600 font-semibold gap-3">
            <p>© 2026 ENSA - Explosão Naruto Shippuden em Angola. Todos os direitos reservados.</p>
            <div className="flex space-x-4">
              <span className="hover:text-neutral-400 cursor-pointer transition">Termos de Uso</span>
              <span>•</span>
              <span className="hover:text-neutral-400 cursor-pointer transition">Política de Privacidade</span>
              <span>•</span>
              <span className="hover:text-neutral-400 cursor-pointer transition">Definições de Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {/* COOKIE CONSENT BANNER (COMPATIBLE WITH GOOGLE CONSENT MODE V2) */}
      {cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/98 backdrop-blur-md border-t-2 border-ensa-orange p-4 sm:p-6 shadow-2xl animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-2 text-white font-bold text-sm sm:text-base">
                <ShieldAlert className="w-5 h-5 text-ensa-orange" />
                <span>Gestão de Consentimento de Cookies (Consent Mode v2)</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-4xl">
                Nós e terceiros selecionados utilizamos cookies ou tecnologias semelhantes para garantir o correto funcionamento do site, coletar métricas analíticas e exibir anúncios personalizados compatíveis com o Google AdSense e Google Analytics 4. Podes aceitar ou recusar estes tratamentos.
              </p>
            </div>

            <div className="flex items-center space-x-2.5 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => handleCookieConsent(false)}
                className="flex-1 md:flex-initial bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs px-4 py-2.5 rounded-xl transition"
              >
                Rejeitar
              </button>
              <button
                onClick={() => handleCookieConsent(true)}
                className="flex-1 md:flex-initial bg-ensa-orange hover:bg-ensa-orange/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-ensa-orange/10"
              >
                Aceitar Cookies
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
