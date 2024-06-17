import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

export function AddNotes() {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async() => {
    if(!title || !body) return window.alert("Mandatory fields should be filled")
    try {
        const {data} = await axios.post("https://666f9f310900b5f87247b846.mockapi.io/users", {title,body});

        setOpen(false);
        window.location.reload();
    } catch (error) {
        window.alert(`Error Occurred ${error}`);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Notes
      </Button>
      <Dialog
        open={open}
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
          />
        </DialogTitle>
        <DialogTitle id="alert-dialog-title">
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="filled"
          onChange={(e)=> setBody(e.target.value)}
        />
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


