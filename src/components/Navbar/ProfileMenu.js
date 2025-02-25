import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Typography, Button, Avatar, Box } from "@mui/material";

const ProfileMenu = ({ anchorEl, handleClose }) => {
    const open = Boolean(anchorEl);
    const id = open ? "profile-popover" : undefined;
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const firstLetter = email.charAt(0).toLocaleUpperCase();
    const firsFourtLetter = email.slice(0,5);
    const handleLogout = ()=>{
        localStorage.clear();
        // handleClose();
        navigate("/");
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            // transformOrigin={{
            //     vertical: "top",
            //     horizontal: "right",
            // }}
            sx={{ mt: 1 }}
        >
            <Box sx={{ p: 2, width: 280, cursor: "pointer" }}>
                {/* Profile Header */}
                <Box sx={{ textAlign: "center", pb: 2, borderBottom: "1px solid #ddd" }}>
                    <Avatar sx={{ bgcolor: "#8a6aff", width: 56, height: 56, mx: "auto", fontSize: 26 }}>{firstLetter}</Avatar>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Hi, {firsFourtLetter}!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1, bgcolor: "#4285f4", "&:hover": { bgcolor: "#357ae8" } }}
                    >
                        Google Account Settings
                    </Button>
                </Box>

                {/* Profile Options */}
                <Box sx={{ pt: 2 }}>
                    <Typography
                        variant="body1"
                        sx={{ p: 1, cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
                    >
                        Add another account
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={handleLogout}
                        sx={{ p: 1, cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
                    >
                        Sign out of all accounts
                    </Typography>
                </Box>
            </Box>
        </Popover>
    );
};

export default ProfileMenu;
