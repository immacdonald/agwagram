import { Link, useLocation } from "react-router-dom";
import style from "./DynamicLink.module.scss";

interface Props {
  label: string;
  link: string;
  secondaryLink?: string;
}

function DynamicLink(props: Props) {
  const location = useLocation();

  const { label, link, secondaryLink } = props;

  return (
    <div
      className={style.link}
      data-selected={
        link === location.pathname ||
        secondaryLink === location.pathname ||
        null
      }
    >
      <Link to={link}>{label}</Link>
    </div>
  );
}

export default DynamicLink;
