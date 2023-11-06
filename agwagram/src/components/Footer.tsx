import style from './Footer.module.scss';

function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.content}>
                    <p>&copy; Ian MacDonald & Dr. Nwala 2023 | Version 0.9.0</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
