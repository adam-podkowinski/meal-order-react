import classes from "./Hero.module.scss";
import { HiArrowDown } from "react-icons/hi";

const Hero = () => {
  return (
    <div className={`container ${classes.hero}`}>
      <div className={classes.textBox}>
        <h1 className={classes.fancyText}>
          Delicious food,
          <br /> delivered to You
        </h1>
        <p className={classes.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis,
          fuga iusto libero nihil veritatis voluptate. Alias architecto at,
          consectetur dolore doloribus id incidunt iusto magnam maiores modi
          omnis optio quae.
        </p>
        <div className={classes.buttonContainer}>
          <a href={"#menu"} className={"button"}>
            Start shopping
          </a>
          <a
            href={"#learnMore"}
            className={`button ${classes.learnMoreButton}`}
          >
            Learn more <HiArrowDown />
          </a>
        </div>
      </div>
      <div className={classes.emojiBox}>
        <span>👋</span>
        <span>🍔</span>
      </div>
    </div>
  );
};

export default Hero;
