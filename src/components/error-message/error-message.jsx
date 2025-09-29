import './error-message.scss';

export const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message">
            <div className="error-message__content">
                <div className="error-message__icon">⚠️</div>
                <h3 className="error-message__title">Произошла ошибка</h3>
                <p className="error-message__text">{message}</p>
                {onRetry && (
                    <button 
                        className="error-message__button"
                        onClick={onRetry}
                    >
                        Попробовать снова
                    </button>
                )}
            </div>
        </div>
    );
};