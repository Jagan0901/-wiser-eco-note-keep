import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function NotesList({ webSeries, refresh }) {
     const [open, setOpen] = React.useState(false);
     const [editOpen, setEditOpen] = React.useState(false);
     const [title, setTitle] = React.useState(webSeries.title);
     const [body, setBody] = React.useState(webSeries.body);

     const handleClickOpen = () => {
       setOpen(true);
     };

     const handleOpen = () => {
       setEditOpen(true);
     };


  const deleteNote = async ()=>{
    try {
        const {data} = await axios.delete(`https://666f9f310900b5f87247b846.mockapi.io/users/${webSeries.id}`);
        refresh(true);
        // console.log(key)
    } catch (error) {
        window.alert(`Error Occurred ${error}`)
    }
  }

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const likeDeleteEdit = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const editNote = async()=>{
    try {
        const {data} = await axios.put(`https://666f9f310900b5f87247b846.mockapi.io/users/${webSeries.id}`,{title,body});
        refresh(true);
        setEditOpen(false)
    } catch (error) {
        window.alert(`Error Occurred ${error}`)
    }
  };
 
  return (
    <div className="webSeries-container">
      <div className="webSeries-specs">
        <div className="webSeries-N-btn">
          <h3 className="webSeries-name">{webSeries.title}</h3>
        </div>
      </div>
      <p className="webSeries-summary">{webSeries.body}</p>
      <div style={likeDeleteEdit}>
        <div className="btn">
          <IconButton aria-label="edit" color="secondary" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="info"
            color="primary"
            onClick={handleClickOpen}
          >
            <InfoIcon />
          </IconButton>

          <IconButton aria-label="delete" color="error" onClick={deleteNote}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {/* Info Section */}
      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {webSeries.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClickClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{webSeries.body}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Edit Section */}
      <Dialog
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <TextField
            id="filled-basic"
            label="Enter Title"
            variant="filled"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </DialogTitle>
        <DialogTitle id="alert-dialog-title">
          <TextField
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            maxRows={4}
            variant="filled"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </DialogTitle>

        <DialogActions>
          <Button onClick={editNote}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


