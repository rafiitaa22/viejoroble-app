import classes from "../../styles/Products.module.css";
import { IoIosStar } from "react-icons/io";

const Products = (props) => {
  return (
    <div className={classes.item}>
      {props.data.boolDestacado ? (
        <div className={classes.badge}>{<IoIosStar />}</div>
      ) : null}

      <h1 className={classes.title}>{props.data.nombre}</h1>
      {props.data.descripcion && (
        <p className={classes.description}>{props.data.descripcion}</p>
      )}
      <div className={classes.price}>{props.data.precio.toFixed(2)}</div>
    </div>
  );
};

export default Products;
