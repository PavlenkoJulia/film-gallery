import React from 'react';
import './loading-spinner.scss';

export const LoadingSpinner = ({ 
    size = 'medium', 
    text = 'Загрузка фильмов...',
    className = '' 
}) => {
    return (
        <div className={`loading-spinner loading-spinner--${size} ${className}`}>
            <div className="loading-spinner__container">
                <div className="loading-spinner__spinner"></div>
                {text && (
                    <p className="loading-spinner__text">{text}</p>
                )}
            </div>
        </div>
    );
};