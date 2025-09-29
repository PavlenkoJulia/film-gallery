import './tag.scss';

export const Tag = ({ genre }) => {
    return (
        <div className='tag'>
            <h4 className='tag__title'>{genre}</h4>
        </div>
    )
};
