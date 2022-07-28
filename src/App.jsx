import classes from "./App.module.scss";
import "./index.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={classes.App}>
      <Header />
    </div>
  );
}

export default App;
