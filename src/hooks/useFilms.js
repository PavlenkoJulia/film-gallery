import { useState, useEffect } from 'react';
import { filmService } from '../services/filmService';

export const useFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFilms = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Вариант 1: Всегда ошибка
      // throw new Error('Тестовая ошибка: сервер недоступен');
      
      // Вариант 2: Ошибка с вероятностью 50%
      // if (Math.random() > 0.5) {
      //     throw new Error('Случайная ошибка загрузки');
      // }
      
      // Вариант 3: Ошибка сети
      // await new Promise((_, reject) => 
      //     setTimeout(() => reject(new Error('Timeout: Сервер не отвечает')), 100)
      // );

      const data = await filmService.getFilms();
      if (!data || !Array.isArray(data)) {
        throw new Error('Некорректный формат данных с сервера');
      }
      if (data.length === 0) {
        throw new Error('Нет доступных фильмов');
      }
      setFilms(data);
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке фильмов');
      setFilms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilms();
  }, []);

  const refetch = () => {
    loadFilms();
  };

  return {
    films,
    loading,
    error,
    refetch,
  };
};