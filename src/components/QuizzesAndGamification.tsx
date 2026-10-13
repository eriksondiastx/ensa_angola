import React, { useState, useEffect } from "react";
import { Trophy, Award, CheckCircle, XCircle, Heart, Star, Sparkles, Send, Vote } from "lucide-react";
import { Quiz, GameUser } from "../types";
import { BADGES } from "../data/staticData";

interface QuizzesAndGamificationProps {
  user: GameUser;
  onAddXP: (points: number, badgeToUnlock?: string) => void;
}

export default function QuizzesAndGamification({ user, onAddXP }: QuizzesAndGamificationProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  
  // Quiz taking state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Poll state (simulated local persistence)
  const [voted, setVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState({ madara: 1420, jinwoo: 1350 });

  // Mock leaderboard
  const LEADERBOARD = [
    { rank: 1, name: "Kiluanji_Otaku", level: 12, points: 1180, title: "Hokage de Luanda" },
    { rank: 2, name: "Catarina Uchiha", level: 9, points: 920, title: "Sannin Lendária" },
    { rank: 3, name: "Yuri_Monarca", level: 7, points: 740, title: "Caçador de Elite" },
    { rank: 4, name: user.username, level: user.level, points: user.points, title: user.level >= 5 ? "Otaku Master" : "Chūnin de Angola", isSelf: true },
    { rank: 5, name: "Januário_Nara", level: 5, points: 490, title: "Estrategista" }
  ].sort((a, b) => b.points - a.points);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("/api/quizzes");
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data);
      }
    } catch (e) {
      console.error("Error fetching quizzes:", e);
    }
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSubmit = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === selectedQuiz!.questions[currentQuestionIdx].correctAnswerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIdx(null);
    setIsAnswered(false);

    if (currentQuestionIdx + 1 < selectedQuiz!.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Give points to the user based on performance
      const finalScore = score + (selectedOptionIdx === selectedQuiz!.questions[currentQuestionIdx].correctAnswerIndex ? 1 : 0);
      const xpEarned = finalScore * 25; // 25 XP per correct answer!
      
      // Determine if they earned the perfect score and the Fã de Naruto badge
      let unlockedBadge = undefined;
      if (finalScore === selectedQuiz!.questions.length && selectedQuiz!.category === "Naruto") {
        unlockedBadge = "Fã de Naruto";
      }

      onAddXP(xpEarned, unlockedBadge);
    }
  };

  const handleVote = (candidate: "madara" | "jinwoo") => {
    if (voted) return;
    setPollVotes((prev) => ({
      ...prev,
      [candidate]: prev[candidate] + 1
    }));
    setVoted(true);
    onAddXP(10); // +10 XP for participating in the community poll!
  };

  const totalPollVotes = pollVotes.madara + pollVotes.jinwoo;
  const madaraPercent = Math.round((pollVotes.madara / totalPollVotes) * 100);
  const jinwooPercent = Math.round((pollVotes.jinwoo / totalPollVotes) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Intro section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-wider mb-3">
          SALA DE TREINO & COMUNIDADE
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-normal">
          Testa os teus conhecimentos, ganha insígnias e alcança o topo da Guilda ENSA. Deixa o teu voto nas enquetes diárias.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER: Quizzes Zone */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="font-display text-2xl font-black text-white tracking-widest mb-6 flex items-center space-x-2.5">
              <Star className="w-5 h-5 text-ensa-orange fill-current" />
              <span>DESAFIOS & QUIZZES GEES</span>
            </h2>

            {selectedQuiz ? (
              /* Active Quiz Stage */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{selectedQuiz.title}</h3>
                    <span className="text-xs text-ensa-orange font-bold uppercase tracking-widest">{selectedQuiz.category}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedQuiz(null)}
                    className="text-neutral-400 hover:text-white text-xs font-bold border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-lg"
                  >
                    Sair do Quiz
                  </button>
                </div>

                {!quizFinished ? (
                  /* Running Quiz Question */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                      <span>Pergunta {currentQuestionIdx + 1} de {selectedQuiz.questions.length}</span>
                      <span>Pontos Atuais: {score}</span>
                    </div>

                    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800/60">
                      <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
                        {selectedQuiz.questions[currentQuestionIdx].questionText}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {selectedQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
                        const isCorrectAnswer = idx === selectedQuiz.questions[currentQuestionIdx].correctAnswerIndex;
                        const isSelected = idx === selectedOptionIdx;
                        
                        let optionStyle = "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:bg-neutral-800 hover:text-white";
                        if (isAnswered) {
                          if (isCorrectAnswer) {
                            optionStyle = "border-green-500 bg-green-500/10 text-green-400";
                          } else if (isSelected) {
                            optionStyle = "border-ensa-red bg-ensa-red/10 text-ensa-red";
                          } else {
                            optionStyle = "border-neutral-900 bg-neutral-950/20 text-neutral-500 cursor-not-allowed";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSubmit(idx)}
                            disabled={isAnswered}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-semibold transition-all duration-300 ${optionStyle}`}
                          >
                            <span>{option}</span>
                            {isAnswered && isCorrectAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                            )}
                            {isAnswered && isSelected && !isCorrectAnswer && (
                              <XCircle className="w-5 h-5 text-ensa-red flex-shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-ensa-orange hover:bg-ensa-orange/90 text-white font-bold py-3 rounded-xl transition duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>{currentQuestionIdx + 1 === selectedQuiz.questions.length ? "Finalizar Quiz" : "Próxima Pergunta"}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Quiz Finish Summary Screen */
                  <div className="text-center py-8 space-y-6">
                    <div className="inline-flex p-4 bg-ensa-orange/10 border border-ensa-orange/20 rounded-full text-ensa-orange animate-bounce">
                      <Trophy className="w-16 h-16" />
                    </div>
                    
                    <div>
                      <h4 className="font-display text-3xl font-black text-white">CONCLUÍDO COM SUCESSO!</h4>
                      <p className="text-neutral-400 text-sm mt-1">Quiz de {selectedQuiz.title}</p>
                    </div>

                    <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 max-w-sm mx-auto">
                      <p className="text-neutral-400 text-xs uppercase tracking-widest font-bold">A tua pontuação</p>
                      <p className="font-display text-5xl font-black text-ensa-orange my-1">
                        {score} / {selectedQuiz.questions.length}
                      </p>
                      <p className="text-xs text-neutral-300 mt-2">
                        Ganhaste <span className="text-green-400 font-bold font-mono">+{score * 25} XP</span> para o teu perfil!
                      </p>
                      {score === selectedQuiz.questions.length && (
                        <p className="text-[10px] bg-ensa-orange/10 border border-ensa-orange/20 text-ensa-orange font-bold uppercase tracking-wider px-2 py-1 rounded mt-3">
                          🏆 Insígnia Especial Desbloqueada!
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedQuiz(null)}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition"
                    >
                      Voltar para Quizzes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quizzes selection view */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className="group relative bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-ensa-orange transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={quiz.coverImage}
                        alt={quiz.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-3 left-3 bg-ensa-orange text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                        {quiz.category}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                      <div>
                        <h3 className="text-white font-bold text-base line-clamp-1 group-hover:text-ensa-orange transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-neutral-400 text-xs line-clamp-2 mt-1">
                          {quiz.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleStartQuiz(quiz)}
                        className="w-full bg-neutral-900 group-hover:bg-ensa-orange text-neutral-300 group-hover:text-white font-bold text-xs py-2 rounded-lg transition-colors border border-neutral-800 group-hover:border-ensa-orange"
                      >
                        Iniciar Desafio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Community Poll */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="font-display text-2xl font-black text-white tracking-widest mb-4 flex items-center space-x-2">
              <Vote className="w-5 h-5 text-ensa-orange" />
              <span>ENQUETE DA GUILDA DE HOJE</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6">
              Quem venceria num confronto supremo de titãs? Vota e ganha <span className="text-ensa-orange font-bold font-mono">+10 XP</span>!
            </p>

            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80 space-y-6">
              <div className="text-center font-display text-xl sm:text-2xl font-black text-white tracking-wider">
                MADARA UCHIHA VS SUNG JINWOO
              </div>

              {!voted ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleVote("madara")}
                    className="bg-ensa-red/10 border border-ensa-red/30 hover:border-ensa-red hover:bg-ensa-red/20 text-white font-bold p-4 rounded-xl transition flex flex-col items-center justify-center space-y-1.5"
                  >
                    <span className="text-sm">Madara Uchiha</span>
                    <span className="text-[10px] text-neutral-400">O Lendário Rival de Hashirama</span>
                  </button>
                  <button
                    onClick={() => handleVote("jinwoo")}
                    className="bg-ensa-orange/10 border border-ensa-orange/30 hover:border-ensa-orange hover:bg-ensa-orange/20 text-white font-bold p-4 rounded-xl transition flex flex-col items-center justify-center space-y-1.5"
                  >
                    <span className="text-sm">Sung Jinwoo</span>
                    <span className="text-[10px] text-neutral-400">O Absoluto Monarca das Sombras</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Results bars */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-neutral-300">
                      <span>Madara Uchiha (Clã Uchiha)</span>
                      <span>{madaraPercent}% ({pollVotes.madara} votos)</span>
                    </div>
                    <div className="relative w-full h-3 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-ensa-red rounded-full transition-all duration-1000" style={{ width: `${madaraPercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-neutral-300">
                      <span>Sung Jinwoo (Monarca)</span>
                      <span>{jinwooPercent}% ({pollVotes.jinwoo} votos)</span>
                    </div>
                    <div className="relative w-full h-3 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-ensa-orange rounded-full transition-all duration-1000" style={{ width: `${jinwooPercent}%` }} />
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-neutral-500 font-mono pt-2">
                    Total de {totalPollVotes} votos. Obrigado pela participação! (+10 XP adicionado)
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Badges Inventory & Leaderboards */}
        <div className="space-y-8">
          
          {/* Unlocked Badges Container */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="font-display text-2xl font-black text-white tracking-widest mb-6 flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-ensa-orange" />
              <span>MINHAS CONQUISTAS</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((badge) => {
                const isUnlocked = user.badges.includes(badge.name);
                return (
                  <div 
                    key={badge.name}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                      isUnlocked 
                        ? "bg-neutral-950 border-ensa-orange/30 text-white shadow-lg" 
                        : "bg-neutral-950/40 border-neutral-800 text-neutral-600 grayscale"
                    }`}
                    title={badge.description}
                  >
                    <span className={`text-2xl mb-1.5 ${isUnlocked ? "animate-pulse" : ""}`}>{badge.icon}</span>
                    <span className="text-[10px] font-bold truncate w-full">{badge.name}</span>
                    <span className="text-[8px] text-neutral-500 mt-1 line-clamp-1">{isUnlocked ? "Desbloqueado" : "Bloqueado"}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ranking / Leaderboard Ladder */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
            <h2 className="font-display text-2xl font-black text-white tracking-widest mb-4 flex items-center space-x-2.5">
              <Trophy className="w-5 h-5 text-ensa-orange" />
              <span>RANKING DA GUILDA</span>
            </h2>
            <p className="text-neutral-400 text-xs mb-6">Os guerreiros com mais pontuação em Angola.</p>

            <div className="space-y-3">
              {LEADERBOARD.map((gamer) => (
                <div 
                  key={gamer.name}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    gamer.isSelf
                      ? "bg-ensa-orange/10 border-ensa-orange text-white"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-mono text-xs font-black w-5 text-center ${
                      gamer.rank === 1 ? "text-yellow-500" : gamer.rank === 2 ? "text-neutral-400" : gamer.rank === 3 ? "text-amber-600" : "text-neutral-500"
                    }`}>
                      #{gamer.rank}
                    </span>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm truncate max-w-[100px]">{gamer.name}</span>
                        {gamer.rank === 1 && <span className="text-xs">👑</span>}
                      </div>
                      <span className="text-[9px] text-neutral-400 block">{gamer.title}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-black text-ensa-orange block">{gamer.points} XP</span>
                    <span className="text-[8px] text-neutral-500 block">Nível {gamer.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
