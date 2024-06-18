import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";

interface ILoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onRegisterClick }) => {
  const [formInput, setFormInput] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginApi(formInput);
      const token = res.data.data;
      const resProfile = await getProfile(token);
      localStorage.setItem("token", token);
      dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#262626",
        borderRadius: "10px",
        padding: "20px",
        width: "600px",
        height: "100hv",
      }}
    >
      <form onSubmit={handleLogin}>
        <Box
          sx={{
            color: "#04a51e",
            fontSize: "36px",
            fontWeight: 700,
            marginTop: "10px",
            marginBottom: "5px",
          }}
        >
          circle
        </Box>
        <Box
          sx={{
            color: "white",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Login to Circle
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            placeholder="Username"
            value={formInput.username}
            onChange={(e) =>
              setFormInput({ ...formInput, username: e.target.value })
            }
            InputProps={{ sx: { color: "white", borderRadius: "16px" } }}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={formInput.password}
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
            InputProps={{ sx: { color: "white", borderRadius: "16px" } }}
          />
          <Typography
            sx={{
              color: "#FFFFFF",
              fontWeight: 500,
              justifyContent: "end",
              display: "flex",
              width: "100%",
            }}
          >
            Forgot password?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#04A51E", borderRadius: "20px", ml: -1 }}
          >
            LOGIN
          </Button>
          <Typography sx={{ color: "#FFFFFF", fontWeight: 500 }}>
            Don't have an account yet?{" "}
            <span
              onClick={onRegisterClick}
              style={{ cursor: "pointer", color: "#04A51E", fontWeight: 700 }}
            >
              Create account
            </span>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
