export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown supported
  category: string;
  subcategory?: string;
  tags: string[];
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  youtubeUrl?: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  commentsCount: number;
  isSponsored: boolean;
  createdAt: string;
  scheduledAt?: string;
  isDraft: boolean;
  showSpoilers?: boolean;
}

export interface Comment {
  id: string;
  articleId: string;
  parentId?: string; // For replies
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  content: string;
  likes: number;
  dislikes: number;
  isFlagged: boolean;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
}

export interface GameUser {
  username: string;
  avatar: string;
  points: number;
  level: number;
  badges: string[];
  favorites: string[]; // List of articleIds
  bookmarks: string[]; // List of articleIds
  completedQuizzes: { quizId: string; score: number }[];
}

export interface AdConfig {
  id: string;
  slotName: string; // 'home_hero_bottom' | 'after_3_news' | 'sidebar' | 'article_in' | 'article_end' | 'footer'
  code: string; // AdSense script or placeholder
  isActive: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: string;
}

export interface AnalyticsStats {
  visitorsToday: number;
  visitorsWeek: number;
  newsPublished: number;
  totalComments: number;
  totalLikes: number;
  totalViews: number;
  activeUsers: number;
  ctr: number;
  adsRevenue: number;
  viewsByCategory: { [category: string]: number };
  dailyViews: { date: string; views: number }[];
}
