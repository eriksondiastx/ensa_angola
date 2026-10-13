import React, { useState, useEffect } from "react";
import { 
  Settings, LayoutDashboard, FileText, Sparkles, Newspaper, ShieldAlert, 
  Eye, ThumbsUp, MessageSquare, DollarSign, Plus, Edit2, Trash2, Save, 
  Sliders, Download, Check, AlertCircle, RefreshCw, Send, Lock
} from "lucide-react";
import { Article, AdConfig, AuditLog, AnalyticsStats } from "../types";

interface AdminPanelProps {
  articles: Article[];
  onRefreshArticles: () => void;
  ads: AdConfig[];
  onRefreshAds: () => void;
  user: { username: string; avatar: string };
  onAddXP: (points: number) => void;
}

export default function AdminPanel({
  articles,
  onRefreshArticles,
  ads,
  onRefreshAds,
  user,
  onAddXP
}: AdminPanelProps) {
  const [adminTab, setAdminTab] = useState<"dashboard" | "editorial" | "ads" | "newsletter" | "logs">("dashboard");
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Editor states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "Anime",
    subcategory: "",
    tags: "",
    coverImage: "",
    youtubeUrl: "",
    readTime: 4,
    isDraft: false,
    showSpoilers: false
  });

  // Ads form state
  const [adsData, setAdsData] = useState<AdConfig[]>([]);

  // AI assistant state
  const [aiAction, setAiAction] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  useEffect(() => {
    fetchStats();
    fetchLogs();
    setAdsData(ads);
  }, [ads]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateNewArticleClick = () => {
    setIsNewArticle(true);
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      summary: "",
      content: "",
      category: "Anime",
      subcategory: "",
      tags: "",
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200",
      youtubeUrl: "",
      readTime: 4,
      isDraft: false,
      showSpoilers: false
    });
    setAiResult("");
  };

  const handleEditArticleClick = (article: Article) => {
    setIsNewArticle(false);
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      content: article.content,
      category: article.category,
      subcategory: article.subcategory || "",
      tags: article.tags.join(", "),
      coverImage: article.coverImage,
      youtubeUrl: article.youtubeUrl || "",
      readTime: article.readTime,
      isDraft: article.isDraft,
      showSpoilers: !!article.showSpoilers
    });
    setAiResult("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: parsedValue };
      // Auto slugify title if name is title
      if (name === "title" && !editingArticle) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const articlePayload = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      authorName: user.username,
      authorAvatar: user.avatar
    };

    try {
      const url = isNewArticle ? "/api/articles" : `/api/articles/${editingArticle?.id}`;
      const method = isNewArticle ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articlePayload)
      });

      if (res.ok) {
        onRefreshArticles();
        setIsNewArticle(false);
        setEditingArticle(null);
        fetchStats();
        fetchLogs();
        onAddXP(50); // Admin XP for publishing!
        alert("Matéria guardada com sucesso no portal ENSA!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Tens a certeza que desejas excluir esta notícia do portal?")) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        onRefreshArticles();
        fetchStats();
        fetchLogs();
        alert("Notícia excluída.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveAds = async () => {
    try {
      const res = await fetch("/api/admin/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ads: adsData })
      });
      if (res.ok) {
        onRefreshAds();
        fetchLogs();
        alert("Configurações do Google AdSense atualizadas com sucesso!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdToggle = (index: number) => {
    setAdsData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isActive: !updated[index].isActive };
      return updated;
    });
  };

  const handleAdCodeChange = (index: number, code: string) => {
    setAdsData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], code };
      return updated;
    });
  };

  // ---------------------------------------------------------------------------
  // CALL SERVER-SIDE GEMINI AI CO-WRITER ASSISTANT
  // ---------------------------------------------------------------------------
  const handleAICall = async (action: string) => {
    setAiAction(action);
    setAiLoading(true);
    setAiResult("");

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          text: formData.content,
          title: formData.title,
          category: formData.category
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data.result);
        
        // If action is tag generation, we can inject directly
        if (action === "tags-category" && data.tags) {
          setFormData(prev => ({
            ...prev,
            category: data.category || prev.category,
            tags: data.tags.join(", ")
          }));
        }
      } else {
        setAiResult("Infelizmente o assistente não conseguiu analisar o rascunho neste momento.");
      }
    } catch (e) {
      console.error(e);
      setAiResult("Erro ao conectar com o serviço de Inteligência Artificial.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAITitle = (title: string) => {
    // extract clean title from numbered list
    const cleaned = title.replace(/^\d+\.\s+["']?/, "").replace(/["']?$/, "");
    setFormData(prev => ({
      ...prev,
      title: cleaned,
      slug: cleaned.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    }));
  };

  const handleApplyAISummary = (summary: string) => {
    setFormData(prev => ({ ...prev, summary }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-wider flex items-center space-x-2.5">
            <Settings className="w-8 h-8 text-ensa-orange" />
            <span>PAINEL EDITORIAL E ADMISTRATIVO</span>
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Controlo de publicações, monetização Google AdSense, estatísticas de acessos e assistente de IA.
          </p>
        </div>

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-1 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "editorial", label: "Editorial (Postes)", icon: Newspaper },
            { id: "ads", label: "Publicidade (Ads)", icon: DollarSign },
            { id: "newsletter", label: "Subscritores", icon: Download },
            { id: "logs", label: "Auditoria (Logs)", icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setAdminTab(tab.id as any);
                  setEditingArticle(null);
                  setIsNewArticle(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isSel 
                    ? "bg-ensa-orange text-white" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          TAB: DASHBOARD ANALYTICS
          ----------------------------------------------------------------------- */}
      {adminTab === "dashboard" && stats && (
        <div className="space-y-8">
          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
              <div className="p-3 bg-ensa-orange/10 rounded-xl text-ensa-orange">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Acessos Totais</span>
                <span className="font-mono text-2xl font-black text-white">{stats.totalViews}</span>
                <span className="text-[9px] text-green-400 font-semibold block mt-0.5">+15% vs semana pass</span>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
              <div className="p-3 bg-ensa-red/10 rounded-xl text-ensa-red">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Curtidas Totais</span>
                <span className="font-mono text-2xl font-black text-white">{stats.totalLikes}</span>
                <span className="text-[9px] text-green-400 font-semibold block mt-0.5">Engajamento ótimo</span>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Receita Adsense</span>
                <span className="font-mono text-2xl font-black text-white">${stats.adsRevenue.toFixed(2)}</span>
                <span className="text-[9px] text-ensa-orange font-bold block mt-0.5">CTR médio: {stats.ctr}%</span>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">Comentários</span>
                <span className="font-mono text-2xl font-black text-white">{stats.totalComments}</span>
                <span className="text-[9px] text-neutral-400 font-semibold block mt-0.5">Comunidade ativa</span>
              </div>
            </div>
          </div>

          {/* Visual Chart Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Trend line bar chart */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:col-span-2">
              <h3 className="font-display text-xl font-bold text-white tracking-wider mb-4">GRÁFICO DE ACESSOS DIÁRIOS (VIEWS)</h3>
              
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/60">
                {/* Simulated bar chart with Tailwind */}
                <div className="flex items-end justify-between h-48 pt-6">
                  {stats.dailyViews.map((day) => {
                    const maxVal = Math.max(...stats.dailyViews.map(d => d.views));
                    const percent = Math.round((day.views / maxVal) * 100);
                    return (
                      <div key={day.date} className="flex flex-col items-center flex-1 group">
                        <span className="text-[9px] font-mono text-ensa-orange font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-1">{day.views}</span>
                        <div 
                          className="w-5 sm:w-8 bg-gradient-to-t from-ensa-red to-ensa-orange rounded-t-md hover:from-ensa-orange hover:to-yellow-500 transition-all duration-500"
                          style={{ height: `${Math.max(percent, 8)}%` }}
                        />
                        <span className="text-[9px] font-mono text-neutral-500 mt-2">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Category distribution */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
              <h3 className="font-display text-xl font-bold text-white tracking-wider mb-4">VIEWS POR CATEGORIA</h3>
              
              <div className="space-y-4">
                {Object.entries(stats.viewsByCategory).map(([category, count]) => {
                  const maxVal = Math.max(...(Object.values(stats.viewsByCategory) as number[]));
                  const percent = maxVal > 0 ? Math.round(((count as number) / maxVal) * 100) : 0;
                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-neutral-300">
                        <span>{category}</span>
                        <span className="font-mono text-ensa-orange">{count} views</span>
                      </div>
                      <div className="relative w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800/40">
                        <div 
                          className="absolute h-full bg-ensa-orange rounded-full transition-all" 
                          style={{ width: `${percent}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB: EDITORIAL / WRITER (ARTICLES LIST OR ADD/EDIT FORM)
          ----------------------------------------------------------------------- */}
      {adminTab === "editorial" && (
        <div>
          {!editingArticle && !isNewArticle ? (
            /* LIST VIEWS */
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <h2 className="font-display text-2xl font-black text-white tracking-wider">MATÉRIAS PUBLICADAS</h2>
                <button
                  onClick={handleCreateNewArticleClick}
                  className="bg-ensa-orange hover:bg-ensa-orange/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-ensa-orange/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Artigo</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-bold">
                      <th className="py-3 px-2">Título</th>
                      <th className="py-3 px-2">Categoria</th>
                      <th className="py-3 px-2">Autor</th>
                      <th className="py-3 px-2">Acessos</th>
                      <th className="py-3 px-2">Estado</th>
                      <th className="py-3 px-2 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/40">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-neutral-950/40 transition">
                        <td className="py-4 px-2 font-semibold text-white max-w-xs truncate">{art.title}</td>
                        <td className="py-4 px-2 text-neutral-300">
                          <span className="bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{art.category}</span>
                        </td>
                        <td className="py-4 px-2 text-neutral-300">{art.authorName}</td>
                        <td className="py-4 px-2 font-mono text-ensa-orange font-bold">{art.views}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            art.isDraft 
                              ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500" 
                              : "bg-green-500/10 border border-green-500/20 text-green-500"
                          }`}>
                            {art.isDraft ? "Rascunho" : "Ativo"}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleEditArticleClick(art)}
                            className="p-1.5 bg-neutral-800 hover:bg-ensa-orange text-neutral-300 hover:text-white rounded transition"
                            title="Editar Artigo"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 bg-neutral-800 hover:bg-ensa-red text-neutral-300 hover:text-white rounded transition"
                            title="Excluir Artigo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* CREATE / EDIT FORM - CO-WRITER ASSISTED BY GEMINI AI */
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Form Composer column */}
              <div className="xl:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                  <h2 className="font-display text-2xl font-black text-white tracking-wider">
                    {isNewArticle ? "CRIAR NOVA MATÉRIA" : "EDITAR MATÉRIA"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsNewArticle(false);
                      setEditingArticle(null);
                    }}
                    className="text-neutral-400 hover:text-white text-xs font-bold border border-neutral-800 px-3 py-1.5 rounded-lg"
                  >
                    Voltar
                  </button>
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-6">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Título do Artigo</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Como o Solo Leveling conquistou os fãs de Angola..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-ensa-orange"
                      required
                    />
                  </div>

                  {/* Slug & Read Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Slug URL (Automático)</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="como-solo-leveling-conquistou-angola"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-ensa-orange"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Tempo de Leitura (min)</label>
                      <input
                        type="number"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-ensa-orange"
                        required
                      />
                    </div>
                  </div>

                  {/* Category & Subcategory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Categoria Principal</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-ensa-orange"
                      >
                        <option value="Anime">Anime</option>
                        <option value="Mangás">Mangás</option>
                        <option value="Manhwa">Manhwa</option>
                        <option value="Jogos">Jogos</option>
                        <option value="ESports">ESports</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Eventos">Eventos</option>
                        <option value="Cosplay">Cosplay</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Subcategoria (Opcional)</label>
                      <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        placeholder="Ex: Naruto, Solo Leveling, Free Fire"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-ensa-orange"
                      />
                    </div>
                  </div>

                  {/* Summary / Meta description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Resumo do Artigo (Meta Description)</label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Breve resumo cativante para a lista de notícias e SEO do Google..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white text-sm h-16 focus:outline-none focus:border-ensa-orange resize-none"
                    />
                  </div>

                  {/* Article Content / Body */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Corpo do Artigo (Markdown Suportado)</label>
                      <span className="text-[10px] text-neutral-500 font-mono">Podes incluir [SPOILER] no início do parágrafo para ocultá-lo!</span>
                    </div>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Escreve o artigo completo aqui..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white text-sm font-sans h-80 focus:outline-none focus:border-ensa-orange"
                      required
                    />
                  </div>

                  {/* Cover Image URL & Youtube Video Trailer URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">URL Imagem de Capa</label>
                      <input
                        type="text"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-ensa-orange font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">URL Vídeo do YouTube (Trailer - Opcional)</label>
                      <input
                        type="text"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                        placeholder="Ex: https://www.youtube.com/watch?v=..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-ensa-orange font-mono"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Tags (separadas por vírgula)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="naruto, angola, luanda, otaku, shippuden"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-ensa-orange"
                    />
                  </div>

                  {/* Status switches: Draft, Spoiler protection */}
                  <div className="flex flex-wrap gap-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800/60">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="isDraft"
                        name="isDraft"
                        checked={formData.isDraft}
                        onChange={handleInputChange}
                        className="accent-ensa-orange w-4.5 h-4.5 cursor-pointer"
                      />
                      <label htmlFor="isDraft" className="text-xs font-bold text-neutral-300 uppercase tracking-wider cursor-pointer">
                        Guardar como Rascunho (Não público)
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="showSpoilers"
                        name="showSpoilers"
                        checked={formData.showSpoilers}
                        onChange={handleInputChange}
                        className="accent-ensa-red w-4.5 h-4.5 cursor-pointer"
                      />
                      <label htmlFor="showSpoilers" className="text-xs font-bold text-neutral-300 uppercase tracking-wider cursor-pointer">
                        Este artigo contém spoilers sensíveis
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ensa-orange hover:bg-ensa-orange/95 text-white font-bold py-3.5 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-ensa-orange/10 cursor-pointer"
                  >
                    <Save className="w-5 h-5" />
                    <span>{loading ? "A guardar..." : "Publicar Matéria no Portal ENSA (+50 XP)"}</span>
                  </button>

                </form>
              </div>

              {/* CO-WRITER ASSISTANT BOX: GEMINI POWERED */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl h-fit space-y-6">
                <div>
                  <h3 className="font-display text-xl font-black text-white tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-ensa-orange animate-pulse" />
                    <span>ASSISTENTE CO-AUTOR IA</span>
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1">Otimiza os teus artigos para SEO local utilizando inteligência artificial.</p>
                </div>

                {/* Quick actions buttons list */}
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleAICall("suggest-titles")}
                    disabled={aiLoading}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center space-x-2"
                  >
                    <span>🤖</span>
                    <span>Sugerir Títulos Chamativos</span>
                  </button>

                  <button
                    onClick={() => handleAICall("summarize-seo")}
                    disabled={aiLoading}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center space-x-2"
                  >
                    <span>📝</span>
                    <span>Gerar Resumo SEO (Description)</span>
                  </button>

                  <button
                    onClick={() => handleAICall("tags-category")}
                    disabled={aiLoading}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center space-x-2"
                  >
                    <span>🏷️</span>
                    <span>Sugerir Categoria & Tags</span>
                  </button>

                  <button
                    onClick={() => handleAICall("correct-grammar")}
                    disabled={aiLoading}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center space-x-2"
                  >
                    <span>✨</span>
                    <span>Melhorar Gramática do Texto</span>
                  </button>

                  <button
                    onClick={() => handleAICall("seo-audit")}
                    disabled={aiLoading}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 py-2 px-3 rounded-xl text-xs font-bold text-left transition flex items-center space-x-2"
                  >
                    <span>🔍</span>
                    <span>Auditoria Rápida de SEO</span>
                  </button>
                </div>

                {/* AI Outputs container */}
                {aiAction && (
                  <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                      <span className="text-[10px] text-ensa-orange font-bold uppercase tracking-widest">
                        Resultado: {aiAction.replace("-", " ")}
                      </span>
                      {aiLoading && <RefreshCw className="w-3.5 h-3.5 text-ensa-orange animate-spin" />}
                    </div>

                    {aiLoading ? (
                      <p className="text-xs text-neutral-500 italic animate-pulse">A IA do ENSA está a ler o teu texto...</p>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-xs text-neutral-300 whitespace-pre-line leading-relaxed font-mono bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                          {aiResult}
                        </div>

                        {/* Integration buttons for fast apply */}
                        {aiAction === "suggest-titles" && (
                          <div className="space-y-1.5">
                            <span className="text-[9px] text-neutral-500 font-bold uppercase">Aplicar Título:</span>
                            {aiResult.split("\n").filter(line => /^\d+\./.test(line)).map((line, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleApplyAITitle(line)}
                                className="w-full bg-neutral-900 hover:bg-ensa-orange/20 text-neutral-200 hover:text-ensa-orange text-[10px] font-bold p-1.5 rounded text-left border border-neutral-800 transition truncate block"
                              >
                                {line}
                              </button>
                            ))}
                          </div>
                        )}

                        {aiAction === "summarize-seo" && (
                          <button
                            type="button"
                            onClick={() => handleApplyAISummary(aiResult)}
                            className="w-full bg-ensa-orange hover:bg-ensa-orange/90 text-white font-bold text-[10px] py-1.5 px-3 rounded transition"
                          >
                            Aplicar como Resumo
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          )}
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB: PUBLICIDADE GOOGLE ADSENSE SLOTS
          ----------------------------------------------------------------------- */}
      {adminTab === "ads" && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="font-display text-2xl font-black text-white tracking-wider">GESTÃO PUBLICITÁRIA (GOOGLE ADSENSE)</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">Configura os espaços de anúncios oficiais para rentabilizar o portal.</p>
          </div>

          <div className="space-y-6">
            {adsData.map((ad, idx) => (
              <div key={ad.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row gap-4 items-start">
                
                {/* Switch labels */}
                <div className="md:w-1/4 space-y-1">
                  <span className="text-xs bg-ensa-orange/10 border border-ensa-orange/20 text-ensa-orange font-bold uppercase px-2 py-0.5 rounded tracking-wider">
                    Slot {ad.id}
                  </span>
                  <h3 className="text-white font-bold text-sm uppercase mt-1.5">{ad.slotName.replace(/_/g, " ")}</h3>
                  <p className="text-neutral-500 text-[10px]">Visível nas áreas estratégicas</p>
                  
                  {/* Toggle switch */}
                  <div className="pt-3">
                    <button
                      onClick={() => handleAdToggle(idx)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        ad.isActive ? "bg-ensa-orange" : "bg-neutral-800"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          ad.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-xs text-neutral-300 font-bold ml-2 self-center align-middle">
                      {ad.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>

                {/* Textarea code */}
                <div className="flex-1 w-full space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Código de Inserção AdSense / HTML</label>
                  <textarea
                    value={ad.code}
                    onChange={(e) => handleAdCodeChange(idx, e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-300 text-xs font-mono h-24 focus:outline-none focus:border-ensa-orange"
                    placeholder="<!-- Insira o código Adsense aqui -->"
                  />
                </div>

              </div>
            ))}

            <button
              onClick={handleSaveAds}
              className="bg-ensa-orange hover:bg-ensa-orange/95 text-white font-bold py-3 px-6 rounded-xl transition duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-ensa-orange/10"
            >
              <Save className="w-5 h-5" />
              <span>Guardar Configurações AdSense</span>
            </button>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB: NEWSLETTER EXPORTER
          ----------------------------------------------------------------------- */}
      {adminTab === "newsletter" && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex p-4 bg-ensa-orange/10 border border-ensa-orange/20 rounded-full text-ensa-orange">
            <Download className="w-12 h-12" />
          </div>
          
          <div>
            <h2 className="font-display text-3xl font-black text-white tracking-widest uppercase">Exportar Subscritores</h2>
            <p className="text-neutral-400 text-sm mt-1">Exporta a tua lista de inscritos para Mailchimp, Brevo ou Excel.</p>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/60 font-mono text-xs text-left max-w-md mx-auto">
            <p className="text-neutral-400 mb-2">// Instruções</p>
            <p className="text-neutral-300">1. Clica no botão abaixo para descarregar o ficheiro CSV.</p>
            <p className="text-neutral-300">2. Importa o ficheiro no Brevo ou Mailchimp.</p>
            <p className="text-neutral-300">3. Envia newsletters com novos animes e spoilers!</p>
          </div>

          <a
            href="/api/admin/newsletter/export"
            className="inline-flex items-center space-x-2 bg-ensa-orange hover:bg-ensa-orange/95 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-lg shadow-ensa-orange/10 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Descarregar Lista CSV</span>
          </a>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB: SECURITY AUDIT LOGS
          ----------------------------------------------------------------------- */}
      {adminTab === "logs" && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="font-display text-2xl font-black text-white tracking-wider">REGISTOS DE AUDITORIA (LOGS)</h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">Logs automáticos de operações e alterações feitas no portal.</p>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="bg-neutral-800 text-neutral-300 text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase">
                      {log.action}
                    </span>
                    <span className="text-xs text-white font-bold">{log.user}</span>
                  </div>
                  <p className="text-neutral-400 text-xs">{log.details}</p>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono flex-shrink-0">
                  {new Date(log.timestamp).toLocaleString("pt-AO")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
