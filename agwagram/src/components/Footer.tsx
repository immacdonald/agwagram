import style from './Footer.module.scss';

function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.content}>
                    <p>&copy; Ian MacDonald 2023</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
