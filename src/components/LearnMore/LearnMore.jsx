import classes from "./LearnMore.module.scss";

const LearnMore = () => {
  return (
    <div id={"learnMore"} className={"container"}>
      <h1>
        We are a startup comapny specialising in
        <span className={classes.gradientText}> gastronomy</span>
      </h1>
      <ul className={classes.perksList}>
        <li>Cheap price</li>
        <li>Fast delivery</li>
        <li>Free refund</li>
      </ul>
    </div>
  );
};

export default LearnMore;
