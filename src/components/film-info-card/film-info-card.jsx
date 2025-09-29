import './film-info-card.scss';
import { Tag } from '../tag/tag';
import { Rating } from '../rating/rating';

export const FilmInfoCard = ({ film }) => {
    const genres = Array.isArray(film.genre) 
        ? film.genre 
        : film.genre?.split(',').map(g => g.trim()) || [];

    const rating = film?.rating;

    return (
        <div className='info-card'>
            <div className='info-card__left'>
                <img src={film.poster} alt={film.title} className='info-card__left--poster' />
            </div>
            <div className='info-card__right'>
                <h2 className='info-card__right--title'>{film.title}</h2>
                <div className='info-card__right--additional'>
                    <p className='info-card__right--year'>{film.year}</p>
                    <span className='divider'></span>
                    <Rating rating={rating} />  
                </div>

                {genres.length > 0 && (
                    <div className="info-card__tags">
                        {genres.map((genre, index) => (
                            <Tag 
                                key={index} 
                                genre={genre} 
                            />
                        ))}
                    </div>
                )}

                <p className='info-card__right--description'>{film.plot}</p>
            </div>
        </div>
    )
}
