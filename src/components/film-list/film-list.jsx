import React from "react";
import './film-list.scss';
import { FilmCard } from "../film-card/film-card";
import { useFilms } from "../../hooks/useFilms";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

export const FilmList = ({ searchQuery = "", onClearSearch }) => {
    const { 
        filteredFilms, 
        loading, 
        error, 
        refetch, 
        hasSearch,
        films: allFilms 
    } = useFilms(searchQuery);

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
                <div className="list__error">
                    <p className="list__error--text">{error}</p>
                    <button 
                        className="list__error--button"
                        onClick={refetch}
                    >
                        Попробовать снова
                    </button>
                </div>
            </section>
        );
    }

    if (allFilms.length === 0) {
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

    if (hasSearch && filteredFilms.length === 0) {
        return (
            <section className="list">
                <h1 className="list__title">Каталог фильмов</h1>
                <div className="list__no-results">
                    <p className="list__no-results--text">
                        По запросу "{searchQuery}" ничего не найдено
                    </p>
                    <button 
                        className="list__no-results--search"
                        onClick={onClearSearch}
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
            {hasSearch && (
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