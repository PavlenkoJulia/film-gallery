import React, { useState } from "react";
import './film-card.scss';
import { FilmInfoCard } from "../film-info-card/film-info-card";
import { Modal } from "../modal/modal";

export const FilmCard = ({ film }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
        }
    };

    return (
        <>
            <div 
                className="card"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <img 
                    src={film.poster} 
                    alt={film.title} 
                    className="card__poster" 
                />
                <div className="card__content">
                    <h2 className="card__content--title">{film.title}</h2>
                    <p className="card__content--year">{film.year}</p>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <FilmInfoCard film={film} />
            </Modal>
        </>
    )
};
