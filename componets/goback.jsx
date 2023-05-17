import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
function Goback() {
  const Router = useRouter();
  return (
    <Button
      style={{
        backgroundColor: "black",
        width: "fit-content",
        marginTop: "10px",
        color: "white",
      }}
      onClick={() => Router.back()}
    >
      go back to previous page
    </Button>
  );
}

export default Goback;
