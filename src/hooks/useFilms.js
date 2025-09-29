import { useState, useEffect } from 'react';
import { filmService } from '../services/filmService';

export const useFilms = (searchQuery = '') => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const filterFilms = (films, query) => {
        if (!query.trim()) {
            return films;
        }

        const searchQuery = query.toLowerCase().trim();
        
        return films.filter(film => {
            const titleMatch = film.title?.toLowerCase().includes(searchQuery) || false;
            
            let genreMatch = false;
            if (Array.isArray(film.genre)) {
                genreMatch = film.genre.some(genre => 
                    genre?.toLowerCase().includes(searchQuery)
                );
            } else if (typeof film.genre === 'string') {
                genreMatch = film.genre.toLowerCase().includes(searchQuery);
            }
            
            const yearMatch = film.year?.toString().includes(searchQuery) || false;

            return titleMatch || genreMatch || yearMatch;
        });
    };

    const loadFilms = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await filmService.getFilms();
            
            if (!data || !Array.isArray(data)) {
                throw new Error('Некорректный формат данных с сервера');
            }
            
            setFilms(data);
        } catch (err) {
            console.error('Ошибка загрузки фильмов:', err);
            setError(err.message || 'Произошла ошибка при загрузке фильмов');
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

    const filteredFilms = filterFilms(films, searchQuery);

    return {
        films,
        filteredFilms,
        loading,
        error,
        refetch,
        hasSearch: !!searchQuery.trim(),
        searchQuery
    };
};