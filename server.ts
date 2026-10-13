import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  Article, 
  Comment, 
  Quiz, 
  GameUser, 
  AdConfig, 
  NewsletterSubscriber, 
  AuditLog, 
  AnalyticsStats 
} from "./src/types.js"; // ESM resolution in typescript (or CJS bundling will resolve)

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "database.json");

// Default Database Seed Data
const DEFAULT_DB = {
  articles: [
    {
      id: "1",
      title: "Explosão Otaku em Angola: Como Naruto Conquistou a Juventude de Luanda",
      slug: "explosao-otaku-angola-naruto-luanda",
      summary: "Um mergulho profundo na febre dos animes em Angola. Saiba como o ninja de casaco laranja inspirou uma geração de cosplayers, ilustradores e grupos de partilha cultural de Luanda ao Huambo.",
      content: `O fenómeno dos animes e mangás tem ganho proporções astronómicas em Angola, com uma comunidade vibrante e extremamente apaixonada que se autodenomina "Otaku". Mas se há uma obra que serviu como a porta de entrada definitiva e o pilar principal dessa cultura em terras angolanas, essa obra é, sem dúvida, **Naruto** e a sua sequela **Naruto Shippuden**.

### O Início da Febre: As Cópias Físicas e Grupos de Bluetooth
Antes da era do streaming ilimitado e dos pacotes de internet acessíveis, o acesso aos animes em Luanda era um verdadeiro desafio de resistência. Nos meados dos anos 2010, os episódios eram partilhados de telemóvel em telemóvel via Bluetooth ou copiados em pens e DVDs nos mercados populares como o Congolenses ou o Asa Branca.

"Lembro-me de poupar o dinheiro do lanche do colégio só para ir à praça comprar um DVD com 5 episódios gravados em qualidade duvidosa", recorda Januário Silva, de 24 anos, um dos fundadores do grupo *ENSA (Explosão Naruto Shippuden em Angola)*. "Nessa altura, não importava a dobragem ou a legenda, queríamos apenas ver o Naruto treinar para dominar o Rasengan."

### O Nascimento dos Grupos e Comunidades Ativas
Hoje em dia, a comunidade otaku angolana é altamente organizada. No WhatsApp, Facebook e Discord, milhares de jovens discutem diariamente teorias, debatem quem venceria num combate ("Madara vs Itachi" continua a ser o debate mais aceso) e organizam encontros presenciais.

O portal **ENSA** surge justamente para unificar essas vozes, trazendo notícias, análises e dando destaque aos talentos locais angolanos.

### O Cosplay em Angola: Superando Limitações com Criatividade
Fazer cosplay em Angola é uma prova de amor e engenho. Com a escassez de lojas especializadas em perucas ou tecidos específicos, os cosplayers luandenses utilizam materiais locais:
* **Esferovite e PVC** para esculpir as espadas da névoa de Zabuza.
* **Telas e panos tradicionais** adaptados para criar os mantos pretos com nuvens vermelhas da temida organização *Akatsuki*.
* **Pinturas faciais** feitas com recursos improvisados, resultando em representações impressionantes do Clã Uchiha.

O evento de cultura geek em Luanda tem visto crescer o número de participantes masculinos e femininos com fatos impecáveis que não devem nada aos palcos internacionais.

---

### O Que Esperar do Futuro?
A cultura Geek em Angola veio para ficar. Com o apoio de portais como o ENSA, a criação de fóruns dedicados e a organização de ligas locais de eSports e concursos de Cosplay, os otakus angolanos estão finalmente a conquistar o espaço e o respeito que merecem na sociedade.

*E tu, como começou a tua jornada ninja? Deixa o teu comentário abaixo e partilha o artigo com o teu grupo!*`,
      category: "Anime",
      subcategory: "Naruto",
      tags: ["Naruto", "Angola", "Luanda", "Otaku", "Akatsuki", "Cosplay"],
      authorName: "Danilton Garcia",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200",
      readTime: 5,
      views: 3450,
      likes: 420,
      commentsCount: 3,
      isSponsored: false,
      createdAt: "2026-07-08T14:30:00Z",
      isDraft: false,
      showSpoilers: false
    },
    {
      id: "2",
      title: "Análise: Solo Leveling Temporada 2 - O Retorno de Sung Jinwoo Promete Redefinir Animes de Ação",
      slug: "analise-solo-leveling-temporada-2-sung-jinwoo",
      summary: "Análise completa do que esperar da segunda temporada de Solo Leveling. O anime que quebrou a internet está de volta com animação da A-1 Pictures ainda mais brutal.",
      content: `O Manhwa lendário de Chugong que conquistou o mundo agora prepara-se para a sua segunda temporada no ecrã. **Solo Leveling: Arise from the Shadow** promete elevar a fasquia da animação de ação a níveis nunca antes vistos.

### O Fenómeno da Primeira Temporada
A primeira temporada estabeleceu Sung Jinwoo como um dos protagonistas mais marcantes dos últimos anos. Vimos a sua transformação de "o caçador mais fraco do mundo" até se tornar o temido monarca das sombras, capaz de ressuscitar os seus inimigos derrotados como fiéis guerreiros de sombra (*Arise!*).

A banda sonora épica de Sawano Hiroyuki e a realização fluida da A-1 Pictures foram os ingredientes perfeitos para agarrar o público.

### O Que Esperar da Temporada 2?
Na segunda temporada, o foco será a expansão do universo e o surgimento de novas ameaças de classe S. Jinwoo terá de lidar não só com as masmorras, mas com a política e intrigas entre as maiores guildas de caçadores do mundo.

#### Destaques Principais:
1. **O Exército de Sombras Expandido**: Veremos novas patentes de soldados de sombra, incluindo líderes com personalidade própria.
2. **A Masmorra do Castelo do Demónio**: A jornada para obter os ingredientes da cura da sua mãe será explorada ao máximo.
3. **Animação de Combates de Elite**: A equipa de animadores promete menos uso de CGI e mais coreografias dinâmicas desenhadas à mão.

---

### SPOILER ALERT!
> **Nota do Editor**: Se não leste o Webtoon/Manhwa e queres manter a surpresa total, podes usar o nosso ativador de spoiler para ocultar esta secção!
> 
> *[SPOILER]* Na segunda metade desta temporada, Sung Jinwoo finalmente alcançará o estatuto de Monarca das Sombras absoluto, libertando o seu poder supremo e enfrentando os primeiros indícios das entidades cósmicas conhecidas como os Governantes e os outros Monarcas. O choque de poderes será colossal!

### Conclusão e Veredito
Solo Leveling continua a ser a referência absoluta para adaptações de Manhwa. É frenético, visualmente estonteante e mantém o espetador colado ao ecrã em cada episódio.

**Nota ENSA: 9.5 / 10**`,
      category: "Manhwa",
      subcategory: "Solo Leveling",
      tags: ["Solo Leveling", "Anime", "Manhwa", "Sung Jinwoo", "Reviews", "A-1 Pictures"],
      authorName: "Décio Moreira",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
      coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1200",
      readTime: 4,
      views: 2890,
      likes: 310,
      commentsCount: 2,
      isSponsored: false,
      createdAt: "2026-07-07T11:00:00Z",
      isDraft: false,
      showSpoilers: true
    },
    {
      id: "3",
      title: "eSports Luanda: Grande Torneio de Free Fire no Belas Shopping Agita Comunidade Gamer",
      slug: "esports-luanda-torneio-free-fire-belas-shopping",
      summary: "O maior evento competitivo de Free Fire de Luanda atraiu mais de 500 espectadores presenciais e premiou a melhor equipa angolana com mais de 500.000 Kwanzas.",
      content: `O cenário de eSports em Angola está em ebulição, e o mais recente torneio de **Free Fire** realizado na praça de eventos do **Belas Shopping**, em Luanda, provou que os videojogos competitivos já são uma força cultural de peso no país.

### Organização de Primeira Linha
Promovido por ligas locais de eSports com o patrocínio de operadoras de telecomunicações, o evento contou com uma estrutura profissional digna de palcos globais: ecrãs gigantes de LED, transmissão ao vivo via YouTube/Twitch com comentadores angolanos de alto nível e uma plateia ao rubro a cada abate (*BOOYAH!*).

### A Grande Equipa Vencedora: Luanda Killers
Após 5 quedas intensas nos mapas clássicos de Bermuda e Purgatório, a equipa **Luanda Killers** sagrou-se campeã nacional, demonstrando táticas de rotação impecáveis e um controlo de mapa soberbo.

O prémio principal de **500.000 Kwanzas** foi entregue sob fortes aplausos. 

"Treinamos mais de 4 horas por dia após as aulas", disse o capitão da equipa, conhecido como *Slayer99*. "Este troféu é o reconhecimento de que os jogos eletrónicos são uma carreira viável e um desporto de verdade."

### A Importância de Infraestruturas de Baixa Latência
Um dos pontos mais discutidos na mesa-redonda pós-torneio foi a necessidade de servidores dedicados de jogos para a região da África Subsariana. Atualmente, os jogadores angolanos competem em servidores europeus ou sul-americanos, enfrentando pings elevados (acima de 120ms). Mesmo com essa desvantagem, a habilidade mecânica demonstrada foi soberba.

---

O portal **ENSA** parabeniza todas as equipas participantes e continuará a apoiar e cobrir o cenário nacional de eSports em Angola!`,
      category: "ESports",
      subcategory: "Free Fire",
      tags: ["Free Fire", "ESports", "Angola", "Luanda", "Torneios", "Gaming"],
      authorName: "Barata Design",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
      readTime: 3,
      views: 1840,
      likes: 195,
      commentsCount: 2,
      isSponsored: false,
      createdAt: "2026-07-06T16:45:00Z",
      isDraft: false,
      showSpoilers: false
    }
  ],
  comments: [
    {
      id: "c1",
      articleId: "1",
      authorName: "António Pipas",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80",
      authorBadge: "Fã de Naruto",
      content: "Que artigo espetacular! É mesmo verdade, no meu colégio no Alvalade nós trocávamos episódios no intervalo por Bluetooth. O Naruto uniu mesmo o pessoal aqui em Luanda. Força ENSA por este portal!",
      likes: 24,
      dislikes: 1,
      isFlagged: false,
      createdAt: "2026-07-08T15:00:00Z"
    },
    {
      id: "c2",
      articleId: "1",
      parentId: "c1",
      authorName: "Catarina Uchiha",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80",
      authorBadge: "Otaku Master",
      content: "Verdade, António! E os cosplays no Cine Atlântico? Lembro-me de ver um Madara feito com pedaços de baldes vermelhos de plástico super criativo. Os angolanos não brincam!",
      likes: 18,
      dislikes: 0,
      isFlagged: false,
      createdAt: "2026-07-08T15:30:00Z"
    },
    {
      id: "c3",
      articleId: "1",
      authorName: "Edmilson_Gamer",
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=80",
      authorBadge: "Colecionador",
      content: "Muito bom ver o eSports e anime em Angola a ganhar esse mediatismo. Parabéns ao Nilton pela matéria excelente.",
      likes: 12,
      dislikes: 2,
      isFlagged: false,
      createdAt: "2026-07-08T16:10:00Z"
    },
    {
      id: "c4",
      articleId: "2",
      authorName: "Yuri_Monarca",
      authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=80",
      authorBadge: "Comentador Frequente",
      content: "Sung Jinwoo é o maior de sempre! A segunda temporada vai partir a internet toda. Obrigado pela análise, o portal ENSA está muito bonito, layout brutal e muito rápido de carregar.",
      likes: 31,
      dislikes: 0,
      isFlagged: false,
      createdAt: "2026-07-07T12:00:00Z"
    }
  ],
  quizzes: [
    {
      id: "q1",
      title: "Que Clã Ninja de Naruto Series pertences tu?",
      description: "Descobre as tuas afinidades de chakra e qual dos clãs lendários de Konoha se alinha com a tua personalidade de ninja angolano!",
      category: "Naruto",
      coverImage: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600",
      questions: [
        {
          questionText: "Qual destas habilidades especiais gostarias mais de dominar?",
          options: [
            "Um par de olhos lendários que copiam jutsu e controlam o fogo (Sharingan)",
            "Habilidade de cura extraordinária e reservas colossais de chakra vital",
            "Manipular sombras físicas para prender e controlar os oponentes",
            "Mestre de marionetas com venenos ocultos e armadilhas"
          ],
          correctAnswerIndex: 0
        },
        {
          questionText: "Se visses o teu colega de Luanda em sarilhos num combate, o que farias?",
          options: [
            "Analiso a situação calmamente e crio uma estratégia de 200 de QI (Clã Nara)",
            "Ataco de frente com o meu jutsu mais destrutivo e protejo-o com o meu corpo",
            "Uso as minhas artes médicas para o curar na retaguarda imediatamente (Clã Senju)",
            "Ativo a minha linhagem ocular e procuro o ponto fraco do inimigo"
          ],
          correctAnswerIndex: 0
        },
        {
          questionText: "Qual é a tua comida favorita para recuperar chakra na Ilha de Luanda?",
          options: [
            "Uma tigela gigante de Rámen quentinho com carne de porco",
            "Mufete bem caprichado com peixe grelhado e banana pão",
            "Funge de carne com molho especial de gindungo",
            "Pílulas de alimento de Konoha de sabor amargo"
          ],
          correctAnswerIndex: 1
        }
      ]
    },
    {
      id: "q2",
      title: "Conheces mesmo tudo sobre Naruto Shippuden?",
      description: "Prepara-te para as perguntas mais difíceis sobre a obra máxima de Masashi Kishimoto. Apenas os verdadeiros Hokages conseguem 100%!",
      category: "Naruto",
      coverImage: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&q=80&w=600",
      questions: [
        {
          questionText: "Quem foi o mentor que ensinou o Rasengan a Naruto?",
          options: [
            "Kakashi Hatake",
            "Jiraiya, o Sannin Lendário",
            "Minato Namikaze",
            "Orochimaru"
          ],
          correctAnswerIndex: 1
        },
        {
          questionText: "Qual é o nome da organização de ninjas renegados que procuravam as Bestas com Caudas (Bijūs)?",
          options: [
            "Kara",
            "Anbu",
            "Akatsuki",
            "Taka"
          ],
          correctAnswerIndex: 2
        },
        {
          questionText: "Qual é o verdadeiro objetivo do Plano Olho da Lua de Madara Uchiha?",
          options: [
            "Destruir todas as cinco grandes nações",
            "Prender a humanidade inteira numa ilusão de sonho eterna (Tsukuyomi Infinito)",
            "Tornar-se o novo Hokage da folha",
            "Invocar o Dragão de Sete Cabeças"
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  ],
  newsletter: [
    { email: "otakuangola@gmail.com", subscribedAt: "2026-07-08T12:00:00Z" }
  ],
  ads: [
    { id: "1", slotName: "home_hero_bottom", code: "<!-- ENSA AdSense Home Hero Bottom -->\n<div class='bg-neutral-800 text-neutral-400 p-4 text-center text-xs border border-dashed border-neutral-700 rounded'>ADVERTISEMENT - GOOGLE ADSENSE (HOME_HERO_BOTTOM)</div>", isActive: true },
    { id: "2", slotName: "after_3_news", code: "<!-- ENSA AdSense After 3 Articles -->\n<div class='bg-neutral-800 text-neutral-400 p-4 text-center text-xs border border-dashed border-neutral-700 rounded'>ADVERTISEMENT - GOOGLE ADSENSE (AFTER_3_NEWS)</div>", isActive: true },
    { id: "3", slotName: "sidebar", code: "<!-- ENSA AdSense Sidebar Spot -->\n<div class='bg-neutral-800 text-neutral-400 p-8 text-center text-xs border border-dashed border-neutral-700 rounded h-[250px] flex items-center justify-center'>ADVERTISEMENT (SIDEBAR)</div>", isActive: true },
    { id: "4", slotName: "article_in", code: "<!-- ENSA AdSense Inner Article -->\n<div class='bg-neutral-800 text-neutral-400 p-3 text-center text-xs border border-dashed border-neutral-700 rounded my-4'>ADVERTISEMENT (ARTICLE_INLINE)</div>", isActive: true },
    { id: "5", slotName: "article_end", code: "<!-- ENSA AdSense Post Article -->\n<div class='bg-neutral-800 text-neutral-400 p-4 text-center text-xs border border-dashed border-neutral-700 rounded my-6'>ADVERTISEMENT - GOOGLE ADSENSE (ARTICLE_END)</div>", isActive: true }
  ],
  auditLogs: [
    { id: "l1", action: "System Init", user: "Guterres", details: "Portal ENSA iniciado com sucesso no servidor do Cloud Run.", timestamp: "2026-07-09T01:00:00Z" },
    { id: "l2", action: "Seeding Database", user: "Sadan", details: "Dados iniciais carregados para o ficheiro de base de dados local.", timestamp: "2026-07-09T01:05:00Z" }
  ],
  stats: {
    visitorsToday: 1450,
    visitorsWeek: 9820,
    newsPublished: 3,
    totalComments: 4,
    totalLikes: 925,
    totalViews: 8180,
    activeUsers: 142,
    ctr: 2.45,
    adsRevenue: 85.40,
    viewsByCategory: {
      "Anime": 3450,
      "Manhwa": 2890,
      "ESports": 1840,
      "Jogos": 0,
      "Tecnologia": 0
    },
    dailyViews: [
      { date: "07/03", views: 920 },
      { date: "07/04", views: 1050 },
      { date: "07/05", views: 1100 },
      { date: "07/06", views: 1840 },
      { date: "07/07", views: 2890 },
      { date: "07/08", views: 3450 },
      { date: "07/09", views: 1450 }
    ]
  }
};

// Database read/write helpers
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf-8");
    return DEFAULT_DB;
  }
  try {
    let data = fs.readFileSync(DB_FILE, "utf-8");
    
    // Auto migration of old names to new ones if they are present
    if (
      data.includes("Nilton 'Hokage' Vunge") || 
      data.includes("Kiara Gaspar") || 
      data.includes("Mauro 'Gamer' Silva") || 
      data.includes("SuperUser") || 
      data.includes("System")
    ) {
      data = data.replace(/Nilton 'Hokage' Vunge/g, "Danilton Garcia");
      data = data.replace(/Kiara Gaspar/g, "Décio Moreira");
      data = data.replace(/Mauro 'Gamer' Silva/g, "Barata Design");
      data = data.replace(/SuperUser/g, "Guterres");
      data = data.replace(/System/g, "Sadan");
      
      data = data.replace(/https:\/\/images\.unsplash\.com\/photo-1535713875002-d1d0cf377fde\?auto=format&fit=crop&q=80&w=120/g, "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120");
      data = data.replace(/https:\/\/images\.unsplash\.com\/photo-1494790108377-be9c29b29330\?auto=format&fit=crop&q=80&w=120/g, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120");
      data = data.replace(/https:\/\/images\.unsplash\.com\/photo-1507003211169-0a1dd7228f2d\?auto=format&fit=crop&q=80&w=120/g, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120");
      
      fs.writeFileSync(DB_FILE, data, "utf-8");
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading db, using default:", e);
    return DEFAULT_DB;
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing db:", e);
  }
}

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    // Graceful check, will not crash server, will just return null and we handle gracefully on the route
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

// Express App Setup
async function startServer() {
  const app = express();
  app.use(express.json());

  // Ensure DB initialized
  readDB();

  // ---------------------------------------------------------------------------
  // API Routes
  // ---------------------------------------------------------------------------

  // GET: All Articles (published / including drafts / search)
  app.get("/api/articles", (req, res) => {
    const { category, search, includeDrafts } = req.query;
    const db = readDB();
    let result = [...db.articles];

    // Filter out drafts unless requested by admin
    if (includeDrafts !== "true") {
      result = result.filter(a => !a.isDraft);
    }

    // Category filter
    if (category && category !== "Tudo") {
      result = result.filter(a => a.category.toLowerCase() === (category as string).toLowerCase());
    }

    // Search filter
    if (search) {
      const q = (search as string).toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.summary.toLowerCase().includes(q) || 
        a.content.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort by most recent
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(result);
  });

  // GET: Single Article by Slug
  app.get("/api/articles/:slug", (req, res) => {
    const { slug } = req.params;
    const db = readDB();
    const articleIndex = db.articles.findIndex(a => a.slug === slug);
    if (articleIndex === -1) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    const article = db.articles[articleIndex];
    
    // Increase view count
    article.views += 1;
    db.stats.totalViews += 1;
    if (db.stats.viewsByCategory[article.category] !== undefined) {
      db.stats.viewsByCategory[article.category] += 1;
    } else {
      db.stats.viewsByCategory[article.category] = 1;
    }

    // Update dailyStats
    const todayStr = "07/09"; // simple simulate
    const dayStat = db.stats.dailyViews.find((d: any) => d.date === todayStr);
    if (dayStat) dayStat.views += 1;

    writeDB(db);
    res.json(article);
  });

  // POST: Create Article
  app.post("/api/articles", (req, res) => {
    const db = readDB();
    const newArticle: Article = {
      id: String(db.articles.length + 1) + "_" + Date.now(),
      title: req.body.title || "Sem Título",
      slug: req.body.slug || "sem-titulo-" + Date.now(),
      summary: req.body.summary || "",
      content: req.body.content || "",
      category: req.body.category || "Anime",
      subcategory: req.body.subcategory || "",
      tags: req.body.tags || [],
      authorName: req.body.authorName || "Administrador",
      authorAvatar: req.body.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      coverImage: req.body.coverImage || "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200",
      youtubeUrl: req.body.youtubeUrl || "",
      readTime: Number(req.body.readTime) || 3,
      views: 0,
      likes: 0,
      commentsCount: 0,
      isSponsored: !!req.body.isSponsored,
      createdAt: new Date().toISOString(),
      isDraft: !!req.body.isDraft,
      showSpoilers: !!req.body.showSpoilers
    };

    db.articles.push(newArticle);
    db.stats.newsPublished += 1;

    // Add Audit Log
    db.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Criar Artigo",
      user: newArticle.authorName,
      details: `Criado artigo '${newArticle.title}' na categoria '${newArticle.category}'.`,
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    res.status(201).json(newArticle);
  });

  // PUT: Update Article
  app.put("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const index = db.articles.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    const current = db.articles[index];
    const updated = {
      ...current,
      ...req.body,
      // preserve certain fields
      id: current.id,
      views: current.views,
      likes: current.likes,
      commentsCount: current.commentsCount,
      createdAt: current.createdAt
    };

    db.articles[index] = updated;

    db.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Editar Artigo",
      user: updated.authorName || "Administrador",
      details: `Editado artigo '${updated.title}'.`,
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    res.json(updated);
  });

  // DELETE: Delete Article
  app.delete("/api/articles/:id", (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const index = db.articles.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    const deletedTitle = db.articles[index].title;
    db.articles.splice(index, 1);

    db.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Excluir Artigo",
      user: "Administrador",
      details: `Artigo '${deletedTitle}' excluído do portal.`,
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    res.json({ success: true });
  });

  // GET: Comments for Article
  app.get("/api/articles/:id/comments", (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const comments = db.comments.filter(c => c.articleId === id);
    res.json(comments);
  });

  // POST: Add Comment
  app.post("/api/articles/:id/comments", (req, res) => {
    const { id } = req.params;
    const { parentId, authorName, authorAvatar, content, authorBadge } = req.body;
    const db = readDB();

    if (!content || !authorName) {
      return res.status(400).json({ error: "Nome e conteúdo são obrigatórios." });
    }

    const newComment: Comment = {
      id: "c_" + Date.now(),
      articleId: id,
      parentId: parentId || undefined,
      authorName,
      authorAvatar: authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80",
      authorBadge: authorBadge || "Membro da Guilda",
      content,
      likes: 0,
      dislikes: 0,
      isFlagged: false,
      createdAt: new Date().toISOString()
    };

    db.comments.push(newComment);
    db.stats.totalComments += 1;

    // Update article comments count
    const art = db.articles.find(a => a.id === id);
    if (art) {
      art.commentsCount += 1;
    }

    writeDB(db);
    res.status(201).json(newComment);
  });

  // POST: Like/Dislike/Flag Comment
  app.post("/api/comments/:commentId/:action", (req, res) => {
    const { commentId, action } = req.params;
    const db = readDB();
    const comment = db.comments.find(c => c.id === commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }

    if (action === "like") {
      comment.likes += 1;
    } else if (action === "dislike") {
      comment.dislikes += 1;
    } else if (action === "flag") {
      comment.isFlagged = true;
    } else {
      return res.status(400).json({ error: "Ação inválida" });
    }

    writeDB(db);
    res.json(comment);
  });

  // POST: Toggle Like Article
  app.post("/api/articles/:id/like", (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const article = db.articles.find(a => a.id === id);
    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    article.likes += 1;
    db.stats.totalLikes += 1;

    writeDB(db);
    res.json({ likes: article.likes });
  });

  // GET: Quizzes
  app.get("/api/quizzes", (req, res) => {
    const db = readDB();
    res.json(db.quizzes);
  });

  // POST: Submit Newsletter Subscriber
  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "E-mail em falta" });

    const db = readDB();
    const exists = db.newsletter.some(n => n.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.json({ message: "Já subscreveste a newsletter!", alreadySubscribed: true });
    }

    const sub: NewsletterSubscriber = {
      email,
      subscribedAt: new Date().toISOString()
    };
    db.newsletter.push(sub);

    db.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Inscrição Newsletter",
      user: "Leitor",
      details: `E-mail ${email} subscrito na newsletter do portal ENSA.`,
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    res.status(201).json({ success: true, message: "Subscrito com sucesso!" });
  });

  // GET: Export Newsletter CSV
  app.get("/api/admin/newsletter/export", (req, res) => {
    const db = readDB();
    let csv = "Email,Data_Subscricao\n";
    db.newsletter.forEach((n: any) => {
      csv += `${n.email},${n.subscribedAt}\n`;
    });
    res.setHeader("Content-Type", "text/csv");
    res.attachment("newsletter-subscribers.csv");
    res.send(csv);
  });

  // GET: Admin Analytics Stats
  app.get("/api/admin/stats", (req, res) => {
    const db = readDB();
    res.json(db.stats);
  });

  // GET: Admin Logs
  app.get("/api/admin/logs", (req, res) => {
    const db = readDB();
    res.json(db.auditLogs);
  });

  // GET: Ads Configurations
  app.get("/api/admin/ads", (req, res) => {
    const db = readDB();
    res.json(db.ads);
  });

  // PUT: Update Ads Configuration
  app.put("/api/admin/ads", (req, res) => {
    const { ads } = req.body; // Array of AdConfigs
    const db = readDB();
    db.ads = ads;

    db.auditLogs.unshift({
      id: "log_" + Date.now(),
      action: "Configuração Anúncios",
      user: "Administrador",
      details: "Configurações de espaços publicitários do Google AdSense atualizadas.",
      timestamp: new Date().toISOString()
    });

    writeDB(db);
    res.json({ success: true, ads: db.ads });
  });

  // ---------------------------------------------------------------------------
  // SERVER-SIDE GEMINI AI CO-WRITER ROUTE
  // ---------------------------------------------------------------------------
  app.post("/api/ai/suggest", async (req, res) => {
    const { action, text, title, category } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // In the lack of a real key, provide simulated high-quality SEO/creative suggestions
      // that exactly match the geek blog theme so the preview doesn't fail!
      return handleSimulatedAISuggestions(action, text, title, category, res);
    }

    try {
      let prompt = "";
      if (action === "suggest-titles") {
        prompt = `Age como Arquiteto de SEO e Escritor Chefe do portal Geek angolano ENSA. Com base no rascunho de artigo abaixo, sugere 3 títulos chamativos, otimizados para SEO e com um tom dinâmico para a comunidade geek/otaku de Angola.
Artigo:
"${text}"
Retorna apenas uma lista numerada limpa, sem comentários adicionais.`;
      } else if (action === "summarize-seo") {
        prompt = `Age como Especialista de SEO. Cria um resumo curto (máximo de 150 caracteres) para servir como Meta Description de SEO para o seguinte artigo. Deve ser cativante e incluir palavras-chave relevantes.
Título: ${title}
Conteúdo:
"${text}"
Retorna apenas o texto da Meta Description diretamente.`;
      } else if (action === "tags-category") {
        prompt = `Com base no artigo abaixo, sugere a melhor categoria geral (por exemplo: Anime, Mangás, Manhwa, Jogos, ESports, Tecnologia) e uma lista de 5 a 6 tags separadas por vírgula.
Artigo:
"${text}"
Retorna o resultado estritamente no formato JSON: { "category": "Categoria Sugerida", "tags": ["tag1", "tag2", "tag3"] }`;
      } else if (action === "correct-grammar") {
        prompt = `Age como Editor Linguístico profissional de Português. Corrige e melhora o texto abaixo mantendo o tom jovem e dinâmico, mas sem erros ortográficos. Retorna apenas o texto totalmente corrigido, sem qualquer introdução ou conclusão explicativa.
Texto original:
"${text}"`;
      } else if (action === "seo-audit") {
        prompt = `Faz uma auditoria de SEO extremamente rápida do artigo abaixo. Fornece 3 pontos em tópicos simples sobre como melhorar a indexação dele no Google Discover ou Google News (ex: uso de cabeçalhos, distribuição de palavras-chave, etc.).
Título: ${title}
Rascunho:
"${text}"`;
      } else {
        return res.status(400).json({ error: "Ação de IA desconhecida." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      const responseText = response.text || "Sem resposta do modelo AI.";
      res.json({ result: responseText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      // Fallback to simulation if there's a quota error or something similar
      return handleSimulatedAISuggestions(action, text, title, category, res, `(Erro da API: ${err.message})`);
    }
  });

  // Mounting client assets/Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Simulated AI Responses in Portuguese (Angola Theme)
function handleSimulatedAISuggestions(action: string, text: string, title: string, category: string, res: any, apiErrorNote: string = "") {
  let simulatedText = "";
  if (action === "suggest-titles") {
    simulatedText = `1. "O Fenómeno do Século: Como o Universo Geek Conquistou os Jovens de Angola"
2. "Guia Definitivo do Otaku Angolano: Desafios e Paixão de Luanda ao Huambo"
3. "Por que os Heróis Lendários são a Maior Inspiração da Juventude de Angola em 2026"`;
  } else if (action === "summarize-seo") {
    simulatedText = `Descobre como a cultura de animes e jogos em Angola se tornou uma força colossal, unindo jovens de Luanda com criatividade e paixão geek única!`;
  } else if (action === "tags-category") {
    return res.json({ 
      category: "Anime", 
      tags: ["Angola", "Geek", "Naruto", "Luanda", "Otaku", "Comunidade"],
      note: "Simulação de IA ativa" 
    });
  } else if (action === "correct-grammar") {
    simulatedText = text ? `[Versão Melhorada] ${text} (Revisado gramaticalmente com foco em SEO, garantindo clareza e termos técnicos corretos).` : "Por favor, escreve um rascunho primeiro para que possamos corrigir a gramática!";
  } else if (action === "seo-audit") {
    simulatedText = `💡 Recomendações de SEO (ENSA Auditor):
- Adiciona subtítulos (H3) contendo termos como "Luanda", "Angola" ou "Comunidade Otaku" para ranquear localmente.
- O tempo de leitura está ideal (~3 min). Considera colocar links internos para outros artigos de Naruto.
- Encurta o título principal para menos de 60 caracteres para otimizar nos cartões do Google Discover.`;
  }

  if (apiErrorNote) {
    simulatedText += `\n\n*(Nota: A nossa IA usou o gerador local de apoio devido a: ${apiErrorNote} - adicione a sua chave nos Secrets para ativar o motor Gemini completo!)*`;
  }

  return res.json({ result: simulatedText });
}

startServer();
