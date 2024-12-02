"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

interface PostCardProps {
  content: ContentInfo;
  index: number;
  expanded: number | false;
  handleExpandClick: (index: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  content,
  index,
  expanded,
  handleExpandClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    window.location.href = `/edit-post?id=${content.id}`;
    console.log("Edit post:", content);
    handleMenuClose();
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/delete-post?id=${content.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        // Optionally, you can refresh the data or update the state to remove the deleted post
      } else {
        const errorResult = await response.json();
        console.log("Error deleting post:", errorResult.error);
      }
    } catch (error) {
      console.log("Failed to delete post:", error);
    }
    handleMenuClose();
  };

  const handleViewPost = () => {
    window.location.href = `/view-post?id=${content.id}`;
    handleMenuClose();
  };

  const getTrimmedDescription = (description: string) => {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  return (
    <Card key={content.id} className="mb-4 p-4">
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
              <MenuItem onClick={handleViewPost}>View Post</MenuItem>
            </Menu>
          </>
        }
        title={content.title}
        subheader={new Date(content.created_at).toLocaleDateString()}
      />
      {content.file_url.endsWith(".mp4") ? (
        <CardMedia
          component="video"
          controls
          autoPlay
          loop
          src={content.file_url}
        />
      ) : (
        <CardMedia
          component="img"
          image={content.file_url}
          alt={content.title}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {getTrimmedDescription(content.description)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={() => handleExpandClick(index)}
          aria-expanded={expanded === index}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded === index} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Description:</Typography>
          <Typography>
            {content.description.length > 100 ? content.description : ""}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
