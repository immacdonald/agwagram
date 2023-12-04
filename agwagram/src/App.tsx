import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className={style.app}>
      <Header />
      <main className={style.content}>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
