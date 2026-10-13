import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, 
  Heart, Calendar, Clock, Eye, AlertTriangle, Send, Check, Play, HelpCircle
} from "lucide-react";
import { Article, Comment, GameUser } from "../types";
import UserAvatar from "./UserAvatar";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  user: GameUser;
  onAddXP: (points: number) => void;
  onToggleFavorite: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  isFavorite: boolean;
  isBookmarked: boolean;
  adConfig?: { code: string; isActive: boolean }; // Inline ad config
}

export default function ArticleView({
  article,
  onBack,
  user,
  onAddXP,
  onToggleFavorite,
  onToggleBookmark,
  isFavorite,
  isBookmarked,
  adConfig
}: ArticleViewProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [articleLikes, setArticleLikes] = useState(article.likes);
  const [revealSpoilers, setRevealSpoilers] = useState(!article.showSpoilers);
  const [commentAuthorName, setCommentAuthorName] = useState(user.username || "");

  // Fetch comments on mount/article change
  useEffect(() => {
    fetchComments();
    setLiked(false);
    setArticleLikes(article.likes);
    setRevealSpoilers(!article.showSpoilers);
  }, [article.id]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/articles/${article.id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (e) {
      console.error("Error fetching comments:", e);
    }
  };

  const handleLikeArticle = async () => {
    if (liked) return;
    try {
      const res = await fetch(`/api/articles/${article.id}/like`, { method: "POST" });
      if (res.ok) {
        setLiked(true);
        setArticleLikes((prev) => prev + 1);
        onAddXP(5); // +5 XP for liking!
      }
    } catch (e) {
      console.error("Error liking article:", e);
    }
  };

  const cleanProfanity = (text: string): string => {
    // Basic word filter for standard profanities
    const badWords = ["estúpido", "estupido", "estúpida", "lixo", "merda", "bosta", "caralho", "puta"];
    let cleaned = text;
    badWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      cleaned = cleaned.replace(regex, "****");
    });
    return cleaned;
  };

  const handlePostComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const content = parentId ? replyText : newCommentText;
    if (!content.trim()) return;

    if (!captchaChecked) {
      alert("Por favor, confirma que és um ninja humano (reCAPTCHA)!");
      return;
    }

    const filteredContent = cleanProfanity(content);

    try {
      const res = await fetch(`/api/articles/${article.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentId,
          authorName: commentAuthorName || "Otaku Anónimo",
          authorAvatar: user.avatar,
          authorBadge: user.level >= 5 ? "Otaku Master" : user.level >= 3 ? "Fã de Naruto" : "Membro do Clan",
          content: filteredContent
        })
      });

      if (res.ok) {
        if (parentId) {
          setReplyText("");
          setReplyingToId(null);
        } else {
          setNewCommentText("");
        }
        setCaptchaChecked(false); // Reset captcha
        fetchComments();
        onAddXP(15); // +15 XP for contributing a comment!
      }
    } catch (e) {
      console.error("Error posting comment:", e);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
      if (res.ok) fetchComments();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDislikeComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/dislike`, { method: "POST" });
      if (res.ok) fetchComments();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFlagComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/flag`, { method: "POST" });
      if (res.ok) {
        alert("Comentário denunciado aos moderadores do ENSA.");
        fetchComments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#article/${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract Youtube ID from URL
  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  const youtubeEmbed = getYoutubeEmbedUrl(article.youtubeUrl);

  // Group comments and replies
  const rootComments = comments.filter((c) => !c.parentId);
  const getRepliesFor = (id: string) => comments.filter((c) => c.parentId === id);

  // Render content paragraphs with custom spacing or spoiler blocks
  const renderParagraphs = () => {
    return article.content.split("\n\n").map((para, i) => {
      // Check if this paragraph contains the [SPOILER] tag
      if (para.includes("[SPOILER]")) {
        const cleanedPara = para.replace("[SPOILER]", "");
        return (
          <div 
            key={i} 
            className={`my-6 p-4 rounded-xl border transition-all duration-300 ${
              revealSpoilers 
                ? "bg-neutral-900 border-neutral-800 text-neutral-200" 
                : "bg-neutral-950 border-ensa-red/30 text-transparent select-none relative overflow-hidden"
            }`}
          >
            {!revealSpoilers && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/95 text-white p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-ensa-red mb-2 animate-bounce" />
                <p className="font-display text-lg font-bold text-ensa-red">CONTEÚDO SENSÍVEL / SPOILERS!</p>
                <p className="text-xs text-neutral-400 max-w-md mt-1">Este parágrafo contém spoilers da obra. Queres mesmo ler?</p>
                <button 
                  onClick={() => setRevealSpoilers(true)}
                  className="mt-3 bg-ensa-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
                >
                  Revelar Spoilers
                </button>
              </div>
            )}
            <span className={revealSpoilers ? "" : "blur-md select-none"}>{cleanedPara}</span>
          </div>
        );
      }

      return (
        <p key={i} className="text-neutral-300 leading-relaxed text-base sm:text-lg mb-6 whitespace-pre-line font-normal font-sans">
          {para}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-neutral-400 hover:text-white mb-6 group transition duration-300"
      >
        <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-sm">Voltar para notícias</span>
      </button>

      {/* Main Container */}
      <article className="bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl p-6 sm:p-10">
        
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <span className="bg-ensa-orange text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase">
              {article.category}
            </span>
            {article.subcategory && (
              <span className="bg-ensa-red text-white text-xs font-bold px-3 py-1 rounded-md tracking-wider uppercase">
                {article.subcategory}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-ensa-orange" />
            <span>{new Date(article.createdAt).toLocaleDateString("pt-AO", { day: "2-digit", month: "short", year: "numeric" })}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-wide mb-6">
          {article.title}
        </h1>

        {/* Author & Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <UserAvatar
              avatarUrl={article.authorAvatar}
              alt={article.authorName}
              className="w-11 h-11 rounded-full border-2 border-ensa-orange"
            />
            <div>
              <p className="text-white font-bold text-sm sm:text-base">{article.authorName}</p>
              <p className="text-neutral-400 text-xs font-medium">Equipa Editorial ENSA</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleLikeArticle}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                liked
                  ? "bg-ensa-orange/20 border-ensa-orange text-ensa-orange"
                  : "border-neutral-800 hover:border-neutral-600 text-neutral-300"
              }`}
              title="Gostar deste artigo"
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{articleLikes}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(article.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                isFavorite
                  ? "bg-ensa-orange text-white border-ensa-orange"
                  : "border-neutral-800 hover:border-neutral-600 text-neutral-300"
              }`}
              title="Adicionar aos favoritos"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{isFavorite ? "Favorito" : "Favoritar"}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                isBookmarked
                  ? "bg-ensa-red text-white border-ensa-red"
                  : "border-neutral-800 hover:border-neutral-600 text-neutral-300"
              }`}
              title="Guardar artigo"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{isBookmarked ? "Guardado" : "Salvar"}</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[240px] sm:h-[380px] md:h-[440px] rounded-2xl overflow-hidden mb-8 shadow-lg border border-neutral-800">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Reading time & Stats */}
        <div className="flex items-center space-x-6 text-xs text-neutral-400 font-semibold mb-6 bg-neutral-950 p-3 rounded-xl border border-neutral-800/50">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-ensa-orange" />
            <span>{article.readTime} min de leitura</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Eye className="w-4 h-4 text-ensa-orange" />
            <span>{article.views} Visualizações</span>
          </div>
          {article.showSpoilers && (
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-[10px] text-ensa-red font-bold uppercase tracking-widest bg-ensa-red/10 border border-ensa-red/20 px-2 py-0.5 rounded">Spoilers</span>
              <button 
                onClick={() => setRevealSpoilers(!revealSpoilers)}
                className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-white px-2 py-0.5 rounded font-bold uppercase transition"
              >
                {revealSpoilers ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none text-neutral-200">
          {renderParagraphs()}
        </div>

        {/* Embedded Video/Trailer if exists */}
        {youtubeEmbed && (
          <div className="my-8">
            <h3 className="font-display text-2xl font-black text-white tracking-wider mb-4 flex items-center space-x-2">
              <Play className="w-5 h-5 text-ensa-orange fill-current" />
              <span>Trailer / Vídeo Relacionado</span>
            </h3>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950">
              <iframe
                src={youtubeEmbed}
                title="Trailer Oficial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {/* Custom Ad Slot Inside Article */}
        {adConfig?.isActive && (
          <div 
            className="my-8" 
            dangerouslySetInnerHTML={{ __html: adConfig.code }} 
          />
        )}

        {/* Article tags */}
        <div className="flex flex-wrap gap-2 my-8 border-t border-b border-neutral-800/60 py-6">
          <span className="text-neutral-400 font-bold text-xs uppercase self-center mr-2">Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-neutral-800 hover:bg-ensa-orange hover:text-white transition-colors duration-300 text-neutral-300 text-xs px-3 py-1.5 rounded-lg border border-neutral-700/50 font-medium cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Sharing Toolbar */}
        <div className="bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-800 mb-8">
          <h4 className="font-display text-lg font-black text-white tracking-widest mb-3 uppercase flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-ensa-orange" />
            <span>Partilhar com a tua Guilda</span>
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#1ebd57] text-white text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <span>WhatsApp</span>
            </a>
            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#0088cc] hover:bg-[#0074ad] text-white text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <span>Telegram</span>
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#1877F2] hover:bg-[#145dbf] text-white text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <span>Facebook</span>
            </a>
            {/* X */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#111111] hover:bg-neutral-900 text-white text-xs font-bold px-3 py-2 rounded-xl border border-neutral-700 transition"
            >
              <span>X</span>
            </a>
            {/* Copy Link button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-neutral-700 transition ml-auto"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Copiado!" : "Copiar Link"}</span>
            </button>
          </div>
        </div>

        {/* DISQUS-LIKE NESTED COMMENTS SECTION */}
        <section id="comments-section" className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl font-black text-white tracking-widest flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-ensa-orange" />
              <span>COMENTÁRIOS ({comments.length})</span>
            </h3>
            <span className="text-xs text-neutral-400 font-medium">Discussão em tempo real</span>
          </div>

          {/* Comment input form */}
          <form onSubmit={(e) => handlePostComment(e)} className="bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-800 mb-8 space-y-4">
            <div className="flex gap-4 items-start">
              <UserAvatar
                avatarUrl={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full border border-neutral-700"
              />
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={commentAuthorName}
                    onChange={(e) => setCommentAuthorName(e.target.value)}
                    placeholder="O teu nome de ninja..."
                    className="bg-neutral-900 border border-neutral-800 text-white text-sm rounded-lg px-3 py-1.5 w-full sm:max-w-xs focus:outline-none focus:border-ensa-orange font-semibold"
                    required
                  />
                  <span className="text-[10px] text-neutral-500 self-center">Comentando como {user.username} (Level {user.level})</span>
                </div>
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Deixa o teu comentário, teoria ou desabafa aqui..."
                  className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl p-3 h-24 focus:outline-none focus:border-ensa-orange resize-none"
                  required
                />
              </div>
            </div>

            {/* Anti-spam validation container */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-neutral-900 pt-4 gap-3">
              {/* Simulated Recaptcha Box */}
              <div className="flex items-center space-x-3 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800">
                <input
                  type="checkbox"
                  id="recaptcha-check"
                  checked={captchaChecked}
                  onChange={(e) => setCaptchaChecked(e.target.checked)}
                  className="accent-ensa-orange w-4 h-4 cursor-pointer"
                />
                <label htmlFor="recaptcha-check" className="text-xs text-neutral-300 font-medium cursor-pointer select-none">
                  Eu sou um Humano (reCAPTCHA)
                </label>
              </div>

              <button
                type="submit"
                className="bg-ensa-orange hover:bg-ensa-orange/95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-ensa-orange/10 cursor-pointer self-end sm:self-auto"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Comentário (+15 XP)</span>
              </button>
            </div>
          </form>

          {/* Comments list container */}
          {rootComments.length === 0 ? (
            <div className="bg-neutral-950 rounded-2xl p-8 text-center border border-neutral-800/60">
              <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-neutral-400 text-sm font-semibold">Ninguém comentou ainda.</p>
              <p className="text-neutral-500 text-xs mt-1">Sê o primeiro a inaugurar a conversa nesta matéria!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rootComments.map((comment) => {
                const replies = getRepliesFor(comment.id);
                return (
                  <div key={comment.id} className="bg-neutral-950 rounded-2xl border border-neutral-800/80 p-4 sm:p-5 comment-card transition-colors">
                    {/* Header: Author Name, Avatar, Badges */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <UserAvatar
                          avatarUrl={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-9 h-9 rounded-full border border-neutral-700"
                        />
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="text-white font-bold text-sm">{comment.authorName}</span>
                            {comment.authorBadge && (
                              <span className="bg-ensa-orange/10 border border-ensa-orange/20 text-ensa-orange text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                                {comment.authorBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {new Date(comment.createdAt).toLocaleDateString("pt-AO")} às {new Date(comment.createdAt).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>

                      {/* Flag/Report */}
                      <button
                        onClick={() => handleFlagComment(comment.id)}
                        className="text-neutral-600 hover:text-ensa-red transition"
                        title="Denunciar Comentário"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <p className="text-neutral-300 text-sm mt-3 leading-relaxed font-sans pl-1">
                      {comment.content}
                    </p>

                    {/* Footer bar: Likes, Dislikes, Reply Action button */}
                    <div className="flex items-center space-x-4 mt-4 pl-1 text-xs text-neutral-500 font-bold">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center space-x-1 hover:text-white transition"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-neutral-600 hover:text-ensa-orange" />
                        <span>{comment.likes}</span>
                      </button>
                      <button
                        onClick={() => handleDislikeComment(comment.id)}
                        className="flex items-center space-x-1 hover:text-white transition"
                      >
                        <ThumbsDown className="w-3.5 h-3.5 text-neutral-600 hover:text-ensa-red" />
                        <span>{comment.dislikes}</span>
                      </button>

                      <button
                        onClick={() => setReplyingToId(comment.id)}
                        className="text-ensa-orange hover:underline transition"
                      >
                        Responder
                      </button>
                    </div>

                    {/* Reply Form */}
                    {replyingToId === comment.id && (
                      <form
                        onSubmit={(e) => handlePostComment(e, comment.id)}
                        className="mt-4 bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-3 pl-3"
                      >
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Responder a ${comment.authorName}...`}
                          className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs rounded-lg p-2 h-16 focus:outline-none focus:border-ensa-orange resize-none"
                          required
                        />
                        <div className="flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="text-neutral-400 hover:text-white text-xs font-semibold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="bg-ensa-orange hover:bg-ensa-orange/90 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                          >
                            Publicar Resposta
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Nested Replies Rendering */}
                    {replies.length > 0 && (
                      <div className="mt-4 ml-6 pl-4 border-l-2 border-neutral-800 space-y-4">
                        {replies.map((reply) => (
                          <div key={reply.id} className="bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/40">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2.5">
                                <UserAvatar
                                  avatarUrl={reply.authorAvatar}
                                  alt={reply.authorName}
                                  className="w-7 h-7 rounded-full border border-neutral-800"
                                />
                                <div>
                                  <div className="flex items-center space-x-1.5">
                                    <span className="text-white font-bold text-xs">{reply.authorName}</span>
                                    {reply.authorBadge && (
                                      <span className="bg-ensa-orange/10 border border-ensa-orange/20 text-ensa-orange text-[8px] font-black px-1 rounded">
                                        {reply.authorBadge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-neutral-500 font-mono">
                                    {new Date(reply.createdAt).toLocaleDateString("pt-AO")}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleFlagComment(reply.id)}
                                className="text-neutral-600 hover:text-ensa-red transition"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <p className="text-neutral-300 text-xs mt-2 pl-1 leading-relaxed font-sans">
                              {reply.content}
                            </p>

                            <div className="flex items-center space-x-3 mt-3 pl-1 text-[10px] text-neutral-500 font-bold">
                              <button
                                onClick={() => handleLikeComment(reply.id)}
                                className="flex items-center space-x-1 hover:text-white transition"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{reply.likes}</span>
                              </button>
                              <button
                                onClick={() => handleDislikeComment(reply.id)}
                                className="flex items-center space-x-1 hover:text-white transition"
                              >
                                <ThumbsDown className="w-3 h-3" />
                                <span>{reply.dislikes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </article>
    </div>
  );
}
