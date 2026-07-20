import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { TribalArticle } from './tribalArticlesData';
import { auth } from '../lib/firebase';

interface ArticlesContextValue {
  articles: TribalArticle[];
  addArticle: (article: TribalArticle) => void;
  deleteArticle: (id: string) => void;
  refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextValue>({
  articles: [],
  addArticle: () => {},
  deleteArticle: () => {},
  refreshArticles: async () => {},
});

export const ArticlesProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<TribalArticle[]>([]);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/tribes/articles');
      const result = await res.json();
      if (result.success && result.data?.articles) {
        setArticles(result.data.articles);
      }
    } catch (e) {
      console.error('Failed to fetch articles:', e);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const addArticle = useCallback(async (article: TribalArticle) => {
    try {
      const headers: any = { 'Content-Type': 'application/json' };
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch('http://localhost:5000/api/v1/tribes/articles', {
        method: 'POST',
        headers,
        body: JSON.stringify(article)
      });
      await fetchArticles();
    } catch (e) {
      console.error('Failed to submit article:', e);
    }
  }, [fetchArticles]);

  const deleteArticle = useCallback(async (id: string) => {
    try {
      const headers: any = {};
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await fetch(`http://localhost:5000/api/v1/tribes/articles/${id}`, {
        method: 'DELETE',
        headers
      });
      await fetchArticles();
    } catch (e) {
      console.error('Failed to delete article:', e);
    }
  }, [fetchArticles]);

  const refreshArticles = fetchArticles;

  return (
    <ArticlesContext.Provider value={{ articles, addArticle, deleteArticle, refreshArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
