import style from "./Footer.module.scss";
import { VERSION } from "../Global";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.content}>
          <p>&copy; Ian MacDonald & Dr. Alexander Nwala 2023 | Version {VERSION}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
