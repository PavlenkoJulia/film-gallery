import React from "react";
import './film-list.scss';
import { FilmCard } from "../film-card/film-card";
import { useFilms } from "../../hooks/useFilms";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { ErrorMessage } from "../error-message/error-message";

export const FilmList = ({ searchQuery = "", onClearSearch }) => {
    const { films, loading, error, refetch } = useFilms();

    const filteredFilms = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return films;
        }

        const query = searchQuery.toLowerCase().trim();
        
        return films.filter(film => {
            const titleMatch = film.title?.toLowerCase().includes(query) || false;
            
            let genreMatch = false;
            if (Array.isArray(film.genre)) {
                genreMatch = film.genre.some(genre => 
                    genre?.toLowerCase().includes(query)
                );
            } else if (typeof film.genre === 'string') {
                genreMatch = film.genre.toLowerCase().includes(query);
            }
            
            const yearMatch = film.year?.toString().includes(query) || false;

            return titleMatch || genreMatch || yearMatch;
        });
    }, [films, searchQuery]);

    const handleShowAllFilms = () => {
        if (onClearSearch) {
            onClearSearch();
        }
    };

    if (loading) {
        return (
            <section className="list">
                <h1 className="list__title">Каталог фильмов</h1>
                <LoadingSpinner text="Загрузка фильмов..." />
            </section>
        );
    }

    if (error) {
        return (
            <section className="list">
                <h1 className="list__title">Каталог фильмов</h1>
                <ErrorMessage 
                    message={error}
                    onRetry={refetch}
                />
            </section>
        );
    }

    if (films.length === 0) {
        return (
            <section className="list">
                <h1 className="list__title">Каталог фильмов</h1>
                <div className="list__no-films">
                    <p className="list__no-films--text">
                        Фильмы не найдены
                    </p>
                    <button 
                        className="list__no-films--button"
                        onClick={refetch}
                    >
                        Попробовать снова
                    </button>
                </div>
            </section>
        );
    }

    if (filteredFilms.length === 0 && searchQuery) {
        return (
            <section className="list">
                <h1 className="list__title">Каталог фильмов</h1>
                <div className="list__no-results">
                    <p className="list__no-results--text">
                        По запросу "{searchQuery}" ничего не найдено
                    </p>
                    <button 
                        className="list__no-results--search"
                        onClick={handleShowAllFilms}
                    >
                        Показать все фильмы
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="list">
            <h1 className="list__title">Каталог фильмов</h1>
            {searchQuery && (
                <p className="list__results">
                    Найдено фильмов: {filteredFilms.length}
                </p>
            )}
            <div className="list__films">
                {filteredFilms.map(film => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </section>
    )
};