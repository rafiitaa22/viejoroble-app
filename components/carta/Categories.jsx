import { useState, useEffect } from "react";
import Products from "./Products";
import classes from "../../styles/Categories.module.css";

const Categories = (props) => {
  return (
    <div className={classes.category}>
      <h1 className={classes.title}>{props.data.nombre}</h1>
      <div className={classes.item}>
        {props.products &&
          props.products.length > 0 &&
          props.products.map((product) => (
            <Products key={product.cartaID} data={product} />
          ))}
      </div>
      {props.data.strMensajeCarta && (
        <div className={classes.message}>{props.data.strMensajeCarta}</div>
      )}
    </div>
  );
};

export default Categories;
