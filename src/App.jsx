import "./styles/index.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import LearnMore from "./components/LearnMore/LearnMore";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <Cart />
      <Header />
      <main>
        <Hero />
        <LearnMore />
        <Menu />
      </main>
    </>
  );
}

export default App;
