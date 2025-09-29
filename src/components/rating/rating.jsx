import './rating.scss';

export const Rating = ({ rating }) => {
    return (
        <div className='rating'>
            <p className='rating__num'>{rating}</p>
        </div>
    )
}