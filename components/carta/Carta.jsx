import { useState, useEffect } from "react";
import Categories from "./Categories.jsx";
import CategoriesNav from "./CategoriesNav.jsx";
import classes from "../../styles/Products.module.css";

let isData = false;

const Carta = () => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(null);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const fetchProducts = () => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const products = data.filter((product) => product.visible === 1);
          setProducts(products);
        }
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);
  isData =
    categories && categories.length > 0 && products && products.length > 0
      ? true
      : false;

  if (!isData) return;

  return (
    <div className={classes.carta}>
      <CategoriesNav
        data={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div style={{ marginTop: "60px" }}>
        {categories
          .filter((cat) => {
            return selectedCategory === null
              ? true
              : selectedCategory === cat.id;
          })
          .map((cat) => (
            <Categories
              key={cat.id}
              data={cat}
              products={products.filter((prod) => prod.catID === cat.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Carta;
