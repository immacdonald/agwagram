import style from "./Header.module.scss";
import Logo from "../images/agwagram.png";
import { Link } from "react-router-dom";
import { AnalysisContext } from "../contexts/AnalysisContext";
import { useContext } from "react";

function Header() {
  const { setTheme } = useContext(AnalysisContext);

  return (
    <header className={style.header}>
      <div className={style.content}>
        <Link to="/" className={style.logo}>
          <img src={Logo} />
        </Link>
        <nav className={style.navigation}></nav>
        <div>
          <button onClick={() => setTheme()}>Theme</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
