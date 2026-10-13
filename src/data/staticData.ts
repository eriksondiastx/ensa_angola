export interface Character {
  id: string;
  name: string;
  anime: string;
  role: "Protagonista" | "Antagonista" | "Suporte";
  bio: string;
  image: string;
  stats: {
    forca: number;
    velocidade: number;
    inteligencia: number;
    poderEspecial: number;
  };
  quote: string;
}

export interface ReleaseItem {
  id: string;
  title: string;
  type: "Anime" | "Mangá" | "Filme" | "Série" | "Jogo";
  date: string;
  platform: string;
  expectation: "Extrema" | "Alta" | "Média";
  cover: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "char_1",
    name: "Naruto Uzumaki",
    anime: "Naruto Shippuden",
    role: "Protagonista",
    bio: "O jovem ninja rejeitado de Konoha que sonhava tornar-se Hokage para ser reconhecido por todos. Em Angola, a sua determinação inspirou gerações a superar dificuldades sob o lema 'Eu nunca volto atrás com a minha palavra!'",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400",
    stats: {
      forca: 92,
      velocidade: 95,
      inteligencia: 75,
      poderEspecial: 100
    },
    quote: "Se não gostas do teu destino, não o aceites. Em vez disso, tem a coragem de o mudar!"
  },
  {
    id: "char_2",
    name: "Sasuke Uchiha",
    anime: "Naruto Shippuden",
    role: "Antagonista",
    bio: "O último sobrevivente do Clã Uchiha, movido pela vingança contra o seu irmão Itachi. Dominou o Sharingan e o Chidori, tornando-se o eterno rival e maior aliado de Naruto Uzumaki.",
    image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&q=80&w=400",
    stats: {
      forca: 90,
      velocidade: 97,
      inteligencia: 94,
      poderEspecial: 96
    },
    quote: "Eu já fechei os meus olhos... O meu único objetivo está na escuridão."
  },
  {
    id: "char_3",
    name: "Sung Jinwoo",
    anime: "Solo Leveling",
    role: "Protagonista",
    bio: "Originalmente conhecido como o Caçador Mais Fraco da Humanidade (Classe E). Após sobreviver a uma masmorra dupla mortal, foi escolhido pelo 'Sistema' e evoluiu até se tornar o Monarca das Sombras imbatível.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400",
    stats: {
      forca: 99,
      velocidade: 100,
      inteligencia: 92,
      poderEspecial: 100
    },
    quote: "Ergue-te! (Arise) - A partir de hoje, as vossas sombras pertencem-me."
  },
  {
    id: "char_4",
    name: "Satoru Gojo",
    anime: "Jujutsu Kaisen",
    role: "Suporte",
    bio: "O feiticeiro Jujutsu mais forte do mundo moderno. Professor da Escola de Feitiçaria de Tóquio, herdeiro da técnica do Infinito e do Seis Olhos, conhecido pelo seu carisma descontraído e poder avassalador.",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400",
    stats: {
      forca: 95,
      velocidade: 100,
      inteligencia: 96,
      poderEspecial: 100
    },
    quote: "Não te preocupes, eu sou o mais forte."
  },
  {
    id: "char_5",
    name: "Madara Uchiha",
    anime: "Naruto Shippuden",
    role: "Antagonista",
    bio: "Líder lendário do clã Uchiha e co-fundador da Aldeia da Folha. Orquestrou todo o plano do Tsukuyomi Infinito para instaurar uma paz forçada através de ilusões eternas de sonhos perfectos.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400",
    stats: {
      forca: 98,
      velocidade: 96,
      inteligencia: 98,
      poderEspecial: 99
    },
    quote: "Neste mundo, onde quer que haja luz, haverá sempre sombras."
  }
];

export const RELEASES_CALENDAR: ReleaseItem[] = [
  {
    id: "rel_1",
    title: "Solo Leveling - Season 2: Arise from the Shadow",
    type: "Anime",
    date: "Janeiro 2027",
    platform: "Crunchyroll",
    expectation: "Extrema",
    cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rel_2",
    title: "Grand Theft Auto VI (GTA 6)",
    type: "Jogo",
    date: "Primavera 2027",
    platform: "PS5, Xbox Series X/S",
    expectation: "Extrema",
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rel_3",
    title: "Chainsaw Man - Movie: Reze Arc",
    type: "Anime",
    date: "Novembro 2026",
    platform: "Cinemas / Crunchyroll",
    expectation: "Alta",
    cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rel_4",
    title: "Bleach: Thousand-Year Blood War - Parte 4",
    type: "Anime",
    date: "Outubro 2026",
    platform: "Disney+ / Hulu",
    expectation: "Alta",
    cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rel_5",
    title: "Marvel: Avengers - Secret Wars",
    type: "Filme",
    date: "Maio 2027",
    platform: "Cinemas (Mundial)",
    expectation: "Extrema",
    cover: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rel_6",
    title: "Stranger Things - Temporada 5 (Final)",
    type: "Série",
    date: "Fevereiro 2027",
    platform: "Netflix",
    expectation: "Alta",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400"
  }
];

export const BADGES = [
  { name: "Usuário Novo", description: "Fez a sua primeira visita ao portal ENSA", icon: "🌱" },
  { name: "Comentador Frequente", description: "Deixou mais de 5 comentários construtivos nos artigos", icon: "💬" },
  { name: "Fã de Naruto", description: "Completou um Quiz de Naruto com pontuação perfeita", icon: "🦊" },
  { name: "Especialista em Jogos", description: "Comentou ou pontuou em artigos do universo gamer", icon: "🎮" },
  { name: "Colecionador", description: "Adicionou mais de 3 artigos aos favoritos ou bookmarks", icon: "🏆" },
  { name: "Otaku Master", description: "Alcançou o nível 5 no portal ENSA", icon: "🌌" }
];
