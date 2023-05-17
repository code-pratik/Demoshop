import Image from "next/image";
import Link from "next/link";
import Goback from "@/componets/goback";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "/Users/pratikprajapati/Desktop/nextjs/my-app/styles/Productdetails.module.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
export default function PostDetails({ details }) {
  const stars = Math.round(details.rating);
  const [count, setCount] = useState(1);
  const [imagevalue, setImagevalue] = useState(0);
  const [cartvalues, setValue] = useState([]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.cartproducts);
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("cartproducts")));
  }, [carts]);
  const { title, price, rating, images, id, stock, discountPercentage } =
    details;

  const {
    main,
    container,
    containerLeft,
    mainProductImage,
    smallimage,
    productImage,
    containerRight,
    available,
    cartvalue,
    cartbtn,
    cart,
  } = styles;

  useEffect(() => {
    cartvalues?.find((item) => item.id === id)
      ? setCount(
          cartvalues[cartvalues?.findIndex((item) => item.id === id)].count
        )
      : setCount(1);
  }, [cartvalues]);

  const incrementProductValue = () => {
    setCount(count + 1);
  };
  const decrementProductValue = () => {
    setCount(count - 1);
  };
  const selectImage = (index) => {
    setImagevalue(index);
  };

  return (
    <div className={main}>
      {console.log(count)}
      {console.log(cartvalues)}
      <div className={container}>
        <div className={containerLeft}>
          <img
            className={mainProductImage}
            src={images[imagevalue]}
            width="300"
            height="300"
          />
          <div className={smallimage}>
            <div className={productImage}>
              <img
                src={images[0]}
                onClick={() => {
                  selectImage(0);
                }}
                width="100"
                height="100"
              />
            </div>
            <div className={productImage}>
              <img
                src={images[1]}
                onClick={() => {
                  selectImage(1);
                }}
                width="100"
                height="100"
              />
            </div>
            <div className={productImage}>
              <img
                src={images[2]}
                onClick={() => {
                  selectImage(2);
                }}
                width="100"
                height="100"
              />
            </div>
            <div className={productImage}>
              <img
                src={images[3]}
                onClick={() => {
                  selectImage(3);
                }}
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>

        <div className={containerRight}>
          <div className={styles.productInfo}>
            <h2 className={styles.productName}>{details.title}</h2>
            <p className={available}>{details.description}</p>
            <p className={available}>
              Available : <span class="fw-bold">{stock}</span>
            </p>
            <p className={available} style={{ display: "inline-block" }}>
              Discounted Price : ${" "}
              {Math.round(
                price - (price * Math.round(discountPercentage)) / 100
              )}
            </p>
            <p
              className={available}
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              Original Price : <del>$ {price}</del>
            </p>
            <div className={styles.starating}>
              <div className={styles.stars}>{stars}</div>
              <div className={styles.starContainer}>
                {[...Array(5)].map((star, index) => {
                  return index + 1 <= stars ? (
                    <StarIcon className={styles.starIcon} />
                  ) : (
                    <StarBorderIcon className={styles.starIcon} />
                  );
                })}
              </div>
            </div>
            <div className={cartvalue}>
              <button
                variant="contained"
                style={{ background: "black" }}
                className={cartbtn}
                onClick={incrementProductValue}
              >
                +
              </button>
              <p className={cart}>{count}</p>
              <button
                style={{ background: "black" }}
                className={cartbtn}
                onClick={decrementProductValue}
                disabled={count === 0 ? true : false}
              >
                -
              </button>
              <Button
                className={cartbtn}
                endIcon={<AddShoppingCartIcon />}
                style={{
                  background: "black",
                }}
                onClick={() => {
                  dispatch(addToCart({ id, title, images, price, count }));
                  alert("added to cart");
                }}
              >
                Add To Cart
              </Button>
              <Button
                className={cartbtn}
                endIcon={<ShoppingBagIcon />}
                style={{
                  background: "black",
                }}
                // onClick={() =>
                //   dispatch(addToCart({ id, title, image, price, count }))
                // }
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Goback />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  // console.log(context);
  const data = await fetch(`https://dummyjson.com/products/${id}`);
  const details = await data.json();
  return {
    props: { details },
  };
}
