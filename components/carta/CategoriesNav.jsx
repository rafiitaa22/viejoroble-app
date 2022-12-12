import { useRef } from "react";
import classes from "../../styles/CategoriesNav.module.css";

const CategoriesNav = (props) => {
  const catNavRef = useRef();

  const selectCategoryHandler = (e) => {
    if (
      props.selectedCategory !== parseInt(e.target.id) &&
      parseInt(e.target.id) !== 0
    ) {
      props.setSelectedCategory(parseInt(e.target.id));
    } else {
      props.setSelectedCategory(null);
      catNavRef.current.scrollLeft = 0;
    }
    console.log(e.target.id);
  };
  return (
    <div className={classes.nav}>
      <div className={classes.scroll} ref={catNavRef}>
        <div
          key=""
          id="0"
          className={
            props.selectedCategory === null
              ? classes["cat-selected"]
              : classes.cat
          }
          onClick={selectCategoryHandler}
        >
          Todo
        </div>
        {props.data.map((cat) => (
          <div
            key={cat.id}
            id={cat.id}
            className={
              props.selectedCategory === cat.id
                ? classes["cat-selected"]
                : classes.cat
            }
            onClick={selectCategoryHandler}
          >
            {cat.nombre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesNav;
