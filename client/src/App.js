import Cart from "./components/cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import ShoppingCart from "./components/shoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const res = await (await fetch("/api/v1/products/getAll")).json();
    setProducts([...res.data]);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <ShoppingCart />
      <div
        className="mt-5 col-12 d-flex flex-lg-row
     justify-content-lg-around flex-column justify-content-around align-items-center"
      >
        {products.map(({ src, title, price }, i) => {
          return <Cart src={src} title={title} price={price} key={i} />;
        })}
      </div>
    </>
  );
}

export default App;
