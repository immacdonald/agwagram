import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views";
import Header from "./components/Page/Header";
import Footer from "./components/Page/Footer";

function App() {
  return (
  <div className={style.app}>
      <Header />
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
