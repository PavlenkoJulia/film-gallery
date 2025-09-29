import React from 'react';
import './search.scss';

export const Search = ({ value, onChange, placeholder = "Поиск фильмов" }) => {
    return (
        <div className="search">
            <div className="search__container">
                <svg className="search__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                    type="text"
                    className="search__input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};