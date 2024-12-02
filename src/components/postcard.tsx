"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import markdownToHtml from "@/utils/markdownToHtml";

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

const PostCard: React.FC<PostCardProps> = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [htmlDescription, setHtmlDescription] = useState<string>("");
  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await markdownToHtml(content.description);
      setHtmlDescription(html);
    };
    convertMarkdownToHtml();
  }, [content.description]);
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
    setDialogOpen(false);
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card
      key={content.id}
      className="mb-4 p-4"
      sx={{ bgcolor: "#230431", color: "white" }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={handleMenuClick}
              sx={{ color: "white" }}
            >
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
              <MenuItem onClick={handleDialogOpen}>Delete Post</MenuItem>
              <MenuItem onClick={handleViewPost}>View Post</MenuItem>
            </Menu>
          </>
        }
        title={<Typography sx={{ color: "white" }}>{content.title}</Typography>}
        subheader={
          <Typography sx={{ color: "white" }}>
            {new Date(content.created_at).toLocaleDateString()}
          </Typography>
        }
      />
      {content.file_url.endsWith(".mp4") ? (
        <CardMedia
          component="video"
          controls
          autoPlay
          loop
          muted
          src={content.file_url}
          poster={`${content.file_url}#t=0.1`}
        />
      ) : (
        <CardMedia
          component="img"
          image={content.file_url}
          alt={content.title}
        />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "white" }}>
          {getTrimmedDescription(content.description)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: "white" }}>
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={handleModalOpen}
          aria-expanded={modalOpen}
          aria-label="show more"
          sx={{ color: "white" }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "#17081f",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {content.title}
          </Typography>

          <div className="relative w-full h-[400px] mb-4">
            {content.file_url.endsWith(".mp4") ? (
              <video
                className="w-full h-full object-contain"
                controls
                src={content.file_url}
                poster={`${content.file_url}#t=0.1`}
              />
            ) : (
              <Image
                src={content.file_url}
                alt={content.title}
                fill
                className="object-contain"
                sizes="80vw"
              />
            )}
          </div>

          <Typography
            sx={{
              mt: 2,
              color: "white",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: htmlDescription }}
          />

          <Typography
            variant="caption"
            display="block"
            sx={{
              mt: 3,
              color: "gray",
            }}
          >
            Posted on: {new Date(content.created_at).toLocaleDateString()}
          </Typography>
        </Box>
      </Modal>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleDeletePost} sx={{ color: "white" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard;
