import classes from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const items = [
  { name: "Sushi", description: "Finest fish and veggies", price: 22.99 },
  { name: "Schnitzel", description: "A german speciality!", price: 25.99 },
  {
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 40.99,
  },
  { name: "Green Bowl", description: "Healthy... and green 🍀", price: 12.99 },
];

const Menu = () => {
  return (
    <div id={"menu"} className={`container ${classes.menu}`}>
      <h1>Menu</h1>
      <div className={classes.card}>
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
      </div>
    </div>
  );
};

export default Menu;
