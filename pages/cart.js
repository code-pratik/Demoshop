import React from "react";
import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { DeleteItem } from "@/slices/cartSlice";
import Goback from "@/componets/goback";
function Cart() {
  const {
    main,
    container,
    leftContainer,
    rightContainer,
    subTotal,
    subTotal2,
    textField,
    couponbtn,
    list1,
    shipping,
    list2,
    itemlist,
    deletebtn,

    Total,
    CheckOutBtn,
  } = styles;
  //   const [count, setCount] = useState(1);
  const [cartvalues, setValue] = useState([]);
  const cartproducts = useSelector((state) => state.cart.cartproducts);
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("cartproducts")));
  }, [cartproducts]);

  const dispatch = useDispatch();
  const order = () => {
    if (cartvalues.length !== 0) {
      location.href = "./ordersuccess";
    } else {
      alert("add some products into cart");
    }
    localStorage.setItem("cartproducts", JSON.stringify([]));
  };
  return (
    <div className={main}>
      {console.log(cartvalues)}
      <div className={container}>
        <div className={leftContainer}>
          <h2>ShoppingCart</h2>
          <ul className={list1}>
            <li>Subtotal</li>
            <li>Quantity</li>
            <li>Price</li>
            <li>Product</li>
          </ul>
          {cartvalues?.map(({ images, title, price, count, id }) => (
            <ul className={itemlist}>
              <li>
                <IconButton
                  aria-label="delete"
                  onClick={() => dispatch(DeleteItem({ id }))}
                >
                  <DeleteIcon className={deletebtn} />
                </IconButton>
              </li>
              <li>
                <img src={images[0]} width="200" height="200" />
              </li>
              <li>{title}</li>
              <li>{price}</li>
              <li>{count}</li>
              <li>{price * count}</li>
            </ul>
          ))}
        </div>
        <div className={rightContainer}>
          <h2>Cart totals</h2>
          <div className={subTotal}>
            <div>subtotal</div>
            <div>
              $
              {cartvalues.reduce(function (acc, obj) {
                return acc + obj.price * obj.count;
              }, 0)}
            </div>
          </div>
          <div className={subTotal2}>
            <div>
              <div className={shipping}>Shipping</div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Coupon Code"
                  variant="standard"
                  className={textField}
                ></TextField>
              </div>
            </div>
            <div>
              <ul className={list2}>
                <li>Discount price : 0</li>
                <li>Shipping cost : 0</li>
                <li>delivery In : 5-7 Days</li>
                <Button className={couponbtn} style={{ background: "black" }}>
                  Apply Coupon
                </Button>
              </ul>
            </div>
          </div>
          <div className={Total}>
            <div>Total</div>
            <div>
              $
              {cartvalues.reduce(function (acc, obj) {
                return acc + obj.price * obj.count;
              }, 0)}
            </div>
          </div>
          <Button
            className={CheckOutBtn}
            onClick={order}
            style={{ background: "black" }}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
      <div style={{ marginLeft: "3rem" }}>
        <Goback />
      </div>
    </div>
  );
}

export default Cart;
