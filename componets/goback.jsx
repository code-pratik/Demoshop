import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
      startIcon={<ArrowBackIcon />}
      onClick={() => Router.back()}
    >
      go back to previous page
    </Button>
  );
}

export default Goback;
