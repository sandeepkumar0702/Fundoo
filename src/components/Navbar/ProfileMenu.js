import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Typography, Button, Avatar, Box } from "@mui/material";

const ProfileMenu = ({ anchorEl, handleClose }) => {
    const open = Boolean(anchorEl);
    const navigate=useNavigate();
    const id = open ? "profile-popover" : undefined;
    let emailId=localStorage.getItem('email');
    const handleSignOut = () => {
        localStorage.clear();
        navigate("/");
    };
    
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
            <Box sx={{ p: 2, width: 280 }}>
                {/* Profile Header */}
                <Box sx={{ textAlign: "center", pb: 2, borderBottom: "1px solid #ddd" }}>
                    <Avatar sx={{ bgcolor: "#8a6aff", width: 56, height: 56, mx: "auto" }}>{emailId.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Hi, {emailId.slice(0,5)}!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {emailId}
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
                            sx={{ p: 1, cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
                            onClick={handleSignOut}
                    >
                    Sign out of all accounts
                    </Typography>

                </Box>
            </Box>
        </Popover>
    );
};

export default ProfileMenu;
