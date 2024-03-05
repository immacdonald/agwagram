import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views";
import Header from "./components/Page/Header";
import Footer from "./components/Page/Footer";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
