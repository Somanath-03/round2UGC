"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

interface ContentInfo {
  id: number;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
}

const Posts: React.FC<{ info: ContentInfo[] }> = ({ info }) => {
  const onehalf = [];
  const otherhalf = [];
  for (let i = 0; i < info.length; i++) {
    if (i % 2 === 0) {
      onehalf.push(info[i]);
    } else {
      otherhalf.push(info[i]);
    }
  }
  const [modalOpen, setModalOpen] = useState<number | false>(false);

  const handleModalClick = (contentId: number) => {
    setModalOpen(modalOpen === contentId ? false : contentId);
  };

  const getTrimmedDescription = (description: string) => {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex flex-col p-4 w-1/2">
          {onehalf.map((content) => (
            <Card key={content.id} className="mb-4 p-4">
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
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
                  onClick={() => handleModalClick(content.id)}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Modal
                open={modalOpen === content.id}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}>
                  <Typography 
                    id="modal-title" 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      mb: 3,
                      color: 'black',
                      fontWeight: 'bold'
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
                      color: 'black',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {content.description}
                  </Typography>

                  <Typography 
                    variant="caption" 
                    display="block" 
                    sx={{ 
                      mt: 3,
                      color: 'gray'
                    }}
                  >
                    Posted on: {new Date(content.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Modal>
            </Card>
          ))}
        </div>
        <div className="flex flex-col p-4 w-1/2">
          {otherhalf.map((content) => (
            <Card key={content.id} className="mb-4 p-4">
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
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
                  onClick={() => handleModalClick(content.id)}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Modal
                open={modalOpen === content.id}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                }}>
                  <Typography 
                    id="modal-title" 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      mb: 3,
                      color: 'black',
                      fontWeight: 'bold'
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
                      color: 'black',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {content.description}
                  </Typography>

                  <Typography 
                    variant="caption" 
                    display="block" 
                    sx={{ 
                      mt: 3,
                      color: 'gray'
                    }}
                  >
                    Posted on: {new Date(content.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Modal>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
