
import classes from "../../styles/CategoriesNav.module.css";

const CategoriesNav = (props) => {



  return (
    <div className={classes.nav}>
      <div
        key=""
        id="0"
        className={
          props.selectedCategory === null
            ? classes["cat-selected"]
            : classes.cat
        }
        onClick={props.selectCategoryHandler}
      >
        Todo
      </div>
      <div className={classes.scroll} ref={props.catNavRef}>
        {props.data.map((cat) => (
          <div
            key={cat.id}
            id={cat.id}
            className={
              props.selectedCategory === cat.id
                ? classes["cat-selected"]
                : classes.cat
            }
            onClick={props.selectCategoryHandler}
          >
            {cat.nombre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesNav;
