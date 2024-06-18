import React from "react";
import { registerApi } from "../../lib/api/call/user";
import { Box, Button, TextField, Typography } from "@mui/material";

interface IRegisterFormProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({
  onClose,
  onLoginClick,
}) => {
  const [formInput, setFormInput] = React.useState<{
    username: string;
    password: string;
    email: string;
    fullname: string;
  }>({
    username: "",
    password: "",
    email: "",
    fullname: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerApi(formInput);
      onClose();
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
      <form onSubmit={handleRegister}>
        <Box display="flex" flexDirection="column">
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
            Create account Circle
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{ marginBottom: "10px" }}
          >
            <TextField
              placeholder="Fullname"
              value={formInput.fullname}
              onChange={(e) =>
                setFormInput({ ...formInput, fullname: e.target.value })
              }
              InputProps={{ sx: { color: "white", borderRadius: "16px" } }}
            />
            <TextField
              placeholder="Username"
              value={formInput.username}
              onChange={(e) =>
                setFormInput({ ...formInput, username: e.target.value })
              }
              InputProps={{ sx: { color: "white", borderRadius: "16px" } }}
            />
            <TextField
              placeholder="Email"
              value={formInput.email}
              onChange={(e) =>
                setFormInput({ ...formInput, email: e.target.value })
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
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#04A51E",
              borderRadius: "20px",
              height: "44px",
              marginBottom: "10px",
            }}
          >
            Create
          </Button>
          <Typography sx={{ color: "#FFFFFF", fontWeight: 500 }}>
            Already have an account?{" "}
            <span
              onClick={onLoginClick}
              style={{ cursor: "pointer", color: "#04A51E", fontWeight: 700 }}
            >
              Login
            </span>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
