"use client";
import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface PostMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleView: () => void;
}

const PostMenu: React.FC<PostMenuProps> = ({
  anchorEl,
  handleClose,
  handleEdit,
  handleDelete,
  handleView,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
      <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
      <MenuItem onClick={handleView}>View Post</MenuItem>
    </Menu>
  );
};

export default PostMenu;
