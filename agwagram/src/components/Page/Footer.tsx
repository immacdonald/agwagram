import style from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div>
                <p>
                    &copy; {new Date().getFullYear()}{' '}
                    <a href="https://www.wm.edu" target="_blank">
                        Willam & Mary
                    </a>{' '}
                    | NEWS Lab
                </p>
            </div>
        </footer>
    );
};

export { Footer };
