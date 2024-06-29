import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div>
                <span>
                    &copy; {new Date().getFullYear()} <Link to="https://www.wm.edu" target="_blank">Willam & Mary</Link> | NEWS Lab
                </span>
            </div>
        </footer>
    );
};

export { Footer };
