import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

export const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div 
            className="modal"
            onClick={handleBackdropClick}
        >
            <div className="modal__content">
                <button 
                    className="modal__close"
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                >
                    ×
                </button>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};