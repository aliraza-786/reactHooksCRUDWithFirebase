import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Firebase from './config/fire';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [updateState, setUpdateState] = useState(props.data.data);

  const inputEvent = (event) => {
    const { name, value } = event.target;
    
    setUpdateState((preValue) => {
      return {
                  ...preValue,
                  [name]: value
              }
    });
}

  const updateFun = ( ) =>{
    Firebase.child(`Contacts/${props.data.id}`).set(updateState,
      err => {
          if (err) {
              console.log("Error ", err);
              alert("error");
          }
      });
    setOpen(false);

  }

  //Style Object 
  const modalstyle = {
    backgroundColor:'gray',
    height:'300px',
    padding:'20px',
    textAlign: 'center',
  }
  const inputFiled = {
    width:'99%',
    padding:'10px',
    color: 'red',
  }

  const body = (
    <>
        <form noValidate autoComplete="off">
          <h3>Edit Record</h3>
            <TextField id="standard-basic" value={updateState.fName} type="text" name="fName"  style={inputFiled}
            onChange={inputEvent}/>
            <TextField id="standard-basic" value={updateState.lName} type="text" name="lName"  style={inputFiled}
            onChange={inputEvent}/>
            <TextField id="standard-basic" value={updateState.email} type="email" name="email" style={inputFiled}
            onChange={inputEvent}/>
            <TextField id="standard-basic" value={updateState.phone} type="phone" name="phone" style={inputFiled}
            onChange={inputEvent}/>
            <Button type="button" variant="contained" color="primary" onClick={updateFun}>Update</Button>
        </form>
    </>
  );

  return (
    <div>
      <Modal style={modalstyle}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {/* {console.log("Modal Console ", props.data.id)} */}

    </div>
  );
}
