import React from "react";
import { updateProfile } from "../../lib/api/call/profile";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../store";

interface IEditFormProps {
  onClose: () => void;
  token: string;
}

const EditProfilForm: React.FC<IEditFormProps> = ({ onClose, token }) => {

  const profile = useAppSelector((state) => state.auth.user);
  const [formInput, setFormInput] = React.useState<{
    username?: string | null;
    bio?: string | null;
    cover?: File | null;
    avatar?: File | null;
    fullname: string;
  }>({
    username: profile?.user.username,
    bio: profile?.bio,
    cover: null,
    avatar: null,
    fullname: profile?.user.fullname || "",
  });
  
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formInput, token);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageClick = (fieldName: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) =>
      handleFileChange(fieldName, e.target.files?.[0]);
    input.click();
  };

  const handleFileChange = (fieldName: string, file: File | null) => {
    setFormInput((prevState) => ({
      ...prevState,
      [fieldName]: file,
    }));
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
      <Typography
        sx={{ fontWeight: 700, fontSize: "20px", color: "#FFFFFF", mb: "10px" }}
      >
        Edit Profile
      </Typography>
      <img
        src={profile?.cover}
        alt="cover"
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "20px",
          objectFit: "cover",
        }}
        onClick={() => handleImageClick("cover")}
      />

      <Avatar
        src={profile?.avatar}
        alt="avatar"
        sx={{
          width: 100,
          height: 100,
          objectFit: "cover",
          border: "5px solid #262626",
          mt: "-50px",
          ml: "5%",
          mb: "10px",
        }}
        onClick={() => handleImageClick("avatar")}
      />
      <form onSubmit={handleEdit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            name="username"
            label="Username"
            value={formInput.username || ""}
            onChange={handleStringChange}
            InputProps={{ sx: { color: 'white', borderRadius: "16px" } }} 
          />
          <TextField
            name="fullname"
            label="Fullname"
            value={formInput.fullname}
            onChange={handleStringChange}
            InputProps={{ sx: { color: 'white', borderRadius: "16px"} }} 
          />
          <TextField
            name="bio"
            label="Bio"
            value={formInput.bio}
            onChange={handleStringChange}
            InputProps={{ sx: { color: 'white', borderRadius: "16px"} }} 
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              display: "flex",
              justifyContent: "end",
              width: "70px",
              backgroundColor: "#04A51E",
              borderRadius: "20px",
            }}
          >
            Save
          </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditProfilForm;
