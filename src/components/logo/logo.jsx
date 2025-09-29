import './logo.scss';
import Icon from '../../assets/logo-icon.svg';

export const Logo = () => {
    return (
        <nav className='nav'>
            <img src={Icon} alt="logo" className='nav__icon' />
            <h2 className='nav__title'>WATCH</h2>
        </nav>
    )
};
