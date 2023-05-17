import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DiscountIcon from "@mui/icons-material/Discount";
import { signOut, useSession } from "next-auth/react";
import Login from "../login";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { display } from "@mui/system";
import Goback from "@/componets/goback";
// import { useEffect } from "react";

export default function Posts({ posts }) {
  const { push, asPath } = useRouter();
  const Router = useRouter();
  const { data: session } = useSession();
  const onPreviewDetails = (id) => {
    console.log(asPath);
    push(`/products/${id}`);
  };

  const addtocart = () => {
    if (session && session.user) {
      alert("added to cart");
    } else {
      location.href = "./login";
    }
  };

  if (session && session.user) {
    {
      console.log(posts);
    }
    return (
      <main>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            fontSize: "20px",
            marginLeft: "2.2rem",
          }}
        >
          {posts?.products?.map(
            ({
              title,
              price,
              rating,
              images,
              id,
              stock,
              discountPercentage,
            }) => (
              <MDBContainer
                fluid
                className="my-6"
                style={{
                  display: "flex",
                  padding: "5px 17px",
                  border: "2px solid black",
                  borderRadius: "0.5rem",
                }}
              >
                <MDBRow>
                  <MDBCol md="12" lg="4" className="mb-4 mb-lg-0">
                    <MDBCard style={{ width: "18rem" }}>
                      <div style={{ display: "inline-block" }}>
                        <p className="lead mb-0">Today's Offer</p>
                      </div>
                      <div
                        style={{
                          float: "right",
                          marginTop: "1.2rem",
                          border: "1px solid black",
                          fontSize: "1.2rem",
                          borderRadius: "0.5rem",
                          padding: "0.5rem 0.7rem",
                          display: "inline-flex",
                          VerticalAlign: "text-bottom",
                          BoxSizing: "inherit",
                          textAlign: "center",
                          AlignItems: "center",
                        }}
                      >
                        <DiscountIcon />
                        {Math.round(discountPercentage)}%
                      </div>
                      <div style={{ height: "2rem" }}>
                        <p style={{ fontSize: "1rem" }}>{title}</p>
                      </div>
                      <MDBCardImage
                        src={images[0]}
                        style={{ width: "200px", height: "200px" }}
                        position="top"
                        alt="Laptop"
                      />
                      <MDBCardBody>
                        <div class="d-flex justify-content-between mb-2">
                          <p class="text-muted mb-0">
                            Available:
                            <span class="fw-bold">{stock}</span>
                          </p>
                          {/* {console.log(price / discountPercentage)} */}
                          <p style={{ display: "inline-block" }}>
                            $
                            {Math.round(
                              price -
                                (price * Math.round(discountPercentage)) / 100
                            )}
                          </p>
                          <p
                            style={{ display: "inline-block", margin: "12px" }}
                          >
                            <del>${price}</del>
                          </p>
                          <br />
                          <div
                            class="ms-auto text-warning"
                            style={{
                              display: "inline-flex",
                              VerticalAlign: "text-bottom",
                              BoxSizing: "inherit",
                              textAlign: "center",
                              AlignItems: "center",
                            }}
                          >
                            <div>{Math.round(rating)}</div>
                            {[...Array(5)].map((star, index) => {
                              return index + 1 <= Math.round(rating) ? (
                                <StarIcon />
                              ) : (
                                <StarBorderIcon />
                              );
                            })}
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <Button
                              variant="outlined"
                              endIcon={<AddShoppingCartIcon />}
                              style={{
                                backgroundColor: "black",
                                color: "white",
                                float: "right",
                                fontSize: "0.8rem",
                              }}
                              onClick={() => addtocart()}
                            >
                              Add To Cart
                            </Button>
                            <Button
                              variant="outlined"
                              endIcon={<MoreHorizIcon />}
                              style={{
                                backgroundColor: "black",
                                color: "white",
                                float: "left",
                                fontSize: "0.8rem",
                              }}
                              onClick={() => onPreviewDetails(id)}
                            >
                              View More
                            </Button>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            )
          )}
        </div>
        <div style={{ marginLeft: "2.2rem" }}>
          <Goback />
        </div>
      </main>
    );
  } else {
    return <Login />;
  }
}

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/getProducts");
  const posts = await data.json();
  return {
    props: { posts },
  };
}
