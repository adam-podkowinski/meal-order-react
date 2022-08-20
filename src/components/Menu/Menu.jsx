import classes from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useState } from "react";

const api =
  "https://meal-order-a9a45-default-rtdb.europe-west1.firebasedatabase.app";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((r) => setTimeout(r, 1500));
      const data = await fetch(`${api}/meals.json`);

      if (!data.ok) {
        setError("Error: !data.ok");
      } else {
        setItems(await data.json());
      }
    } catch (e) {
      setItems([]);
      setError("Error!");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const loadingInfo = <h2 className={classes.info}>Loading...</h2>;

  const errorInfo = <h2 className={classes.info}>{error}</h2>;

  const content = (
    <ul>
      {items.map(({ name, description, price }) => (
        <MenuItem
          name={name}
          description={description}
          price={price}
          key={name}
        />
      ))}
    </ul>
  );

  return (
    <div id={"menu"} className={`container ${classes.menu}`}>
      <h1>Menu</h1>
      <div className={classes.card}>
        {loading && loadingInfo}
        {error && errorInfo}
        {!loading && !error && content}
      </div>
    </div>
  );
};

export default Menu;
