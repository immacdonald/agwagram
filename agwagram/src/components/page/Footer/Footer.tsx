import { Link } from 'react-router-dom';
import { FC } from 'react';
import style from './Footer.module.scss';

const Footer: FC = () => {
    return (
        <footer className={style.footer}>
            <div>
                <span>
                    &copy; {new Date().getFullYear()}{' '}
                    <Link to="https://www.wm.edu" target="_blank">
                        Willam & Mary
                    </Link>{' '}
                    | NEWS Lab
                </span>
            </div>
        </footer>
    );
};

export { Footer };
