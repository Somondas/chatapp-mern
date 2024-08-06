import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  // const isAdmin = true;

  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // -> State variables----------------------------------

  const secretKey = useInputValidation("");

  // -> Handlers-------------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }
  return (
    <div
      style={{
        background: "hsla(339, 100%, 55%, 1)",

        background:
          "linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)",

        background:
          "-moz-linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)",

        background:
          " -webkit-linear-gradient(90deg, hsla(339, 100%, 55%, 1) 0%, hsla(197, 100%, 64%, 1) 100%)",

        filter:
          'progid: DXImageTransform.Microsoft.gradient( startColorstr="#FF1B6B", endColorstr="#45CAFF", GradientType=1 )',
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            {secretKey.error && (
              <Typography color={"error"} variant="caption">
                {secretKey.error}
              </Typography>
            )}
            <Button
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
